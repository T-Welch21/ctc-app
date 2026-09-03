import { useState, useEffect } from 'react'
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
  RefreshCw,
  X,
  Megaphone,
  Clock,
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/auth'

type AthleteProfile = {
  id: string
  name: string | null
  email: string
  identity: string | null
  onboarded: boolean
  created_at: string
}

type Broadcast = {
  id: string
  message: string
  created_at: string
}

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
    href: 'sms:?&body=Hey! I would love if you could leave a quick Google review for Called to Compete. It really helps: https://g.page/r/calledtocompete/review',
    color: 'text-warning',
  },
  {
    label: 'Send Broadcast',
    desc: 'Message all active athletes',
    icon: Send,
    href: null,
    action: 'broadcast',
    color: 'text-[#818cf8]',
  },
]

const contentSections = [
  { label: 'Programs & Workouts', icon: Dumbbell, status: 'Active' },
  { label: 'Video Library', icon: Video, status: 'Coming soon' },
  { label: 'Journal Prompts', icon: BookOpen, status: 'Active' },
  { label: 'Devotionals', icon: Quote, status: 'Active' },
]

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function Command() {
  const { user } = useAuth()
  const [athletes, setAthletes] = useState<AthleteProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [showBroadcast, setShowBroadcast] = useState(false)
  const [broadcastMsg, setBroadcastMsg] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([])

  const loadAthletes = async () => {
    setLoading(true)
    try {
      const { data } = await supabase
        .from('profiles')
        .select('id, name, email, identity, onboarded, created_at')
        .order('created_at', { ascending: false })
      setAthletes(data || [])
    } catch {
      setAthletes([])
    }
    setLoading(false)
  }

  const loadBroadcasts = async () => {
    try {
      const { data } = await supabase
        .from('broadcasts')
        .select('id, message, created_at')
        .order('created_at', { ascending: false })
        .limit(5)
      setBroadcasts(data || [])
    } catch {
      setBroadcasts([])
    }
  }

  const sendBroadcast = async () => {
    if (!broadcastMsg.trim() || !user) return
    setSending(true)
    try {
      await supabase.from('broadcasts').insert({
        coach_id: user.id,
        message: broadcastMsg.trim(),
      })
      setSent(true)
      setBroadcastMsg('')
      loadBroadcasts()
      setTimeout(() => {
        setSent(false)
        setShowBroadcast(false)
      }, 1500)
    } catch {
      // table may not exist yet
    }
    setSending(false)
  }

  useEffect(() => {
    loadAthletes()
    loadBroadcasts()
  }, [])

  const athleteCount = athletes.filter((a) => a.onboarded).length

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
          <p className="font-display font-bold text-xl">{athleteCount}</p>
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
            const isLink = !!action.href
            const Tag = isLink ? 'a' : 'button'
            const props = isLink
              ? { href: action.href, target: action.href!.startsWith('http') ? '_blank' : undefined, rel: action.href!.startsWith('http') ? 'noopener noreferrer' : undefined }
              : { onClick: () => { if ((action as { action?: string }).action === 'broadcast') setShowBroadcast(true) } }
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
                {isLink && action.href!.startsWith('http') && (
                  <ExternalLink size={14} className="text-text-muted shrink-0" />
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

      {/* Recent Broadcasts */}
      {broadcasts.length > 0 && (
        <div className="animate-slide-up [animation-delay:250ms] opacity-0 rounded-2xl bg-bg-card border border-border p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Megaphone size={16} className="text-[#818cf8]" />
            <p className="font-display font-semibold">Recent Broadcasts</p>
          </div>
          <div className="space-y-2">
            {broadcasts.map((b) => (
              <div key={b.id} className="p-3 rounded-xl bg-bg-elevated">
                <p className="text-sm leading-relaxed">{b.message}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Clock size={10} className="text-text-muted" />
                  <p className="text-text-muted text-[10px]">
                    {new Date(b.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Roster */}
      <div className="animate-slide-up [animation-delay:300ms] opacity-0 rounded-2xl bg-bg-card border border-border p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="font-display font-semibold">Athlete Roster</p>
          <button
            onClick={loadAthletes}
            className="text-text-muted hover:text-text-secondary transition-colors"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        {athletes.length === 0 ? (
          <div className="py-8 text-center">
            <Users size={32} className="text-text-muted mx-auto mb-2" />
            <p className="text-text-muted text-sm">No athletes yet</p>
            <p className="text-text-muted text-xs mt-1">
              Athletes appear here when they sign up through the app
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {athletes.map((athlete) => (
              <div
                key={athlete.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-bg-elevated"
              >
                <div className="w-9 h-9 rounded-xl bg-lime/10 flex items-center justify-center shrink-0">
                  <span className="font-display text-lime text-sm font-bold">
                    {(athlete.name || athlete.email).charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-sm truncate">
                    {athlete.name || 'No name'}
                  </p>
                  <p className="text-text-muted text-xs truncate">{athlete.email}</p>
                </div>
                <div className="text-right shrink-0">
                  <span
                    className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      athlete.onboarded
                        ? 'bg-lime/10 text-lime'
                        : 'bg-warning/10 text-warning'
                    }`}
                  >
                    {athlete.onboarded ? 'Active' : 'New'}
                  </span>
                  <p className="text-text-muted text-[10px] mt-1">
                    {formatDate(athlete.created_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Broadcast Modal */}
      {showBroadcast && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-5">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => { setShowBroadcast(false); setBroadcastMsg(''); setSent(false) }}
          />
          <div className="relative w-full max-w-lg bg-bg-card border border-border rounded-2xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Megaphone size={20} className="text-[#818cf8]" />
                <h2 className="font-display font-bold text-lg">Send Broadcast</h2>
              </div>
              <button
                onClick={() => { setShowBroadcast(false); setBroadcastMsg(''); setSent(false) }}
                className="p-2 rounded-xl hover:bg-bg-elevated transition-colors"
              >
                <X size={18} className="text-text-muted" />
              </button>
            </div>

            <p className="text-text-secondary text-sm mb-4">
              This message will appear on every athlete's dashboard.
            </p>

            {sent ? (
              <div className="py-8 text-center">
                <div className="w-12 h-12 rounded-full bg-lime/10 flex items-center justify-center mx-auto mb-3">
                  <Send size={20} className="text-lime" />
                </div>
                <p className="font-display font-bold text-lg">Broadcast Sent</p>
                <p className="text-text-muted text-sm mt-1">Your athletes will see this message</p>
              </div>
            ) : (
              <>
                <textarea
                  value={broadcastMsg}
                  onChange={(e) => setBroadcastMsg(e.target.value)}
                  placeholder="Type your message to all athletes..."
                  rows={4}
                  className="w-full bg-bg-elevated border border-border rounded-xl p-4 text-sm placeholder-text-muted focus:outline-none focus:border-lime/50 resize-none"
                  maxLength={500}
                />
                <div className="flex items-center justify-between mt-2 mb-4">
                  <span className="text-text-muted text-xs">{broadcastMsg.length}/500</span>
                </div>
                <button
                  onClick={sendBroadcast}
                  disabled={!broadcastMsg.trim() || sending}
                  className="w-full py-3.5 rounded-xl font-display font-bold text-sm bg-[#818cf8] text-white disabled:opacity-40 transition-all active:scale-[0.98]"
                >
                  {sending ? 'Sending...' : 'Send to All Athletes'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
