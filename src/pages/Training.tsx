import { Lock, Play } from 'lucide-react'
import { useAuth } from '../lib/auth'

const athleticDays = [
  { day: 'Day 1', title: 'Lower Body Power', exercises: 5, duration: '55 min', unlocked: true },
  { day: 'Day 2', title: 'Upper Body Strength', exercises: 6, duration: '50 min', unlocked: true },
  { day: 'Day 3', title: 'Speed & Agility', exercises: 7, duration: '45 min', unlocked: false },
  { day: 'Day 4', title: 'Total Body Conditioning', exercises: 5, duration: '60 min', unlocked: false },
  { day: 'Day 5', title: 'Recovery & Mobility', exercises: 8, duration: '35 min', unlocked: false },
]

const executiveDays = [
  { day: 'Day 1', title: 'Strength Foundations', exercises: 5, duration: '45 min', unlocked: true },
  { day: 'Day 2', title: 'Conditioning + Breathwork', exercises: 6, duration: '40 min', unlocked: true },
  { day: 'Day 3', title: 'Focus & Power', exercises: 5, duration: '50 min', unlocked: false },
  { day: 'Day 4', title: 'Recovery & Mobility', exercises: 7, duration: '30 min', unlocked: false },
]

export default function Training() {
  const { user } = useAuth()
  const isAthlete = user?.identity === 'athlete'
  const trackName = isAthlete ? 'Athletic Performance' : 'Executive Performance Protocol'
  const days = isAthlete ? athleticDays : executiveDays

  return (
    <div className="min-h-screen pb-24 px-5 pt-14">
      <div className="animate-fade-in mb-6">
        <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Current Program</p>
        <h1 className="font-display text-2xl font-bold">{trackName}</h1>
        <p className="text-text-muted text-sm mt-1">Week 1 of 4</p>
      </div>

      {/* Week progress */}
      <div className="animate-slide-up flex gap-1.5 mb-6">
        {days.map((_, i) => (
          <div key={i} className="flex-1 h-1.5 rounded-full bg-bg-elevated" />
        ))}
      </div>

      {/* Training days */}
      <div className="space-y-3">
        {days.map((session, i) => (
          <div
            key={session.day}
            className={`animate-slide-up opacity-0 rounded-2xl border p-4 transition-all duration-200 ${
              session.unlocked
                ? 'bg-bg-card border-border hover:border-border-light cursor-pointer'
                : 'bg-bg-card/50 border-border/50'
            }`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  session.unlocked ? 'bg-lime/10' : 'bg-bg-elevated'
                }`}>
                  {session.unlocked
                    ? <Play size={20} className="text-lime ml-0.5" />
                    : <Lock size={16} className="text-text-muted" />
                  }
                </div>
                <div>
                  <p className="text-text-secondary text-xs">{session.day}</p>
                  <p className={`font-display font-semibold ${session.unlocked ? 'text-text' : 'text-text-muted'}`}>
                    {session.title}
                  </p>
                  <p className="text-text-muted text-xs mt-0.5">
                    {session.exercises} exercises · {session.duration}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
