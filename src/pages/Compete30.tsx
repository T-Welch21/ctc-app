import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { ChevronLeft, Dumbbell, BookOpen, Droplets, Swords, BookOpenCheck, Salad, Check, RotateCcw, Trophy, ArrowRight, Shield } from 'lucide-react'
import {
  getCompete30State, enrollCompete30, resetCompete30, toggleDayLog,
  getCompete30Days, getCurrentStreak, getTodayDayNumber, getDayStatus,
  type DayStatus,
} from '../lib/compete30'
import { getWaterIntake } from '../lib/storage'

const RULES = [
  { key: 'trained', label: 'Train', desc: '6x/week — Sundays off', icon: Dumbbell, link: '/training', auto: true },
  { key: 'journal', label: 'Journal', desc: '1 entry per day', icon: BookOpen, link: '/journal', auto: true },
  { key: 'water', label: 'Hydrate', desc: '1 gallon (16 cups)', icon: Droplets, link: '/dashboard', auto: true },
  { key: 'challengeCompleted', label: 'Daily Challenge', desc: 'Accept & complete it', icon: Swords, link: '/dashboard', auto: false },
  { key: 'reading', label: 'Read', desc: '10 min personal development', icon: BookOpenCheck, link: null, auto: false },
  { key: 'cleanDiet', label: 'Clean Diet', desc: 'No junk, no alcohol, eat with purpose', icon: Salad, link: null, auto: false },
] as const

function getRuleComplete(day: DayStatus, key: string): boolean {
  switch (key) {
    case 'trained': return day.trained
    case 'journal': return day.journaled
    case 'water': return day.waterGoalMet
    case 'challengeCompleted': return day.challengeCompleted
    case 'reading': return day.reading
    case 'cleanDiet': return day.cleanDiet
    default: return false
  }
}

function getRuleDetail(day: DayStatus, key: string, userId: string): string | null {
  switch (key) {
    case 'trained':
      if (day.isSunday) return 'Rest day — auto-complete'
      return null
    case 'water': {
      const cups = getWaterIntake(userId, day.date)
      return `${cups}/16 cups`
    }
    default: return null
  }
}

