import { useState } from 'react'
import { Check, Play, ChevronDown, ChevronUp, History, Dumbbell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { getProgram } from '../lib/programs'
import { getCompletedSessions, getCurrentWeek, getExerciseNotes } from '../lib/storage'

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

export default function Training() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const program = getProgram(user?.identity || '')
  const days = program.days
  const sessions = user ? getCompletedSessions(user.id) : []
  const todayStr = new Date().toISOString().split('T')[0]
  const [showHistory, setShowHistory] = useState(false)

  const completedToday = new Set(
    sessions.filter((s) => s.date === todayStr).map((s) => s.dayIndex)
  )
  const completedDays = completedToday.size
  const currentWeek = user ? getCurrentWeek(user.id, program.weeks) : 1

  const totalProgramSessions = program.weeks * days.length
  const programProgress = totalProgramSessions > 0
    ? Math.min((sessions.length / totalProgramSessions) * 100, 100)
    : 0

  const allNotes = user ? getExerciseNotes(user.id) : []
  const pastSessions = [...sessions]
    .reverse()
    .filter((s) => s.date !== todayStr)
    .slice(0, 10)

  const uniqueDates = [...new Set(pastSessions.map((s) => s.date))]

  return (
    <div className="min-h-screen pb-24 px-5 pt-14">
      <div className="animate-fade-in mb-6">
        <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Current Program</p>
        <h1 className="font-display text-2xl font-bold">{program.name}</h1>
        <p className="text-text-muted text-sm mt-1">Week {currentWeek} of {program.weeks}</p>
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
          {sessions.length} of {totalProgramSessions} sessions completed
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
      {sessions.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 text-text-secondary text-sm mb-3"
          >
            <History size={16} />
            <span className="font-display font-semibold">Session History</span>
            <span className="text-text-muted text-xs">({sessions.length})</span>
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
                          const day = program.days[session.dayIndex]
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
