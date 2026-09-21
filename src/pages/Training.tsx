import { useState, useEffect } from 'react'
import { Check, Play, ChevronDown, ChevronUp, History, Dumbbell, ArrowRight, ChevronLeft, ChevronRight, Flame, Zap } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { isSubscribed, pollSubscriptionStatus } from '../lib/subscription'
import { allPrograms, getProgramById, getProgram } from '../lib/programs'
import type { Program } from '../lib/programs'
import { getCompletedSessions, getExerciseNotes, getSelectedProgramId, setSelectedProgramId } from '../lib/storage'

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

const categoryColors: Record<string, { text: string; bg: string; accent: string }> = {
  strength: { text: 'text-blue-400', bg: 'bg-blue-400/10', accent: 'from-blue-400/20 to-transparent' },
  hybrid: { text: 'text-teal-400', bg: 'bg-teal-400/10', accent: 'from-teal-400/20 to-transparent' },
  conditioning: { text: 'text-sky-400', bg: 'bg-sky-400/10', accent: 'from-sky-400/20 to-transparent' },
  functional: { text: 'text-lime', bg: 'bg-lime/10', accent: 'from-lime/20 to-transparent' },
  running: { text: 'text-cyan-400', bg: 'bg-cyan-400/10', accent: 'from-cyan-400/20 to-transparent' },
  athletic: { text: 'text-lime', bg: 'bg-lime/10', accent: 'from-lime/20 to-transparent' },
  sprint: { text: 'text-cyan-300', bg: 'bg-cyan-300/10', accent: 'from-cyan-300/20 to-transparent' },
  baseball: { text: 'text-emerald-400', bg: 'bg-emerald-400/10', accent: 'from-emerald-400/20 to-transparent' },
}

function ProgramImage({ src, alt }: { src?: string; alt: string }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  if (!src || error) return null
  return (
    <img
      src={src}
      alt={alt}
      onLoad={() => setLoaded(true)}
      onError={() => setError(true)}
      className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
    />
  )
}

function getDaysPerWeek(program: Program): number {
  const match = program.frequency.match(/(\d+)x/)
  return match ? parseInt(match[1]) : program.days.length
}

function getTotalWeeks(program: Program): number {
  if (program.weeks > 1) return program.weeks
  const dpw = getDaysPerWeek(program)
  return Math.ceil(program.days.length / dpw)
}

function useSelectedProgram(userId: string | undefined, identity: string) {
  const savedId = userId ? getSelectedProgramId(userId) : null
  if (savedId) {
    const found = getProgramById(savedId)
    if (found) return found
  }
  return getProgram(identity)
}

