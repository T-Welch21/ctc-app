import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, Scale, Calendar, Award, X, ChevronRight, ChevronDown, ChevronUp, ClipboardCheck } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { getWeights, saveWeight, getCompletedSessions, getStreak, getCheckIns, getPRs, savePR } from '../lib/storage'

const lifts = ['Bench Press', 'Squat', 'Deadlift', '40-Yard Dash']

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function Progress() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showWeightModal, setShowWeightModal] = useState(false)
  const [showPRModal, setShowPRModal] = useState<string | null>(null)
  const [weightInput, setWeightInput] = useState('')
  const [prInput, setPrInput] = useState('')
  const [weights, setWeights] = useState(() => (user ? getWeights(user.id) : []))
  const [prs, setPRs] = useState(() => (user ? getPRs(user.id) : []))
  const [showCheckIns, setShowCheckIns] = useState(false)

  const sessions = user ? getCompletedSessions(user.id) : []
  const streak = user ? getStreak(user.id) : 0
  const checkIns = user ? getCheckIns(user.id) : []
  const latestWeight = weights.length > 0 ? weights[weights.length - 1] : null
  const prCount = prs.length

  const stats = [
    { label: 'Sessions', value: String(sessions.length), icon: Calendar, color: 'text-lime' },
    { label: 'Streak', value: String(streak), icon: TrendingUp, color: 'text-warning' },
    { label: 'PRs Set', value: String(prCount), icon: Award, color: 'text-[#818cf8]' },
  ]

  const handleLogWeight = () => {
    if (!user || !weightInput) return
    const weight = parseFloat(weightInput)
    if (isNaN(weight) || weight <= 0) return
    const today = new Date().toISOString().split('T')[0]
    saveWeight(user.id, { date: today, weight })
    setWeights(getWeights(user.id))
    setWeightInput('')
    setShowWeightModal(false)
  }

  const handleLogPR = () => {
    if (!user || !prInput || !showPRModal) return
    const today = new Date().toISOString().split('T')[0]
    savePR(user.id, { lift: showPRModal, value: prInput, date: today })
    setPRs(getPRs(user.id))
    setPrInput('')
    setShowPRModal(null)
  }

  return (
    <div className="min-h-screen pb-24 px-5 pt-14">
      <div className="animate-fade-in mb-6">
        <h1 className="font-display text-2xl font-bold">Progress</h1>
        <p className="text-text-secondary text-sm mt-1">Track your growth over time</p>
      </div>

      {/* Stats row */}
      <div className="animate-slide-up grid grid-cols-3 gap-3 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-bg-card border border-border p-4 text-center"
          >
            <stat.icon size={20} className={`${stat.color} mx-auto mb-2`} />
            <p className="font-display font-bold text-xl">{stat.value}</p>
            <p className="text-text-muted text-xs mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Weight tracking */}
      <div className="animate-slide-up [animation-delay:100ms] opacity-0 rounded-2xl bg-bg-card border border-border p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Scale size={18} className="text-text-secondary" />
            <p className="font-display font-semibold">Body Weight</p>
          </div>
          <button
            onClick={() => setShowWeightModal(true)}
            className="text-lime text-sm font-medium"
          >
            Log
          </button>
        </div>

        {weights.length === 0 ? (
          <div className="h-24 rounded-xl bg-bg-elevated border border-border flex items-center justify-center">
            <p className="text-text-muted text-sm">No data yet — log your first weigh-in</p>
          </div>
        ) : (
          <div>
            {latestWeight && (
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-display font-bold text-3xl text-lime">
                  {latestWeight.weight}
                </span>
                <span className="text-text-muted text-sm">lbs</span>
                <span className="text-text-muted text-xs ml-auto">
                  {formatDate(latestWeight.date)}
                </span>
              </div>
            )}
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {[...weights].reverse().map((w) => (
                <div
                  key={w.date}
                  className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0"
                >
                  <span className="text-text-secondary text-sm">{formatDate(w.date)}</span>
                  <span className="font-display font-semibold text-sm">{w.weight} lbs</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Weekly check-in */}
      <div className="animate-slide-up [animation-delay:200ms] opacity-0 rounded-2xl bg-bg-card border border-border p-5 mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="font-display font-semibold">Weekly Check-in</p>
          {checkIns.length > 0 && (
            <button
              onClick={() => setShowCheckIns(!showCheckIns)}
              className="flex items-center gap-1 text-text-muted text-xs"
            >
              History ({checkIns.length})
              {showCheckIns ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          )}
        </div>
        <p className="text-text-secondary text-sm mb-4">
          Submit your weekly update so Coach Tyler can track your progress.
        </p>
        <button
          onClick={() => navigate('/check-in')}
          className="w-full border border-lime/30 text-lime font-display font-semibold py-3 rounded-xl hover:bg-lime/5 transition-colors"
        >
          Start Check-in
        </button>

        {/* Check-in history */}
        {showCheckIns && checkIns.length > 0 && (
          <div className="mt-4 space-y-3 border-t border-border pt-4">
            {checkIns.slice(0, 5).map((ci) => (
              <div key={ci.date} className="rounded-xl bg-bg-elevated p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <ClipboardCheck size={12} className="text-lime" />
                    <span className="font-display font-semibold text-xs">{formatDate(ci.date)}</span>
                  </div>
                  <span className="text-text-muted text-xs">{ci.sessions} sessions</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <div className="text-center">
                    <p className="text-text-muted text-[10px]">Nutrition</p>
                    <p className="text-lime font-display font-bold text-sm">{ci.nutrition}/10</p>
                  </div>
                  <div className="text-center">
                    <p className="text-text-muted text-[10px]">Sleep</p>
                    <p className="text-lime font-display font-bold text-sm">{ci.sleep}/10</p>
                  </div>
                  <div className="text-center">
                    <p className="text-text-muted text-[10px]">Energy</p>
                    <p className="text-lime font-display font-bold text-sm">{ci.energy}/10</p>
                  </div>
                </div>
                {ci.wins && (
                  <p className="text-text-secondary text-xs truncate">Win: {ci.wins}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Performance markers */}
      <div className="animate-slide-up [animation-delay:300ms] opacity-0 rounded-2xl bg-bg-card border border-border p-5">
        <p className="font-display font-semibold mb-3">Performance Markers</p>
        <div className="space-y-1">
          {lifts.map((lift) => {
            const pr = prs.find((p) => p.lift === lift)
            return (
              <button
                key={lift}
                onClick={() => {
                  setShowPRModal(lift)
                  setPrInput(pr?.value || '')
                }}
                className="w-full flex items-center justify-between py-3 border-b border-border last:border-0 text-left"
              >
                <span className="text-sm">{lift}</span>
                <div className="flex items-center gap-2">
                  {pr ? (
                    <>
                      <span className="font-display font-semibold text-lime text-sm">
                        {pr.value}
                      </span>
                      <span className="text-text-muted text-xs">{formatDate(pr.date)}</span>
                    </>
                  ) : (
                    <span className="text-text-muted text-sm">Tap to log</span>
                  )}
                  <ChevronRight size={14} className="text-text-muted" />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Weight Modal */}
      {showWeightModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end justify-center">
          <div className="w-full max-w-lg bg-bg-card border-t border-border rounded-t-3xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-lg">Log Weight</h2>
              <button
                onClick={() => setShowWeightModal(false)}
                className="text-text-muted"
              >
                <X size={22} />
              </button>
            </div>
            <div className="mb-6">
              <label className="text-text-secondary text-sm mb-2 block">Weight (lbs)</label>
              <input
                type="number"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                placeholder="185"
                autoFocus
                className="w-full bg-bg-elevated border border-border rounded-xl px-4 py-3.5 text-text text-2xl font-display font-bold text-center placeholder:text-text-muted focus:outline-none focus:border-lime/50 transition-colors"
              />
            </div>
            <button
              onClick={handleLogWeight}
              disabled={!weightInput}
              className="w-full bg-lime text-bg font-display font-semibold py-3.5 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-30 glow-lime"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* PR Modal */}
      {showPRModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end justify-center">
          <div className="w-full max-w-lg bg-bg-card border-t border-border rounded-t-3xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-lg">{showPRModal}</h2>
              <button onClick={() => setShowPRModal(null)} className="text-text-muted">
                <X size={22} />
              </button>
            </div>
            <div className="mb-6">
              <label className="text-text-secondary text-sm mb-2 block">
                {showPRModal === '40-Yard Dash' ? 'Time (seconds)' : 'Weight (lbs)'}
              </label>
              <input
                type="text"
                value={prInput}
                onChange={(e) => setPrInput(e.target.value)}
                placeholder={showPRModal === '40-Yard Dash' ? '4.5' : '225'}
                autoFocus
                className="w-full bg-bg-elevated border border-border rounded-xl px-4 py-3.5 text-text text-2xl font-display font-bold text-center placeholder:text-text-muted focus:outline-none focus:border-lime/50 transition-colors"
              />
            </div>
            <button
              onClick={handleLogPR}
              disabled={!prInput}
              className="w-full bg-lime text-bg font-display font-semibold py-3.5 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-30 glow-lime"
            >
              Save PR
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
