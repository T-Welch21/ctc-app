import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, Dumbbell, Check, Play, ChevronDown, ChevronUp } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { getProgram } from '../lib/programs'

export default function TrainingDay() {
  const { dayIndex } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const program = getProgram(user?.identity || '')
  const idx = parseInt(dayIndex || '0')
  const day = program.days[idx]

  const [completedSets, setCompletedSets] = useState<Record<string, Set<number>>>({})
  const [expandedExercise, setExpandedExercise] = useState<number | null>(0)
  const [sessionStarted, setSessionStarted] = useState(false)

  if (!day) {
    navigate('/training', { replace: true })
    return null
  }

  const toggleSet = (exerciseName: string, setIdx: number) => {
    setCompletedSets((prev) => {
      const current = prev[exerciseName] || new Set<number>()
      const next = new Set(current)
      if (next.has(setIdx)) next.delete(setIdx)
      else next.add(setIdx)
      return { ...prev, [exerciseName]: next }
    })
  }

  const totalSets = day.exercises.reduce((acc, ex) => acc + ex.sets, 0)
  const completedTotal = Object.values(completedSets).reduce((acc, s) => acc + s.size, 0)
  const progress = totalSets > 0 ? (completedTotal / totalSets) * 100 : 0
  const allDone = completedTotal === totalSets && totalSets > 0

  return (
    <div className="min-h-screen pb-24 bg-bg">
      {/* Header */}
      <div className="sticky top-0 bg-bg/90 backdrop-blur-xl z-40 border-b border-border">
        <div className="max-w-lg mx-auto px-5 py-4">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => navigate('/training')} className="text-text-secondary hover:text-text transition-colors">
              <ArrowLeft size={22} />
            </button>
            <div className="flex-1">
              <p className="text-text-secondary text-xs">{day.day}</p>
              <h1 className="font-display text-lg font-bold">{day.title}</h1>
            </div>
            <div className="flex items-center gap-1.5 text-text-muted text-sm">
              <Clock size={14} />
              {day.duration}
            </div>
          </div>
          {/* Progress bar */}
          {sessionStarted && (
            <div className="h-1.5 bg-bg-elevated rounded-full overflow-hidden">
              <div
                className="h-full bg-lime rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-5 pt-4">
        {/* Warmup */}
        {day.warmup && (
          <div className="animate-fade-in rounded-2xl bg-bg-card border border-border p-4 mb-4">
            <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Warm-Up</p>
            <p className="text-sm text-text-secondary">{day.warmup}</p>
          </div>
        )}

        {/* Start button */}
        {!sessionStarted && (
          <button
            onClick={() => setSessionStarted(true)}
            className="animate-fade-in w-full bg-lime text-bg font-display font-semibold text-lg py-4 rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all glow-lime flex items-center justify-center gap-2 mb-6"
          >
            <Play size={22} className="ml-0.5" /> Start Session
          </button>
        )}

        {/* Exercises */}
        <div className="space-y-3">
          {day.exercises.map((exercise, i) => {
            const isExpanded = expandedExercise === i
            const exerciseSets = completedSets[exercise.name] || new Set()
            const exerciseDone = exerciseSets.size === exercise.sets

            return (
              <div
                key={exercise.name}
                className={`animate-slide-up opacity-0 rounded-2xl border transition-all duration-200 ${
                  exerciseDone
                    ? 'bg-lime/5 border-lime/20'
                    : 'bg-bg-card border-border'
                }`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Exercise header */}
                <button
                  onClick={() => setExpandedExercise(isExpanded ? null : i)}
                  className="w-full flex items-center gap-3 p-4 text-left"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-display font-bold ${
                    exerciseDone ? 'bg-lime/20 text-lime' : 'bg-bg-elevated text-text-secondary'
                  }`}>
                    {exerciseDone ? <Check size={16} /> : i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-display font-semibold text-sm ${exerciseDone ? 'text-lime' : 'text-text'}`}>
                      {exercise.name}
                    </p>
                    <p className="text-text-muted text-xs mt-0.5">
                      {exercise.sets} sets × {exercise.reps}
                      {exercise.tempo ? ` · ${exercise.tempo}` : ''}
                      {exercise.rest !== '-' ? ` · ${exercise.rest} rest` : ''}
                    </p>
                  </div>
                  {isExpanded ? (
                    <ChevronUp size={18} className="text-text-muted shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-text-muted shrink-0" />
                  )}
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="px-4 pb-4 space-y-3">
                    {/* Coaching cues */}
                    <div className="rounded-xl bg-bg-elevated p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Dumbbell size={12} className="text-lime" />
                        <p className="text-[10px] uppercase tracking-wider text-lime font-medium">Coaching Cues</p>
                      </div>
                      <p className="text-text-secondary text-sm leading-relaxed">{exercise.cues}</p>
                    </div>

                    {/* Set tracker */}
                    {sessionStarted && (
                      <div>
                        <p className="text-text-muted text-xs mb-2">Tap to complete each set</p>
                        <div className="flex gap-2">
                          {Array.from({ length: exercise.sets }).map((_, setIdx) => {
                            const done = exerciseSets.has(setIdx)
                            return (
                              <button
                                key={setIdx}
                                onClick={() => toggleSet(exercise.name, setIdx)}
                                className={`flex-1 py-3 rounded-xl border-2 font-display font-bold text-sm transition-all duration-200 ${
                                  done
                                    ? 'bg-lime/20 border-lime text-lime'
                                    : 'bg-bg-elevated border-border text-text-secondary hover:border-border-light'
                                }`}
                              >
                                {done ? <Check size={16} className="mx-auto" /> : `S${setIdx + 1}`}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Cooldown */}
        {day.cooldown && (
          <div className="rounded-2xl bg-bg-card border border-border p-4 mt-4">
            <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Cool-Down</p>
            <p className="text-sm text-text-secondary">{day.cooldown}</p>
          </div>
        )}

        {/* Finish button */}
        {sessionStarted && allDone && (
          <button
            onClick={() => navigate('/training')}
            className="w-full bg-lime text-bg font-display font-semibold text-lg py-4 rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all glow-lime animate-pulse-glow mt-6"
          >
            Session Complete
          </button>
        )}
      </div>
    </div>
  )
}