export default function Training() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [showProgramPicker, setShowProgramPicker] = useState(false)
  const currentProgram = useSelectedProgram(user?.id, user?.identity || '')
  const [selectedProgram, setSelectedProgram] = useState<Program>(currentProgram)
  const [showHistory, setShowHistory] = useState(false)
  const [selectedWeek, setSelectedWeek] = useState(0)
  const [checkoutPending, setCheckoutPending] = useState(searchParams.get('checkout') === 'success')

  useEffect(() => {
    if (!checkoutPending || !user) return
    searchParams.delete('checkout')
    setSearchParams(searchParams, { replace: true })
    pollSubscriptionStatus(user.id).then((subscribed) => {
      if (subscribed) window.location.reload()
      else setCheckoutPending(false)
    })
  }, [checkoutPending, user])

  if (checkoutPending) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-5">
        <div className="w-12 h-12 border-2 border-lime border-t-transparent rounded-full animate-spin" />
        <p className="font-display font-bold text-lg">Confirming subscription...</p>
        <p className="text-text-muted text-sm text-center">This may take a few seconds</p>
      </div>
    )
  }

  const subscribed = user ? isSubscribed(user) : false

  const days = selectedProgram.days
  const sessions = user ? getCompletedSessions(user.id) : []
  const todayStr = new Date().toISOString().split('T')[0]

  const daysPerWeek = getDaysPerWeek(selectedProgram)
  const totalWeeks = getTotalWeeks(selectedProgram)
  const repeating = days.length <= daysPerWeek && totalWeeks > 1
  const weekStart = repeating ? 0 : selectedWeek * daysPerWeek
  const weekDays = days.slice(weekStart, weekStart + daysPerWeek)

  const completedToday = new Set(
    sessions.filter((s) => s.date === todayStr && s.programId === selectedProgram.id).map((s) => s.dayIndex)
  )
  const completedDays = completedToday.size
  const programSessions = sessions.filter((s) => s.programId === selectedProgram.id)
  const totalProgramSessions = repeating ? daysPerWeek * totalWeeks : days.length
  const programProgress = totalProgramSessions > 0
    ? Math.min((programSessions.length / totalProgramSessions) * 100, 100)
    : 0

  const allNotes = user ? getExerciseNotes(user.id) : []
  const pastSessions = [...programSessions]
    .reverse()
    .filter((s) => s.date !== todayStr)
    .slice(0, 10)

  const uniqueDates = [...new Set(pastSessions.map((s) => s.date))]

  const cat = categoryColors[selectedProgram.category] || categoryColors.functional

  const switchProgram = (program: Program) => {
    setSelectedProgram(program)
    setSelectedWeek(0)
    if (user) setSelectedProgramId(user.id, program.id)
    setShowProgramPicker(false)
  }

  if (showProgramPicker) {
    return (
      <div className="min-h-screen pb-28 px-5 pt-14">
        <div className="animate-fade-in mb-8">
          <button
            onClick={() => setShowProgramPicker(false)}
            className="flex items-center gap-1.5 text-text-secondary hover:text-text text-sm mb-6 transition-colors"
          >
            <ChevronLeft size={16} /> Back
          </button>
          <h1 className="font-display text-3xl font-bold tracking-tight mb-2">Choose Your Program</h1>
          <p className="text-text-muted text-sm">Pick the one that matches how you want to train.</p>
        </div>

        <div className="space-y-3">
          {allPrograms.map((program, i) => {
            const isActive = program.id === selectedProgram.id
            const pCat = categoryColors[program.category] || categoryColors.functional
            return (
              <button
                key={program.id}
                onClick={() => switchProgram(program)}
                className={`animate-slide-up opacity-0 card-shine w-full rounded-2xl border text-left transition-all duration-200 active:scale-[0.98] relative overflow-hidden ${
                  isActive
                    ? 'bg-bg-card/80 border-lime/40'
                    : 'bg-bg-card/80 border-border hover:border-white/[0.06]'
                }`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {program.image && (
                  <div className="relative h-32 w-full overflow-hidden">
                    <ProgramImage src={program.image} alt={program.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/60 to-transparent" />
                    {isActive && (
                      <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-lime flex items-center justify-center">
                        <Check size={14} className="text-bg" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                )}
                {!program.image && isActive && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${pCat.accent} pointer-events-none`} />
                )}
                <div className="relative p-5 pt-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-display font-bold text-lg tracking-tight">
                        {program.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${pCat.text} ${pCat.bg}`}>
                          {program.category}
                        </span>
                        <span className="text-text-muted text-xs">{program.frequency}</span>
                        <span className="text-text-muted text-[8px]">|</span>
                        <span className="text-text-muted text-xs">{getTotalWeeks(program)} weeks</span>
                      </div>
                    </div>
                    {isActive && !program.image && (
                      <div className="w-7 h-7 rounded-full bg-lime flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={14} className="text-bg" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <p className="text-text-secondary text-sm mt-2 leading-relaxed">{program.description}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    {program.days.slice(0, 4).map((day, di) => (
                      <span key={di} className="text-[10px] text-text-muted bg-bg-elevated/80 px-2.5 py-1 rounded-lg">
                        {day.title.length > 18 ? day.title.substring(0, 18) + '...' : day.title}
                      </span>
                    ))}
                    {program.days.length > 4 && (
                      <span className="text-[10px] text-text-muted">+{program.days.length - 4}</span>
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-28 px-5 pt-14 flex flex-col">
      {/* Program header */}
      <div className="animate-fade-in mb-6">
        <button
          onClick={() => setShowProgramPicker(true)}
          className="w-full rounded-2xl bg-bg-card border border-border text-left transition-all hover:border-white/[0.06] active:scale-[0.99] relative overflow-hidden group"
        >
          {selectedProgram.image && (
            <div className="relative h-36 w-full overflow-hidden">
              <ProgramImage src={selectedProgram.image} alt={selectedProgram.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/70 to-bg-card/20" />
            </div>
          )}
          {!selectedProgram.image && (
            <div className={`absolute inset-0 bg-gradient-to-br ${cat.accent} opacity-60 pointer-events-none`} />
          )}
          <div className={`relative flex items-center justify-between ${selectedProgram.image ? 'px-5 pb-5 -mt-8' : 'p-5'}`}>
            <div>
              {!selectedProgram.image && (
                <p className="text-text-muted text-[10px] uppercase tracking-[0.2em] font-medium mb-1.5">Current Program</p>
              )}
              <p className="font-display text-2xl font-bold tracking-tight">{selectedProgram.name}</p>
              <div className="flex items-center gap-2.5 mt-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${cat.text} ${cat.bg}`}>
                  {selectedProgram.category}
                </span>
                <span className="text-text-secondary text-xs font-medium">{selectedProgram.frequency}</span>
                <span className="text-border text-xs">|</span>
                <span className="text-text-secondary text-xs font-medium">Week {selectedWeek + 1} of {totalWeeks}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-text-muted group-hover:text-text transition-colors">
              <span className="text-[10px] uppercase tracking-widest font-medium">Switch</span>
              <ArrowRight size={14} />
            </div>
          </div>
        </button>
      </div>

      {/* Progress section */}
      <div className="animate-slide-up mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-text-muted text-[10px] uppercase tracking-[0.2em] font-medium">Program Progress</p>
          <p className={`${cat.text} font-display font-bold text-sm`}>{Math.round(programProgress)}%</p>
        </div>
        <div className="h-1.5 bg-bg-elevated rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-lime rounded-full transition-all duration-700 ease-out"
            style={{ width: `${programProgress}%` }}
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-text-muted text-xs">
            {programSessions.length} of {totalProgramSessions} sessions
          </p>
          {/* Today's dots — current week only */}
          <div className="flex gap-1">
            {weekDays.map((_, wi) => (
              <div
                key={wi}
                className={`w-2 h-2 rounded-full transition-colors ${
                  completedToday.has(weekStart + wi) ? 'bg-lime' : 'bg-bg-elevated'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Week selector */}
      {totalWeeks > 1 && (
        <div className="animate-slide-up flex items-center justify-between mb-4 rounded-2xl bg-bg-card border border-border p-3">
          <button
            onClick={() => setSelectedWeek(Math.max(0, selectedWeek - 1))}
            disabled={selectedWeek === 0}
            className="w-9 h-9 rounded-xl bg-bg-elevated flex items-center justify-center text-text-muted hover:text-text transition-colors disabled:opacity-30"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalWeeks }, (_, i) => (
              <button
                key={i}
                onClick={() => setSelectedWeek(i)}
                className={`w-8 h-8 rounded-lg font-display font-bold text-xs transition-all ${
                  i === selectedWeek
                    ? 'bg-lime text-bg'
                    : 'bg-bg-elevated text-text-muted hover:text-text'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => setSelectedWeek(Math.min(totalWeeks - 1, selectedWeek + 1))}
            disabled={selectedWeek === totalWeeks - 1}
            className="w-9 h-9 rounded-xl bg-bg-elevated flex items-center justify-center text-text-muted hover:text-text transition-colors disabled:opacity-30"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Training days */}
      <div className="space-y-2.5">
        {weekDays.map((day, wi) => {
          const globalIndex = weekStart + wi
          const done = completedToday.has(globalIndex)
          return (
            <button
              key={day.day + '-' + globalIndex}
              onClick={() => subscribed ? navigate(`/training/${globalIndex}`) : navigate('/subscribe')}
              className={`animate-slide-up opacity-0 card-shine w-full rounded-2xl border transition-all duration-200 text-left active:scale-[0.98] relative overflow-hidden ${
                done
                  ? 'bg-bg-card/80 border-lime/30'
                  : 'bg-bg-card/80 border-border hover:border-white/[0.06]'
              }`}
              style={{ animationDelay: `${(wi + 1) * 70}ms` }}
            >
              {done && (
                <>
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-lime/30 via-lime/10 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-lime/8 to-transparent pointer-events-none" />
                </>
              )}
              <div className="relative flex items-center p-4 gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    done
                      ? 'bg-lime/15'
                      : 'bg-bg-elevated'
                  }`}
                >
                  {done ? (
                    <Check size={20} className="text-lime" strokeWidth={3} />
                  ) : (
                    <span className="font-display font-bold text-text-muted text-sm">{String(globalIndex + 1).padStart(2, '0')}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-display font-bold text-[15px] tracking-tight ${done ? 'text-lime' : 'text-text'}`}>
                    {day.title}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {(() => {
                      const supersets = new Set(
                        day.exercises
                          .map(e => e.name.match(/^(\d+)[a-z]\.\s*/))
                          .filter(Boolean)
                          .map(m => m![1])
                      ).size
                      return supersets > 0 ? (
                        <span className="text-[10px] font-semibold text-cyan-400/80 bg-cyan-400/[0.08] px-1.5 py-0.5 rounded whitespace-nowrap shrink-0">
                          {supersets} superset{supersets > 1 ? 's' : ''}
                        </span>
                      ) : null
                    })()}
                    <span className="text-text-muted text-xs">
                      {day.exercises.length} exercises · {day.duration}
                    </span>
                  </div>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${done ? 'bg-lime/10' : 'bg-bg-elevated'}`}>
                  {done ? (
                    <Flame size={14} className="text-lime" />
                  ) : (
                    <Play size={14} className="text-text-muted ml-0.5" />
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Daily summary */}
      {completedDays > 0 && (
        <div className="animate-fade-in mt-6 rounded-2xl bg-lime/5 border border-lime/20 p-4 flex items-center justify-center gap-2">
          <Zap size={16} className="text-lime" />
          <p className="font-display font-semibold text-lime text-sm">
            {completedDays === weekDays.length ? 'All sessions crushed today' : `${completedDays} of ${weekDays.length} sessions done today`}
          </p>
        </div>
      )}

      {/* Subscribe CTA for free users */}
      {!subscribed && (
        <button
          onClick={() => navigate('/subscribe')}
          className="animate-fade-in mt-6 w-full rounded-2xl border border-lime/30 bg-lime/5 p-5 text-left active:scale-[0.98] transition-all"
        >
          <p className="font-display font-bold text-lime text-sm uppercase tracking-wider mb-1">Unlock Full Access</p>
          <p className="text-text-secondary text-xs leading-relaxed">Start your 7-day free trial to begin training with any program.</p>
          <div className="mt-3 inline-flex items-center gap-1.5 bg-lime text-bg px-4 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider">
            Start Free Trial <ArrowRight size={12} />
          </div>
        </button>
      )}

      {/* Session history */}
      {programSessions.length > 0 && (
        <div className="mt-8">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 text-text-secondary text-sm mb-3 group"
          >
            <History size={14} className="text-text-muted" />
            <span className="font-display font-bold text-xs uppercase tracking-widest">History</span>
            <span className="text-text-muted text-[10px] font-medium bg-bg-elevated px-1.5 py-0.5 rounded-md">{programSessions.length}</span>
            <div className="ml-auto">
              {showHistory ? <ChevronUp size={14} className="text-text-muted" /> : <ChevronDown size={14} className="text-text-muted" />}
            </div>
          </button>

          {showHistory && (
            <div className="space-y-2.5 animate-fade-in">
              {uniqueDates.length === 0 ? (
                <p className="text-text-muted text-sm py-4 text-center">Your history starts after day 1</p>
              ) : (
                uniqueDates.map((date) => {
                  const daySessions = pastSessions.filter((s) => s.date === date)
                  return (
                    <div key={date} className="rounded-2xl bg-bg-card border border-border p-4">
                      <p className="font-display font-bold text-xs uppercase tracking-wider text-text-secondary mb-3">{formatDate(date)}</p>
                      <div className="space-y-2">
                        {daySessions.map((session, si) => {
                          const day = selectedProgram.days[session.dayIndex]
                          if (!day) return null
                          const totalSets = Object.values(session.completedSets).reduce(
                            (acc, sets) => acc + sets.length, 0
                          )
                          const dayNotes = allNotes.filter(
                            (n) => n.date === date && n.dayIndex === session.dayIndex
                          )
                          return (
                            <div key={si} className="rounded-xl bg-bg-elevated p-3">
                              <div className="flex items-center gap-2 mb-1">
                                <Dumbbell size={12} className="text-lime" />
                                <span className="font-display font-bold text-xs">{day.title}</span>
                                <span className="text-text-muted text-[10px] ml-auto font-medium">{totalSets} sets</span>
                              </div>
                              {dayNotes.length > 0 && (
                                <div className="mt-2 space-y-1">
                                  {dayNotes.map((note, ni) => (
                                    <div key={ni} className="flex items-center gap-2 text-[11px]">
                                      <span className="text-text-secondary truncate flex-1">{note.exerciseName}</span>
                                      {note.weight && (
                                        <span className="text-lime font-display font-semibold">{note.weight} lbs</span>
                                      )}
                                      {note.notes && (
                                        <span className="text-text-muted truncate max-w-[100px]">{note.notes}</span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
