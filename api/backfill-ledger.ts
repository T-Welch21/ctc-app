import type { VercelRequest, VercelResponse } from '@vercel/node'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

async function syncToWebsiteLedger(data: {
  amount: number
  description: string
  stripe_payment_id: string
  date: string
  category: string
}) {
  const syncKey = process.env.WEBSITE_SYNC_KEY
  if (!syncKey) throw new Error('WEBSITE_SYNC_KEY not configured')

  const res = await fetch('https://calledtocompete.net/api/app-sync', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Sync-Key': syncKey,
    },
    body: JSON.stringify(data),
  })
  return res.json()
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const authKey = req.headers['x-admin-key']
  if (authKey !== process.env.WEBSITE_SYNC_KEY) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, name, email, stripe_customer_id, subscription_status')
    .in('subscription_status', ['active', 'trialing'])
    .is('subscription_source', null)
    .not('stripe_customer_id', 'is', null)
    .not('email', 'eq', 'tyler21welch@gmail.com')

  if (!profiles || profiles.length === 0) {
    return res.status(200).json({ message: 'No active app subscribers found', synced: [] })
  }

  const results: Array<{ name: string; status: string; detail: unknown }> = []

  for (const profile of profiles) {
    const name = profile.name || profile.email || 'App Subscriber'

    try {
      const invoices = await stripe.invoices.list({
        customer: profile.stripe_customer_id,
        status: 'paid',
        limit: 1,
      })

      const invoice = invoices.data[0]
      if (!invoice || !invoice.amount_paid) {
        results.push({ name, status: 'skipped', detail: 'No paid invoices' })
        continue
      }

      const amountPaid = invoice.amount_paid / 100
      const paidDate = invoice.status_transitions?.paid_at
        ? new Date(invoice.status_transitions.paid_at * 1000).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0]

      const syncResult = await syncToWebsiteLedger({
        amount: amountPaid,
        description: `CTC App — ${name} ($${amountPaid.toFixed(2)}/mo)`,
        stripe_payment_id: invoice.id,
        date: paidDate,
        category: 'App Subscription',
      })

      results.push({ name, status: 'synced', detail: syncResult })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      results.push({ name, status: 'error', detail: message })
    }
  }

  return res.status(200).json({
    message: `Processed ${profiles.length} subscribers`,
    synced: results,
  })
}
