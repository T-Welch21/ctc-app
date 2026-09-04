import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Target, LogOut, ChevronRight, Shield, Pencil, Check, X, Lock, Mail, Info, CreditCard, Crown, Utensils, RotateCcw } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { isSubscribed } from '../lib/subscription'
import { supabase } from '../lib/supabase'

const identityLabels: Record<string, string> = {
  athlete: 'Athlete',
  entrepreneur: 'Entrepreneur',
  executive: 'Executive',
  creator: 'Creator',
  other: 'Other',
}

export default function Settings() {
  const { user, logout, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [editingName, setEditingName] = useState(false)
  const [nameInput, setNameInput] = useState(user?.name || '')
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/', { replace: true })
  }

  const handleSaveName = async () => {
    if (nameInput.trim() && nameInput.trim() !== user?.name) {
      await updateProfile({ name: nameInput.trim() })
    }
    setEditingName(false)
  }

  const handlePasswordChange = async () => {
    setPasswordError('')
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match')
      return
    }
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) {
      setPasswordError(error.message)
      return
    }
    setPasswordSuccess(true)
    setNewPassword('')
    setConfirmPassword('')
    setTimeout(() => {
      setShowPasswordChange(false)
      setPasswordSuccess(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen pb-28 bg-bg">
      {/* Header */}
      <div className="sticky top-0 glass-heavy z-40 border-b border-border">
        <div className="max-w-lg mx-auto px-5 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-xl bg-white/[0.04] flex items-center justify-center text-text-muted hover:text-text transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="font-display text-lg font-bold tracking-tight">Settings</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-5 pt-6">
        {/* Profile card */}
        <div className="animate-fade-in rounded-2xl bg-bg-card/80 border border-border p-5 mb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-lime/20 via-lime/5 to-transparent" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-lime/10 flex items-center justify-center">
              <span className="font-display text-lime text-xl font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || '?'}
              </span>
            </div>
            <div className="flex-1">
              {editingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    autoFocus
                    className="bg-bg-elevated border border-border rounded-xl px-3 py-1.5 text-text font-display font-bold text-lg focus:outline-none focus:border-lime/40 w-full transition-colors"
                  />
                  <button onClick={handleSaveName} className="w-8 h-8 rounded-lg bg-lime/10 flex items-center justify-center text-lime">
                    <Check size={16} />
                  </button>
                  <button onClick={() => { setEditingName(false); setNameInput(user?.name || '') }} className="w-8 h-8 rounded-lg bg-bg-elevated flex items-center justify-center text-text-muted">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="font-display font-bold text-lg tracking-tight">{user?.name || 'Competitor'}</h2>
                  <button onClick={() => setEditingName(true)} className="w-7 h-7 rounded-lg bg-bg-elevated flex items-center justify-center text-text-muted hover:text-text transition-colors">
                    <Pencil size={12} />
                  </button>
                </div>
              )}
              <p className="text-text-muted text-xs mt-0.5">{user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-xl bg-bg-elevated p-3.5">
              <div className="flex items-center gap-1.5 mb-1.5">
                <User size={12} className="text-lime" />
                <p className="text-[9px] uppercase tracking-[0.2em] text-text-muted font-medium">Identity</p>
              </div>
              <p className="font-display font-bold text-sm tracking-tight">
                {identityLabels[user?.identity || ''] || 'Not set'}
              </p>
            </div>
            <div className="rounded-xl bg-bg-elevated p-3.5">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Target size={12} className="text-lime" />
                <p className="text-[9px] uppercase tracking-[0.2em] text-text-muted font-medium">Goal</p>
              </div>
              <p className="font-display font-bold text-sm tracking-tight truncate">
                {user?.goal || 'Not set'}
              </p>
            </div>
          </div>
        </div>

        {/* Subscription */}
        {user && (
          <div className="animate-slide-up rounded-2xl bg-bg-card border border-border p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSubscribed(user) ? 'bg-lime/10' : 'bg-bg-elevated'}`}>
                {isSubscribed(user) ? <Crown size={18} className="text-lime" /> : <CreditCard size={18} className="text-text-muted" />}
              </div>
              <div className="flex-1">
                <p className="font-display font-bold text-sm tracking-tight">
                  {isSubscribed(user) ? 'Premium Active' : 'Free Account'}
                </p>
                <p className="text-text-muted text-[11px]">
                  {isSubscribed(user)
                    ? user.subscription_status === 'trialing' ? '7-day free trial' : '$29/mo · Cancel anytime'
                    : 'Upgrade to unlock training'}
                </p>
              </div>
              {!isSubscribed(user) && (
                <button
                  onClick={() => navigate('/subscribe')}
                  className="bg-lime text-black font-display font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-lg"
                >
                  Upgrade
                </button>
              )}
            </div>
          </div>
        )}

        {/* Menu items */}
        <div className="animate-slide-up space-y-2 mb-8">
          <button
            onClick={() => navigate('/onboarding')}
            className="card-shine w-full flex items-center gap-3 p-4 rounded-2xl bg-bg-card/80 border border-border text-left hover:border-white/[0.06] transition-colors relative overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-bg-elevated flex items-center justify-center">
              <Target size={18} className="text-text-secondary" />
            </div>
            <div className="flex-1">
              <p className="font-display font-bold text-sm tracking-tight">Change Track</p>
              <p className="text-text-muted text-[11px]">Switch identity or goal</p>
            </div>
            <ChevronRight size={16} className="text-text-muted" />
          </button>

          <button
            onClick={() => setShowPasswordChange(!showPasswordChange)}
            className="card-shine w-full flex items-center gap-3 p-4 rounded-2xl bg-bg-card/80 border border-border text-left hover:border-white/[0.06] transition-colors relative overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-bg-elevated flex items-center justify-center">
              <Lock size={18} className="text-text-secondary" />
            </div>
            <div className="flex-1">
              <p className="font-display font-bold text-sm tracking-tight">Change Password</p>
              <p className="text-text-muted text-[11px]">Update your login password</p>
            </div>
            <ChevronRight size={16} className="text-text-muted" />
          </button>

          {showPasswordChange && (
            <div className="animate-fade-in rounded-2xl bg-bg-card border border-border p-5 space-y-3">
              <div>
                <label className="text-text-muted text-[10px] uppercase tracking-[0.2em] font-medium mb-1.5 block">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full bg-bg-elevated border border-border rounded-xl px-4 py-3 text-text placeholder:text-text-muted/40 focus:outline-none focus:border-lime/40 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="text-text-muted text-[10px] uppercase tracking-[0.2em] font-medium mb-1.5 block">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full bg-bg-elevated border border-border rounded-xl px-4 py-3 text-text placeholder:text-text-muted/40 focus:outline-none focus:border-lime/40 transition-colors text-sm"
                />
              </div>
              {passwordError && (
                <p className="text-red-400 text-xs">{passwordError}</p>
              )}
              <button
                onClick={handlePasswordChange}
                className={`w-full font-display font-bold text-sm py-3.5 rounded-xl transition-all active:scale-[0.98] uppercase tracking-wider ${
                  passwordSuccess
                    ? 'bg-success text-bg'
                    : 'bg-lime text-bg hover:brightness-110'
                }`}
              >
                {passwordSuccess ? 'Password Updated' : 'Update Password'}
              </button>
            </div>
          )}

          <a
            href="sms:+12546402697"
            className="w-full flex items-center gap-3 p-4 rounded-2xl bg-bg-card border border-border text-left hover:border-lime/20 transition-colors block"
          >
            <div className="w-10 h-10 rounded-xl bg-bg-elevated flex items-center justify-center">
              <Mail size={18} className="text-text-secondary" />
            </div>
            <div className="flex-1">
              <p className="font-display font-bold text-sm tracking-tight">Contact Coach</p>
              <p className="text-text-muted text-[11px]">Text Coach Tyler directly</p>
            </div>
            <ChevronRight size={16} className="text-text-muted" />
          </a>

          <button
            onClick={() => navigate('/nutrition')}
            className="card-shine w-full flex items-center gap-3 p-4 rounded-2xl bg-bg-card/80 border border-border text-left hover:border-white/[0.06] transition-colors relative overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-bg-elevated flex items-center justify-center">
              <Utensils size={18} className="text-text-secondary" />
            </div>
            <div className="flex-1">
              <p className="font-display font-bold text-sm tracking-tight">Nutrition Settings</p>
              <p className="text-text-muted text-[11px]">Recalculate macros or update goals</p>
            </div>
            <ChevronRight size={16} className="text-text-muted" />
          </button>

          <button
            onClick={() => navigate('/command')}
            className="card-shine w-full flex items-center gap-3 p-4 rounded-2xl bg-bg-card/80 border border-border text-left hover:border-white/[0.06] transition-colors relative overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-bg-elevated flex items-center justify-center">
              <Shield size={18} className="text-text-secondary" />
            </div>
            <div className="flex-1">
              <p className="font-display font-bold text-sm tracking-tight">Command Center</p>
              <p className="text-text-muted text-[11px]">Coach dashboard</p>
            </div>
            <ChevronRight size={16} className="text-text-muted" />
          </button>
        </div>

        {/* App info */}
        <div className="animate-slide-up [animation-delay:50ms] opacity-0 rounded-2xl bg-bg-card border border-border p-4 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-md bg-bg-elevated flex items-center justify-center">
              <Info size={12} className="text-text-muted" />
            </div>
            <p className="font-display font-bold text-[10px] uppercase tracking-[0.2em] text-text-muted">About</p>
          </div>
          <p className="text-text-muted text-xs leading-relaxed">
            Called to Compete is a training platform by Coach Tyler Welch in San Antonio, TX.
            Compete Harder · Train Smarter · Feel Better
          </p>
        </div>

        {/* Logout */}
        {!showLogoutConfirm ? (
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="animate-slide-up [animation-delay:100ms] opacity-0 w-full flex items-center gap-3 p-4 rounded-2xl border border-red-500/20 text-left hover:bg-red-500/5 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <LogOut size={18} className="text-red-400" />
            </div>
            <p className="font-display font-bold text-sm text-red-400 tracking-tight">Sign Out</p>
          </button>
        ) : (
          <div className="animate-fade-in rounded-2xl border border-red-500/30 bg-red-500/5 p-5">
            <p className="font-display font-bold text-sm tracking-tight mb-1">Sign out?</p>
            <p className="text-text-muted text-xs mb-4">
              Your training data is saved to your account.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 rounded-xl border border-border font-display font-bold text-sm hover:bg-bg-card transition-colors uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white font-display font-bold text-sm hover:bg-red-600 transition-colors uppercase tracking-wider"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Version */}
        <p className="text-center text-text-muted text-[10px] uppercase tracking-[0.2em] mt-8">
          Called to Compete v1.0.0
        </p>
      </div>
    </div>
  )
}
