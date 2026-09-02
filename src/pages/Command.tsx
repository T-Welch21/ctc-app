import { Users, MessageSquare, BarChart3, Plus } from 'lucide-react'

const mockRoster = [
  { name: 'No clients yet', track: '', status: '' },
]

export default function Command() {
  return (
    <div className="min-h-screen pb-24 px-5 pt-14">
      <div className="animate-fade-in flex items-center justify-between mb-6">
        <div>
          <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Coach View</p>
          <h1 className="font-display text-2xl font-bold">Command Center</h1>
        </div>
      </div>

      {/* Quick stats */}
      <div className="animate-slide-up grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-2xl bg-bg-card border border-border p-4 text-center">
          <Users size={18} className="text-lime mx-auto mb-1" />
          <p className="font-display font-bold text-xl">0</p>
          <p className="text-text-muted text-[10px]">Athletes</p>
        </div>
        <div className="rounded-2xl bg-bg-card border border-border p-4 text-center">
          <MessageSquare size={18} className="text-warning mx-auto mb-1" />
          <p className="font-display font-bold text-xl">0</p>
          <p className="text-text-muted text-[10px]">Messages</p>
        </div>
        <div className="rounded-2xl bg-bg-card border border-border p-4 text-center">
          <BarChart3 size={18} className="text-[#818cf8] mx-auto mb-1" />
          <p className="font-display font-bold text-xl">$0</p>
          <p className="text-text-muted text-[10px]">MRR</p>
        </div>
      </div>

      {/* Roster */}
      <div className="animate-slide-up [animation-delay:100ms] opacity-0 rounded-2xl bg-bg-card border border-border p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <p className="font-display font-semibold">Roster</p>
          <button className="flex items-center gap-1 text-lime text-sm font-medium">
            <Plus size={16} /> Add
          </button>
        </div>
        {mockRoster[0].name === 'No clients yet' ? (
          <div className="py-8 text-center">
            <Users size={32} className="text-text-muted mx-auto mb-2" />
            <p className="text-text-muted text-sm">No clients yet</p>
            <p className="text-text-muted text-xs mt-1">They'll appear here when they subscribe</p>
          </div>
        ) : null}
      </div>

      {/* Content management */}
      <div className="animate-slide-up [animation-delay:200ms] opacity-0 rounded-2xl bg-bg-card border border-border p-5 mb-4">
        <p className="font-display font-semibold mb-3">Content</p>
        <div className="space-y-2">
          {['Programs & Workouts', 'Video Library', 'Journal Content', 'Devotionals'].map((item) => (
            <button
              key={item}
              className="w-full flex items-center justify-between py-3 px-3 rounded-xl hover:bg-bg-elevated transition-colors text-left"
            >
              <span className="text-sm">{item}</span>
              <span className="text-text-muted text-xs">Manage →</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messaging */}
      <div className="animate-slide-up [animation-delay:300ms] opacity-0 rounded-2xl bg-bg-card border border-border p-5">
        <p className="font-display font-semibold mb-3">Messaging</p>
        <div className="py-6 text-center">
          <MessageSquare size={28} className="text-text-muted mx-auto mb-2" />
          <p className="text-text-muted text-sm">No conversations yet</p>
        </div>
      </div>
    </div>
  )
}
