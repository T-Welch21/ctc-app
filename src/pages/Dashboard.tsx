import { Flame, ChevronRight, Quote } from 'lucide-react'
import { useAuth } from '../lib/auth'

const devotionals = [
  { text: "You were not created to settle. You were created to lead.", author: "Coach Tyler" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
  { text: "The only way to prove you are a good sport is to lose.", author: "Ernie Banks" },
  { text: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke" },
  { text: "Champions keep playing until they get it right.", author: "Billie Jean King" },
]

function getDevotional() {
  const day = Math.floor(Date.now() / 86400000)
  return devotionals[day % devotionals.length]
}

export default function Dashboard() {
  const { user } = useAuth()
  const firstName = user?.name?.split(' ')[0] || 'Competitor'
  const devotional = getDevotional()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const trackName = user?.identity === 'athlete' ? 'Athletic Performance' : 'Executive Performance Protocol'

  return (
    <div className="min-h-screen pb-24 px-5 pt-14">
      {/* Header */}
      <div className="animate-fade-in mb-6">
        <p className="text-text-secondary text-sm">{greeting}</p>
        <h1 className="font-display text-2xl font-bold mt-0.5">
          {firstName} <span className="text-lime">.</span>
        </h1>
      </div>

      {/* Streak card */}
      <div className="animate-slide-up rounded-2xl bg-bg-card border border-border p-5 mb-4 gradient-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Flame size={20} className="text-text-muted" />
            <span className="font-display font-semibold text-sm">Current Streak</span>
          </div>
          <span className="text-text-muted text-xs">Start training to begin</span>
        </div>
        <div className="flex gap-1.5">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full h-2 rounded-full bg-bg-elevated" />
              <span className="text-[10px] text-text-muted">{day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Session */}
      <div className="animate-slide-up [animation-delay:100ms] opacity-0 rounded-2xl bg-bg-card border border-border p-5 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Today's Session</p>
            <p className="font-display font-semibold">No session scheduled</p>
            <p className="text-text-muted text-sm mt-1">{trackName} track</p>
          </div>
          <ChevronRight size={20} className="text-text-muted" />
        </div>
      </div>

      {/* Devotional */}
      <div className="animate-slide-up [animation-delay:200ms] opacity-0 rounded-2xl bg-bg-card border border-border p-5 mb-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-lime/10 shrink-0 mt-0.5">
            <Quote size={18} className="text-lime" />
          </div>
          <div>
            <p className="text-text-secondary text-xs uppercase tracking-wider mb-2">Daily Devotional</p>
            <p className="font-display font-medium text-[15px] leading-relaxed italic">
              "{devotional.text}"
            </p>
            <p className="text-text-muted text-sm mt-2">— {devotional.author}</p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="animate-slide-up [animation-delay:300ms] opacity-0 grid grid-cols-2 gap-3">
        <button className="rounded-2xl bg-bg-card border border-border p-4 text-left hover:border-border-light transition-colors">
          <p className="font-display font-semibold text-sm">Weekly Check-in</p>
          <p className="text-text-muted text-xs mt-1">Log your progress</p>
        </button>
        <button className="rounded-2xl bg-bg-card border border-border p-4 text-left hover:border-border-light transition-colors">
          <p className="font-display font-semibold text-sm">Message Coach</p>
          <p className="text-text-muted text-xs mt-1">Connect with Tyler</p>
        </button>
      </div>
    </div>
  )
}
