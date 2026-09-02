import { supabase } from './supabase'
import type { JournalEntry, WeightEntry, CompletedSession, CheckInEntry } from './storage'

async function tableExists(table: string): Promise<boolean> {
  try {
    const { error } = await supabase.from(table).select('id').limit(0)
    return !error
  } catch {
    return false
  }
}

let _tablesReady: boolean | null = null

async function checkTables(): Promise<boolean> {
  if (_tablesReady !== null) return _tablesReady
  _tablesReady = await tableExists('journal_entries')
  return _tablesReady
}

export async function syncJournalEntry(userId: string, entry: JournalEntry): Promise<void> {
  if (!(await checkTables())) return
  try {
    await supabase.from('journal_entries').upsert({
      user_id: userId,
      date: entry.date,
      time_of_day: entry.timeOfDay,
      energy: entry.energy,
      mind: entry.mind,
      checked_items: entry.checkedItems,
      gratitude: entry.gratitude || null,
      affirmation: entry.affirmation || null,
    }, { onConflict: 'user_id,date,time_of_day' })
  } catch { /* localStorage is the fallback */ }
}

export async function syncWeight(userId: string, entry: WeightEntry): Promise<void> {
  if (!(await checkTables())) return
  try {
    await supabase.from('weight_entries').upsert({
      user_id: userId,
      date: entry.date,
      weight: entry.weight,
    }, { onConflict: 'user_id,date' })
  } catch {}
}

export async function syncCompletedSession(userId: string, session: CompletedSession): Promise<void> {
  if (!(await checkTables())) return
  try {
    await supabase.from('completed_sessions').insert({
      user_id: userId,
      date: session.date,
      day_index: session.dayIndex,
      program_id: session.programId,
      completed_sets: session.completedSets,
    })
  } catch {}
}

export async function syncCheckIn(userId: string, entry: CheckInEntry): Promise<void> {
  if (!(await checkTables())) return
  try {
    await supabase.from('check_ins').upsert({
      user_id: userId,
      date: entry.date,
      sessions: entry.sessions,
      nutrition: entry.nutrition,
      sleep: entry.sleep,
      energy: entry.energy,
      wins: entry.wins || null,
      struggles: entry.struggles || null,
      goals: entry.goals || null,
    }, { onConflict: 'user_id,date' })
  } catch {}
}

export async function syncPR(userId: string, lift: string, value: string, date: string): Promise<void> {
  if (!(await checkTables())) return
  try {
    await supabase.from('personal_records').upsert({
      user_id: userId,
      lift,
      value,
      date,
    }, { onConflict: 'user_id,lift' })
  } catch {}
}

export async function pullFromSupabase(userId: string): Promise<{
  journals: JournalEntry[]
  weights: WeightEntry[]
  sessions: CompletedSession[]
  checkIns: CheckInEntry[]
  prs: { lift: string; value: string; date: string }[]
} | null> {
  if (!(await checkTables())) return null
  try {
    const [j, w, s, c, p] = await Promise.all([
      supabase.from('journal_entries').select('*').eq('user_id', userId).order('date', { ascending: false }),
      supabase.from('weight_entries').select('*').eq('user_id', userId).order('date', { ascending: true }),
      supabase.from('completed_sessions').select('*').eq('user_id', userId).order('date', { ascending: false }),
      supabase.from('check_ins').select('*').eq('user_id', userId).order('date', { ascending: false }),
      supabase.from('personal_records').select('*').eq('user_id', userId),
    ])

    return {
      journals: (j.data || []).map((r: Record<string, unknown>) => ({
        date: r.date as string,
        timeOfDay: r.time_of_day as 'morning' | 'evening',
        energy: r.energy as number,
        mind: r.mind as number,
        checkedItems: (r.checked_items || []) as number[],
        gratitude: (r.gratitude || '') as string,
        affirmation: (r.affirmation || '') as string,
      })),
      weights: (w.data || []).map((r: Record<string, unknown>) => ({
        date: r.date as string,
        weight: Number(r.weight),
      })),
      sessions: (s.data || []).map((r: Record<string, unknown>) => ({
        date: r.date as string,
        dayIndex: r.day_index as number,
        programId: r.program_id as string,
        completedSets: (r.completed_sets || {}) as Record<string, number[]>,
      })),
      checkIns: (c.data || []).map((r: Record<string, unknown>) => ({
        date: r.date as string,
        sessions: (r.sessions || 0) as number,
        nutrition: (r.nutrition || 5) as number,
        sleep: (r.sleep || 5) as number,
        energy: (r.energy || 5) as number,
        wins: (r.wins || '') as string,
        struggles: (r.struggles || '') as string,
        goals: (r.goals || '') as string,
      })),
      prs: (p.data || []).map((r: Record<string, unknown>) => ({
        lift: r.lift as string,
        value: r.value as string,
        date: r.date as string,
      })),
    }
  } catch {
    return null
  }
}
