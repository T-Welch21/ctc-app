import { useState, useEffect, useRef, useCallback } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, Check, Play, ChevronDown, ChevronUp, Trophy, Pause, RotateCcw, Award, Timer, Zap, Video, X } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { isSubscribed } from '../lib/subscription'
import { getProgramById, getProgram } from '../lib/programs'
import { saveCompletedSession, saveExerciseNote, getLastNoteForExercise, getExerciseNotes, savePR, getPRs, getSelectedProgramId } from '../lib/storage'

function parseRestSeconds(rest: string): number {
  if (!rest || rest === '-') return 0
  const parts = rest.split(':')
  if (parts.length === 2) return parseInt(parts[0]) * 60 + parseInt(parts[1])
  const num = parseInt(rest)
  return isNaN(num) ? 0 : num
}

function formatTimer(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function TrainingDay() {
  const { dayIndex } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const savedId = user ? getSelectedProgramId(user.id) : null
  const program = (savedId && getProgramById(savedId)) || getProgram(user?.identity || '')
  const idx = parseInt(dayIndex || '0')
  const day = program.days[idx]

  const [completedSets, setCompletedSets] = useState<Record<string, Set<number>>>({})
  const [expandedExercise, setExpandedExercise] = useState<number | null>(0)
  const [sessionStarted, setSessionStarted] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [exerciseWeights, setExerciseWeights] = useState<Record<string, string>>({})
  const [exerciseNotes, setExerciseNotes] = useState<Record<string, string>>({})
  const [newPRs, setNewPRs] = useState<{ name: string; weight: string }[]>([])
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const elapsedRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const [timerSeconds, setTimerSeconds] = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)
  const [timerTotal, setTimerTotal] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setTimerRunning(false)
  }, [])

  const startTimer = useCallback((seconds: number) => {
    stopTimer()
    setTimerSeconds(seconds)
    setTimerTotal(seconds)
    setTimerRunning(true)
  }, [stopTimer])

  useEffect(() => {
    if (!timerRunning || timerSeconds <= 0) return
    timerRef.current = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          stopTimer()
          if (navigator.vibrate) navigator.vibrate([200, 100, 200])
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [timerRunning, timerSeconds, stopTimer])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  useEffect(() => {
    if (!user || !day) return
    const prefilled: Record<string, string> = {}
    day.exercises.forEach((exercise, i) => {
      const last = getLastNoteForExercise(user.id, exercise.name)
      if (last?.weight) prefilled[exKey(i, exercise.name)] = last.weight
    })
    if (Object.keys(prefilled).length > 0) setExerciseWeights(prefilled)
  }, [user, day])

  useEffect(() => {
    if (sessionStarted && !showCelebration) {
      elapsedRef.current = setInterval(() => setElapsedSeconds((s) => s + 1), 1000)
    }
    return () => {
      if (elapsedRef.current) clearInterval(elapsedRef.current)
    }
  }, [sessionStarted, showCelebration])

  if (!day) {
    navigate('/training', { replace: true })
    return null
  }

  const exKey = (i: number, name: string) => `${i}:${name}`

  const toggleSet = (key: string, setIdx: number, restStr: string) => {
    setCompletedSets((prev) => {
      const current = prev[key] || new Set<number>()
      const next = new Set(current)
      const wasCompleted = next.has(setIdx)
      if (wasCompleted) {
        next.delete(setIdx)
      } else {
        next.add(setIdx)
        const restSec = parseRestSeconds(restStr)
        if (restSec > 0) startTimer(restSec)
      }
      return { ...prev, [key]: next }
    })
  }

  const totalSets = day.exercises.reduce((acc, ex) => acc + ex.sets, 0)
  const completedTotal = Object.values(completedSets).reduce((acc, s) => acc + s.size, 0)
  const progress = totalSets > 0 ? (completedTotal / totalSets) * 100 : 0
  const allDone = completedTotal === totalSets && totalSets > 0

  const timerProgress = timerTotal > 0 ? ((timerTotal - timerSeconds) / timerTotal) * 100 : 0

  if (user && !isSubscribed(user)) {
    return <Navigate to="/subscribe" replace />
  }

  return (
    <div className="min-h-screen pb-28 bg-bg">
      {/* Header */}
      <div className="sticky top-0 glass-heavy z-40 border-b border-border/50">
        <div className="max-w-lg mx-auto px-5 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/training')} className="w-9 h-9 rounded-xl bg-bg-elevated flex items-center justify-center text-text-secondary hover:text-text transition-colors">
              <ArrowLeft size={18} />
            </button>
            <div className="flex-1">
              <p className="text-text-muted text-[10px] uppercase tracking-[0.2em] font-medium">{day.day}</p>
              <h1 className="font-display text-lg font-bold tracking-tight">{day.title}</h1>
            </div>
            {sessionStarted && !showCelebration ? (
              <div className="flex items-center gap-1.5 bg-lime/10 px-3 py-1.5 rounded-lg">
                <Timer size={13} className="text-lime" />
                <span className="text-lime text-sm font-display font-bold tabular-nums">{formatTimer(elapsedSeconds)}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 bg-bg-elevated px-3 py-1.5 rounded-lg">
                <Clock size={13} className="text-text-muted" />
                <span className="text-text-muted text-sm font-medium">{day.duration}</span>
              </div>
            )}
          </div>
          {sessionStarted && (
            <div className="mt-3 h-1 bg-bg-elevated rounded-full overflow-hidden">
              <div
                className="h-full bg-lime rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Rest timer overlay */}
      {timerRunning && timerSeconds > 0 && (
        <div className="sticky top-[80px] z-30 mx-5 mt-3">
          <div className="rounded-2xl bg-bg-card border border-lime/30 p-4 shadow-lg shadow-lime/5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-text-muted text-[10px] uppercase tracking-[0.2em] font-medium">Rest Timer</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTimerRunning(false)}
                  className="p-1.5 rounded-lg bg-bg-elevated text-text-muted hover:text-text transition-colors"
                >
                  <Pause size={14} />
                </button>
                <button
                  onClick={stopTimer}
                  className="text-text-muted text-[10px] uppercase tracking-wider font-medium hover:text-text transition-colors"
                >
                  Skip
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-display font-bold text-3xl text-lime tabular-nums min-w-[80px]">
                {formatTimer(timerSeconds)}
              </p>
              <div className="flex-1 h-1.5 bg-bg-elevated rounded-full overflow-hidden">
                <div
                  className="h-full bg-lime rounded-full transition-all duration-1000 linear"
                  style={{ width: `${timerProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Paused timer */}
      {!timerRunning && timerSeconds > 0 && (
        <div className="sticky top-[80px] z-30 mx-5 mt-3">
          <div className="rounded-2xl bg-bg-card border border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <p className="font-display font-bold text-2xl text-text-muted tabular-nums">
                  {formatTimer(timerSeconds)}
                </p>
                <span className="text-text-muted text-[10px] uppercase tracking-widest font-medium">Paused</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTimerRunning(true)}
                  className="p-2 rounded-lg bg-lime/10 text-lime hover:bg-lime/20 transition-colors"
                >
                  <Play size={14} />
                </button>
                <button
                  onClick={() => startTimer(timerTotal)}
                  className="p-2 rounded-lg bg-bg-elevated text-text-muted hover:text-text transition-colors"
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  onClick={() => { stopTimer(); setTimerSeconds(0) }}
                  className="text-text-muted text-[10px] uppercase tracking-wider font-medium hover:text-text transition-colors px-2"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Timer done flash */}
      {!timerRunning && timerSeconds === 0 && timerTotal > 0 && (
        <div className="sticky top-[80px] z-30 mx-5 mt-3">
          <div className="rounded-2xl bg-lime/10 border border-lime/30 p-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-lime" />
                <p className="font-display font-bold text-lime text-sm">Go — next set</p>
              </div>
              <button
                onClick={() => setTimerTotal(0)}
                className="text-lime/60 text-[10px] uppercase tracking-wider font-medium hover:text-lime transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-lg mx-auto px-5 pt-5">
        {/* Warmup */}
        {day.warmup && (
          <div className="animate-fade-in rounded-2xl bg-bg-card border border-border p-4 mb-5">
            <p className="text-text-muted text-[10px] uppercase tracking-[0.2em] font-medium mb-2">Warm-Up</p>
            <p className="text-sm text-text-secondary leading-relaxed">{day.warmup}</p>
          </div>
        )}

        {/* Start button */}
        {!sessionStarted && (
          <button
            onClick={() => setSessionStarted(true)}
            className="animate-fade-in w-full bg-lime text-bg font-display font-bold text-base py-4 rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all glow-lime flex items-center justify-center gap-2.5 mb-6 uppercase tracking-wider"
          >
            <Play size={20} className="ml-0.5" /> Start Session
          </button>
        )}

        {/* Exercises */}
        <div className="space-y-2.5">
          {(() => {
            const supersetPattern = /^(\d+)([a-z])\.\s*/
            const groups: { type: 'single' | 'superset'; exercises: { exercise: typeof day.exercises[0]; index: number }[] }[] = []
            let i = 0
            while (i < day.exercises.length) {
              const match = day.exercises[i].name.match(supersetPattern)
              if (match && match[2] === 'a') {
                const groupNum = match[1]
                const group: { exercise: typeof day.exercises[0]; index: number }[] = [{ exercise: day.exercises[i], index: i }]
                let j = i + 1
                while (j < day.exercises.length) {
                  const nextMatch = day.exercises[j].name.match(supersetPattern)
                  if (nextMatch && nextMatch[1] === groupNum) {
                    group.push({ exercise: day.exercises[j], index: j })
                    j++
                  } else {
                    break
                  }
                }
                if (group.length > 1) {
                  groups.push({ type: 'superset', exercises: group })
                  i = j
                } else {
                  groups.push({ type: 'single', exercises: [{ exercise: day.exercises[i], index: i }] })
                  i++
                }
              } else {
                groups.push({ type: 'single', exercises: [{ exercise: day.exercises[i], index: i }] })
                i++
              }
            }

            let displayNum = 0
            return groups.map((group, gi) => {
              if (group.type === 'superset') {
                displayNum++
                const supersetNum = displayNum
                displayNum += group.exercises.length - 1
                return (
                  <div
                    key={`group-${gi}`}
                    className="animate-slide-up opacity-0 rounded-2xl border border-cyan-400/20 bg-bg-card relative overflow-hidden"
                    style={{ animationDelay: `${group.exercises[0].index * 60}ms` }}
                  >
                    <div className="flex items-center gap-2 px-4 pt-3 pb-1">
                      <Zap size={12} className="text-cyan-400" />
                      <span className="text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em]">{group.exercises.length > 2 ? 'Giant Set' : 'Superset'}</span>
                    </div>
                    <div className="relative">
                      <div className="absolute left-[30px] top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/30 via-cyan-400/10 to-cyan-400/30" />
                      {group.exercises.map(({ exercise, index }, ei) => {
                        const isExpanded = expandedExercise === index
                        const key = exKey(index, exercise.name)
                        const exerciseSets = completedSets[key] || new Set()
                        const exerciseDone = exerciseSets.size === exercise.sets
                        const label = exercise.name.match(supersetPattern)?.[2]?.toUpperCase() || ''
                        const cleanName = exercise.name.replace(supersetPattern, '')

                        return (
                          <div key={`${index}-${exercise.name}`} className={`relative ${ei > 0 ? 'border-t border-border/50' : ''}`}>
                            {exerciseDone && (
                              <div className="absolute inset-0 bg-gradient-to-r from-lime/5 to-transparent pointer-events-none" />
                            )}
                            <button
                              onClick={() => setExpandedExercise(isExpanded ? null : index)}
                              className="relative w-full flex items-center gap-3 p-4 text-left"
                            >
                              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-display font-bold shrink-0 ${
                                exerciseDone ? 'bg-lime/15 text-lime' : 'bg-cyan-400/10 text-cyan-400'
                              }`}>
                                {exerciseDone ? <Check size={16} strokeWidth={3} /> : label}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <p className={`font-display font-bold text-sm tracking-tight ${exerciseDone ? 'text-lime' : 'text-text'}`}>
                                    {cleanName}
                                  </p>
                                  {exercise.videoUrl && <Video size={12} className="text-cyan-400 shrink-0" />}
                                </div>
                                <p className="text-text-muted text-xs mt-0.5">
                                  {exercise.sets > 1 ? `${exercise.sets} sets` : '1 set'} × {exercise.reps}
                                  {exercise.tempo ? ` · ${exercise.tempo}` : ''}
                                  {exercise.rest !== '-' ? ` · ${exercise.rest} rest` : ''}
                                </p>
                              </div>
                              {isExpanded ? (
                                <ChevronUp size={16} className="text-text-muted shrink-0" />
                              ) : (
                                <ChevronDown size={16} className="text-text-muted shrink-0" />
                              )}
                            </button>

                            {isExpanded && (
                              <div className="relative px-4 pb-4 space-y-3">
                                <div className="rounded-xl bg-bg-elevated/70 p-3.5">
                                  <p className="text-text-muted text-[10px] uppercase tracking-[0.15em] font-medium mb-1.5">Coaching Cues</p>
                                  <p className="text-text-secondary text-sm leading-relaxed">{exercise.cues}</p>
                                </div>

                                {exercise.videoUrl && (
                                  <button
                                    onClick={() => setVideoUrl(exercise.videoUrl!)}
                                    className="flex items-center gap-2.5 w-full rounded-xl bg-cyan-400/[0.08] border border-cyan-400/20 p-3 hover:bg-cyan-400/[0.12] active:scale-[0.98] transition-all"
                                  >
                                    <div className="w-8 h-8 rounded-lg bg-cyan-400/15 flex items-center justify-center shrink-0">
                                      <Video size={15} className="text-cyan-400" />
                                    </div>
                                    <span className="text-cyan-400 text-sm font-display font-bold tracking-tight">Watch Demo</span>
                                  </button>
                                )}

                                {sessionStarted && (
                                  <div>
                                    <p className="text-text-muted text-[10px] uppercase tracking-[0.15em] font-medium mb-2">Sets</p>
                                    <div className="flex gap-2">
                                      {Array.from({ length: exercise.sets }).map((_, setIdx) => {
                                        const done = exerciseSets.has(setIdx)
                                        return (
                                          <button
                                            key={setIdx}
                                            onClick={() => toggleSet(key, setIdx, exercise.rest)}
                                            className={`flex-1 py-3 rounded-xl border-2 font-display font-bold text-sm transition-all duration-200 ${
                                              done
                                                ? 'bg-lime/15 border-lime/50 text-lime'
                                                : 'bg-bg-elevated border-border text-text-muted hover:border-border-light active:scale-95'
                                            }`}
                                          >
                                            {done ? <Check size={16} className="mx-auto" strokeWidth={3} /> : setIdx + 1}
                                          </button>
                                        )
                                      })}
                                    </div>
                                  </div>
                                )}

                                {sessionStarted && (
                                  <div className="space-y-2">
                                    {(() => {
                                      const lastNote = user ? getLastNoteForExercise(user.id, exercise.name) : null
                                      if (!lastNote) return null
                                      const currentW = parseFloat(exerciseWeights[key] || '')
                                      const lastW = parseFloat(lastNote.weight || '')
                                      const diff = !isNaN(currentW) && !isNaN(lastW) ? currentW - lastW : null
                                      return (
                                        <div className="flex items-center gap-2">
                                          <span className="text-[10px] font-semibold bg-bg-elevated px-2 py-1 rounded-lg text-text-muted">
                                            Last: {lastNote.weight && `${lastNote.weight} lbs`}{lastNote.weight && lastNote.notes ? ' · ' : ''}{lastNote.notes}
                                          </span>
                                          {diff !== null && diff !== 0 && (
                                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${diff > 0 ? 'text-lime bg-lime/10' : 'text-cyan-400 bg-cyan-400/10'}`}>
                                              {diff > 0 ? '+' : ''}{diff} lbs
                                            </span>
                                          )}
                                        </div>
                                      )
                                    })()}
                                    <div className="flex gap-2">
                                      <input
                                        type="number"
                                        inputMode="decimal"
                                        placeholder="Weight (lbs)"
                                        value={exerciseWeights[key] || ''}
                                        onChange={(e) => setExerciseWeights((prev) => ({ ...prev, [key]: e.target.value }))}
                                        className="flex-1 bg-bg-elevated border border-border rounded-xl px-3 py-2.5 text-sm text-text placeholder:text-text-muted/60 focus:outline-none focus:border-lime/40 transition-colors"
                                      />
                                      <input
                                        type="text"
                                        placeholder="Notes"
                                        value={exerciseNotes[key] || ''}
                                        onChange={(e) => setExerciseNotes((prev) => ({ ...prev, [key]: e.target.value }))}
                                        className="flex-1 bg-bg-elevated border border-border rounded-xl px-3 py-2.5 text-sm text-text placeholder:text-text-muted/60 focus:outline-none focus:border-lime/40 transition-colors"
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              } else {
                displayNum++
                const { exercise, index: i } = group.exercises[0]
                const isExpanded = expandedExercise === i
                const key = exKey(i, exercise.name)
                const exerciseSets = completedSets[key] || new Set()
                const exerciseDone = exerciseSets.size === exercise.sets

                return (
                  <div
                    key={`${i}-${exercise.name}`}
                    className={`animate-slide-up opacity-0 rounded-2xl border transition-all duration-200 relative overflow-hidden ${
                      exerciseDone
                        ? 'bg-bg-card border-lime/25'
                        : 'bg-bg-card border-border'
                    }`}
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    {exerciseDone && (
                      <div className="absolute inset-0 bg-gradient-to-r from-lime/5 to-transparent pointer-events-none" />
                    )}
                    <button
                      onClick={() => setExpandedExercise(isExpanded ? null : i)}
                      className="relative w-full flex items-center gap-3 p-4 text-left"
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-display font-bold shrink-0 ${
                        exerciseDone ? 'bg-lime/15 text-lime' : 'bg-bg-elevated text-text-muted'
                      }`}>
                        {exerciseDone ? <Check size={16} strokeWidth={3} /> : String(displayNum).padStart(2, '0')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className={`font-display font-bold text-sm tracking-tight ${exerciseDone ? 'text-lime' : 'text-text'}`}>
                            {exercise.name}
                          </p>
                          {exercise.videoUrl && <Video size={12} className="text-cyan-400 shrink-0" />}
                        </div>
                        <p className="text-text-muted text-xs mt-0.5">
                          {exercise.sets > 1 ? `${exercise.sets} sets` : '1 set'} × {exercise.reps}
                          {exercise.tempo ? ` · ${exercise.tempo}` : ''}
                          {exercise.rest !== '-' ? ` · ${exercise.rest} rest` : ''}
                        </p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp size={16} className="text-text-muted shrink-0" />
                      ) : (
                        <ChevronDown size={16} className="text-text-muted shrink-0" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="relative px-4 pb-4 space-y-3">
                        <div className="rounded-xl bg-bg-elevated/70 p-3.5">
                          <p className="text-text-muted text-[10px] uppercase tracking-[0.15em] font-medium mb-1.5">Coaching Cues</p>
                          <p className="text-text-secondary text-sm leading-relaxed">{exercise.cues}</p>
                        </div>

                        {exercise.videoUrl && (
                          <button
                            onClick={() => setVideoUrl(exercise.videoUrl!)}
                            className="flex items-center gap-2.5 w-full rounded-xl bg-cyan-400/[0.08] border border-cyan-400/20 p-3 hover:bg-cyan-400/[0.12] active:scale-[0.98] transition-all"
                          >
                            <div className="w-8 h-8 rounded-lg bg-cyan-400/15 flex items-center justify-center shrink-0">
                              <Video size={15} className="text-cyan-400" />
                            </div>
                            <span className="text-cyan-400 text-sm font-display font-bold tracking-tight">Watch Demo</span>
                          </button>
                        )}

                        {sessionStarted && (
                          <div>
                            <p className="text-text-muted text-[10px] uppercase tracking-[0.15em] font-medium mb-2">Sets</p>
                            <div className="flex gap-2">
                              {Array.from({ length: exercise.sets }).map((_, setIdx) => {
                                const done = exerciseSets.has(setIdx)
                                return (
                                  <button
                                    key={setIdx}
                                    onClick={() => toggleSet(key, setIdx, exercise.rest)}
                                    className={`flex-1 py-3 rounded-xl border-2 font-display font-bold text-sm transition-all duration-200 ${
                                      done
                                        ? 'bg-lime/15 border-lime/50 text-lime'
                                        : 'bg-bg-elevated border-border text-text-muted hover:border-border-light active:scale-95'
                                    }`}
                                  >
                                    {done ? <Check size={16} className="mx-auto" strokeWidth={3} /> : setIdx + 1}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        )}

                        {sessionStarted && (
                          <div className="space-y-2">
                            {(() => {
                              const lastNote = user ? getLastNoteForExercise(user.id, exercise.name) : null
                              if (!lastNote) return null
                              const currentW = parseFloat(exerciseWeights[key] || '')
                              const lastW = parseFloat(lastNote.weight || '')
                              const diff = !isNaN(currentW) && !isNaN(lastW) ? currentW - lastW : null
                              return (
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-semibold bg-bg-elevated px-2 py-1 rounded-lg text-text-muted">
                                    Last: {lastNote.weight && `${lastNote.weight} lbs`}{lastNote.weight && lastNote.notes ? ' · ' : ''}{lastNote.notes}
                                  </span>
                                  {diff !== null && diff !== 0 && (
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${diff > 0 ? 'text-lime bg-lime/10' : 'text-cyan-400 bg-cyan-400/10'}`}>
                                      {diff > 0 ? '+' : ''}{diff} lbs
                                    </span>
                                  )}
                                </div>
                              )
                            })()}
                            <div className="flex gap-2">
                              <input
                                type="number"
                                inputMode="decimal"
                                placeholder="Weight (lbs)"
                                value={exerciseWeights[key] || ''}
                                onChange={(e) => setExerciseWeights((prev) => ({ ...prev, [key]: e.target.value }))}
                                className="flex-1 bg-bg-elevated border border-border rounded-xl px-3 py-2.5 text-sm text-text placeholder:text-text-muted/60 focus:outline-none focus:border-lime/40 transition-colors"
                              />
                              <input
                                type="text"
                                placeholder="Notes"
                                value={exerciseNotes[key] || ''}
                                onChange={(e) => setExerciseNotes((prev) => ({ ...prev, [key]: e.target.value }))}
                                className="flex-1 bg-bg-elevated border border-border rounded-xl px-3 py-2.5 text-sm text-text placeholder:text-text-muted/60 focus:outline-none focus:border-lime/40 transition-colors"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              }
            })
          })()}
        </div>

        {/* Cooldown */}
        {day.cooldown && (
          <div className="rounded-2xl bg-bg-card border border-border p-4 mt-5">
            <p className="text-text-muted text-[10px] uppercase tracking-[0.2em] font-medium mb-2">Cool-Down</p>
            <p className="text-sm text-text-secondary leading-relaxed">{day.cooldown}</p>
          </div>
        )}

        {/* Finish button */}
        {sessionStarted && allDone && !showCelebration && (
          <button
            onClick={() => {
              stopTimer()
              setTimerSeconds(0)
              setTimerTotal(0)
              if (user) {
                const setsData: Record<string, number[]> = {}
                for (const [name, sets] of Object.entries(completedSets)) {
                  setsData[name] = [...sets]
                }
                const today = new Date().toISOString().split('T')[0]
                saveCompletedSession(user.id, {
                  date: today,
                  dayIndex: idx,
                  programId: program.id,
                  completedSets: setsData,
                })

                const detectedPRs: { name: string; weight: string }[] = []
                const allNotes = getExerciseNotes(user.id)
                const existingPRs = getPRs(user.id)

                day.exercises.forEach((exercise, i) => {
                  const k = exKey(i, exercise.name)
                  const w = exerciseWeights[k]
                  const n = exerciseNotes[k]
                  if (w || n) {
                    saveExerciseNote(user.id, {
                      date: today,
                      dayIndex: idx,
                      exerciseName: exercise.name,
                      weight: w || '',
                      notes: n || '',
                    })
                  }
                  if (w) {
                    const currentWeight = parseFloat(w)
                    if (!isNaN(currentWeight) && currentWeight > 0) {
                      const pastWeights = allNotes
                        .filter((note) => note.exerciseName === exercise.name && note.weight)
                        .map((note) => parseFloat(note.weight))
                        .filter((v) => !isNaN(v))
                      const existingPR = existingPRs.find((p) => p.lift === exercise.name)
                      const existingMax = existingPR ? parseFloat(existingPR.value) : 0
                      const pastMax = pastWeights.length > 0 ? Math.max(...pastWeights) : 0
                      const previousBest = Math.max(pastMax, existingMax)
                      if (currentWeight > previousBest && previousBest > 0) {
                        detectedPRs.push({ name: exercise.name, weight: w })
                        savePR(user.id, { lift: exercise.name, value: w, date: today })
                      }
                    }
                  }
                })
                setNewPRs(detectedPRs)
              }
              setShowCelebration(true)
            }}
            className="w-full bg-lime text-bg font-display font-bold text-base py-4 rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all glow-lime animate-pulse-glow mt-6 uppercase tracking-wider"
          >
            Complete Session
          </button>
        )}
      </div>

      {/* Video demo modal */}
      {videoUrl && (
        <div className="fixed inset-0 bg-bg/95 backdrop-blur-md z-50 flex items-center justify-center p-5">
          <div className="animate-fade-in w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Video size={16} className="text-cyan-400" />
                <p className="text-cyan-400 font-display font-bold text-sm uppercase tracking-[0.15em]">Exercise Demo</p>
              </div>
              <button
                onClick={() => setVideoUrl(null)}
                className="w-9 h-9 rounded-xl bg-bg-elevated flex items-center justify-center text-text-muted hover:text-text transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden bg-bg-card border border-border">
              <video
                src={videoUrl}
                controls
                autoPlay
                playsInline
                className="w-full aspect-video bg-black"
              />
            </div>
            <p className="text-text-muted text-xs text-center mt-3">Tap outside or close to return to your workout</p>
          </div>
        </div>
      )}

      {/* Celebration overlay */}
      {showCelebration && (
        <div className="fixed inset-0 bg-bg/95 backdrop-blur-md z-50 flex items-center justify-center">
          <div className="animate-fade-in text-center px-8 max-w-sm">
            <div className="inline-flex p-6 rounded-3xl bg-lime/10 mb-6 animate-pulse-glow">
              <Trophy size={48} className="text-lime" />
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight mb-1">Session Complete</h1>
            <p className="text-text-muted text-sm mb-2">{day.title}</p>
            <p className="text-lime/80 text-xs italic font-medium">
              {[
                'You showed up when it mattered.',
                'One more session closer to the best version of you.',
                'Discipline is doing it when you don\'t feel like it.',
                'The work you put in today pays dividends tomorrow.',
                'Champions are built in the sessions nobody sees.',
                'You didn\'t come this far to only come this far.',
                'Compete with who you were yesterday.',
              ][new Date().getDate() % 7]}
            </p>

            <div className="flex items-center justify-center gap-8 my-6">
              <div>
                <p className="font-display font-bold text-3xl text-lime">{totalSets}</p>
                <p className="text-text-muted text-[10px] uppercase tracking-widest mt-1">Sets</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <p className="font-display font-bold text-3xl text-text">{formatTimer(elapsedSeconds)}</p>
                <p className="text-text-muted text-[10px] uppercase tracking-widest mt-1">Duration</p>
              </div>
              {(() => {
                const vol = day.exercises.reduce((acc, ex, i) => {
                  const w = parseFloat(exerciseWeights[exKey(i, ex.name)] || '')
                  if (isNaN(w) || w <= 0) return acc
                  const reps = parseInt(ex.reps) || 0
                  return acc + w * reps * ex.sets
                }, 0)
                return vol > 0 ? (
                  <>
                    <div className="w-px h-10 bg-border" />
                    <div>
                      <p className="font-display font-bold text-3xl text-cyan-400">
                        {vol >= 1000 ? `${(vol / 1000).toFixed(1)}k` : vol}
                      </p>
                      <p className="text-text-muted text-[10px] uppercase tracking-widest mt-1">Volume</p>
                    </div>
                  </>
                ) : null
              })()}
              {newPRs.length > 0 && (
                <>
                  <div className="w-px h-10 bg-border" />
                  <div>
                    <p className="font-display font-bold text-3xl text-blue-400">{newPRs.length}</p>
                    <p className="text-text-muted text-[10px] uppercase tracking-widest mt-1">New PRs</p>
                  </div>
                </>
              )}
            </div>

            {newPRs.length > 0 && (
              <div className="my-4 rounded-2xl bg-blue-400/10 border border-blue-400/30 p-4">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Award size={16} className="text-blue-400" />
                  <p className="text-blue-400 font-display font-bold text-[10px] uppercase tracking-[0.2em]">
                    Personal Records
                  </p>
                </div>
                <div className="space-y-2">
                  {newPRs.map((pr, i) => (
                    <div key={i} className="flex items-center justify-center gap-2">
                      <span className="text-text text-sm font-medium">{pr.name}</span>
                      <span className="text-lime font-display font-bold text-sm">
                        {pr.weight} lbs
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => navigate('/training')}
              className="bg-lime text-bg font-display font-bold text-base py-4 px-16 rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all glow-lime mt-4 uppercase tracking-wider"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
