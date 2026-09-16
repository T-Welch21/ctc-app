import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from './supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'

type User = {
  id: string
  email: string
  name?: string
  identity?: string
  goal?: string
  onboarded?: boolean
  subscription_status?: string | null
  stripe_customer_id?: string | null
}

type AuthContextType = {
  user: User | null
  loading: boolean
  needsPasswordReset: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  completeOnboarding: (identity: string, goal: string) => Promise<void>
  updateProfile: (updates: Partial<User>) => Promise<void>
  resetPassword: (newPassword: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

function profileKey(id: string) {
  return `ctc_profile_${id}`
}

function getLocalProfile(id: string): Partial<User> {
  try {
    const raw = localStorage.getItem(profileKey(id))
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveLocalProfile(user: User) {
  localStorage.setItem(profileKey(user.id), JSON.stringify(user))
}

async function fetchProfile(id: string): Promise<Partial<User> | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('name, identity, goal, onboarded, subscription_status, stripe_customer_id')
      .eq('id', id)
      .single()
    if (error || !data) return null
    return data
  } catch {
    return null
  }
}

async function syncProfile(user: User): Promise<void> {
  try {
    await supabase.from('profiles').upsert({
      id: user.id,
      email: user.email,
      name: user.name || null,
      identity: user.identity || null,
      goal: user.goal || null,
      onboarded: user.onboarded || false,
    })
  } catch {
    // DB may be down — local cache is the fallback
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [needsPasswordReset, setNeedsPasswordReset] = useState(false)

  const buildUser = async (su: SupabaseUser): Promise<User> => {
    const base: User = {
      id: su.id,
      email: su.email || '',
      name: su.user_metadata?.name,
    }

    const remote = await fetchProfile(su.id)
    if (remote) {
      const cleaned = Object.fromEntries(
        Object.entries(remote).filter(([, v]) => v != null)
      )
      const merged = { ...base, ...cleaned }
      saveLocalProfile(merged)
      await syncProfile(merged)
      return merged
    }

    const local = getLocalProfile(su.id)
    return { ...base, ...local }
  }

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const u = await buildUser(session.user)
        setUser(u)
      }
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setNeedsPasswordReset(true)
      }
      if (!session?.user) {
        setUser(null)
      } else {
        const u = await buildUser(session.user)
        setUser(u)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(error.message)
  }

  const signup = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })
    if (error) throw new Error(error.message)

    if (data.user) {
      const profile: User = { id: data.user.id, email, name, onboarded: false }
      saveLocalProfile(profile)
      await syncProfile(profile)
    }

    if (data.user && !data.session) {
      throw new Error('CHECK_EMAIL')
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const completeOnboarding = async (identity: string, goal: string) => {
    if (!user) return
    const updated = { ...user, identity, goal, onboarded: true }
    setUser(updated)
    saveLocalProfile(updated)
    await syncProfile(updated)
  }

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return
    const updated = { ...user, ...updates }
    setUser(updated)
    saveLocalProfile(updated)
    await syncProfile(updated)
  }

  const resetPassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) throw new Error(error.message)
    setNeedsPasswordReset(false)
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, needsPasswordReset, login, signup, logout, completeOnboarding, updateProfile, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
