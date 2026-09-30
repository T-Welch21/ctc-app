import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function buildEmail(name: string) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:480px;margin:0 auto;padding:40px 24px;">

    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="color:#B3FF1D;font-size:28px;font-weight:800;margin:0 0 8px;">Called to Compete</h1>
      <p style="color:#A0A0A0;font-size:12px;letter-spacing:3px;text-transform:uppercase;margin:0;">Compete Harder · Train Smarter · Feel Better</p>
    </div>

    <div style="background:#141414;border:1px solid #2A2A2A;border-radius:16px;padding:32px 24px;margin-bottom:24px;">
      <h2 style="color:#F5F5F0;font-size:22px;font-weight:700;margin:0 0 12px;">Welcome${name ? `, ${name}` : ''}.</h2>
      <p style="color:#A0A0A0;font-size:15px;line-height:1.6;margin:0 0 24px;">
        You're in. Your training, journal, nutrition tracking, and everything Coach Tyler builds — it's all yours now.
      </p>
      <p style="color:#A0A0A0;font-size:15px;line-height:1.6;margin:0;">
        One quick thing — <strong style="color:#F5F5F0;">save the app to your home screen</strong> so it opens like a real app, full screen, no browser bars.
      </p>
    </div>

    <div style="background:#141414;border:1px solid #2A2A2A;border-radius:16px;padding:24px;margin-bottom:16px;">
      <h3 style="color:#B3FF1D;font-size:14px;font-weight:700;margin:0 0 16px;text-transform:uppercase;letter-spacing:1px;">iPhone</h3>
      <ol style="color:#F5F5F0;font-size:14px;line-height:1.8;margin:0;padding-left:20px;">
        <li>Open <strong style="color:#B3FF1D;">calledtocompete.app</strong> in Safari</li>
        <li>Tap the <strong>Share</strong> button (square with arrow at the bottom)</li>
        <li>Scroll down and tap <strong>"Add to Home Screen"</strong></li>
        <li>Tap <strong>"Add"</strong> in the top right</li>
      </ol>
    </div>

    <div style="background:#141414;border:1px solid #2A2A2A;border-radius:16px;padding:24px;margin-bottom:32px;">
      <h3 style="color:#B3FF1D;font-size:14px;font-weight:700;margin:0 0 16px;text-transform:uppercase;letter-spacing:1px;">Android</h3>
      <ol style="color:#F5F5F0;font-size:14px;line-height:1.8;margin:0;padding-left:20px;">
        <li>Open <strong style="color:#B3FF1D;">calledtocompete.app</strong> in Chrome</li>
        <li>Tap the <strong>three dots</strong> menu (top right)</li>
        <li>Tap <strong>"Add to Home screen"</strong></li>
        <li>Tap <strong>"Add"</strong></li>
      </ol>
    </div>

    <div style="text-align:center;margin-bottom:32px;">
      <a href="https://calledtocompete.app" style="display:inline-block;background:#B3FF1D;color:#000;font-size:16px;font-weight:700;text-decoration:none;padding:14px 40px;border-radius:12px;text-transform:uppercase;letter-spacing:1px;">Open CTC App</a>
    </div>

    <div style="text-align:center;border-top:1px solid #2A2A2A;padding-top:24px;">
      <p style="color:#666;font-size:12px;margin:0 0 4px;">Called to Compete — Coach Tyler Welch</p>
      <p style="color:#666;font-size:12px;margin:0;">San Antonio, TX</p>
    </div>
  </div>
</body>
</html>`
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
      return res.status(401).json({ error: 'Missing authorization' })
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

    const { name } = req.body || {}
    const email = user.email
    if (!email) {
      return res.status(400).json({ error: 'No email' })
    }

    const resendKey = process.env.RESEND_API_KEY
    if (!resendKey) {
      return res.status(200).json({ sent: false, reason: 'Email not configured' })
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || 'Called to Compete <onboarding@resend.dev>',
        to: email,
        subject: 'Welcome to Called to Compete — Save Your App',
        html: buildEmail(name || ''),
      }),
    })

    if (!response.ok) {
      const err = await response.json()
      return res.status(200).json({ sent: false, reason: err.message })
    }

    return res.status(200).json({ sent: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error'
    return res.status(500).json({ error: message })
  }
}
