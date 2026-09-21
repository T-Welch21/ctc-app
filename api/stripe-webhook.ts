import type { VercelRequest, VercelResponse } from '@vercel/node'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const config = {
  api: { bodyParser: false },
}

async function getRawBody(req: VercelRequest): Promise<Buffer> {
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

async function syncToWebsiteLedger(data: {
  amount: number
  description: string
  stripe_payment_id: string
  date: string
  category: string
}) {
  const syncKey = process.env.WEBSITE_SYNC_KEY
  if (!syncKey) return

  try {
    await fetch('https://calledtocompete.net/api/app-sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Sync-Key': syncKey,
      },
      body: JSON.stringify(data),
    })
  } catch {
    // Non-blocking — ledger sync failure should not break webhook processing
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const signature = req.headers['stripe-signature'] as string
  const rawBody = await getRawBody(req)

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Signature verification failed'
    return res.status(400).json({ error: message })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.supabase_user_id
      if (userId && session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
        await supabase
          .from('profiles')
          .update({
            subscription_status: subscription.status,
            subscription_id: subscription.id,
            trial_end: subscription.trial_end
              ? new Date(subscription.trial_end * 1000).toISOString()
              : null,
          })
          .eq('id', userId)
      }
      break
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice
      const customerId = invoice.customer as string
      const amountPaid = (invoice.amount_paid || 0) / 100

      if (amountPaid > 0) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('id, name, email')
          .eq('stripe_customer_id', customerId)
          .single()

        if (profile) {
          const name = profile.name || profile.email || 'App Subscriber'
          const today = new Date().toISOString().split('T')[0]

          await syncToWebsiteLedger({
            amount: amountPaid,
            description: `CTC App — ${name} ($${amountPaid.toFixed(2)}/mo)`,
            stripe_payment_id: invoice.id || `inv_${Date.now()}`,
            date: today,
            category: 'App Subscription',
          })
        }
      }
      break
    }

    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single()

      if (profile) {
        await supabase
          .from('profiles')
          .update({
            subscription_status: subscription.status,
            subscription_id: subscription.id,
            trial_end: subscription.trial_end
              ? new Date(subscription.trial_end * 1000).toISOString()
              : null,
          })
          .eq('id', profile.id)
      }
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      const customerId = invoice.customer as string
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single()

      if (profile) {
        await supabase
          .from('profiles')
          .update({ subscription_status: 'past_due' })
          .eq('id', profile.id)
      }
      break
    }
  }

  return res.status(200).json({ received: true })
}
