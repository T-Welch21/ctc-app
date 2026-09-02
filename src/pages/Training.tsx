import { Check, Play } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { getProgram } from '../lib/programs'
import { getCompletedSessions, getCurrentWeek } from '../lib/storage'

export default function Training() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const program = getProgram(user?.identity || '')
  const days = program.days
  const sessions = user ? getCompletedSessions(user.id) : []
  const todayStr = new Date().toISOString().split('T')[0]

  const completedToday = new Set(
    sessions.filter((s) => s.date === todayStr).map((s) => s.dayIndex)
  )
  const completedDays = completedToday.size
  const currentWeek = user ? getCurrentWeek(user.id, program.weeks) : 1

  return (
    <div className="min-h-screen pb-24 px-5 pt-14">
      <div className="animate-fade-in mb-6">
        <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Current Program</p>
        <h1 className="font-display text-2xl font-bold">{program.name}</h1>
        <p className="text-text-muted text-sm mt-1">Week {currentWeek} of {program.weeks}</p>
      </div>

      {/* Week progress */}
      <div className="animate-slide-up flex gap-1.5 mb-6">
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
    </div>
  )
}
