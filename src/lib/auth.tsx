import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type User = {
  id: string
  email: string
  name?: string
  identity?: string
  goal?: string
  onboarded?: boolean
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  completeOnboarding: (identity: string, goal: string) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

// TODO: Swap to Supabase auth once API keys are confirmed working.
// The Supabase client is set up in lib/supabase.ts and database
// schema is ready in supabase/setup.sql — just need valid keys
// in .env and then uncomment the Supabase auth flow below.

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('ctc_user')
    if (stored) {
      setUser(JSON.parse(stored))
    }
    setLoading(false)
  }, [])

  const persistUser = (u: User) => {
    setUser(u)
    localStorage.setItem('ctc_user', JSON.stringify(u))
  }

  const login = async (email: string, _password: string) => {
    const u: User = { id: crypto.randomUUID(), email, onboarded: false }
    const stored = localStorage.getItem('ctc_user_data_' + email)
    if (stored) {
      const data = JSON.parse(stored)
      u.name = data.name
      u.identity = data.identity
      u.goal = data.goal
      u.onboarded = data.onboarded
    }
    persistUser(u)
  }

  const signup = async (email: string, _password: string, name: string) => {
    const u: User = { id: crypto.randomUUID(), email, name, onboarded: false }
    persistUser(u)
  }

  const logout = () => {
    if (user) {
      localStorage.setItem('ctc_user_data_' + user.email, JSON.stringify(user))
    }
    setUser(null)
    localStorage.removeItem('ctc_user')
  }

  const completeOnboarding = (identity: string, goal: string) => {
    if (!user) return
    const updated = { ...user, identity, goal, onboarded: true }
    persistUser(updated)
    localStorage.setItem('ctc_user_data_' + updated.email, JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, completeOnboarding }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
