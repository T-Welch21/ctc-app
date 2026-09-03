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
    <div className="min-h-screen pb-24 px-5 pt-14">
      <div className="animate-fade-in mb-6">
        <div className="flex items-center gap-3 mb-1">
          <button onClick={() => navigate(-1)} className="text-text-secondary hover:text-text transition-colors">
            <ArrowLeft size={22} />
          </button>
          <div>
            <p className="text-text-secondary text-xs uppercase tracking-wider">Inbox</p>
            <h1 className="font-display text-2xl font-bold">Coach Messages</h1>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center">
          <div className="w-8 h-8 border-2 border-lime border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : broadcasts.length === 0 ? (
        <div className="py-16 text-center">
          <Megaphone size={40} className="text-text-muted mx-auto mb-3" />
          <p className="font-display font-semibold text-lg mb-1">No messages yet</p>
          <p className="text-text-muted text-sm">Coach messages will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {broadcasts.map((b, i) => (
            <div
              key={b.id}
              className="animate-slide-up opacity-0 rounded-2xl bg-bg-card border border-border p-4"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-400/20 shrink-0 mt-0.5">
                  <Megaphone size={16} className="text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider">Coach Tyler</p>
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
