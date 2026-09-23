import { supabase } from './supabase'

export type SubscriptionStatus = 'active' | 'trialing' | 'canceled' | 'past_due' | 'incomplete' | null

const COACH_EMAILS = ['tyler21welch@gmail.com', 'test@ctctest.com']

export function isSubscribed(user: { email: string; subscription_status?: string | null }): boolean {
  if (COACH_EMAILS.includes(user.email)) return true
  const s = user.subscription_status
  return s === 'active' || s === 'trialing'
}

export async function fetchSubscriptionStatus(userId: string): Promise<SubscriptionStatus> {
  try {
    const { data } = await supabase
      .from('profiles')
      .select('subscription_status')
      .eq('id', userId)
      .single()
    return (data?.subscription_status as SubscriptionStatus) || null
  } catch {
    return null
  }
}

export async function createCheckoutSession(): Promise<string> {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.access_token) throw new Error('Not logged in')

  const res = await fetch('/api/create-checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
    },
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to create checkout session')
  if (!data?.url) throw new Error('No checkout URL returned')
  return data.url
}

export async function verifySubscription(): Promise<SubscriptionStatus> {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.access_token) return null

    const res = await fetch('/api/verify-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
    })

    if (!res.ok) return null
    const data = await res.json()
    return (data.status as SubscriptionStatus) || null
  } catch {
    return null
  }
}

export async function pollSubscriptionStatus(userId: string, maxAttempts = 10): Promise<boolean> {
  const verified = await verifySubscription()
  if (verified === 'active' || verified === 'trialing') return true

  for (let i = 0; i < maxAttempts; i++) {
    const status = await fetchSubscriptionStatus(userId)
    if (status === 'active' || status === 'trialing') return true
    await new Promise((r) => setTimeout(r, 2000))
  }
  return false
}
