import {
  Users,
  BarChart3,
  ExternalLink,
  Dumbbell,
  BookOpen,
  Quote,
  Video,
  Send,
  Star,
} from 'lucide-react'

const quickActions = [
  {
    label: 'CTC Admin Dashboard',
    desc: 'Manage clients, ledger, calendar',
    icon: BarChart3,
    href: 'https://calledtocompete.net/admin/',
    color: 'text-lime',
  },
  {
    label: 'Request a Review',
    desc: 'Send Google review link to a client',
    icon: Star,
    href: 'sms:?&body=Hey! I'd love if you could leave a quick Google review for Called to Compete. It really helps: https://g.page/r/calledtocompete/review',
    color: 'text-warning',
  },
  {
    label: 'Send Broadcast',
    desc: 'Text all active athletes',
    icon: Send,
    href: null,
    color: 'text-[#818cf8]',
  },
]

const contentSections = [
  { label: 'Programs & Workouts', icon: Dumbbell, status: 'Active' },
  { label: 'Video Library', icon: Video, status: 'Coming soon' },
  { label: 'Journal Prompts', icon: BookOpen, status: 'Active' },
  { label: 'Devotionals', icon: Quote, status: 'Active' },
]

export default function Command() {
  return (
    <div className="min-h-screen pb-24 px-5 pt-14">
      <div className="animate-fade-in mb-6">
        <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Coach View</p>
        <h1 className="font-display text-2xl font-bold">Command Center</h1>
      </div>

      {/* Quick stats */}
      <div className="animate-slide-up grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-2xl bg-bg-card border border-border p-4 text-center">
          <Users size={18} className="text-lime mx-auto mb-1" />
          <p className="font-display font-bold text-xl">0</p>
          <p className="text-text-muted text-[10px]">Athletes</p>
        </div>
        <div className="rounded-2xl bg-bg-card border border-border p-4 text-center">
          <Dumbbell size={18} className="text-warning mx-auto mb-1" />
          <p className="font-display font-bold text-xl">2</p>
          <p className="text-text-muted text-[10px]">Programs</p>
        </div>
        <div className="rounded-2xl bg-bg-card border border-border p-4 text-center">
          <BarChart3 size={18} className="text-[#818cf8] mx-auto mb-1" />
          <p className="font-display font-bold text-xl">$0</p>
          <p className="text-text-muted text-[10px]">MRR</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="animate-slide-up [animation-delay:100ms] opacity-0 rounded-2xl bg-bg-card border border-border p-5 mb-4">
        <p className="font-display font-semibold mb-3">Quick Actions</p>
        <div className="space-y-2">
          {quickActions.map((action) => {
            const Tag = action.href ? 'a' : 'button'
            const props = action.href
              ? { href: action.href, target: action.href.startsWith('http') ? '_blank' : undefined, rel: action.href.startsWith('http') ? 'noopener noreferrer' : undefined }
              : {}
            return (
              <Tag
                key={action.label}
                {...(props as Record<string, string | undefined>)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-bg-elevated transition-colors text-left"
              >
                <div className="p-2 rounded-lg bg-bg-elevated">
                  <action.icon size={18} className={action.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-sm">{action.label}</p>
                  <p className="text-text-muted text-xs">{action.desc}</p>
                </div>
                {action.href?.startsWith('http') && (
                  <ExternalLink size={14} className="text-text-muted shrink-0" />
                )}
                {!action.href && (
                  <span className="text-text-muted text-[10px] uppercase tracking-wider shrink-0">
                    Soon
                  </span>
                )}
              </Tag>
            )
          })}
        </div>
      </div>

      {/* Content management */}
      <div className="animate-slide-up [animation-delay:200ms] opacity-0 rounded-2xl bg-bg-card border border-border p-5 mb-4">
        <p className="font-display font-semibold mb-3">Content</p>
        <div className="space-y-1">
          {contentSections.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 py-3 border-b border-border/50 last:border-0"
            >
              <item.icon size={16} className="text-text-secondary" />
              <span className="text-sm flex-1">{item.label}</span>
              <span
                className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  item.status === 'Active'
                    ? 'bg-lime/10 text-lime'
                    : 'bg-bg-elevated text-text-muted'
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Roster */}
      <div className="animate-slide-up [animation-delay:300ms] opacity-0 rounded-2xl bg-bg-card border border-border p-5">
        <p className="font-display font-semibold mb-3">Athlete Roster</p>
        <div className="py-8 text-center">
          <Users size={32} className="text-text-muted mx-auto mb-2" />
          <p className="text-text-muted text-sm">No athletes yet</p>
          <p className="text-text-muted text-xs mt-1">
            Athletes appear here when they subscribe through the app
          </p>
        </div>
      </div>
    </div>
  )
}
