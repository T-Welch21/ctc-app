import { getCompletedSessions, getJournalEntries, getWaterIntake } from './storage'

export type Compete30DayLog = {
  challengeCompleted: boolean
  reading: boolean
  cleanDiet: boolean
}

export type Compete30State = {
  enrolled: boolean
  startDate: string
  dayLogs: Record<string, Compete30DayLog>
  resetCount: number
  completed: boolean
}

function storageKey(userId: string) {
  return `ctc_compete30_${userId}`
}

export function getCompete30State(userId: string): Compete30State {
  const raw = localStorage.getItem(storageKey(userId))
  if (!raw) return { enrolled: false, startDate: '', dayLogs: {}, resetCount: 0, completed: false }
  return JSON.parse(raw)
}

export function saveCompete30State(userId: string, state: Compete30State) {
  localStorage.setItem(storageKey(userId), JSON.stringify(state))
}

export function enrollCompete30(userId: string, startDate: string) {
  const existing = getCompete30State(userId)
  saveCompete30State(userId, {
    enrolled: true,
    startDate,
    dayLogs: {},
    resetCount: existing.resetCount,
    completed: false,
  })
}

export function resetCompete30(userId: string, newStartDate: string) {
  const existing = getCompete30State(userId)
  saveCompete30State(userId, {
    enrolled: true,
    startDate: newStartDate,
    dayLogs: {},
    resetCount: existing.resetCount + 1,
    completed: false,
  })
}

export function toggleDayLog(userId: string, date: string, field: keyof Compete30DayLog) {
  const state = getCompete30State(userId)
  const log = state.dayLogs[date] || { challengeCompleted: false, reading: false, cleanDiet: false }
  log[field] = !log[field]
  state.dayLogs[date] = log
  saveCompete30State(userId, state)
}

export type DayStatus = {
  date: string
  dayNumber: number
  trained: boolean
  isSunday: boolean
  journaled: boolean
  waterGoalMet: boolean
  challengeCompleted: boolean
  reading: boolean
  cleanDiet: boolean
  allComplete: boolean
  completedCount: number
  isFuture: boolean
  isToday: boolean
}

const WATER_GOAL_CUPS = 16

export function getDayStatus(userId: string, date: string, dayNumber: number, state: Compete30State): DayStatus {
  const today = new Date().toISOString().split('T')[0]
  const isFuture = date > today
  const isToday = date === today
  const dayOfWeek = new Date(date + 'T12:00:00').getDay()
  const isSunday = dayOfWeek === 0

  if (isFuture) {
    return {
      date, dayNumber, trained: false, isSunday, journaled: false,
      waterGoalMet: false, challengeCompleted: false, reading: false, cleanDiet: false,
      allComplete: false, completedCount: 0, isFuture: true, isToday: false,
    }
  }

  const sessions = getCompletedSessions(userId)
  const trained = isSunday ? true : sessions.some(s => s.date === date)

  const entries = getJournalEntries(userId)
  const journaled = entries.some(e => e.date === date)

  const waterCups = getWaterIntake(userId, date)
  const waterGoalMet = waterCups >= WATER_GOAL_CUPS

  const log = state.dayLogs[date] || { challengeCompleted: false, reading: false, cleanDiet: false }

  const rules = [trained, journaled, waterGoalMet, log.challengeCompleted, log.reading, log.cleanDiet]
  const completedCount = rules.filter(Boolean).length
  const allComplete = completedCount === 6

  return {
    date, dayNumber, trained, isSunday, journaled,
    waterGoalMet, challengeCompleted: log.challengeCompleted,
    reading: log.reading, cleanDiet: log.cleanDiet,
    allComplete, completedCount, isFuture, isToday,
  }
}

export function getCompete30Days(userId: string): DayStatus[] {
  const state = getCompete30State(userId)
  if (!state.enrolled || !state.startDate) return []

  const days: DayStatus[] = []
  const start = new Date(state.startDate + 'T12:00:00')

  for (let i = 0; i < 30; i++) {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    const dateStr = d.toISOString().split('T')[0]
    days.push(getDayStatus(userId, dateStr, i + 1, state))
  }

  return days
}

export function getCurrentStreak(days: DayStatus[]): number {
  let streak = 0
  for (const day of days) {
    if (day.isFuture) break
    if (day.isToday) continue
    if (day.allComplete) {
      streak++
    } else {
      streak = 0
    }
  }
  const todayDay = days.find(d => d.isToday)
  if (todayDay?.allComplete) streak++
  return streak
}

export function getTodayDayNumber(state: Compete30State): number {
  if (!state.enrolled || !state.startDate) return 0
  const start = new Date(state.startDate + 'T12:00:00')
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate())
  const diff = Math.floor((today.getTime() - startDay.getTime()) / 86400000) + 1
  if (diff < 1 || diff > 30) return 0
  return diff
}
