import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, Scale, Calendar, Award, X, ChevronRight, ChevronDown, ChevronUp, ClipboardCheck, Dumbbell, Target, Utensils } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { getWeights, saveWeight, getCompletedSessions, getStreak, getCheckIns, getPRs, savePR, getExerciseNotes, getFoodEntries, getMacroGoals } from '../lib/storage'

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
  const [showExerciseHistory, setShowExerciseHistory] = useState(false)

  const sessions = user ? getCompletedSessions(user.id) : []
  const streak = user ? getStreak(user.id) : 0
  const checkIns = user ? getCheckIns(user.id) : []
  const exerciseNotes = user ? getExerciseNotes(user.id) : []
  const latestWeight = weights.length > 0 ? weights[weights.length - 1] : null
  const prCount = prs.length

  const todayStr = new Date().toISOString().split('T')[0]
  const todayFood = user ? getFoodEntries(user.id, todayStr) : []
  const macroGoals = user ? getMacroGoals(user.id) : { calories: 2500, protein: 180, carbs: 280, fat: 80 }
  const todayTotals = todayFood.reduce(
    (acc, e) => ({ calories: acc.calories + e.calories, protein: acc.protein + e.protein, carbs: acc.carbs + e.carbs, fat: acc.fat + e.fat }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  )
  const last7Food = user ? Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(Date.now() - (6 - i) * 86400000).toISOString().split('T')[0]
    const dayEntries = getFoodEntries(user.id, d)
    return dayEntries.reduce((sum, e) => sum + e.calories, 0)
  }) : []
  const avgCalories = last7Food.length > 0 ? Math.round(last7Food.reduce((a, b) => a + b, 0) / last7Food.filter(c => c > 0).length) : 0
  const daysTracked = last7Food.filter(c => c > 0).length

  const exercisesByName = exerciseNotes
    .filter((n) => n.weight)
    .reduce<Record<string, { date: string; weight: string }[]>>((acc, n) => {
      if (!acc[n.exerciseName]) acc[n.exerciseName] = []
      acc[n.exerciseName].push({ date: n.date, weight: n.weight })
      return acc
    }, {})
  const trackedExercises = Object.entries(exercisesByName)
    .filter(([, entries]) => entries.length >= 1)
    .sort((a, b) => b[1].length - a[1].length)

  const stats = [
    { label: 'Sessions', value: String(sessions.length), icon: Calendar, color: 'text-lime', bg: 'bg-lime/10' },
    { label: 'Streak', value: String(streak), icon: TrendingUp, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
    { label: 'PRs Set', value: String(prCount), icon: Award, color: 'text-blue-400', bg: 'bg-blue-400/10' },
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
    <div className="min-h-screen pb-28 px-5 pt-14">
      <div className="animate-fade-in mb-6">
        <h1 className="font-display text-3xl font-bold tracking-tight">Progress</h1>
        <p className="text-text-muted text-xs mt-1 uppercase tracking-[0.2em]">Track your growth over time</p>
      </div>

      {/* Stats row */}
      <div className="animate-slide-up grid grid-cols-3 gap-2.5 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="card-shine rounded-2xl bg-bg-card/80 border border-border p-4 text-center relative overflow-hidden"
          >
            <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center mx-auto mb-2.5`}>
              <stat.icon size={18} className={stat.color} />
            </div>
            <p className="font-display font-bold text-2xl tracking-tight">{stat.value}</p>
            <p className="text-text-muted text-[10px] uppercase tracking-[0.15em] mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Weight tracking */}
      <div className="animate-slide-up [animation-delay:100ms] opacity-0 rounded-2xl bg-bg-card border border-border p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-bg-elevated flex items-center justify-center">
              <Scale size={16} className="text-text-muted" />
            </div>
            <div>
              <p className="font-display font-bold text-sm tracking-tight">Body Weight</p>
              {latestWeight && (
                <p className="text-text-muted text-[10px]">Last logged {formatDate(latestWeight.date)}</p>
              )}
            </div>
          </div>
          <button
            onClick={() => setShowWeightModal(true)}
            className="text-lime text-xs font-bold uppercase tracking-wider bg-lime/10 px-3 py-1.5 rounded-lg hover:bg-lime/15 transition-colors"
          >
            Log
          </button>
        </div>

        {weights.length === 0 ? (
          <div className="h-24 rounded-xl bg-bg-elevated flex items-center justify-center">
            <p className="text-text-muted text-sm">No data yet — log your first weigh-in</p>
          </div>
        ) : (
          <div>
            {latestWeight && (
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-display font-bold text-4xl text-lime tracking-tight">
                  {latestWeight.weight}
                </span>
                <span className="text-text-muted text-sm">lbs</span>
                {weights.length >= 2 && (() => {
                  const diff = latestWeight.weight - weights[weights.length - 2].weight
                  if (diff === 0) return null
                  return (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${diff < 0 ? 'text-lime bg-lime/10' : 'text-sky-400 bg-sky-400/10'}`}>
                      {diff > 0 ? '+' : ''}{diff.toFixed(1)}
                    </span>
                  )
                })()}
              </div>
            )}

            {/* Weight trend chart */}
            {weights.length >= 2 && (() => {
              const recent = weights.slice(-14)
              const minW = Math.min(...recent.map((w) => w.weight)) - 2
              const maxW = Math.max(...recent.map((w) => w.weight)) + 2
              const range = maxW - minW || 1
              const chartW = 280
              const chartH = 80
              const points = recent.map((w, i) => ({
                x: (i / (recent.length - 1)) * chartW,
                y: chartH - ((w.weight - minW) / range) * chartH,
              }))
              const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
              const areaD = pathD + ` L${chartW},${chartH} L0,${chartH} Z`
              return (
                <div className="rounded-xl bg-bg-elevated p-3 mb-4 overflow-hidden">
                  <svg viewBox={`-10 -5 ${chartW + 20} ${chartH + 20}`} className="w-full h-20">
                    <defs>
                      <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#B3FF1D" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#B3FF1D" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d={areaD} fill="url(#wg)" />
                    <path d={pathD} fill="none" stroke="#B3FF1D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    {points.map((p, i) => (
                      <circle key={i} cx={p.x} cy={p.y} r={i === points.length - 1 ? 4 : 2.5} fill={i === points.length - 1 ? '#B3FF1D' : '#0A0A0A'} stroke="#B3FF1D" strokeWidth="1.5" />
                    ))}
                  </svg>
                  <div className="flex justify-between text-[10px] text-text-muted mt-1">
                    <span>{formatDate(recent[0].date)}</span>
                    <span>{formatDate(recent[recent.length - 1].date)}</span>
                  </div>
                </div>
              )
            })()}

            <div className="space-y-0 max-h-32 overflow-y-auto">
              {[...weights].reverse().map((w) => (
                <div
                  key={w.date}
                  className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
                >
                  <span className="text-text-muted text-xs">{formatDate(w.date)}</span>
                  <span className="font-display font-bold text-sm">{w.weight} lbs</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Exercise weight history */}
      {trackedExercises.length > 0 && (
        <div className="animate-slide-up [animation-delay:150ms] opacity-0 rounded-2xl bg-bg-card border border-border p-5 mb-4">
          <button
            onClick={() => setShowExerciseHistory(!showExerciseHistory)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-bg-elevated flex items-center justify-center">
                <Dumbbell size={16} className="text-text-muted" />
              </div>
              <p className="font-display font-bold text-sm tracking-tight">Exercise History</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-text-muted text-[10px] font-medium bg-bg-elevated px-2 py-0.5 rounded-md">{trackedExercises.length}</span>
              {showExerciseHistory ? <ChevronUp size={14} className="text-text-muted" /> : <ChevronDown size={14} className="text-text-muted" />}
            </div>
          </button>

          {showExerciseHistory && (
            <div className="mt-4 space-y-2.5">
              {trackedExercises.map(([name, entries]) => {
                const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date))
                const latest = sorted[sorted.length - 1]
                const prev = sorted.length >= 2 ? sorted[sorted.length - 2] : null
                const diff = prev ? parseFloat(latest.weight) - parseFloat(prev.weight) : null
                return (
                  <div key={name} className="rounded-xl bg-bg-elevated p-3.5">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-display font-bold text-sm truncate flex-1 tracking-tight">{name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-lime font-display font-bold text-sm">{latest.weight} lbs</span>
                        {diff !== null && diff !== 0 && (
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${diff > 0 ? 'text-lime bg-lime/10' : 'text-sky-400 bg-sky-400/10'}`}>
                            {diff > 0 ? '+' : ''}{diff}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-text-muted text-[10px]">{sorted.length} entries</span>
                      <span className="text-border text-[8px]">|</span>
                      <span className="text-text-muted text-[10px]">Last: {formatDate(latest.date)}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Nutrition summary */}
      {(todayFood.length > 0 || daysTracked > 0) && (
        <div className="animate-slide-up [animation-delay:175ms] opacity-0 rounded-2xl bg-bg-card border border-border p-5 mb-4">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-lime/10 flex items-center justify-center">
              <Utensils size={16} className="text-lime" />
            </div>
            <p className="font-display font-bold text-sm tracking-tight">Nutrition</p>
          </div>
          <div className="grid grid-cols-2 gap-2.5 mb-3">
            <div className="rounded-xl bg-bg-elevated p-3">
              <p className="text-text-muted text-[9px] uppercase tracking-wider mb-1">Today</p>
              <p className="font-display font-bold text-lg text-lime">{todayTotals.calories}</p>
              <p className="text-text-muted text-[10px]">/ {macroGoals.calories} cal</p>
            </div>
            <div className="rounded-xl bg-bg-elevated p-3">
              <p className="text-text-muted text-[9px] uppercase tracking-wider mb-1">7-Day Avg</p>
              <p className="font-display font-bold text-lg text-cyan-400">{avgCalories || '—'}</p>
              <p className="text-text-muted text-[10px]">{daysTracked} of 7 days tracked</p>
            </div>
          </div>
          {todayFood.length > 0 && (
            <div className="flex items-center gap-3 text-[11px]">
              <span><span className="text-cyan-400 font-bold">{todayTotals.protein}g</span> <span className="text-text-muted">protein</span></span>
              <span><span className="text-blue-400 font-bold">{todayTotals.carbs}g</span> <span className="text-text-muted">carbs</span></span>
              <span><span className="text-lime font-bold">{todayTotals.fat}g</span> <span className="text-text-muted">fat</span></span>
            </div>
          )}
          {last7Food.length > 0 && last7Food.some(c => c > 0) && (
            <div className="mt-3 flex items-end gap-1 h-12">
              {last7Food.map((cal, i) => {
                const max = Math.max(...last7Food, macroGoals.calories)
                const pct = max > 0 ? (cal / max) * 100 : 0
                const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
                const d = new Date(Date.now() - (6 - i) * 86400000)
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                    <div className="w-full rounded-sm overflow-hidden bg-bg-elevated" style={{ height: '32px' }}>
                      <div
                        className={`w-full rounded-sm transition-all ${cal > 0 ? (cal >= macroGoals.calories ? 'bg-lime' : 'bg-lime/50') : 'bg-transparent'}`}
                        style={{ height: `${pct}%`, marginTop: `${100 - pct}%` }}
                      />
                    </div>
                    <span className={`text-[8px] ${i === 6 ? 'text-text font-semibold' : 'text-text-muted'}`}>{dayLabels[d.getDay()]}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Weekly check-in */}
      <div className="animate-slide-up [animation-delay:200ms] opacity-0 rounded-2xl bg-bg-card border border-border p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-bg-elevated flex items-center justify-center">
              <ClipboardCheck size={16} className="text-text-muted" />
            </div>
            <p className="font-display font-bold text-sm tracking-tight">Weekly Check-in</p>
          </div>
          {checkIns.length > 0 && (
            <button
              onClick={() => setShowCheckIns(!showCheckIns)}
              className="flex items-center gap-1 text-text-muted text-[10px] font-medium"
            >
              <span className="bg-bg-elevated px-2 py-0.5 rounded-md">{checkIns.length}</span>
              {showCheckIns ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          )}
        </div>
        <p className="text-text-muted text-xs mb-4 leading-relaxed">
          Submit your weekly update so Coach Tyler can track your progress.
        </p>
        <button
          onClick={() => navigate('/check-in')}
          className="w-full border border-lime/30 text-lime font-display font-bold text-sm py-3 rounded-xl hover:bg-lime/5 transition-colors uppercase tracking-wider"
        >
          Start Check-in
        </button>

        {showCheckIns && checkIns.length > 0 && (
          <div className="mt-4 space-y-2.5 border-t border-border pt-4">
            {checkIns.slice(0, 5).map((ci) => (
              <div key={ci.date} className="rounded-xl bg-bg-elevated p-3.5">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <ClipboardCheck size={12} className="text-lime" />
                    <span className="font-display font-bold text-xs">{formatDate(ci.date)}</span>
                  </div>
                  <span className="text-text-muted text-[10px] font-medium">{ci.sessions} sessions</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <div className="text-center rounded-lg bg-bg-card p-2">
                    <p className="text-text-muted text-[9px] uppercase tracking-wider">Nutrition</p>
                    <p className="text-lime font-display font-bold text-sm">{ci.nutrition}/10</p>
                  </div>
                  <div className="text-center rounded-lg bg-bg-card p-2">
                    <p className="text-text-muted text-[9px] uppercase tracking-wider">Sleep</p>
                    <p className="text-lime font-display font-bold text-sm">{ci.sleep}/10</p>
                  </div>
                  <div className="text-center rounded-lg bg-bg-card p-2">
                    <p className="text-text-muted text-[9px] uppercase tracking-wider">Energy</p>
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
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-bg-elevated flex items-center justify-center">
            <Target size={16} className="text-text-muted" />
          </div>
          <p className="font-display font-bold text-sm tracking-tight">Performance Markers</p>
        </div>
        <div className="space-y-0">
          {lifts.map((lift) => {
            const pr = prs.find((p) => p.lift === lift)
            return (
              <button
                key={lift}
                onClick={() => {
                  setShowPRModal(lift)
                  setPrInput(pr?.value || '')
                }}
                className="w-full flex items-center justify-between py-3.5 border-b border-border/30 last:border-0 text-left group"
              >
                <span className="text-sm font-medium">{lift}</span>
                <div className="flex items-center gap-2">
                  {pr ? (
                    <>
                      <span className="font-display font-bold text-lime text-sm">
                        {pr.value}
                      </span>
                      <span className="text-text-muted text-[10px]">{formatDate(pr.date)}</span>
                    </>
                  ) : (
                    <span className="text-text-muted text-xs">Tap to log</span>
                  )}
                  <ChevronRight size={14} className="text-text-muted group-hover:text-text transition-colors" />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Weight Modal */}
      {showWeightModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-end justify-center">
          <div className="w-full max-w-lg bg-bg-card border-t border-border rounded-t-3xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-lg tracking-tight">Log Weight</h2>
              <button
                onClick={() => setShowWeightModal(false)}
                className="w-8 h-8 rounded-xl bg-bg-elevated flex items-center justify-center text-text-muted hover:text-text transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mb-6">
              <label className="text-text-muted text-[10px] uppercase tracking-[0.2em] font-medium mb-2 block">Weight (lbs)</label>
              <input
                type="number"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                placeholder="185"
                autoFocus
                className="w-full bg-bg-elevated border border-border rounded-xl px-4 py-4 text-text text-3xl font-display font-bold text-center placeholder:text-text-muted/40 focus:outline-none focus:border-lime/40 transition-colors"
              />
            </div>
            <button
              onClick={handleLogWeight}
              disabled={!weightInput}
              className="w-full bg-lime text-bg font-display font-bold text-sm py-4 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-30 glow-lime uppercase tracking-wider"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* PR Modal */}
      {showPRModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-end justify-center">
          <div className="w-full max-w-lg bg-bg-card border-t border-border rounded-t-3xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-lg tracking-tight">{showPRModal}</h2>
              <button
                onClick={() => setShowPRModal(null)}
                className="w-8 h-8 rounded-xl bg-bg-elevated flex items-center justify-center text-text-muted hover:text-text transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mb-6">
              <label className="text-text-muted text-[10px] uppercase tracking-[0.2em] font-medium mb-2 block">
                {showPRModal === '40-Yard Dash' ? 'Time (seconds)' : 'Weight (lbs)'}
              </label>
              <input
                type="text"
                value={prInput}
                onChange={(e) => setPrInput(e.target.value)}
                placeholder={showPRModal === '40-Yard Dash' ? '4.5' : '225'}
                autoFocus
                className="w-full bg-bg-elevated border border-border rounded-xl px-4 py-4 text-text text-3xl font-display font-bold text-center placeholder:text-text-muted/40 focus:outline-none focus:border-lime/40 transition-colors"
              />
            </div>
            <button
              onClick={handleLogPR}
              disabled={!prInput}
              className="w-full bg-lime text-bg font-display font-bold text-sm py-4 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-30 glow-lime uppercase tracking-wider"
            >
              Save PR
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
