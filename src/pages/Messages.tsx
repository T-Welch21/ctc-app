import { useState, useEffect } from 'react'
import { ArrowLeft, Megaphone, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

type Broadcast = {
  id: string
  message: string
  created_at: string
}

export default function Messages() {
  const navigate = useNavigate()
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('broadcasts')
      .select('id, message, created_at')
      .order('created_at', { ascending: false })
      .limit(50)
      .then(({ data }) => {
        setBroadcasts(data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen pb-28 px-5 pt-14">
      <div className="animate-fade-in mb-6">
        <div className="flex items-center gap-3 mb-1">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-bg-elevated flex items-center justify-center text-text-muted hover:text-text transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight">Coach Messages</h1>
            <p className="text-text-muted text-[10px] uppercase tracking-[0.2em]">Inbox</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center">
          <div className="w-8 h-8 border-2 border-lime border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : broadcasts.length === 0 ? (
        <div className="py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-bg-card border border-border flex items-center justify-center mx-auto mb-4">
            <Megaphone size={28} className="text-text-muted" />
          </div>
          <p className="font-display font-bold text-lg tracking-tight mb-1">No messages yet</p>
          <p className="text-text-muted text-sm">Coach messages will appear here</p>
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
      )}
    </div>
  )
}