export default function Compete30() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [, setTick] = useState(0)
  const refresh = () => setTick(t => t + 1)

  if (!user) return null

  const state = getCompete30State(user.id)

  if (!state.enrolled) {
    return <EnrollScreen onEnroll={() => { enrollCompete30(user.id, new Date().toISOString().split('T')[0]); refresh() }} onBack={() => navigate(-1)} />
  }

  const days = getCompete30Days(user.id)
  const dayNumber = getTodayDayNumber(state)
  const streak = getCurrentStreak(days)
  const completedDays = days.filter(d => d.allComplete && !d.isFuture).length
  const today = days.find(d => d.isToday)
  const todayStatus = today || getDayStatus(user.id, new Date().toISOString().split('T')[0], dayNumber, state)

  const challengeOver = dayNumber === 0 && days.length > 0
  const challengeComplete = completedDays === 30

  const handleToggle = (field: 'challengeCompleted' | 'reading' | 'cleanDiet') => {
    toggleDayLog(user.id, new Date().toISOString().split('T')[0], field)
    refresh()
  }

  const handleRestart = () => {
    if (confirm('Start over from Day 1? Your history will reset.')) {
      resetCompete30(user.id, new Date().toISOString().split('T')[0])
      refresh()
    }
  }

  return (
    <div className="min-h-screen pb-28 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(179,255,29,0.04)_0%,transparent_50%)]" />

      {/* Header */}
      <div className="relative px-5 pt-14 pb-2">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-bg-card border border-border flex items-center justify-center mb-4">
          <ChevronLeft size={18} className="text-text-secondary" />
        </button>
        <div className="flex items-center gap-2 mb-1">
          <Shield size={18} className="text-lime" />
          <h1 className="font-display font-bold text-2xl tracking-tight">The 30 Reset</h1>
        </div>
        <p className="text-text-muted text-xs uppercase tracking-[0.2em] font-bold">30 Days · 6 Rules · No Exceptions</p>
      </div>

      {/* Completion Screen */}
      {challengeComplete && (
        <div className="px-5 mt-6 mb-6">
          <div className="rounded-2xl bg-lime/[0.06] border border-lime/20 p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(179,255,29,0.08)_0%,transparent_70%)]" />
            <div className="relative">
              <Trophy size={48} className="text-lime mx-auto mb-4 drop-shadow-[0_0_20px_rgba(179,255,29,0.4)]" />
              <h2 className="font-display font-bold text-2xl mb-2">Reset Complete</h2>
              <p className="text-text-secondary text-sm mb-1">You did what most won't.</p>
              <p className="text-text-secondary text-sm mb-4">30 days. No excuses. No exceptions.</p>
              <p className="text-lime font-display font-bold text-lg">You competed.</p>
            </div>
          </div>
        </div>
      )}

      {/* Challenge Over (past 30 days but didn't finish) */}
      {challengeOver && !challengeComplete && (
        <div className="px-5 mt-6 mb-6">
          <div className="rounded-2xl bg-bg-card border border-border p-6 text-center">
            <p className="text-text-secondary text-sm mb-4">Your 30 days are up. You completed <span className="text-lime font-bold">{completedDays}</span> out of 30.</p>
            <button onClick={handleRestart} className="bg-lime text-bg font-display font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-xl active:scale-[0.97] transition-transform">
              Go Again
            </button>
          </div>
        </div>
      )}

      {/* Day Counter */}
      {!challengeOver && (
        <div className="px-5 mt-4 mb-6">
          <div className="rounded-2xl bg-bg-card/80 border border-border p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-lime/20 to-transparent" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted mb-1">Current Day</p>
                <p className="font-display font-bold text-5xl tracking-tight text-lime">{dayNumber}</p>
                <p className="text-text-muted text-xs mt-1">of 30</p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">Today</p>
                  <p className="font-display font-bold text-2xl">
                    <span className={todayStatus.completedCount === 6 ? 'text-lime' : ''}>{todayStatus.completedCount}</span>
                    <span className="text-text-muted">/6</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">Streak</p>
                  <p className="font-display font-bold text-lg">{streak} <span className="text-text-muted text-xs">days</span></p>
                </div>
              </div>
            </div>
            {/* Progress bar */}
            <div className="mt-4 h-2 rounded-full bg-white/[0.04] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-lime to-cyan-400 transition-all duration-700"
                style={{ width: `${(dayNumber / 30) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[8px] text-text-muted uppercase tracking-wider">Day 1</span>
              <span className="text-[8px] text-text-muted uppercase tracking-wider">Day 30</span>
            </div>
          </div>
        </div>
      )}

      {/* Today's Rules */}
      {!challengeOver && (
        <div className="px-5 mb-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted mb-3">Today's Rules</p>
          <div className="space-y-2.5">
            {RULES.map((rule) => {
              const complete = getRuleComplete(todayStatus, rule.key)
              const detail = getRuleDetail(todayStatus, rule.key, user.id)
              const Icon = rule.icon
              const isManual = !rule.auto

              return (
                <div
                  key={rule.key}
                  className={`rounded-xl border p-3.5 transition-all relative overflow-hidden ${
                    complete
                      ? 'bg-lime/[0.04] border-lime/15'
                      : 'bg-bg-card/80 border-border'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      complete ? 'bg-lime/10' : 'bg-white/[0.04]'
                    }`}>
                      {complete ? (
                        <Check size={18} className="text-lime" />
                      ) : (
                        <Icon size={18} className="text-text-muted" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-display font-bold text-sm ${complete ? 'text-lime' : 'text-text'}`}>
                        {rule.label}
                      </p>
                      <p className="text-text-muted text-xs">
                        {detail || rule.desc}
                      </p>
                    </div>
                    {isManual && !complete && (
                      <button
                        onClick={() => handleToggle(rule.key as 'challengeCompleted' | 'reading' | 'cleanDiet')}
                        className="w-8 h-8 rounded-lg border border-border bg-white/[0.02] flex items-center justify-center hover:bg-white/[0.06] transition-colors shrink-0"
                      >
                        <Check size={14} className="text-text-muted" />
                      </button>
                    )}
                    {isManual && complete && (
                      <button
                        onClick={() => handleToggle(rule.key as 'challengeCompleted' | 'reading' | 'cleanDiet')}
                        className="w-8 h-8 rounded-lg bg-lime/10 flex items-center justify-center shrink-0"
                      >
                        <Check size={14} className="text-lime" />
                      </button>
                    )}
                    {rule.auto && !complete && rule.link && (
                      <button
                        onClick={() => navigate(rule.link)}
                        className="text-[9px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-400/[0.08] px-3 py-1.5 rounded-lg shrink-0"
                      >
                        Go <ArrowRight size={10} className="inline ml-0.5" />
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* 30-Day Calendar */}
      <div className="px-5 mb-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted mb-3">Your 30 Days</p>
        <div className="rounded-2xl bg-bg-card/80 border border-border p-4">
          <div className="grid grid-cols-7 gap-2">
            {days.map((day) => (
              <div
                key={day.dayNumber}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-center transition-all ${
                  day.allComplete
                    ? 'bg-lime/[0.12] border border-lime/20'
                    : day.isToday
                    ? 'bg-cyan-400/[0.08] border border-cyan-400/20'
                    : day.isFuture
                    ? 'bg-white/[0.02] border border-transparent'
                    : day.completedCount > 0
                    ? 'bg-white/[0.04] border border-border'
                    : 'bg-white/[0.02] border border-transparent'
                }`}
              >
                <span className={`text-xs font-bold ${
                  day.allComplete ? 'text-lime' : day.isToday ? 'text-cyan-400' : day.isFuture ? 'text-text-muted/40' : 'text-text-secondary'
                }`}>
                  {day.dayNumber}
                </span>
                {day.allComplete && <Check size={8} className="text-lime mt-0.5" />}
                {!day.allComplete && !day.isFuture && day.completedCount > 0 && (
                  <span className="text-[7px] text-text-muted mt-0.5">{day.completedCount}/6</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 mb-6">
        <div className="grid grid-cols-3 gap-2.5">
          <div className="rounded-xl bg-bg-card/80 border border-border p-3 text-center">
            <p className="font-display font-bold text-xl text-lime">{completedDays}</p>
            <p className="text-[9px] text-text-muted uppercase tracking-wider font-bold mt-0.5">Perfect Days</p>
          </div>
          <div className="rounded-xl bg-bg-card/80 border border-border p-3 text-center">
            <p className="font-display font-bold text-xl">{streak}</p>
            <p className="text-[9px] text-text-muted uppercase tracking-wider font-bold mt-0.5">Day Streak</p>
          </div>
          <div className="rounded-xl bg-bg-card/80 border border-border p-3 text-center">
            <p className="font-display font-bold text-xl">{state.resetCount}</p>
            <p className="text-[9px] text-text-muted uppercase tracking-wider font-bold mt-0.5">{state.resetCount === 1 ? 'Restart' : 'Restarts'}</p>
          </div>
        </div>
      </div>

      {/* Restart */}
      {!challengeOver && (
        <div className="px-5 mb-8">
          <button
            onClick={handleRestart}
            className="w-full py-3 rounded-xl border border-border bg-white/[0.02] text-text-muted text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white/[0.04] transition-colors active:scale-[0.98]"
          >
            <RotateCcw size={14} />
            Restart from Day 1
          </button>
          <p className="text-center text-text-muted/60 text-[10px] mt-2">Champions don't quit. They restart.</p>
        </div>
      )}
    </div>
  )
}

function EnrollScreen({ onEnroll, onBack }: { onEnroll: () => void; onBack: () => void }) {
  const rules = [
    { icon: Dumbbell, label: 'Train', desc: 'Complete your CTC workout 6x/week — Sundays off' },
    { icon: BookOpen, label: 'Journal', desc: '1 entry per day — morning or evening' },
    { icon: Droplets, label: 'Hydrate', desc: 'Drink 1 gallon of water (16 cups)' },
    { icon: Swords, label: 'Daily Challenge', desc: 'Accept and complete it' },
    { icon: BookOpenCheck, label: 'Read', desc: '10 minutes of personal development' },
    { icon: Salad, label: 'Clean Diet', desc: 'No junk food, no alcohol, eat with purpose' },
  ]

  return (
    <div className="min-h-screen pb-28 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(179,255,29,0.06)_0%,transparent_50%)]" />

      <div className="relative px-5 pt-14">
        <button onClick={onBack} className="w-9 h-9 rounded-xl bg-bg-card border border-border flex items-center justify-center mb-6">
          <ChevronLeft size={18} className="text-text-secondary" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-lime/[0.08] border border-lime/15 flex items-center justify-center mx-auto mb-5">
            <Shield size={32} className="text-lime drop-shadow-[0_0_15px_rgba(179,255,29,0.3)]" />
          </div>
          <h1 className="font-display font-bold text-3xl tracking-tight mb-2">The 30 Reset</h1>
          <p className="text-text-muted text-xs uppercase tracking-[0.25em] font-bold">30 Days · 6 Rules · No Exceptions</p>
        </div>

        <div className="rounded-2xl bg-bg-card/80 border border-border p-5 mb-6">
          <p className="text-text-secondary text-sm leading-relaxed mb-5">
            Every day for 30 days, you follow 6 non-negotiable rules. Miss a rule? Start over from Day 1. This isn't about perfection — it's about discipline.
          </p>

          <div className="space-y-3">
            {rules.map((rule, i) => {
              const Icon = rule.icon
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-lime/[0.06] flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-lime" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-sm">{rule.label}</p>
                    <p className="text-text-muted text-xs">{rule.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-2xl bg-white/[0.02] border border-border p-4 mb-8 text-center">
          <p className="text-text-secondary text-xs italic leading-relaxed">
            "Discipline is choosing between what you want now and what you want most."
          </p>
        </div>

        <button
          onClick={onEnroll}
          className="w-full py-4 rounded-2xl bg-lime text-bg font-display font-bold text-base uppercase tracking-wider active:scale-[0.97] transition-transform shadow-[0_0_30px_rgba(179,255,29,0.15)]"
        >
          I'm In — Start Day 1
        </button>
        <p className="text-center text-text-muted/60 text-[10px] mt-3 mb-8">Your 30 days start today</p>
      </div>
    </div>
  )
}
