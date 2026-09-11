import { supabase } from './supabase'

export type InviteCode = {
  code: string
  label: string
  max_uses: number
  used_count: number
  created_at: string
  expires_at: string | null
  active: boolean
}

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = 'CTC-'
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

const LOCAL_KEY = 'ctc_invite_codes'

function getLocalCodes(): InviteCode[] {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]')
  } catch {
    return []
  }
}

function saveLocalCodes(codes: InviteCode[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(codes))
}

export async function createInviteCode(label: string, maxUses = 1, expiresAt: string | null = null): Promise<InviteCode> {
  const code: InviteCode = {
    code: generateCode(),
    label,
    max_uses: maxUses,
    used_count: 0,
    created_at: new Date().toISOString(),
    expires_at: expiresAt,
    active: true,
  }

  try {
    await supabase.from('invite_codes').insert({
      code: code.code,
      label: code.label,
      max_uses: code.max_uses,
      used_count: 0,
      expires_at: code.expires_at,
      active: true,
    })
  } catch {
    // table may not exist yet — localStorage fallback
  }

  const local = getLocalCodes()
  local.push(code)
  saveLocalCodes(local)

  return code
}

export async function listInviteCodes(): Promise<InviteCode[]> {
  try {
    const { data } = await supabase
      .from('invite_codes')
      .select('*')
      .order('created_at', { ascending: false })
    if (data && data.length > 0) {
      saveLocalCodes(data)
      return data
    }
  } catch {
    // fall through to local
  }
  return getLocalCodes().sort((a, b) => b.created_at.localeCompare(a.created_at))
}

export async function validateInviteCode(code: string): Promise<{ valid: boolean; error?: string }> {
  const upperCode = code.trim().toUpperCase()

  try {
    const { data } = await supabase
      .from('invite_codes')
      .select('*')
      .eq('code', upperCode)
      .single()

    if (data) {
      if (!data.active) return { valid: false, error: 'This code has been deactivated.' }
      if (data.expires_at && new Date(data.expires_at) < new Date()) return { valid: false, error: 'This code has expired.' }
      if (data.used_count >= data.max_uses) return { valid: false, error: 'This code has already been used.' }
      return { valid: true }
    }
  } catch {
    // table may not exist — check local
  }

  const local = getLocalCodes()
  const found = local.find((c) => c.code === upperCode)
  if (!found) return { valid: false, error: 'Invalid invite code.' }
  if (!found.active) return { valid: false, error: 'This code has been deactivated.' }
  if (found.expires_at && new Date(found.expires_at) < new Date()) return { valid: false, error: 'This code has expired.' }
  if (found.used_count >= found.max_uses) return { valid: false, error: 'This code has already been used.' }
  return { valid: true }
}

export async function redeemInviteCode(code: string, userId: string): Promise<boolean> {
  const upperCode = code.trim().toUpperCase()

  try {
    await supabase.rpc('redeem_invite_code', { code_input: upperCode })
  } catch {
    // RPC may not exist — update locally
    const local = getLocalCodes()
    const found = local.find((c) => c.code === upperCode)
    if (found) {
      found.used_count += 1
      saveLocalCodes(local)
    }
  }

  try {
    await supabase
      .from('profiles')
      .update({ subscription_status: 'active', subscription_source: 'invite' })
      .eq('id', userId)
  } catch {
    // profile table might not have subscription_source column yet — try without it
    try {
      await supabase
        .from('profiles')
        .update({ subscription_status: 'active' })
        .eq('id', userId)
    } catch {
      // worst case — will show as free until DB is set up
    }
  }

  return true
}

export async function deactivateInviteCode(code: string): Promise<void> {
  try {
    await supabase.from('invite_codes').update({ active: false }).eq('code', code)
  } catch {
    // table may not exist
  }

  const local = getLocalCodes()
  const found = local.find((c) => c.code === code)
  if (found) {
    found.active = false
    saveLocalCodes(local)
  }
}
