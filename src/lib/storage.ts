export type JournalEntry = {
  date: string
  timeOfDay: 'morning' | 'evening'
  energy: number
  mind: number
  checkedItems: number[]
  gratitude: string
  affirmation: string
}

export type WeightEntry = {
  date: string
  weight: number
}

export type CompletedSession = {
  date: string
  dayIndex: number
  programId: string
  completedSets: Record<string, number[]>
}

function getKey(userId: string, type: string) {
  return `ctc_${type}_${userId}`
}

export function saveJournalEntry(userId: string, entry: JournalEntry) {
  const key = getKey(userId, 'journal')
  const entries = getJournalEntries(userId)
  const existingIdx = entries.findIndex(
    (e) => e.date === entry.date && e.timeOfDay === entry.timeOfDay
  )
  if (existingIdx >= 0) {
    entries[existingIdx] = entry
  } else {
    entries.push(entry)
  }
  localStorage.setItem(key, JSON.stringify(entries))
}

export function getJournalEntries(userId: string): JournalEntry[] {
  try {
    const key = getKey(userId, 'journal')
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveWeight(userId: string, entry: WeightEntry) {
  const key = getKey(userId, 'weights')
  const entries = getWeights(userId)
  const existingIdx = entries.findIndex((e) => e.date === entry.date)
  if (existingIdx >= 0) {
    entries[existingIdx] = entry
  } else {
    entries.push(entry)
  }
  entries.sort((a, b) => a.date.localeCompare(b.date))
  localStorage.setItem(key, JSON.stringify(entries))
}

export function getWeights(userId: string): WeightEntry[] {
  try {
    const key = getKey(userId, 'weights')
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveCompletedSession(userId: string, session: CompletedSession) {
  const key = getKey(userId, 'sessions')
  const sessions = getCompletedSessions(userId)
  sessions.push(session)
  localStorage.setItem(key, JSON.stringify(sessions))
}

export function getCompletedSessions(userId: string): CompletedSession[] {
  try {
    const key = getKey(userId, 'sessions')
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function getStreak(userId: string): number {
  const sessions = getCompletedSessions(userId)
  if (sessions.length === 0) return 0

  const dates = [...new Set(sessions.map((s) => s.date))].sort().reverse()
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

  if (dates[0] !== today && dates[0] !== yesterday) return 0

  let streak = 1
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1])
    const curr = new Date(dates[i])
    const diff = (prev.getTime() - curr.getTime()) / 86400000
    if (diff === 1) streak++
    else break
  }
  return streak
}
