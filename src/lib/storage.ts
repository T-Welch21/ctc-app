import { syncJournalEntry, syncWeight, syncCompletedSession, syncCheckIn, syncPR } from './sync'

export type JournalEntry = {
  date: string
  timeOfDay: 'morning' | 'evening'
  energy: number
  mind: number
  checkedItems: number[]
  gratitude: string
  affirmation: string
  topGoal?: string
  visualization?: string
  winOfDay?: string
  improvement?: string
  eveningGratitude?: string
  dayRating?: number
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

export type FoodEntry = {
  id: string
  date: string
  time: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

export function getFoodEntries(userId: string, date?: string): FoodEntry[] {
  try {
    const key = getKey(userId, 'food')
    const raw = localStorage.getItem(key)
    const entries: FoodEntry[] = raw ? JSON.parse(raw) : []
    if (date) return entries.filter((e) => e.date === date)
    return entries
  } catch {
    return []
  }
}

export function saveFoodEntry(userId: string, entry: Omit<FoodEntry, 'id'>) {
  const key = getKey(userId, 'food')
  const entries = getFoodEntries(userId)
  entries.push({ ...entry, id: crypto.randomUUID() })
  localStorage.setItem(key, JSON.stringify(entries))
}

export function deleteFoodEntry(userId: string, entryId: string) {
  const key = getKey(userId, 'food')
  const entries = getFoodEntries(userId).filter((e) => e.id !== entryId)
  localStorage.setItem(key, JSON.stringify(entries))
}

export function getMacroGoals(userId: string) {
  try {
    const raw = localStorage.getItem(getKey(userId, 'macro_goals'))
    return raw ? JSON.parse(raw) : { calories: 2500, protein: 180, carbs: 280, fat: 80 }
  } catch {
    return { calories: 2500, protein: 180, carbs: 280, fat: 80 }
  }
}

export function saveMacroGoals(userId: string, goals: { calories: number; protein: number; carbs: number; fat: number }) {
  localStorage.setItem(getKey(userId, 'macro_goals'), JSON.stringify(goals))
}

export type BodyStats = {
  age: number
  gender: 'male' | 'female'
  heightFt: number
  heightIn: number
  weightLbs: number
  activity: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
  nutritionGoal: 'lose' | 'gain' | 'maintain'
}

export function getBodyStats(userId: string): BodyStats | null {
  try {
    const raw = localStorage.getItem(getKey(userId, 'body_stats'))
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveBodyStats(userId: string, stats: BodyStats) {
  localStorage.setItem(getKey(userId, 'body_stats'), JSON.stringify(stats))
}

export function calculateMacros(stats: BodyStats) {
  const weightKg = stats.weightLbs * 0.453592
  const heightCm = (stats.heightFt * 12 + stats.heightIn) * 2.54
  const bmr = stats.gender === 'male'
    ? 10 * weightKg + 6.25 * heightCm - 5 * stats.age + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * stats.age - 161
  const multipliers = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 }
  const tdee = Math.round(bmr * multipliers[stats.activity])
  let calories: number
  let proteinPct: number, carbsPct: number, fatPct: number
  if (stats.nutritionGoal === 'lose') {
    calories = tdee - 500
    proteinPct = 0.40; carbsPct = 0.30; fatPct = 0.30
  } else if (stats.nutritionGoal === 'gain') {
    calories = tdee + 400
    proteinPct = 0.30; carbsPct = 0.45; fatPct = 0.25
  } else {
    calories = tdee
    proteinPct = 0.30; carbsPct = 0.40; fatPct = 0.30
  }
  return {
    calories: Math.round(calories),
    protein: Math.round((calories * proteinPct) / 4),
    carbs: Math.round((calories * carbsPct) / 4),
    fat: Math.round((calories * fatPct) / 9),
  }
}

export function getWaterIntake(userId: string, date?: string): number {
  try {
    const d = date || new Date().toISOString().split('T')[0]
    const raw = localStorage.getItem(getKey(userId, `water_${d}`))
    return raw ? parseInt(raw) : 0
  } catch {
    return 0
  }
}

export function saveWaterIntake(userId: string, cups: number, date?: string) {
  const d = date || new Date().toISOString().split('T')[0]
  localStorage.setItem(getKey(userId, `water_${d}`), cups.toString())
}

export function getSelectedProgramId(userId: string): string | null {
  return localStorage.getItem(`ctc_selected_program_${userId}`)
}

export function setSelectedProgramId(userId: string, programId: string) {
  localStorage.setItem(`ctc_selected_program_${userId}`, programId)
}
