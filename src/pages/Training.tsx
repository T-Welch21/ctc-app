import { useState } from 'react'
import { Check, Play, ChevronDown, ChevronUp, History, Dumbbell, ArrowRight, ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { allPrograms, getProgramById, getProgram } from '../lib/programs'
import type { Program } from '../lib/programs'
import { getCompletedSessions, getCurrentWeek, getExerciseNotes, getSelectedProgramId, setSelectedProgramId } from '../lib/storage'

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

const categoryColors: Record<string, string> = {
  strength: 'text-red-400 bg-red-400/10',
  hybrid: 'text-[#818cf8] bg-[#818cf8]/10',
  conditioning: 'text-warning bg-warning/10',
  functional: 'text-lime bg-lime/10',
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
  const [showProgramPicker, setShowProgramPicker] = useState(false)
  const currentProgram = useSelectedProgram(user?.id, user?.identity || '')
  const [selectedProgram, setSelectedProgram] = useState<Program>(currentProgram)
  const days = selectedProgram.days
  const sessions = user ? getCompletedSessions(user.id) : []
  const todayStr = new Date().toISOString().split('T')[0]
  const [showHistory, setShowHistory] = useState(false)

  const completedToday = new Set(
    sessions.filter((s) => s.date === todayStr && s.programId === selectedProgram.id).map((s) => s.dayIndex)
  )
  const completedDays = completedToday.size
  const currentWeek = user ? getCurrentWeek(user.id, selectedProgram.weeks) : 1

  const programSessions = sessions.filter((s) => s.programId === selectedProgram.id)
  const totalProgramSessions = selectedProgram.weeks * days.length
  const programProgress = totalProgramSessions > 0
    ? Math.min((programSessions.length / totalProgramSessions) * 100, 100)
    : 0

  const allNotes = user ? getExerciseNotes(user.id) : []
  const pastSessions = [...programSessions]
    .reverse()
    .filter((s) => s.date !== todayStr)
    .slice(0, 10)

  const uniqueDates = [...new Set(pastSessions.map((s) => s.date))]

  const switchProgram = (program: Program) => {
    setSelectedProgram(program)
    if (user) setSelectedProgramId(user.id, program.id)
    setShowProgramPicker(false)
  }

  if (showProgramPicker) {
    return (
      <div className="min-h-screen pb-24 px-5 pt-14">
        <div className="animate-fade-in mb-6">
          <button
            onClick={() => setShowProgramPicker(false)}
            className="flex items-center gap-1.5 text-text-secondary hover:text-text text-sm mb-4 transition-colors"
          >
            <ChevronLeft size={16} /> Back
          </button>
          <h1 className="font-display text-2xl font-bold mb-1">Choose Your Program</h1>
          <p className="text-text-muted text-sm">Pick the one that matches how you want to train.</p>
        </div>

        <div className="space-y-3">
          {allPrograms.map((program, i) => {
            const isActive = program.id === selectedProgram.id
            const colorClass = categoryColors[program.category] || 'text-lime bg-lime/10'
            return (
              <button
                key={program.id}
                onClick={() => switchProgram(program)}
                className={`animate-slide-up opacity-0 w-full rounded-2xl border p-5 text-left transition-all duration-200 active:scale-[0.98] ${
                  isActive
                    ? 'bg-lime/5 border-lime/30'
                    : 'bg-bg-card border-border hover:border-border-light'
                }`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className={`font-display font-bold text-lg ${isActive ? 'text-lime' : 'text-text'}`}>
                      {program.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${colorClass}`}>
                        {program.category}
                      </span>
                      <span className="text-text-muted text-xs">{program.frequency}</span>
                      <span className="text-text-muted text-xs">·</span>
                      <span className="text-text-muted text-xs">{program.weeks} weeks</span>
                    </div>
                  </div>
                  {isActive && (
                    <div className="w-6 h-6 rounded-full bg-lime flex items-center justify-center shrink-0 mt-1">
                      <Check size={14} className="text-bg" />
                    </div>
                  )}
                </div>
                <p className="text-text-secondary text-sm mt-2 leading-relaxed">{program.description}</p>
                <div className="flex items-center gap-3 mt-3">
                  {program.days.slice(0, 4).map((day, di) => (
                    <span key={di} className="text-[10px] text-text-muted bg-bg-elevated px-2 py-0.5 rounded-full">
                      {day.title.length > 18 ? day.title.substring(0, 18) + '...' : day.title}
                    </span>
                  ))}
                  {program.days.length > 4 && (
                    <span className="text-[10px] text-text-muted">+{program.days.length - 4}</span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24 px-5 pt-14">
      {/* Program header — tappable to switch */}
      <div className="animate-fade-in mb-4">
        <button
          onClick={() => setShowProgramPicker(true)}
          className="w-full rounded-2xl bg-bg-card border border-border p-4 text-left transition-all hover:border-border-light active:scale-[0.99]"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-muted text-[10px] uppercase tracking-widest mb-1">Current Program</p>
              <p className="font-display text-xl font-bold">{selectedProgram.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${categoryColors[selectedProgram.category] || 'text-lime bg-lime/10'}`}>
                  {selectedProgram.category}
                </span>
                <span className="text-text-muted text-xs">{selectedProgram.frequency}</span>
                <span className="text-text-muted text-xs">·</span>
                <span className="text-text-muted text-xs">Week {currentWeek} of {selectedProgram.weeks}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-text-muted">
              <span className="text-[10px] uppercase tracking-wider">Switch</span>
              <ArrowRight size={14} />
            </div>
          </div>
        </button>
      </div>

      {/* Overall program progress */}
      <div className="animate-slide-up rounded-2xl bg-bg-card border border-border p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-text-secondary text-xs uppercase tracking-wider">Program Progress</p>
          <p className="text-lime font-display font-bold text-sm">{Math.round(programProgress)}%</p>
        </div>
        <div className="h-2 bg-bg-elevated rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-lime rounded-full transition-all duration-700 ease-out"
            style={{ width: `${programProgress}%` }}
          />
        </div>
        <p className="text-text-muted text-xs">
          {programSessions.length} of {totalProgramSessions} sessions completed
        </p>
      </div>

      {/* Today's progress */}
      <div className="animate-slide-up [animation-delay:50ms] opacity-0 flex gap-1.5 mb-4">
        {days.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-1.5 rounded-full transition-colors ${
              completedToday.has(i) ? 'bg-lime' : 'bg-bg-elevated'
            }`}
          />
        ))}
      </div>

      {/* Training days */}
      <div className="space-y-3">
        {days.map((day, i) => {
          const done = completedToday.has(i)
          return (
            <button
              key={day.day}
              onClick={() => navigate(`/training/${i}`)}
              className={`animate-slide-up opacity-0 w-full rounded-2xl border p-4 transition-all duration-200 text-left active:scale-[0.98] ${
                done
                  ? 'bg-lime/5 border-lime/20 hover:border-lime/30'
                  : 'bg-bg-card border-border hover:border-border-light'
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      done ? 'bg-lime/20' : 'bg-lime/10'
                    }`}
                  >
                    {done ? (
                      <Check size={20} className="text-lime" />
                    ) : (
                      <Play size={20} className="text-lime ml-0.5" />
                    )}
                  </div>
                  <div>
                    <p className="text-text-secondary text-xs">{day.day}</p>
                    <p className={`font-display font-semibold ${done ? 'text-lime' : 'text-text'}`}>
                      {day.title}
                    </p>
                    <p className="text-text-muted text-xs mt-0.5">
                      {day.exercises.length} exercises · {day.duration}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Daily summary */}
      {completedDays > 0 && (
        <div className="animate-fade-in mt-6 rounded-2xl bg-lime/5 border border-lime/20 p-4 text-center">
          <p className="font-display font-semibold text-lime text-sm">
            {completedDays} of {days.length} sessions completed today
          </p>
        </div>
      )}

      {/* Session history */}
      {programSessions.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 text-text-secondary text-sm mb-3"
          >
            <History size={16} />
            <span className="font-display font-semibold">Session History</span>
            <span className="text-text-muted text-xs">({programSessions.length})</span>
            {showHistory ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {showHistory && (
            <div className="space-y-3 animate-fade-in">
              {uniqueDates.length === 0 ? (
                <p className="text-text-muted text-sm py-4 text-center">No past sessions yet</p>
              ) : (
                uniqueDates.map((date) => {
                  const daySessions = pastSessions.filter((s) => s.date === date)
                  return (
                    <div key={date} className="rounded-2xl bg-bg-card border border-border p-4">
                      <p className="font-display font-semibold text-sm mb-2">{formatDate(date)}</p>
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
                                <span className="font-display font-semibold text-xs">{day.title}</span>
                                <span className="text-text-muted text-[10px] ml-auto">{totalSets} sets</span>
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
