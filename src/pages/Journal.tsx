import { useState } from 'react'
import { Sun, Moon, Zap, Brain, Check, CheckCircle, ChevronDown, ChevronUp, Clock } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { saveJournalEntry, getJournalEntries, type JournalEntry } from '../lib/storage'

const needleMovers = [
  'Train with intensity',
  'Eat with purpose',
  'Hydrate (1 gallon)',
  'Read 10 pages',
  'Stretch / Mobility work',
]

const affirmations = [
  'I am disciplined in every area of my life.',
  'I do not quit when it gets hard.',
  'I compete with who I was yesterday.',
  'I lead by example, not by words.',
  'I am called to something greater.',
]

function getAffirmation() {
  const day = Math.floor(Date.now() / 86400000)
  return affirmations[day % affirmations.length]
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatDayName(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00')
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  if (dateStr === today) return 'Today'
  if (dateStr === yesterday) return 'Yesterday'
  return d.toLocaleDateString('en-US', { weekday: 'short' })
}

export default function Journal() {
  const { user } = useAuth()
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'evening'>('morning')
  const [energy, setEnergy] = useState(5)
  const [mind, setMind] = useState(5)
  const [checked, setChecked] = useState<Set<number>>(new Set())
  const [affirmation1, setAffirmation1] = useState('')
  const [affirmation2, setAffirmation2] = useState('')
  const [affirmation3, setAffirmation3] = useState('')
  const [saved, setSaved] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const affirmation = getAffirmation()

  const entries = user ? getJournalEntries(user.id) : []
  const todayStr = new Date().toISOString().split('T')[0]
  const pastEntries = entries
    .filter((e) => e.date !== todayStr || e.timeOfDay !== timeOfDay)
    .sort((a, b) => b.date.localeCompare(a.date))

  const toggleCheck = (i: number) => {
    const next = new Set(checked)
    if (next.has(i)) next.delete(i)
    else next.add(i)
    setChecked(next)
  }

  const handleSave = () => {
    if (!user) return
    saveJournalEntry(user.id, {
      date: todayStr,
      timeOfDay,
      energy,
      mind,
      checkedItems: [...checked],
      gratitude: [affirmation1, affirmation2, affirmation3].filter(Boolean).join('|||'),
      affirmation,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen pb-24 px-5 pt-14">
      <div className="animate-fade-in mb-6">
        <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">The Strongest Version</p>
        <h1 className="font-display text-2xl font-bold">Daily Journal</h1>
      </div>

      {/* Morning / Evening toggle */}
      <div className="animate-slide-up flex bg-bg-card rounded-xl p-1 mb-6 border border-border">
        <button
          onClick={() => setTimeOfDay('morning')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
            timeOfDay === 'morning' ? 'bg-lime/15 text-lime' : 'text-text-muted'
          }`}
        >
          <Sun size={16} /> Morning
        </button>
        <button
          onClick={() => setTimeOfDay('evening')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
            timeOfDay === 'evening' ? 'bg-lime/15 text-lime' : 'text-text-muted'
          }`}
        >
          <Moon size={16} /> Evening
        </button>
      </div>

      {/* Affirmation card */}
      <div className="animate-slide-up [animation-delay:80ms] opacity-0 rounded-2xl bg-bg-card border border-border p-5 mb-4 gradient-border">
        <p className="text-text-secondary text-xs uppercase tracking-wider mb-2">Today's Affirmation</p>
        <p className="font-display font-medium text-[15px] leading-relaxed italic text-lime">
          "{affirmation}"
        </p>
      </div>

      {/* Energy & Mind sliders */}
      <div className="animate-slide-up [animation-delay:160ms] opacity-0 grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-2xl bg-bg-card border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={16} className="text-warning" />
            <span className="text-sm font-medium">Energy</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={energy}
            onChange={(e) => setEnergy(Number(e.target.value))}
            className="w-full accent-lime"
          />
          <p className="text-center text-lime font-display font-bold text-lg mt-1">{energy}</p>
        </div>
        <div className="rounded-2xl bg-bg-card border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <Brain size={16} className="text-[#818cf8]" />
            <span className="text-sm font-medium">Mind</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={mind}
            onChange={(e) => setMind(Number(e.target.value))}
            className="w-full accent-lime"
          />
          <p className="text-center text-lime font-display font-bold text-lg mt-1">{mind}</p>
        </div>
      </div>

      {/* Needle Movers */}
      <div className="animate-slide-up [animation-delay:240ms] opacity-0 rounded-2xl bg-bg-card border border-border p-5 mb-4">
        <p className="text-text-secondary text-xs uppercase tracking-wider mb-3">Needle Movers</p>
        <div className="space-y-2.5">
          {needleMovers.map((item, i) => (
            <button
              key={i}
              onClick={() => toggleCheck(i)}
              className="w-full flex items-center gap-3 text-left"
            >
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                checked.has(i) ? 'bg-lime border-lime' : 'border-text-muted'
              }`}>
                {checked.has(i) && <Check size={12} className="text-bg" />}
              </div>
              <span className={`text-sm ${checked.has(i) ? 'text-text-secondary line-through' : 'text-text'}`}>
                {item}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Affirmations */}
      <div className="animate-slide-up [animation-delay:320ms] opacity-0 rounded-2xl bg-bg-card border border-border p-5 mb-4">
        <p className="text-text-secondary text-xs uppercase tracking-wider mb-4">My Affirmations</p>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-lime font-display font-bold text-sm shrink-0">I am</span>
            <input
              type="text"
              value={affirmation1}
              onChange={(e) => setAffirmation1(e.target.value)}
              placeholder="disciplined and relentless..."
              className="flex-1 bg-bg-elevated border border-border rounded-lg px-3 py-2.5 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-lime/50 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lime font-display font-bold text-sm shrink-0">I am</span>
            <input
              type="text"
              value={affirmation2}
              onChange={(e) => setAffirmation2(e.target.value)}
              placeholder="built for this moment..."
              className="flex-1 bg-bg-elevated border border-border rounded-lg px-3 py-2.5 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-lime/50 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lime font-display font-bold text-sm shrink-0">I am</span>
            <input
              type="text"
              value={affirmation3}
              onChange={(e) => setAffirmation3(e.target.value)}
              placeholder="called to compete..."
              className="flex-1 bg-bg-elevated border border-border rounded-lg px-3 py-2.5 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-lime/50 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        className={`animate-slide-up [animation-delay:400ms] opacity-0 w-full font-display font-semibold py-3.5 rounded-xl transition-all active:scale-[0.98] ${
          saved
            ? 'bg-success text-bg'
            : 'bg-lime text-bg hover:brightness-110 glow-lime'
        }`}
      >
        {saved ? (
          <span className="flex items-center justify-center gap-2">
            <CheckCircle size={18} /> Saved
          </span>
        ) : (
          'Save Entry'
        )}
      </button>

      {/* History section */}
      {pastEntries.length > 0 && (
        <div className="mt-8">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="w-full flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-text-secondary" />
              <p className="font-display font-semibold text-sm">Past Entries</p>
              <span className="text-text-muted text-xs">({pastEntries.length})</span>
            </div>
            {showHistory ? (
              <ChevronUp size={18} className="text-text-muted" />
            ) : (
              <ChevronDown size={18} className="text-text-muted" />
            )}
          </button>

          {showHistory && (
            <div className="space-y-3">
              {pastEntries.slice(0, 10).map((entry, i) => (
                <HistoryCard key={`${entry.date}-${entry.timeOfDay}`} entry={entry} index={i} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function HistoryCard({ entry, index }: { entry: JournalEntry; index: number }) {
  return (
    <div
      className="animate-slide-up opacity-0 rounded-2xl bg-bg-card border border-border p-4"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {entry.timeOfDay === 'morning' ? (
            <Sun size={14} className="text-warning" />
          ) : (
            <Moon size={14} className="text-[#818cf8]" />
          )}
          <span className="font-display font-semibold text-sm">
            {formatDayName(entry.date)}, {formatDate(entry.date)}
          </span>
        </div>
        <span className="text-text-muted text-xs capitalize">{entry.timeOfDay}</span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          <Zap size={12} className="text-warning" />
          <span className="text-text-secondary text-xs">Energy: </span>
          <span className="text-lime font-display font-semibold text-xs">{entry.energy}/10</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Brain size={12} className="text-[#818cf8]" />
          <span className="text-text-secondary text-xs">Mind: </span>
          <span className="text-lime font-display font-semibold text-xs">{entry.mind}/10</span>
        </div>
      </div>

      {entry.checkedItems.length > 0 && (
        <div className="flex items-center gap-1 mb-2">
          <Check size={12} className="text-lime" />
          <span className="text-text-muted text-xs">
            {entry.checkedItems.length} of 5 needle movers
          </span>
        </div>
      )}

      {entry.gratitude && (
        <div className="space-y-0.5">
          {entry.gratitude.split('|||').map((a, i) => (
            <p key={i} className="text-text-secondary text-xs italic truncate">
              I am {a}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
