import { TrendingUp, Scale, Calendar, Award } from 'lucide-react'

const stats = [
  { label: 'Sessions', value: '0', icon: Calendar, color: 'text-lime' },
  { label: 'Current Streak', value: '0', icon: TrendingUp, color: 'text-warning' },
  { label: 'PRs Set', value: '0', icon: Award, color: 'text-[#818cf8]' },
]

export default function Progress() {
  return (
    <div className="min-h-screen pb-24 px-5 pt-14">
      <div className="animate-fade-in mb-6">
        <h1 className="font-display text-2xl font-bold">Progress</h1>
        <p className="text-text-secondary text-sm mt-1">Track your growth over time</p>
      </div>

      {/* Stats row */}
      <div className="animate-slide-up grid grid-cols-3 gap-3 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-bg-card border border-border p-4 text-center">
            <stat.icon size={20} className={`${stat.color} mx-auto mb-2`} />
            <p className="font-display font-bold text-xl">{stat.value}</p>
            <p className="text-text-muted text-xs mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Weight tracking */}
      <div className="animate-slide-up [animation-delay:100ms] opacity-0 rounded-2xl bg-bg-card border border-border p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Scale size={18} className="text-text-secondary" />
            <p className="font-display font-semibold">Body Weight</p>
          </div>
          <button className="text-lime text-sm font-medium">Log</button>
        </div>
        {/* Placeholder chart area */}
        <div className="h-32 rounded-xl bg-bg-elevated border border-border flex items-center justify-center">
          <p className="text-text-muted text-sm">No data yet — log your first weigh-in</p>
        </div>
      </div>

      {/* Weekly check-in */}
      <div className="animate-slide-up [animation-delay:200ms] opacity-0 rounded-2xl bg-bg-card border border-border p-5 mb-4">
        <p className="font-display font-semibold mb-2">Weekly Check-in</p>
        <p className="text-text-secondary text-sm mb-4">
          Submit your weekly update so Coach Tyler can track your progress.
        </p>
        <button className="w-full border border-lime/30 text-lime font-display font-semibold py-3 rounded-xl hover:bg-lime/5 transition-colors">
          Start Check-in
        </button>
      </div>

      {/* Performance markers */}
      <div className="animate-slide-up [animation-delay:300ms] opacity-0 rounded-2xl bg-bg-card border border-border p-5">
        <p className="font-display font-semibold mb-3">Performance Markers</p>
        <div className="space-y-3">
          {['Bench Press', 'Squat', 'Deadlift', '40-Yard Dash'].map((lift) => (
            <div key={lift} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <span className="text-sm">{lift}</span>
              <span className="text-text-muted text-sm">No PR set</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
