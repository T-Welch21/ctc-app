import { useState, useEffect, useRef } from 'react'
import { Trophy, Send, MessageSquare, Flame, Users } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { supabase } from '../lib/supabase'

type Post = {
  id: string
  user_id: string
  user_name: string
  message: string
  post_type: 'win' | 'general'
  created_at: string
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function Community() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [postType, setPostType] = useState<'general' | 'win'>('general')
  const [filter, setFilter] = useState<'all' | 'wins'>('all')
  const [sending, setSending] = useState(false)
  const feedRef = useRef<HTMLDivElement>(null)

  const fetchPosts = async () => {
    let query = supabase
      .from('community_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (filter === 'wins') {
      query = query.eq('post_type', 'win')
    }

    const { data } = await query
    setPosts(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchPosts()

    const channel = supabase
      .channel('community')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'community_posts' }, (payload) => {
        setPosts((prev) => [payload.new as Post, ...prev])
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [filter])

  const handlePost = async () => {
    if (!message.trim() || !user || sending) return
    setSending(true)

    const { error } = await supabase.from('community_posts').insert({
      user_id: user.id,
      user_name: user.name || 'Competitor',
      message: message.trim(),
      post_type: postType,
    })

    if (!error) {
      setMessage('')
      setPostType('general')
    }
    setSending(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handlePost()
    }
  }

  const firstName = user?.name?.split(' ')[0] || 'Competitor'

  return (
    <div className="min-h-screen pb-48">
      {/* Header */}
      <div className="sticky top-0 glass-heavy z-40 border-b border-border">
        <div className="px-5 pt-14 pb-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight">Community</h1>
              <p className="text-text-muted text-[9px] uppercase tracking-[0.25em]">CTC Athletes</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-lime/10 flex items-center justify-center">
              <Users size={18} className="text-lime" />
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-1.5">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl font-display font-bold text-[10px] uppercase tracking-wider transition-all ${
                filter === 'all' ? 'bg-lime text-black' : 'bg-white/[0.04] text-text-muted hover:text-text'
              }`}
            >
              All Posts
            </button>
            <button
              onClick={() => setFilter('wins')}
              className={`px-3.5 py-1.5 rounded-xl font-display font-bold text-[10px] uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                filter === 'wins' ? 'bg-lime text-black' : 'bg-white/[0.04] text-text-muted hover:text-text'
              }`}
            >
              <Trophy size={11} />
              Wins
            </button>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div ref={feedRef} className="px-5 pt-4 space-y-2.5">
        {loading ? (
          <div className="py-12 text-center">
            <div className="w-8 h-8 border-2 border-lime/30 border-t-lime rounded-full animate-spin mx-auto" />
          </div>
        ) : posts.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-bg-card border border-border flex items-center justify-center mx-auto mb-4">
              <MessageSquare size={28} className="text-text-muted" />
            </div>
            <p className="font-display font-bold text-lg tracking-tight mb-1">
              {filter === 'wins' ? 'No wins yet — go earn one' : 'Be the one who starts it'}
            </p>
            <p className="text-text-muted text-sm">Drop a post — set the tone</p>
          </div>
        ) : (
          posts.map((post, i) => {
            const isWin = post.post_type === 'win'
            const isOwn = post.user_id === user?.id
            const displayName = post.user_name || 'Athlete'
            return (
              <div
                key={post.id}
                className={`animate-slide-up opacity-0 card-shine rounded-2xl p-4 transition-all relative overflow-hidden ${
                  isWin
                    ? 'bg-lime/[0.04] border border-lime/20'
                    : 'bg-bg-card/80 border border-border'
                }`}
                style={{ animationDelay: `${Math.min(i, 10) * 30}ms` }}
              >
                {isWin && (
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-lime/30 via-lime/10 to-transparent" />
                )}
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isWin ? 'bg-lime/15' : 'bg-white/[0.04]'
                  }`}>
                    {isWin ? (
                      <Trophy size={15} className="text-lime" />
                    ) : (
                      <span className="font-display font-bold text-sm text-text-secondary">
                        {displayName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-display font-bold text-sm tracking-tight">
                        {isOwn ? 'You' : displayName}
                      </p>
                      {isWin && (
                        <span className="flex items-center gap-0.5 text-lime text-[8px] font-bold uppercase tracking-wider bg-lime/10 px-1.5 py-0.5 rounded-full">
                          <Flame size={8} /> Win
                        </span>
                      )}
                      <span className="text-text-muted text-[10px] ml-auto">{timeAgo(post.created_at)}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-text-secondary">{post.message}</p>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Compose bar — positioned above floating nav */}
      <div className="fixed bottom-[88px] left-0 right-0 glass-heavy border-t border-border z-40">
        <div className="max-w-lg mx-auto px-4 py-3">
          {/* Post type toggle */}
          <div className="flex items-center gap-1.5 mb-2">
            <button
              onClick={() => setPostType('general')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                postType === 'general' ? 'bg-white/[0.06] text-text' : 'text-text-muted'
              }`}
            >
              Post
            </button>
            <button
              onClick={() => setPostType('win')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 ${
                postType === 'win' ? 'bg-lime/15 text-lime' : 'text-text-muted'
              }`}
            >
              <Trophy size={10} /> Share a Win
            </button>
          </div>

          {/* Input row */}
          <div className="flex items-end gap-2">
            <div className="flex-1 relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={postType === 'win' ? `What's your win today, ${firstName}?` : `What's on your mind, ${firstName}?`}
                rows={1}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3 text-text text-sm placeholder:text-text-muted/40 focus:outline-none focus:border-lime/25 transition-colors resize-none"
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={handlePost}
              disabled={!message.trim() || sending}
              className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                message.trim()
                  ? 'bg-lime text-black active:scale-95 glow-lime'
                  : 'bg-white/[0.04] text-text-muted'
              }`}
            >
              {sending ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send size={18} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
