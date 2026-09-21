import { useState, useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom'
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
  Ticket,
  Copy,
  Check,
  Trash2,
  MessageSquare,
  DollarSign,
  ChevronRight,
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/auth'
import { allPrograms } from '../lib/programs'
import { createInviteCode, listInviteCodes, deactivateInviteCode, type InviteCode } from '../lib/invite-codes'

const COACH_EMAILS = ['tyler21welch@gmail.com', 'test@ctctest.com']
const SUBSCRIPTION_PRICE = 29.99

type AthleteProfile = {
  id: string
  name: string | null
  email: string
  identity: string | null
  onboarded: boolean
  created_at: string
  subscription_status: string | null
  subscription_source: string | null
}

type Broadcast = {
  id: string
  message: string
  created_at: string
}

type DirectMessage = {
  id: string
  sender_id: string
  recipient_id: string
  message: string
  read: boolean
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
    color: 'text-cyan-400',
  },
  {
    label: 'Send Broadcast',
    desc: 'Message all active athletes',
    icon: Send,
    href: null,
    action: 'broadcast',
    color: 'text-blue-400',
  },
]

const contentSections = [
  { label: 'Programs & Workouts', icon: Dumbbell, status: 'Active' },
  { label: 'Video Library', icon: Video, status: 'Active' },
  { label: 'Journal Prompts', icon: BookOpen, status: 'Active' },
  { label: 'Devotionals', icon: Quote, status: 'Active' },
]

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function getStatusBadge(status: string | null, source: string | null) {
  if (status === 'active' || status === 'trialing') {
    return { label: source === 'invite' ? 'Invited' : 'Paid', bg: 'bg-lime/10', text: 'text-lime' }
  }
  if (status === 'past_due') {
    return { label: 'Past Due', bg: 'bg-amber-400/10', text: 'text-amber-400' }
  }
  if (status === 'canceled') {
    return { label: 'Canceled', bg: 'bg-red-400/10', text: 'text-red-400' }
  }
  return { label: 'Free', bg: 'bg-white/[0.04]', text: 'text-text-muted' }
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
  const [selectedAthlete, setSelectedAthlete] = useState<AthleteProfile | null>(null)
  const [athleteStats, setAthleteStats] = useState<{ sessions: number; lastActive: string | null; checkIns: number }>({ sessions: 0, lastActive: null, checkIns: 0 })
  const [inviteCodes, setInviteCodes] = useState<InviteCode[]>([])
  const [showCreateCode, setShowCreateCode] = useState(false)
  const [newCodeLabel, setNewCodeLabel] = useState('')
  const [newCodeUses, setNewCodeUses] = useState(1)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [dmText, setDmText] = useState('')
  const [sendingDm, setSendingDm] = useState(false)
  const [sentDm, setSentDm] = useState(false)
  const [athleteMessages, setAthleteMessages] = useState<DirectMessage[]>([])
  const [rosterFilter, setRosterFilter] = useState<'all' | 'paid' | 'free'>('all')
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({})
  const messagesEndRef = useRef<HTMLDivElement>(null)

  if (!user || !COACH_EMAILS.includes(user.email)) {
    return <Navigate to="/dashboard" replace />
  }

  const loadAthletes = async () => {
    setLoading(true)
    try {
      const { data } = await supabase
        .from('profiles')
        .select('id, name, email, identity, onboarded, created_at, subscription_status, subscription_source')
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

  const loadUnreadCounts = async () => {
    if (!user) return
    try {
      const { data } = await supabase
        .from('messages')
        .select('sender_id')
        .eq('recipient_id', user.id)
        .eq('read', false)
      if (data) {
        const counts: Record<string, number> = {}
        data.forEach((m: { sender_id: string }) => {
          counts[m.sender_id] = (counts[m.sender_id] || 0) + 1
        })
        setUnreadCounts(counts)
      }
    } catch {
      // messages table may not exist yet
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

  const openAthleteDetail = async (athlete: AthleteProfile) => {
    setSelectedAthlete(athlete)
    setAthleteStats({ sessions: 0, lastActive: null, checkIns: 0 })
    setAthleteMessages([])
    setDmText('')
    setSentDm(false)

    try {
      const [sessionsRes, checkInsRes] = await Promise.all([
        supabase
          .from('completed_sessions')
          .select('date')
          .eq('user_id', athlete.id)
          .order('date', { ascending: false }),
        supabase
          .from('check_ins')
          .select('date')
          .eq('user_id', athlete.id),
      ])
      setAthleteStats({
        sessions: sessionsRes.data?.length || 0,
        lastActive: sessionsRes.data?.[0]?.date || null,
        checkIns: checkInsRes.data?.length || 0,
      })
    } catch {
      // tables may not exist yet
    }

    loadAthleteMessages(athlete.id)
  }

  const loadAthleteMessages = async (athleteId: string) => {
    if (!user) return
    try {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${user.id},recipient_id.eq.${athleteId}),and(sender_id.eq.${athleteId},recipient_id.eq.${user.id})`)
        .order('created_at', { ascending: true })
        .limit(50)
      setAthleteMessages(data || [])

      // mark athlete's messages as read
      if (data?.some((m: DirectMessage) => m.sender_id === athleteId && !m.read)) {
        await supabase
          .from('messages')
          .update({ read: true })
          .eq('sender_id', athleteId)
          .eq('recipient_id', user.id)
          .eq('read', false)
        loadUnreadCounts()
      }
    } catch {
      // messages table may not exist yet
    }
  }

  const sendDirectMessage = async () => {
    if (!dmText.trim() || !user || !selectedAthlete) return
    setSendingDm(true)
    try {
      await supabase.from('messages').insert({
        sender_id: user.id,
        recipient_id: selectedAthlete.id,
        message: dmText.trim(),
      })
      setDmText('')
      setSentDm(true)
      setTimeout(() => setSentDm(false), 1500)
      loadAthleteMessages(selectedAthlete.id)
    } catch {
      // messages table may not exist yet
    }
    setSendingDm(false)
  }

  const loadInviteCodes = async () => {
    const codes = await listInviteCodes()
    setInviteCodes(codes)
  }

  const handleCreateCode = async () => {
    if (!newCodeLabel.trim()) return
    await createInviteCode(newCodeLabel.trim(), newCodeUses)
    setNewCodeLabel('')
    setNewCodeUses(1)
    setShowCreateCode(false)
    await loadInviteCodes()
  }

  const handleDeactivateCode = async (code: string) => {
    await deactivateInviteCode(code)
    loadInviteCodes()
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  useEffect(() => {
    loadAthletes()
    loadBroadcasts()
    loadInviteCodes()
    loadUnreadCounts()
  }, [])

  useEffect(() => {
    if (messagesEndRef.current && athleteMessages.length > 0) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [athleteMessages])

  const nonCoachAthletes = athletes.filter((a) => !COACH_EMAILS.includes(a.email))
  const athleteCount = nonCoachAthletes.filter((a) => a.onboarded).length
  const paidCount = nonCoachAthletes.filter((a) => a.subscription_status === 'active' || a.subscription_status === 'trialing').length
  const mrr = paidCount * SUBSCRIPTION_PRICE

  const filteredAthletes = nonCoachAthletes.filter((a) => {
    if (rosterFilter === 'paid') return a.subscription_status === 'active' || a.subscription_status === 'trialing'
    if (rosterFilter === 'free') return !a.subscription_status || a.subscription_status === 'canceled' || a.subscription_status === 'past_due'
    return true
  })

  const totalUnread = Object.values(unreadCounts).reduce((s, c) => s + c, 0)

  return (
    <div className="min-h-screen pb-28 px-5 pt-14">
      <div className="animate-fade-in mb-6">
        <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Coach View</p>
        <h1 className="font-display text-2xl font-bold">Command Center</h1>
      </div>

      {/* Quick stats */}
      <div className="animate-slide-up grid grid-cols-4 gap-2.5 mb-6">
        <div className="rounded-2xl bg-bg-card border border-border p-3 text-center">
          <Users size={16} className="text-lime mx-auto mb-1" />
          <p className="font-display font-bold text-lg">{athleteCount}</p>
          <p className="text-text-muted text-[9px]">Athletes</p>
        </div>
        <div className="rounded-2xl bg-bg-card border border-border p-3 text-center">
          <DollarSign size={16} className="text-cyan-400 mx-auto mb-1" />
          <p className="font-display font-bold text-lg">{paidCount}</p>
          <p className="text-text-muted text-[9px]">Paying</p>
        </div>
        <div className="rounded-2xl bg-bg-card border border-border p-3 text-center">
          <BarChart3 size={16} className="text-blue-400 mx-auto mb-1" />
          <p className="font-display font-bold text-lg">${mrr.toFixed(0)}</p>
          <p className="text-text-muted text-[9px]">MRR</p>
        </div>
        <div className="rounded-2xl bg-bg-card border border-border p-3 text-center relative">
          <MessageSquare size={16} className="text-indigo-400 mx-auto mb-1" />
          <p className="font-display font-bold text-lg">{totalUnread}</p>
          <p className="text-text-muted text-[9px]">Unread</p>
          {totalUnread > 0 && (
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          )}
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

      {/* Invite Codes */}
      <div className="animate-slide-up [animation-delay:150ms] opacity-0 rounded-2xl bg-bg-card border border-border p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Ticket size={16} className="text-lime" />
            <p className="font-display font-semibold">Invite Codes</p>
          </div>
          <button
            onClick={() => setShowCreateCode(!showCreateCode)}
            className="text-[11px] font-display font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg bg-lime/10 text-lime hover:bg-lime/20 transition-colors"
          >
            {showCreateCode ? 'Cancel' : '+ New Code'}
          </button>
        </div>

        {showCreateCode && (
          <div className="mb-4 p-3 rounded-xl bg-bg-elevated space-y-3">
            <input
              type="text"
              placeholder="Label (e.g. Marie, VIP Client)"
              value={newCodeLabel}
              onChange={(e) => setNewCodeLabel(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3 text-sm placeholder-text-muted focus:outline-none focus:border-lime/30"
            />
            <div className="flex items-center gap-3">
              <label className="text-text-muted text-xs">Max uses:</label>
              <div className="flex gap-2">
                {[1, 5, 50].map((n) => (
                  <button
                    key={n}
                    onClick={() => setNewCodeUses(n)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      newCodeUses === n
                        ? 'bg-lime/20 text-lime'
                        : 'bg-white/[0.04] text-text-muted hover:text-text'
                    }`}
                  >
                    {n === 50 ? 'Unlimited' : n}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={handleCreateCode}
              disabled={!newCodeLabel.trim()}
              className="w-full py-2.5 rounded-xl font-display font-bold text-sm bg-lime text-black disabled:opacity-40 transition-all active:scale-[0.98]"
            >
              Generate Code
            </button>
          </div>
        )}

        {inviteCodes.length === 0 ? (
          <p className="text-text-muted text-sm text-center py-4">
            No invite codes yet. Create one to give someone free access.
          </p>
        ) : (
          <div className="space-y-2">
            {inviteCodes.map((ic) => (
              <div
                key={ic.code}
                className={`flex items-center gap-3 p-3 rounded-xl bg-bg-elevated ${!ic.active ? 'opacity-40' : ''}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-mono font-bold text-sm tracking-wider">{ic.code}</p>
                    <span className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                      !ic.active
                        ? 'bg-red-500/10 text-red-400'
                        : ic.used_count >= ic.max_uses
                        ? 'bg-text-muted/10 text-text-muted'
                        : 'bg-lime/10 text-lime'
                    }`}>
                      {!ic.active ? 'Off' : ic.used_count >= ic.max_uses ? 'Used' : 'Active'}
                    </span>
                  </div>
                  <p className="text-text-muted text-xs mt-0.5">
                    {ic.label} · {ic.used_count}/{ic.max_uses} used
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleCopyCode(ic.code)}
                    className="p-2 rounded-lg hover:bg-white/[0.04] transition-colors"
                    title="Copy code"
                  >
                    {copiedCode === ic.code ? (
                      <Check size={14} className="text-lime" />
                    ) : (
                      <Copy size={14} className="text-text-muted" />
                    )}
                  </button>
                  {ic.active && (
                    <button
                      onClick={() => handleDeactivateCode(ic.code)}
                      className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                      title="Deactivate"
                    >
                      <Trash2 size={14} className="text-text-muted hover:text-red-400" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
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
            <Megaphone size={16} className="text-blue-400" />
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

        {/* Filter tabs */}
        <div className="flex gap-2 mb-3">
          {(['all', 'paid', 'free'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setRosterFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                rosterFilter === f
                  ? 'bg-lime/15 text-lime'
                  : 'bg-white/[0.04] text-text-muted hover:text-text'
              }`}
            >
              {f === 'all' ? `All (${nonCoachAthletes.length})` : f === 'paid' ? `Paid (${paidCount})` : `Free (${nonCoachAthletes.length - paidCount})`}
            </button>
          ))}
        </div>

        {filteredAthletes.length === 0 ? (
          <div className="py-8 text-center">
            <Users size={32} className="text-text-muted mx-auto mb-2" />
            <p className="text-text-muted text-sm">
              {rosterFilter === 'all' ? 'No athletes yet' : `No ${rosterFilter} athletes`}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredAthletes.map((athlete) => {
              const badge = getStatusBadge(athlete.subscription_status, athlete.subscription_source)
              const unread = unreadCounts[athlete.id] || 0
              return (
                <button
                  key={athlete.id}
                  onClick={() => openAthleteDetail(athlete)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-bg-elevated hover:bg-bg-elevated/80 transition-colors text-left"
                >
                  <div className="w-9 h-9 rounded-xl bg-lime/10 flex items-center justify-center shrink-0 relative">
                    <span className="font-display text-lime text-sm font-bold">
                      {(athlete.name || athlete.email).charAt(0).toUpperCase()}
                    </span>
                    {unread > 0 && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-400 flex items-center justify-center">
                        <span className="text-[8px] font-bold text-white">{unread}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-sm truncate">
                      {athlete.name || 'No name'}
                    </p>
                    <p className="text-text-muted text-xs truncate">{athlete.email}</p>
                  </div>
                  <div className="text-right shrink-0 flex items-center gap-2">
                    <div>
                      <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${badge.bg} ${badge.text}`}>
                        {badge.label}
                      </span>
                      <p className="text-text-muted text-[10px] mt-1">
                        {formatDate(athlete.created_at)}
                      </p>
                    </div>
                    <ChevronRight size={14} className="text-text-muted" />
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Athlete Detail Modal */}
      {selectedAthlete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-5">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedAthlete(null)}
          />
          <div className="relative w-full max-w-lg bg-bg-card border border-border rounded-2xl p-6 animate-slide-up max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-lime/10 flex items-center justify-center">
                  <span className="font-display text-lime text-lg font-bold">
                    {(selectedAthlete.name || selectedAthlete.email).charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg">{selectedAthlete.name || 'No name'}</h2>
                  <p className="text-text-muted text-xs">{selectedAthlete.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAthlete(null)}
                className="p-2 rounded-xl hover:bg-bg-elevated transition-colors"
              >
                <X size={18} className="text-text-muted" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="rounded-xl bg-bg-elevated p-3 text-center">
                <p className="text-text-muted text-[10px] uppercase tracking-wider mb-1">Identity</p>
                <p className="font-display font-semibold text-sm capitalize">{selectedAthlete.identity || 'Not set'}</p>
              </div>
              <div className="rounded-xl bg-bg-elevated p-3 text-center">
                <p className="text-text-muted text-[10px] uppercase tracking-wider mb-1">Status</p>
                <p className={`font-display font-semibold text-sm ${selectedAthlete.onboarded ? 'text-lime' : 'text-cyan-400'}`}>
                  {selectedAthlete.onboarded ? 'Active' : 'New'}
                </p>
              </div>
              <div className="rounded-xl bg-bg-elevated p-3 text-center">
                <p className="text-text-muted text-[10px] uppercase tracking-wider mb-1">Plan</p>
                {(() => {
                  const badge = getStatusBadge(selectedAthlete.subscription_status, selectedAthlete.subscription_source)
                  return <p className={`font-display font-semibold text-sm ${badge.text}`}>{badge.label}</p>
                })()}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="rounded-xl bg-bg-elevated p-3 text-center">
                <p className="font-display font-bold text-xl">{athleteStats.sessions}</p>
                <p className="text-text-muted text-[10px]">Sessions</p>
              </div>
              <div className="rounded-xl bg-bg-elevated p-3 text-center">
                <p className="font-display font-bold text-xl">{athleteStats.checkIns}</p>
                <p className="text-text-muted text-[10px]">Check-ins</p>
              </div>
              <div className="rounded-xl bg-bg-elevated p-3 text-center">
                <p className="font-display font-bold text-sm">
                  {athleteStats.lastActive
                    ? new Date(athleteStats.lastActive + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    : '—'}
                </p>
                <p className="text-text-muted text-[10px]">Last Active</p>
              </div>
            </div>

            <div className="rounded-xl bg-bg-elevated p-3 mb-4">
              <p className="text-text-muted text-[10px] uppercase tracking-wider mb-1">Joined</p>
              <p className="text-sm">{new Date(selectedAthlete.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>

            {/* Message thread */}
            <div className="rounded-xl bg-bg-elevated p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare size={14} className="text-cyan-400" />
                <p className="font-display font-semibold text-sm">Direct Messages</p>
              </div>

              {athleteMessages.length > 0 && (
                <div className="max-h-48 overflow-y-auto space-y-2 mb-3 scrollbar-thin">
                  {athleteMessages.map((m) => {
                    const isCoach = m.sender_id === user!.id
                    return (
                      <div key={m.id} className={`flex ${isCoach ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-xl px-3 py-2 ${
                          isCoach
                            ? 'bg-cyan-400/15 text-text'
                            : 'bg-white/[0.06] text-text'
                        }`}>
                          <p className="text-sm leading-relaxed">{m.message}</p>
                          <p className="text-text-muted text-[9px] mt-1">
                            {new Date(m.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                            {' · '}
                            {new Date(m.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </div>
              )}

              {athleteMessages.length === 0 && (
                <p className="text-text-muted text-xs text-center py-3 mb-3">No messages yet. Start the conversation.</p>
              )}

              {sentDm ? (
                <div className="flex items-center justify-center gap-2 py-2">
                  <Check size={14} className="text-lime" />
                  <span className="text-lime text-sm font-display font-bold">Message Sent</span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={dmText}
                    onChange={(e) => setDmText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendDirectMessage() } }}
                    placeholder={`Message ${selectedAthlete.name || 'athlete'}...`}
                    className="flex-1 bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2.5 text-sm placeholder-text-muted focus:outline-none focus:border-cyan-400/30"
                  />
                  <button
                    onClick={sendDirectMessage}
                    disabled={!dmText.trim() || sendingDm}
                    className="px-4 rounded-xl bg-cyan-400 text-black font-display font-bold text-sm disabled:opacity-40 transition-all active:scale-95"
                  >
                    <Send size={16} />
                  </button>
                </div>
              )}
            </div>

            <a
              href={`mailto:${selectedAthlete.email}`}
              className="w-full py-3 rounded-xl font-display font-bold text-sm bg-lime/10 text-lime text-center block hover:bg-lime/20 transition-colors"
            >
              Email Athlete
            </a>
          </div>
        </div>
      )}

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
                <Megaphone size={20} className="text-blue-400" />
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
              Goes to every athlete's home screen.
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
                  className="w-full py-3.5 rounded-xl font-display font-bold text-sm bg-blue-400 text-white disabled:opacity-40 transition-all active:scale-[0.98]"
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
