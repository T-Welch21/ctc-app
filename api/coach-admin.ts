import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

const COACH_EMAILS = ['tyler21welch@gmail.com', 'test@ctctest.com']

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'authorization, content-type')
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: 'Missing authorization' })
  }

  const token = authHeader.replace('Bearer ', '')
  const anonClient = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_ANON_KEY!
  )
  const { data: { user }, error: authError } = await anonClient.auth.getUser(token)

  if (authError || !user || !COACH_EMAILS.includes(user.email || '')) {
    return res.status(403).json({ error: 'Not authorized' })
  }

  const { action, athlete_id } = req.body || {}

  if (action === 'grant_access') {
    const { error } = await supabase
      .from('profiles')
      .update({ subscription_status: 'active', subscription_source: 'coach' })
      .eq('id', athlete_id)
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ ok: true })
  }

  if (action === 'revoke_access') {
    const { error } = await supabase
      .from('profiles')
      .update({ subscription_status: null, subscription_source: null })
      .eq('id', athlete_id)
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ ok: true })
  }

  return res.status(400).json({ error: 'Unknown action' })
}
