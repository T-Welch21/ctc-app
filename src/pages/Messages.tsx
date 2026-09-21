import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Megaphone, Clock, MessageSquare, Send, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/auth'

const COACH_EMAILS = ['tyler21welch@gmail.com', 'test@ctctest.com']

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

export default function Messages() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([])
  const [directMessages, setDirectMessages] = useState<DirectMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'inbox' | 'broadcasts'>('inbox')
  const [replyText, setReplyText] = useState('')
  const [sending, setSending] = useState(false)
  const [sentReply, setSentReply] = useState(false)
  const [coachId, setCoachId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const loadBroadcasts = async () => {
    try {
      const { data } = await supabase
        .from('broadcasts')
        .select('id, message, created_at')
        .order('created_at', { ascending: false })
        .limit(50)
      setBroadcasts(data || [])
    } catch {
      // table may not exist
    }
  }

  const loadDirectMessages = async () => {
    if (!user) return
    try {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order('created_at', { ascending: true })
        .limit(100)
      setDirectMessages(data || [])

      if (data && data.length > 0) {
        const otherId = data.find((m: DirectMessage) => m.sender_id !== user.id)?.sender_id
          || data.find((m: DirectMessage) => m.recipient_id !== user.id)?.recipient_id
        if (otherId) setCoachId(otherId)
      }

      const unread = data?.filter((m: DirectMessage) => m.recipient_id === user.id && !m.read)
      if (unread && unread.length > 0) {
        await supabase
          .from('messages')
          .update({ read: true })
          .eq('recipient_id', user.id)
          .eq('read', false)
      }
    } catch {
      // messages table may not exist
    }
  }

  const findCoachId = async () => {
    if (coachId) return coachId
    try {
      const { data } = await supabase
        .from('profiles')
        .select('id, email')
        .in('email', COACH_EMAILS)
        .limit(1)
      if (data && data.length > 0) {
        setCoachId(data[0].id)
        return data[0].id
      }
    } catch {
      // may not have permission
    }
    return null
  }

  const sendReply = async () => {
    if (!replyText.trim() || !user) return
    setSending(true)
    const recipientId = await findCoachId()
    if (!recipientId) {
      setSending(false)
      return
    }
    try {
      await supabase.from('messages').insert({
        sender_id: user.id,
        recipient_id: recipientId,
        message: replyText.trim(),
      })
      setReplyText('')
      setSentReply(true)
      setTimeout(() => setSentReply(false), 1500)
      loadDirectMessages()
    } catch {
      // messages table may not exist
    }
    setSending(false)
  }

  useEffect(() => {
    Promise.all([loadBroadcasts(), loadDirectMessages()]).then(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!user) return
    const channel = supabase
      .channel('messages-realtime')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `recipient_id=eq.${user.id}`,
      }, () => {
        loadDirectMessages()
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [user?.id])

  useEffect(() => {
    if (messagesEndRef.current && directMessages.length > 0 && tab === 'inbox') {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [directMessages, tab])

  const hasDirectMessages = directMessages.length > 0

  return (
    <div className="min-h-screen pb-10 px-5 pt-14 flex flex-col">
      <div className="animate-fade-in mb-4">
        <div className="flex items-center gap-3 mb-1">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-bg-elevated flex items-center justify-center text-text-muted hover:text-text transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight">Messages</h1>
            <p className="text-text-muted text-[10px] uppercase tracking-[0.2em]">Coach Tyler</p>
          </div>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab('inbox')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-display font-bold transition-colors ${
            tab === 'inbox'
              ? 'bg-cyan-400/15 text-cyan-400'
              : 'bg-bg-card text-text-muted'
          }`}
        >
          <MessageSquare size={14} className="inline mr-1.5 -mt-0.5" />
          Direct
          {hasDirectMessages && <span className="ml-1 text-[10px]">({directMessages.length})</span>}
        </button>
        <button
          onClick={() => setTab('broadcasts')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-display font-bold transition-colors ${
            tab === 'broadcasts'
              ? 'bg-blue-400/15 text-blue-400'
              : 'bg-bg-card text-text-muted'
          }`}
        >
          <Megaphone size={14} className="inline mr-1.5 -mt-0.5" />
          Announcements
          {broadcasts.length > 0 && <span className="ml-1 text-[10px]">({broadcasts.length})</span>}
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center">
          <div className="w-8 h-8 border-2 border-lime border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : tab === 'inbox' ? (
        <div className="flex-1 flex flex-col">
          {!hasDirectMessages ? (
            <div className="py-12 text-center flex-1 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-bg-card border border-border flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={28} className="text-text-muted" />
              </div>
              <p className="font-display font-bold text-lg tracking-tight mb-1">No messages yet</p>
              <p className="text-text-muted text-sm mb-6">Send Coach Tyler a message below</p>
            </div>
          ) : (
            <div className="flex-1 space-y-2 mb-4 overflow-y-auto">
              {directMessages.map((m) => {
                const isMe = m.sender_id === user?.id
                return (
                  <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      isMe
                        ? 'bg-cyan-400/15 rounded-br-md'
                        : 'bg-bg-card border border-border rounded-bl-md'
                    }`}>
                      <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${
                        isMe ? 'text-cyan-400' : 'text-lime'
                      }`}>
                        {isMe ? 'You' : 'Coach Tyler'}
                      </p>
                      <p className="text-sm leading-relaxed">{m.message}</p>
                      <p className="text-text-muted text-[9px] mt-1.5">
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

          {/* Reply input */}
          <div className="sticky bottom-0 pt-3 pb-2 bg-bg">
            {sentReply ? (
              <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-lime/10">
                <Check size={16} className="text-lime" />
                <span className="text-lime text-sm font-display font-bold">Sent!</span>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendReply() } }}
                  placeholder="Message Coach Tyler..."
                  className="flex-1 bg-bg-card border border-border rounded-xl px-4 py-3 text-sm placeholder-text-muted focus:outline-none focus:border-cyan-400/30"
                />
                <button
                  onClick={sendReply}
                  disabled={!replyText.trim() || sending}
                  className="px-4 rounded-xl bg-cyan-400 text-black font-display font-bold disabled:opacity-40 transition-all active:scale-95"
                >
                  <Send size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Broadcasts tab */
        broadcasts.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-bg-card border border-border flex items-center justify-center mx-auto mb-4">
              <Megaphone size={28} className="text-text-muted" />
            </div>
            <p className="font-display font-bold text-lg tracking-tight mb-1">No announcements</p>
            <p className="text-text-muted text-sm">Coach Tyler's announcements land here</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {broadcasts.map((b, i) => (
              <div
                key={b.id}
                className="animate-slide-up opacity-0 card-shine rounded-2xl bg-bg-card/80 border border-border p-4 relative overflow-hidden"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-400/20 via-cyan-400/5 to-transparent" />
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center shrink-0">
                    <Megaphone size={18} className="text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-cyan-400 text-[10px] font-bold uppercase tracking-[0.15em]">Coach Tyler</p>
                      <div className="flex items-center gap-1">
                        <Clock size={10} className="text-text-muted" />
                        <p className="text-text-muted text-[10px]">
                          {new Date(b.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed">{b.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  )
}
