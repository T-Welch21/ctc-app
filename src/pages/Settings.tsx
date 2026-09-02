import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Target, LogOut, ChevronRight, Shield } from 'lucide-react'
import { useAuth } from '../lib/auth'

const identityLabels: Record<string, string> = {
  athlete: 'Athlete',
  entrepreneur: 'Entrepreneur',
  executive: 'Executive',
  creator: 'Creator',
  other: 'Other',
}

export default function Settings() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-screen pb-24 bg-bg">
      {/* Header */}
      <div className="sticky top-0 bg-bg/90 backdrop-blur-xl z-40 border-b border-border">
        <div className="max-w-lg mx-auto px-5 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-text-secondary hover:text-text transition-colors"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="font-display text-lg font-bold">Settings</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-5 pt-6">
        {/* Profile card */}
        <div className="animate-fade-in rounded-2xl bg-bg-card border border-border p-5 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-lime/10 flex items-center justify-center">
              <span className="font-display text-lime text-xl font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || '?'}
              </span>
            </div>
            <div>
              <h2 className="font-display font-bold text-lg">{user?.name || 'Competitor'}</h2>
              <p className="text-text-secondary text-sm">{user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-bg-elevated p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <User size={12} className="text-lime" />
                <p className="text-[10px] uppercase tracking-wider text-text-muted">Identity</p>
              </div>
              <p className="font-display font-semibold text-sm">
                {identityLabels[user?.identity || ''] || 'Not set'}
              </p>
            </div>
            <div className="rounded-xl bg-bg-elevated p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Target size={12} className="text-lime" />
                <p className="text-[10px] uppercase tracking-wider text-text-muted">Goal</p>
              </div>
              <p className="font-display font-semibold text-sm truncate">
                {user?.goal || 'Not set'}
              </p>
            </div>
          </div>
        </div>

        {/* Menu items */}
        <div className="animate-slide-up space-y-2 mb-8">
          <button
            onClick={() => navigate('/onboarding')}
            className="w-full flex items-center gap-3 p-4 rounded-2xl bg-bg-card border border-border text-left hover:border-border-light transition-colors"
          >
            <div className="p-2 rounded-xl bg-bg-elevated">
              <Target size={18} className="text-text-secondary" />
            </div>
            <div className="flex-1">
              <p className="font-display font-semibold text-sm">Change Track</p>
              <p className="text-text-muted text-xs">Switch identity or goal</p>
            </div>
            <ChevronRight size={18} className="text-text-muted" />
          </button>

          <button
            onClick={() => navigate('/command')}
            className="w-full flex items-center gap-3 p-4 rounded-2xl bg-bg-card border border-border text-left hover:border-border-light transition-colors"
          >
            <div className="p-2 rounded-xl bg-bg-elevated">
              <Shield size={18} className="text-text-secondary" />
            </div>
            <div className="flex-1">
              <p className="font-display font-semibold text-sm">Command Center</p>
              <p className="text-text-muted text-xs">Coach dashboard</p>
            </div>
            <ChevronRight size={18} className="text-text-muted" />
          </button>
        </div>

        {/* Logout */}
        {!showLogoutConfirm ? (
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="animate-slide-up [animation-delay:100ms] opacity-0 w-full flex items-center gap-3 p-4 rounded-2xl border border-red-500/20 text-left hover:bg-red-500/5 transition-colors"
          >
            <div className="p-2 rounded-xl bg-red-500/10">
              <LogOut size={18} className="text-red-400" />
            </div>
            <p className="font-display font-semibold text-sm text-red-400">Sign Out</p>
          </button>
        ) : (
          <div className="animate-fade-in rounded-2xl border border-red-500/30 bg-red-500/5 p-5">
            <p className="font-display font-semibold text-sm mb-1">Sign out?</p>
            <p className="text-text-secondary text-sm mb-4">
              Your training data is saved to your account.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 rounded-xl border border-border font-display font-semibold text-sm hover:bg-bg-card transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white font-display font-semibold text-sm hover:bg-red-600 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Version */}
        <p className="text-center text-text-muted text-xs mt-8">
          Called to Compete v1.0.0
        </p>
      </div>
    </div>
  )
}
