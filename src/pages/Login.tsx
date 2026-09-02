import { useState } from 'react'
import { Eye, EyeOff, CheckCircle, ArrowLeft } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { supabase } from '../lib/supabase'

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
        await signup(email, password, name)
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
      } else if (msg.includes('already registered')) {
        setError('That email is already taken. Try signing in.')
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
            className="w-full bg-lime text-bg font-display font-semibold text-lg py-3.5 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all glow-lime"
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
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email)
        if (resetError) throw new Error(resetError.message)
        setResetSent(true)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    return (
      <div className="min-h-screen flex flex-col justify-center px-6 py-12">
        <div className="animate-fade-in max-w-sm mx-auto w-full">
          <button
            onClick={() => { setForgotPassword(false); setError('') }}
            className="flex items-center gap-1.5 text-text-secondary hover:text-text text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={16} /> Back to sign in
          </button>
          <h1 className="font-display text-2xl font-bold mb-2">Reset password</h1>
          <p className="text-text-secondary text-sm mb-6">
            Enter your email and we'll send a reset link.
          </p>
          <form onSubmit={handleReset} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-bg-card border border-border rounded-xl px-4 py-3.5 text-text placeholder:text-text-muted focus:outline-none focus:border-lime/50 transition-colors"
            />
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-lime text-bg font-display font-semibold text-lg py-3.5 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 glow-lime"
            >
              {loading ? '...' : 'Send Reset Link'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12">
      <div className="animate-fade-in max-w-sm mx-auto w-full">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl font-bold tracking-tight mb-2">
            CALLED TO
            <br />
            <span className="text-lime">COMPETE</span>
          </h1>
          <p className="text-text-secondary text-sm mt-3">
            {mode === 'login' ? 'Welcome back. Time to work.' : 'You were created to lead.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-bg-card border border-border rounded-xl px-4 py-3.5 text-text placeholder:text-text-muted focus:outline-none focus:border-lime/50 transition-colors"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-bg-card border border-border rounded-xl px-4 py-3.5 text-text placeholder:text-text-muted focus:outline-none focus:border-lime/50 transition-colors"
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-bg-card border border-border rounded-xl px-4 py-3.5 pr-12 text-text placeholder:text-text-muted focus:outline-none focus:border-lime/50 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-lime text-bg font-display font-semibold text-lg py-3.5 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all duration-150 disabled:opacity-50 glow-lime"
          >
            {loading ? '...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {mode === 'login' && (
          <button
            onClick={() => { setForgotPassword(true); setError('') }}
            className="block mx-auto text-text-muted text-sm mt-4 hover:text-text-secondary transition-colors"
          >
            Forgot password?
          </button>
        )}

        <p className="text-center text-text-secondary text-sm mt-4">
          {mode === 'login' ? "Don't have an account? " : 'Already competing? '}
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login')
              setError('')
            }}
            className="text-lime font-medium hover:underline"
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}
