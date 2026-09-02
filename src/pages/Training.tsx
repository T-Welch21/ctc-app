import { Lock, Play } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { getProgram } from '../lib/programs'

export default function Training() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const program = getProgram(user?.identity || '')
  const days = program.days

  return (
    <div className="min-h-screen pb-24 px-5 pt-14">
      <div className="animate-fade-in mb-6">
        <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Current Program</p>
        <h1 className="font-display text-2xl font-bold">{program.name}</h1>
        <p className="text-text-muted text-sm mt-1">Week 1 of {program.weeks}</p>
      </div>

      {/* Week progress */}
      <div className="animate-slide-up flex gap-1.5 mb-6">
        {days.map((_, i) => (
          <div key={i} className="flex-1 h-1.5 rounded-full bg-bg-elevated" />
        ))}
      </div>

      {/* Training days */}
      <div className="space-y-3">
        {days.map((day, i) => {
          const unlocked = i < 2
          return (
            <button
              key={day.day}
              onClick={() => unlocked && navigate(`/training/${i}`)}
              disabled={!unlocked}
              className={`animate-slide-up opacity-0 w-full rounded-2xl border p-4 transition-all duration-200 text-left ${
                unlocked
                  ? 'bg-bg-card border-border hover:border-border-light cursor-pointer active:scale-[0.98]'
                  : 'bg-bg-card/50 border-border/50 cursor-not-allowed'
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    unlocked ? 'bg-lime/10' : 'bg-bg-elevated'
                  }`}>
                    {unlocked
                      ? <Play size={20} className="text-lime ml-0.5" />
                      : <Lock size={16} className="text-text-muted" />
                    }
                  </div>
                  <div>
                    <p className="text-text-secondary text-xs">{day.day}</p>
                    <p className={`font-display font-semibold ${unlocked ? 'text-text' : 'text-text-muted'}`}>
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
    </div>
  )
}
