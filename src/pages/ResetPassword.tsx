import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, CheckCircle } from 'lucide-react'
import { useAuth } from '../lib/auth'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const { resetPassword } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (done) {
      const timer = setTimeout(() => navigate('/dashboard', { replace: true }), 1500)
      return () => clearTimeout(timer)
    }
  }, [done, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (password !== confirm) {
      setError('Passwords don\'t match')
      return
    }

    setLoading(true)
    try {
      await resetPassword(password)
      setDone(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen flex flex-col justify-center px-6 py-12">
        <div className="animate-fade-in max-w-sm mx-auto w-full text-center">
          <div className="inline-flex p-4 rounded-2xl bg-lime/10 mb-6">
            <CheckCircle size={40} className="text-lime" />
          </div>
          <h1 className="font-display text-2xl font-bold mb-3">Password updated</h1>
          <p className="text-text-secondary mb-8">You're all set. Redirecting you now...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12">
      <div className="animate-fade-in max-w-sm mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="font-display text-2xl font-bold mb-2">Set new password</h1>
          <p className="text-text-muted text-sm">
            Choose a strong password for your account.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3.5 pr-12 text-text placeholder:text-text-muted focus:outline-none focus:border-lime/30 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            minLength={6}
            className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3.5 text-text placeholder:text-text-muted focus:outline-none focus:border-lime/30 transition-colors"
          />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-lime text-bg font-display font-bold text-base py-3.5 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? '...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  )
}
