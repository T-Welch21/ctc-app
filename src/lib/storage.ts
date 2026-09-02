import { syncJournalEntry, syncWeight, syncCompletedSession, syncCheckIn, syncPR } from './sync'

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

export type CheckInEntry = {
  date: string
  sessions: number
  nutrition: number
  sleep: number
  energy: number
  wins: string
  struggles: string
  goals: string
}

export type PREntry = {
  lift: string
  value: string
  date: string
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
  syncJournalEntry(userId, entry)
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
  syncWeight(userId, entry)
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
  syncCompletedSession(userId, session)
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

export function saveCheckIn(userId: string, entry: CheckInEntry) {
  const key = getKey(userId, 'checkins')
  const entries = getCheckIns(userId)
  const idx = entries.findIndex((e) => e.date === entry.date)
  if (idx >= 0) entries[idx] = entry
  else entries.push(entry)
  entries.sort((a, b) => b.date.localeCompare(a.date))
  localStorage.setItem(key, JSON.stringify(entries))
  syncCheckIn(userId, entry)
}

export function getCheckIns(userId: string): CheckInEntry[] {
  try {
    const key = getKey(userId, 'checkins')
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function savePR(userId: string, entry: PREntry) {
  const key = `ctc_prs_${userId}`
  const prs = getPRs(userId)
  const idx = prs.findIndex((p) => p.lift === entry.lift)
  if (idx >= 0) prs[idx] = entry
  else prs.push(entry)
  localStorage.setItem(key, JSON.stringify(prs))
  syncPR(userId, entry.lift, entry.value, entry.date)
}

export function getPRs(userId: string): PREntry[] {
  try {
    const raw = localStorage.getItem(`ctc_prs_${userId}`)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export type ExerciseNote = {
  date: string
  dayIndex: number
  exerciseName: string
  weight: string
  notes: string
}

export function saveExerciseNote(userId: string, note: ExerciseNote) {
  const key = getKey(userId, 'exercise_notes')
  const notes = getExerciseNotes(userId)
  const idx = notes.findIndex(
    (n) => n.date === note.date && n.dayIndex === note.dayIndex && n.exerciseName === note.exerciseName
  )
  if (idx >= 0) notes[idx] = note
  else notes.push(note)
  localStorage.setItem(key, JSON.stringify(notes))
}

export function getExerciseNotes(userId: string): ExerciseNote[] {
  try {
    const key = getKey(userId, 'exercise_notes')
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function getExerciseNotesForDay(userId: string, date: string, dayIndex: number): ExerciseNote[] {
  return getExerciseNotes(userId).filter((n) => n.date === date && n.dayIndex === dayIndex)
}

export function getLastNoteForExercise(userId: string, exerciseName: string): ExerciseNote | null {
  const notes = getExerciseNotes(userId).filter((n) => n.exerciseName === exerciseName)
  if (notes.length === 0) return null
  notes.sort((a, b) => b.date.localeCompare(a.date))
  return notes[0]
}

export function getProgramStartDate(userId: string): string {
  const key = getKey(userId, 'program_start')
  const stored = localStorage.getItem(key)
  if (stored) return stored
  const today = new Date().toISOString().split('T')[0]
  localStorage.setItem(key, today)
  return today
}

export function getCurrentWeek(userId: string, totalWeeks: number): number {
  const start = getProgramStartDate(userId)
  const startDate = new Date(start + 'T00:00:00')
  const now = new Date()
  const daysDiff = Math.floor((now.getTime() - startDate.getTime()) / 86400000)
  const week = Math.floor(daysDiff / 7) + 1
  return Math.min(week, totalWeeks)
}
