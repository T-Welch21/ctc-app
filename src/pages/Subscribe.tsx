import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, Shield, Dumbbell, BookOpen, TrendingUp, Zap, Crown } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { createCheckoutSession, isSubscribed } from '../lib/subscription'

const features = [
  { icon: Dumbbell, text: '7 training programs', sub: 'Strength, conditioning, Hyrox, running & more' },
  { icon: BookOpen, text: 'Daily journal system', sub: 'Morning & evening guided reflection' },
  { icon: TrendingUp, text: 'Progress tracking', sub: 'Weight, PRs, and performance metrics' },
  { icon: Zap, text: 'Daily challenges', sub: 'Coach-curated mental & physical tasks' },
  { icon: Shield, text: 'Coach accountability', sub: 'Direct access to Coach Tyler' },
]

export default function Subscribe() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (user && isSubscribed(user)) {
    return <Navigate to="/training" replace />
  }

  const handleSubscribe = async () => {
    if (loading) return
    setLoading(true)
    setError('')
    try {
      const url = await createCheckoutSession()
      window.location.href = url
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pb-28 px-5 pt-14 mesh-bg">
      {/* Header */}
      <div className="animate-fade-in mb-6 relative z-10">
        <div className="flex items-center gap-3 mb-1">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-xl bg-white/[0.04] flex items-center justify-center text-text-muted hover:text-text transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="font-display text-[26px] font-bold tracking-tight">Go Premium</h1>
            <p className="text-text-muted text-[9px] uppercase tracking-[0.25em]">Unlock Full Access</p>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="animate-slide-up mb-6 text-center relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-lime/10 flex items-center justify-center mx-auto mb-4 relative">
          <Crown size={32} className="text-lime drop-shadow-[0_0_12px_rgba(189,255,58,0.3)]" />
          <div className="absolute -inset-3 rounded-3xl bg-lime/5 blur-xl -z-10" />
        </div>
        <h2 className="font-display text-[32px] font-bold tracking-tight leading-[0.95] mb-3">
          Train Like You<br />Mean It<span className="text-lime">.</span>
        </h2>
        <p className="text-text-secondary text-[15px] leading-relaxed max-w-[280px] mx-auto font-light">
          Full access to every program, tool, and resource in the CTC system.
        </p>
      </div>

      {/* Plan card */}
      <div className="animate-slide-up [animation-delay:100ms] opacity-0 mb-6 relative z-10">
        <div className="card-shine rounded-2xl bg-gradient-to-br from-lime/[0.06] via-bg-card/80 to-bg-card/80 border border-lime/30 p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-lime/30 via-lime/10 to-transparent" />
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-lime/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-lime/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lime text-[10px] font-bold uppercase tracking-[0.2em] bg-lime/10 px-2 py-0.5 rounded-full">
                Most Popular
              </span>
            </div>
            <div className="flex items-baseline gap-1 mb-1 mt-3">
              <span className="font-display text-4xl font-bold">$29</span>
              <span className="text-text-muted text-sm">/month</span>
            </div>
            <p className="text-lime font-display font-bold text-sm mb-4">
              7 days free — cancel anytime
            </p>

            {/* Features */}
            <div className="space-y-3">
              {features.map((f) => (
                <div key={f.text} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-lime/10 flex items-center justify-center shrink-0 mt-0.5">
                    <f.icon size={16} className="text-lime" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-sm tracking-tight">{f.text}</p>
                    <p className="text-text-muted text-xs">{f.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="animate-slide-up [animation-delay:200ms] opacity-0">
        {error && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-3 mb-3">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-lime text-black font-display font-bold text-lg uppercase tracking-wider transition-all active:scale-[0.98] disabled:opacity-50 relative overflow-hidden glow-lime-strong"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              <span>Connecting...</span>
            </div>
          ) : (
            'Start 7-Day Free Trial'
          )}
        </button>

        <p className="text-text-muted text-[10px] text-center mt-3 leading-relaxed">
          You won't be charged until after your free trial ends.
          <br />Cancel anytime from your account settings.
        </p>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-4 mt-5">
          <div className="flex items-center gap-1.5 text-text-muted">
            <Shield size={12} />
            <span className="text-[10px] uppercase tracking-wider">Secure payment</span>
          </div>
          <div className="flex items-center gap-1.5 text-text-muted">
            <Check size={12} />
            <span className="text-[10px] uppercase tracking-wider">Cancel anytime</span>
          </div>
        </div>
      </div>
    </div>
  )
}
