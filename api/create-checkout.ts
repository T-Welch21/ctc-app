import type { VercelRequest, VercelResponse } from '@vercel/node'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// $39/mo standard price, on the same product as the founding price.
// Found by lookup key, and created on first use so no dashboard setup is needed.
const STANDARD_LOOKUP_KEY = 'ctc_premium_monthly_39'

async function getStandardPriceId(): Promise<string> {
  if (process.env.STRIPE_STANDARD_PRICE_ID) return process.env.STRIPE_STANDARD_PRICE_ID

  const existing = await stripe.prices.list({ lookup_keys: [STANDARD_LOOKUP_KEY], active: true, limit: 1 })
  if (existing.data[0]) return existing.data[0].id

  const founding = await stripe.prices.retrieve(process.env.STRIPE_PRICE_ID!)
  const created = await stripe.prices.create({
    product: typeof founding.product === 'string' ? founding.product : founding.product.id,
    currency: founding.currency,
    unit_amount: 3900,
    recurring: { interval: 'month' },
    lookup_key: STANDARD_LOOKUP_KEY,
    nickname: 'CTC Premium $39/mo',
  })
  return created.id
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', 'https://calledtocompete.app')
    res.setHeader('Access-Control-Allow-Headers', 'authorization, content-type')
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ error: 'Missing authorization header' })
    }

    const token = authHeader.replace('Bearer ', '')
    const anonClient = createClient(
      process.env.VITE_SUPABASE_URL!,
      process.env.VITE_SUPABASE_ANON_KEY!
    )
    const { data: { user }, error: authError } = await anonClient.auth.getUser(token)

    if (authError || !user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    // Founding Member window: $29 price until the deadline, then the standard price.
    // Keep in sync with FOUNDING_DEADLINE in src/lib/pricing.ts.
    const foundingDeadline = new Date('2026-10-26T05:00:00Z')
    const priceId = new Date() < foundingDeadline
      ? process.env.STRIPE_PRICE_ID!
      : await getStandardPriceId()
    const appUrl = process.env.APP_URL || 'https://calledtocompete.app'

    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, email, name')
      .eq('id', user.id)
      .single()

    let customerId = profile?.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: profile?.name || undefined,
        metadata: { supabase_user_id: user.id },
      })
      customerId = customer.id

      await supabase
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id)
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/training?checkout=success`,
      cancel_url: `${appUrl}/subscribe?checkout=canceled`,
      metadata: { supabase_user_id: user.id },
    })

    return res.status(200).json({ url: session.url })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error'
    return res.status(500).json({ error: message })
  }
}
