import { useState } from 'react'
import { Eye, EyeOff, CheckCircle, ArrowLeft, Ticket } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { supabase } from '../lib/supabase'
import { validateInviteCode, redeemInviteCode } from '../lib/invite-codes'

export default function Login() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [checkEmail, setCheckEmail] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const [inviteCode, setInviteCode] = useState('')
  const [showInviteCode, setShowInviteCode] = useState(false)
  const { login, signup } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'signup') {
        if (!name.trim()) {
          setError('Name is required')
          setLoading(false)
          return
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters')
          setLoading(false)
          return
        }
        if (inviteCode.trim()) {
          const { valid, error: codeError } = await validateInviteCode(inviteCode)
          if (!valid) {
            setError(codeError || 'Invalid invite code.')
            setLoading(false)
            return
          }
        }
        await signup(email, password, name)
        if (inviteCode.trim()) {
          const { data: { session } } = await supabase.auth.getSession()
          if (session?.user) {
            await redeemInviteCode(inviteCode, session.user.id)
          }
        }
      } else {
        await login(email, password)
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong'
      if (msg === 'CHECK_EMAIL') {
        setCheckEmail(true)
      } else if (msg.includes('Invalid login credentials')) {
        setError('Wrong email or password.')
      } else if (msg.includes('Email not confirmed')) {
        setError('Check your email for a confirmation link.')
      } else if (msg.includes('already registered') || msg.includes('already been registered')) {
        setError('That email is already taken. Try signing in.')
      } else if (msg.includes('rate limit') || msg.includes('too many requests')) {
        setError('Too many attempts. Wait a minute and try again.')
      } else if (msg.includes('network') || msg.includes('fetch')) {
        setError('Connection issue. Check your internet and try again.')
      } else if (msg.includes('Invalid API key') || msg.includes('apikey')) {
        setError('App needs a refresh. Close and reopen, or pull down to refresh.')
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister()))
          caches.keys().then(keys => keys.forEach(k => caches.delete(k)))
        }
      } else {
        setError(msg)
      }
    } finally {
      setLoading(false)
    }
  }

  if (checkEmail || resetSent) {
    return (
      <div className="min-h-screen flex flex-col justify-center px-6 py-12">
        <div className="animate-fade-in max-w-sm mx-auto w-full text-center">
          <div className="inline-flex p-4 rounded-2xl bg-lime/10 mb-6">
            <CheckCircle size={40} className="text-lime" />
          </div>
          <h1 className="font-display text-2xl font-bold mb-3">Check your email</h1>
          <p className="text-text-secondary mb-8">
            {resetSent
              ? <>We sent a password reset link to <span className="text-text font-medium">{email}</span>.</>
              : <>We sent a confirmation link to <span className="text-text font-medium">{email}</span>. Tap it, then come back and sign in.</>
            }
          </p>
          <button
            onClick={() => {
              setCheckEmail(false)
              setResetSent(false)
              setForgotPassword(false)
              setMode('login')
              setPassword('')
            }}
            className="w-full bg-lime text-bg font-display font-bold text-base py-3.5 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    )
  }

  if (forgotPassword) {
    const handleReset = async (e: React.FormEvent) => {
      e.preventDefault()
      setError('')
      setLoading(true)
      try {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        })
        if (resetError) throw new Error(resetError.message)
        setResetSent(true)
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Something went wrong'
        if (msg.includes('rate limit') || msg.includes('too many requests')) {
          setError('Too many attempts. Wait a minute and try again.')
        } else if (msg.includes('network') || msg.includes('fetch')) {
          setError('Connection issue. Check your internet and try again.')
        } else {
          setError(msg)
        }
      } finally {
        setLoading(false)
      }
    }

    return (
      <div className="min-h-screen flex flex-col justify-center px-6 py-12">
        <div className="animate-fade-in max-w-sm mx-auto w-full">
          <button
            onClick={() => { setForgotPassword(false); setError('') }}
            className="flex items-center gap-1.5 text-text-muted hover:text-text text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className="font-display text-2xl font-bold mb-2">Reset password</h1>
          <p className="text-text-muted text-sm mb-6">
            Enter your email and we'll send a reset link.
          </p>
          <form onSubmit={handleReset} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3.5 text-text placeholder:text-text-muted focus:outline-none focus:border-lime/30 transition-colors"
            />
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-lime text-bg font-display font-bold text-base py-3.5 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? '...' : 'Send Reset Link'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 login-glow relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(179,255,29,0.06)_0%,transparent_70%)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(179,255,29,0.04)_0%,transparent_60%)] pointer-events-none" />
      <div className="animate-fade-in max-w-sm mx-auto w-full relative z-10">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24">
              <div className="absolute -inset-4 rounded-full bg-lime/8 blur-2xl animate-pulse" />
              <img src="/logo-circle.png" alt="Called to Compete" className="w-24 h-24 rounded-full relative drop-shadow-[0_0_40px_rgba(179,255,29,0.3)]" />
            </div>
          </div>
          <div className="mb-4">
            <h1 className="font-display text-[48px] font-bold tracking-[-0.04em] leading-[0.85]">
              CALLED TO
            </h1>
            <h1 className="font-display text-[48px] font-bold tracking-[-0.04em] leading-[0.85] text-lime drop-shadow-[0_0_30px_rgba(189,255,58,0.25)]">
              COMPETE
            </h1>
          </div>
          <div className="flex items-center justify-center gap-4 text-text-muted text-[8px] uppercase tracking-[0.35em]">
            <span>Speed</span>
            <span className="w-1 h-1 rounded-full bg-lime/50" />
            <span>Strength</span>
            <span className="w-1 h-1 rounded-full bg-lime/50" />
            <span>Mindset</span>
          </div>
          <p className="text-text-secondary text-[15px] mt-6 leading-relaxed max-w-[260px] mx-auto font-light">
            {mode === 'login'
              ? 'Welcome back. The work doesn\'t stop.'
              : 'Built for those who refuse to settle.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'signup' && (
            <>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-2xl px-5 py-4 text-text placeholder:text-text-muted text-[15px] focus:outline-none focus:border-lime/25 transition-all"
              />
              {showInviteCode ? (
                <div className="relative">
                  <Ticket size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-lime/60" />
                  <input
                    type="text"
                    placeholder="Invite code (e.g. CTC-ABC123)"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                    className="w-full bg-lime/[0.04] border border-lime/20 rounded-2xl pl-11 pr-5 py-4 text-text placeholder:text-text-muted text-[15px] focus:outline-none focus:border-lime/40 transition-all uppercase tracking-wider"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowInviteCode(true)}
                  className="text-text-muted text-sm hover:text-lime transition-colors flex items-center gap-1.5 mx-auto"
                >
                  <Ticket size={14} />
                  Have an invite code?
                </button>
              )}
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-white/[0.04] border border-white/[0.06] rounded-2xl px-5 py-4 text-text placeholder:text-text-muted text-[15px] focus:outline-none focus:border-lime/25 transition-all"
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-2xl px-5 py-4 pr-12 text-text placeholder:text-text-muted text-[15px] focus:outline-none focus:border-lime/25 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-lime text-bg font-display font-bold text-[16px] py-4 rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 glow-lime-strong"
          >
            {loading ? '...' : mode === 'login' ? 'Let\'s Go' : 'Join the Team'}
          </button>
        </form>

        {mode === 'login' && (
          <button
            onClick={() => { setForgotPassword(true); setError('') }}
            className="block mx-auto text-text-muted text-sm mt-5 hover:text-text-secondary transition-colors"
          >
            Forgot password?
          </button>
        )}

        <p className="text-center text-text-muted text-sm mt-6">
          {mode === 'login' ? "Ready to compete? " : 'Already on the team? '}
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login')
              setError('')
            }}
            className="text-lime font-semibold hover:underline"
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}
