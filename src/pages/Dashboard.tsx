import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flame, ChevronRight, Settings, Play, Check, Megaphone, X, Bell, BookOpen, ClipboardCheck, TrendingUp, MessageCircle, MessageSquare, Swords, Zap, Droplets, Plus, Minus, Target } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { isSubscribed } from '../lib/subscription'
import { getStreak, getCompletedSessions, getJournalEntries, getCheckIns, getSelectedProgramId, getWaterIntake, saveWaterIntake } from '../lib/storage'
import { getProgramById, getProgram } from '../lib/programs'
import { supabase } from '../lib/supabase'

const devotionals = [
  { text: "You were not created to settle. You were created to lead.", author: "Coach Tyler" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
  { text: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke" },
  { text: "Champions keep playing until they get it right.", author: "Billie Jean King" },
  { text: "The body achieves what the mind believes.", author: "Napoleon Hill" },
  { text: "Pain is temporary. Quitting lasts forever.", author: "Eric Thomas" },
  { text: "Don't count the days. Make the days count.", author: "Muhammad Ali" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi" },
  { text: "The harder the battle, the sweeter the victory.", author: "Les Brown" },
  { text: "Compete harder. Train smarter. Feel better.", author: "Called to Compete" },
  { text: "Today I will do what others won't, so tomorrow I can accomplish what others can't.", author: "Jerry Rice" },
  { text: "Your body can stand almost anything. It's your mind you have to convince.", author: "Coach Tyler" },
  { text: "Be stronger than your excuses.", author: "Coach Tyler" },
  { text: "You don't have to be extreme, just consistent.", author: "Coach Tyler" },
  { text: "Success isn't owned. It's leased, and rent is due every day.", author: "J.J. Watt" },
  { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
  { text: "If it doesn't challenge you, it doesn't change you.", author: "Fred DeVito" },
  { text: "The iron never lies. Two hundred pounds is always two hundred pounds.", author: "Henry Rollins" },
  { text: "Motivation gets you going. Discipline keeps you growing.", author: "John Maxwell" },
  { text: "You were built for this. Now go prove it.", author: "Coach Tyler" },
]

const dailyChallenges = [
  { text: "No complaining today. Zero. About anything.", tag: "Mindset" },
  { text: "10 minutes of silence. No phone. No music. Just you.", tag: "Discipline" },
  { text: "Cold shower for 30 seconds at the end.", tag: "Grit" },
  { text: "Text someone and tell them you appreciate them.", tag: "Leadership" },
  { text: "Write down 3 things you're afraid of. Then do one.", tag: "Courage" },
  { text: "No social media until your workout is done.", tag: "Focus" },
  { text: "100 pushups before midnight. Break them up however you want.", tag: "Challenge" },
  { text: "Drink a gallon of water today. Every. Single. Drop.", tag: "Discipline" },
  { text: "Read for 20 minutes. No excuses.", tag: "Growth" },
  { text: "Walk for 15 minutes. No phone. Think about where you're going.", tag: "Clarity" },
  { text: "Say no to one thing that doesn't serve your goals.", tag: "Purpose" },
  { text: "Hold a 2-minute plank. Don't quit when it burns.", tag: "Grit" },
  { text: "Give someone a genuine compliment. Mean it.", tag: "Leadership" },
  { text: "No processed food today. Fuel clean.", tag: "Discipline" },
  { text: "Set a timer for 25 minutes. Deep work. No distractions.", tag: "Focus" },
  { text: "Stretch for 10 minutes before bed. Your body needs it.", tag: "Recovery" },
  { text: "Wake up 30 minutes earlier tomorrow. Start winning the morning.", tag: "Discipline" },
  { text: "Do something that scares you today. Even something small.", tag: "Courage" },
  { text: "Delete 3 apps that waste your time.", tag: "Focus" },
  { text: "Cook your own meal today. Own what goes in your body.", tag: "Discipline" },
  { text: "Make your bed first thing. Start with a win.", tag: "Discipline" },
]

const needleMovers = [
  'Train with intensity',
  'Eat with purpose',
  'Hydrate (1 gallon)',
  'Read 10 pages',
  'Stretch / Mobility work',
]

function getDevotional() {
  const day = Math.floor(Date.now() / 86400000)
  return devotionals[day % devotionals.length]
}

function getDailyChallenge() {
  const day = Math.floor(Date.now() / 86400000)
  return dailyChallenges[day % dailyChallenges.length]
}

type Broadcast = {
  id: string
  message: string
  created_at: string
}

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [latestBroadcast, setLatestBroadcast] = useState<Broadcast | null>(null)
  const [dismissedBroadcast, setDismissedBroadcast] = useState<string | null>(null)
  const [challengeAccepted, setChallengeAccepted] = useState(() => {
    const today = new Date().toISOString().split('T')[0]
    return localStorage.getItem('ctc_challenge_accepted') === today
  })
  const [waterCups, setWaterCups] = useState(() => user ? getWaterIntake(user.id) : 0)
  const waterGoal = 8
  const todayStr = new Date().toISOString().split('T')[0]
  const [needleChecked, setNeedleChecked] = useState<Set<number>>(() => {
    try {
      const stored = localStorage.getItem(`ctc_needles_${todayStr}`)
      return stored ? new Set(JSON.parse(stored)) : new Set()
    } catch { return new Set() }
  })
  const firstName = user?.name?.split(' ')[0] || 'Athlete'
  const devotional = getDevotional()
  const challenge = getDailyChallenge()
  const hour = new Date().getHours()

  useEffect(() => {
    const dismissed = localStorage.getItem('ctc_dismissed_broadcast')
    setDismissedBroadcast(dismissed)
    supabase
      .from('broadcasts')
      .select('id, message, created_at')
      .order('created_at', { ascending: false })
      .limit(1)
      .then(({ data }) => {
        if (data && data.length > 0) setLatestBroadcast(data[0])
      }, () => {})
  }, [])

  const dismissBroadcast = (id: string) => {
    localStorage.setItem('ctc_dismissed_broadcast', id)
    setDismissedBroadcast(id)
  }

  const acceptChallenge = () => {
    const today = new Date().toISOString().split('T')[0]
    localStorage.setItem('ctc_challenge_accepted', today)
    setChallengeAccepted(true)
    if (navigator.vibrate) navigator.vibrate(100)
  }

  const streak = user ? getStreak(user.id) : 0
  const sessions = user ? getCompletedSessions(user.id) : []
  const trainedToday = sessions.some((s) => s.date === todayStr)

  const savedProgramId = user ? getSelectedProgramId(user.id) : null
  const program = (savedProgramId && getProgramById(savedProgramId)) || getProgram(user?.identity || '')
  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  const programSessions = sessions.filter((s) => s.programId === program.id)
  const sortedProgramSessions = [...programSessions].sort((a, b) => b.date.localeCompare(a.date))
  const lastDayIndex = sortedProgramSessions.length > 0 ? sortedProgramSessions[0].dayIndex : -1
  let nextDayIndex = (lastDayIndex + 1) % program.days.length
  const todayCompleted = new Set(programSessions.filter((s) => s.date === todayStr).map((s) => s.dayIndex))
  if (todayCompleted.has(nextDayIndex)) {
    for (let i = 1; i < program.days.length; i++) {
      const candidate = (nextDayIndex + i) % program.days.length
      if (!todayCompleted.has(candidate)) { nextDayIndex = candidate; break }
    }
  }
  const nextDay = program.days[nextDayIndex]

  const last7 = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(Date.now() - (6 - i) * 86400000)
    const dateStr = d.toISOString().split('T')[0]
    return {
      label: dayLabels[d.getDay()],
      trained: sessions.some((s) => s.date === dateStr),
      isToday: i === 6,
    }
  })

  const journalEntries = user ? getJournalEntries(user.id) : []
  const journaledToday = journalEntries.some((e) => e.date === todayStr)
  const checkIns = user ? getCheckIns(user.id) : []
  const weekStart = new Date(Date.now() - 6 * 86400000).toISOString().split('T')[0]
  const hasWeeklyCheckIn = checkIns.some((c) => c.date >= weekStart)
  const isMorning = hour < 12
  const isEvening = hour >= 18

  const dailyActions = [trainedToday, journaledToday, challengeAccepted]
  const completedActions = dailyActions.filter(Boolean).length
  const accountabilityPct = Math.round((completedActions / dailyActions.length) * 100)

  const ringRadius = 42
  const ringCircumference = 2 * Math.PI * ringRadius
  const ringOffset = ringCircumference - (accountabilityPct / 100) * ringCircumference

  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* ── Hero with mesh background ── */}
      <div className="mesh-bg">
        <div className="animate-fade-in px-5 pt-14 pb-3 relative z-10">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2.5">
              <img src="/logo-circle.png" alt="CTC" className="w-8 h-8 rounded-xl shadow-[0_0_12px_rgba(189,255,58,0.08)]" />
              <span className="font-display text-[11px] font-bold tracking-[0.2em] uppercase text-text-secondary">Called to Compete</span>
            </div>
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => navigate('/messages')}
                className="w-10 h-10 rounded-2xl hover:bg-white/[0.04] transition-all text-text-muted hover:text-text flex items-center justify-center relative"
              >
                <Bell size={19} strokeWidth={1.8} />
                {latestBroadcast && dismissedBroadcast !== latestBroadcast.id && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)] animate-pulse" />
                )}
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="w-10 h-10 rounded-2xl hover:bg-white/[0.04] transition-all text-text-muted hover:text-text flex items-center justify-center"
              >
                <Settings size={19} strokeWidth={1.8} />
              </button>
            </div>
          </div>

          {/* Greeting + Accountability */}
          <div className="flex items-end justify-between mb-2">
            <div>
              <p className="text-text-muted text-[10px] uppercase tracking-[0.3em] font-medium mb-2">{greeting}</p>
              <h1 className="font-display text-[42px] font-bold tracking-tighter leading-[0.9]">
                {firstName}<span className="text-lime">.</span>
              </h1>
            </div>

            {/* Accountability ring */}
            <div className="relative w-[100px] h-[100px] shrink-0 -mb-1">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r={ringRadius} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="4.5" />
                <circle
                  cx="50" cy="50" r={ringRadius}
                  fill="none"
                  stroke={accountabilityPct > 0 ? 'url(#ringGrad)' : 'rgba(255,255,255,0.04)'}
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={ringOffset}
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#BDFF3A" />
                    <stop offset="100%" stopColor="#22D3EE" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`font-display font-bold text-[22px] leading-none ${accountabilityPct === 100 ? 'text-lime' : ''}`}>{accountabilityPct}%</span>
                <span className="text-text-muted text-[7px] uppercase tracking-[0.2em] mt-1">Today</span>
              </div>
              {accountabilityPct === 100 && (
                <div className="absolute inset-0 rounded-full bg-lime/[0.06] blur-xl" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Daily Word ── */}
      <div className="animate-slide-up px-5 mb-5">
        <div className="rounded-2xl bg-bg-card/80 border border-border p-5 relative overflow-hidden">
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-lime/[0.03] rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute -right-6 -top-6 w-28 h-28 bg-cyan-400/[0.02] rounded-full blur-[40px] pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-lime/15 via-transparent to-cyan-400/15" />
          <p className="text-text-muted text-[9px] uppercase tracking-[0.25em] font-bold mb-3 relative">Daily Word</p>
          <p className="font-display font-medium text-[16px] leading-relaxed italic relative">
            "{devotional.text}"
          </p>
          <p className="text-text-muted text-xs mt-3 relative">— {devotional.author}</p>
        </div>
      </div>

      {/* ── Next Workout CTA ── */}
      <div className="animate-slide-up [animation-delay:40ms] opacity-0 px-5 mb-5">
        <button
          onClick={() => {
            if (user && !isSubscribed(user)) { navigate('/subscribe'); return }
            navigate(trainedToday ? '/training' : `/training/${nextDayIndex}`)
          }}
          className={`card-shine w-full rounded-2xl text-left transition-all active:scale-[0.98] relative overflow-hidden group ${
            trainedToday
              ? 'bg-lime/[0.04] border border-lime/15'
              : 'border border-lime/25 bg-bg-card'
          }`}
        >
          {program.image && !trainedToday && (
            <>
              <div className="absolute inset-0">
                <img src={program.image} alt="" className="w-full h-full object-cover opacity-[0.15]" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-bg-card via-bg-card/90 to-bg-card/70" />
            </>
          )}
          {!trainedToday && (
            <>
              <div className="absolute -right-10 -top-10 w-44 h-44 bg-lime/[0.05] rounded-full blur-[60px]" />
              <div className="absolute right-4 bottom-0 w-24 h-24 bg-cyan-400/[0.03] rounded-full blur-[40px]" />
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-lime/30 via-lime/10 to-transparent" />
            </>
          )}
          <div className="relative flex items-center justify-between p-5">
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 text-lime">
                {trainedToday ? 'Session Complete' : 'Next Session'}
              </p>
              <p className="font-display font-bold text-[22px] tracking-tight mb-1 leading-tight">
                {nextDay?.title || 'Ready to train'}
              </p>
              <div className="flex items-center gap-2.5 text-text-muted text-xs">
                <span>{nextDay?.exercises.length} exercises</span>
                <span className="w-[3px] h-[3px] rounded-full bg-text-muted/50" />
                <span>{nextDay?.duration}</span>
              </div>
            </div>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
              trainedToday
                ? 'bg-lime/10'
                : 'bg-lime/[0.15] group-hover:bg-lime/[0.2] shadow-[0_0_20px_rgba(189,255,58,0.1)]'
            }`}>
              {trainedToday ? (
                <Check size={24} className="text-lime" />
              ) : (
                <Play size={24} className="text-lime ml-0.5" />
              )}
            </div>
          </div>
        </button>
      </div>

      {/* ── Streak bar ── */}
      <div className="animate-slide-up [animation-delay:60ms] opacity-0 px-5 mb-5">
        <div className="rounded-2xl bg-bg-card/80 border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame size={16} className={streak > 0 ? 'text-lime drop-shadow-[0_0_6px_rgba(189,255,58,0.4)]' : 'text-text-muted'} />
              {streak > 0 ? (
                <p className="font-display font-bold text-sm">
                  <span className="text-lime">{streak}</span> day streak
                </p>
              ) : (
                <p className="font-display font-bold text-sm text-text-muted">Build your streak</p>
              )}
            </div>
            <div className="flex items-center gap-1">
              {[
                { done: trainedToday, icon: Zap, label: 'Train' },
                { done: journaledToday, icon: BookOpen, label: 'Journal' },
                { done: challengeAccepted, icon: Swords, label: 'Compete' },
              ].map((a) => (
                <div key={a.label} className={`flex items-center gap-0.5 px-1.5 py-1 rounded-full text-[7px] font-bold uppercase tracking-wide transition-all ${
                  a.done ? 'bg-lime/[0.12] text-lime' : 'bg-white/[0.03] text-text-muted'
                }`}>
                  {a.done ? <Check size={7} /> : <a.icon size={7} />}
                  {a.label}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-[3px]">
            {last7.map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className={`w-full h-[5px] rounded-full transition-all duration-500 ${
                  day.trained
                    ? 'bg-gradient-to-r from-lime to-cyan-400 shadow-[0_0_6px_rgba(189,255,58,0.25)]'
                    : day.isToday ? 'bg-white/[0.08]' : 'bg-white/[0.03]'
                }`} />
                <span className={`text-[8px] ${day.isToday ? 'text-text font-bold' : 'text-text-muted'}`}>
                  {day.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Coach Broadcast ── */}
      {latestBroadcast && dismissedBroadcast !== latestBroadcast.id && (
        <div className="animate-slide-up px-5 mb-4">
          <div className="rounded-2xl bg-cyan-400/[0.05] border border-cyan-400/20 p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-400/10 flex items-center justify-center shrink-0">
                <Megaphone size={16} className="text-cyan-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-cyan-400 text-[10px] font-bold uppercase tracking-[0.15em]">Coach Tyler</p>
                  <button
                    onClick={() => dismissBroadcast(latestBroadcast.id)}
                    className="w-6 h-6 rounded-lg hover:bg-white/[0.04] transition-colors flex items-center justify-center"
                  >
                    <X size={12} className="text-text-muted" />
                  </button>
                </div>
                <p className="text-sm leading-relaxed text-text-secondary">{latestBroadcast.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Needle Movers ── */}
      <div className="animate-slide-up [animation-delay:120ms] opacity-0 px-5 mb-5">
        <div className="rounded-2xl bg-bg-card/80 border border-border p-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-lime/20 via-lime/10 to-transparent" />
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-lime/[0.08] flex items-center justify-center">
              <Target size={15} className="text-lime" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime">Needle Movers</p>
            </div>
            <p className="text-text-muted text-[10px] font-bold">{needleChecked.size}/{needleMovers.length}</p>
          </div>
          <div className="space-y-1">
            {needleMovers.map((item, i) => {
              const done = needleChecked.has(i)
              return (
                <button
                  key={i}
                  onClick={() => {
                    const next = new Set(needleChecked)
                    if (done) next.delete(i); else next.add(i)
                    setNeedleChecked(next)
                    try { localStorage.setItem(`ctc_needles_${todayStr}`, JSON.stringify([...next])) } catch {}
                    if (!done && next.size === needleMovers.length && navigator.vibrate) navigator.vibrate(100)
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                    done ? 'bg-lime/[0.04]' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                    done ? 'bg-lime border-lime' : 'border-white/[0.12]'
                  }`}>
                    {done && <Check size={12} className="text-black" strokeWidth={3} />}
                  </div>
                  <span className={`text-sm font-medium transition-colors ${done ? 'text-text-secondary line-through decoration-lime/40' : 'text-text'}`}>
                    {item}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Daily Challenge ── */}
      <div className="animate-slide-up [animation-delay:180ms] opacity-0 px-5 mb-5">
        <div className={`rounded-2xl border p-4 transition-all relative overflow-hidden ${
          challengeAccepted
            ? 'bg-lime/[0.03] border-lime/15'
            : 'bg-bg-card/80 border-border'
        }`}>
          {!challengeAccepted && (
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent" />
          )}
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              challengeAccepted ? 'bg-lime/10' : 'bg-cyan-400/[0.08]'
            }`}>
              <Swords size={17} className={challengeAccepted ? 'text-lime' : 'text-cyan-400'} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                  challengeAccepted ? 'text-lime' : 'text-cyan-400'
                }`}>Daily Challenge</p>
                <span className="text-[8px] text-text-muted bg-white/[0.04] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                  {challenge.tag}
                </span>
              </div>
              <p className={`text-[15px] leading-relaxed ${challengeAccepted ? 'text-text-secondary' : 'text-text'}`}>
                {challenge.text}
              </p>
              {!challengeAccepted ? (
                <button
                  onClick={acceptChallenge}
                  className="mt-3 bg-gradient-to-r from-cyan-400/[0.1] to-cyan-400/[0.05] border border-cyan-400/25 text-cyan-400 font-display font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl hover:from-cyan-400/[0.15] transition-all active:scale-[0.97]"
                >
                  I Accept
                </button>
              ) : (
                <p className="mt-2.5 text-lime text-xs font-display font-bold flex items-center gap-1.5">
                  <Check size={12} /> Challenge accepted
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Water + Community row ── */}
      <div className="animate-slide-up [animation-delay:240ms] opacity-0 px-5 mb-5 grid grid-cols-2 gap-3">
        {/* Water tracker */}
        <div className="rounded-2xl bg-bg-card/80 border border-border p-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent" />
          <div className="flex items-center justify-between mb-2.5">
            <Droplets size={15} className="text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.3)]" />
            <p className="text-text-muted text-[10px] font-bold">{waterCups}/{waterGoal}</p>
          </div>
          <p className="font-display font-bold text-sm tracking-tight mb-3">Hydration</p>
          <div className="grid grid-cols-4 gap-1 mb-3">
            {Array.from({ length: waterGoal }).map((_, i) => (
              <div
                key={i}
                className={`h-[6px] rounded-full transition-all duration-500 ${
                  i < waterCups
                    ? waterCups >= waterGoal
                      ? 'bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.3)]'
                      : 'bg-gradient-to-r from-cyan-400/70 to-cyan-400/40'
                    : 'bg-white/[0.04]'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => {
                if (!user || waterCups <= 0) return
                const next = waterCups - 1
                setWaterCups(next)
                saveWaterIntake(user.id, next)
              }}
              className="w-9 h-9 rounded-xl bg-white/[0.04] flex items-center justify-center active:scale-90 transition-transform"
            >
              <Minus size={13} className="text-text-muted" />
            </button>
            <button
              onClick={() => {
                if (!user) return
                const next = waterCups + 1
                setWaterCups(next)
                saveWaterIntake(user.id, next)
                if (next >= waterGoal && navigator.vibrate) navigator.vibrate(100)
              }}
              className="w-9 h-9 rounded-xl bg-cyan-400/[0.08] border border-cyan-400/20 flex items-center justify-center active:scale-90 transition-transform"
            >
              <Plus size={13} className="text-cyan-400" />
            </button>
          </div>
        </div>

        {/* Community */}
        <button
          onClick={() => navigate('/community')}
          className="rounded-2xl bg-bg-card/80 border border-border p-4 text-left transition-all active:scale-[0.98] hover:border-white/[0.06] relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-lime/15 to-transparent" />
          <div className="w-10 h-10 rounded-xl bg-lime/[0.08] flex items-center justify-center mb-3">
            <MessageSquare size={18} className="text-lime" />
          </div>
          <p className="font-display font-bold text-sm tracking-tight mb-1">Community</p>
          <p className="text-text-muted text-[11px] leading-relaxed">Post up. Talk trash.</p>
          <ChevronRight size={14} className="text-text-muted/40 absolute bottom-4 right-4 group-hover:text-lime/40 transition-colors" />
        </button>
      </div>

      {/* ── Journal nudge ── */}
      {!journaledToday && (isMorning || isEvening) && (
        <div className="animate-slide-up [animation-delay:360ms] opacity-0 px-5 mb-4">
          <button
            onClick={() => navigate('/journal')}
            className="card-shine w-full rounded-2xl border p-4 text-left transition-all active:scale-[0.98] flex items-center gap-3 relative overflow-hidden bg-bg-card/80 border-border hover:border-white/[0.06]"
          >
            <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent ${isMorning ? 'via-cyan-400/20' : 'via-blue-400/20'} to-transparent`} />
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isMorning ? 'bg-cyan-400/[0.08]' : 'bg-blue-400/[0.08]'}`}>
              <BookOpen size={18} className={isMorning ? 'text-cyan-400' : 'text-blue-400'} />
            </div>
            <div className="flex-1">
              <p className="font-display font-bold text-sm tracking-tight">
                {isMorning ? 'Set Your Mind Right' : 'Close Out the Day'}
              </p>
              <p className="text-text-muted text-xs mt-0.5">
                {isMorning ? 'Morning visualization · 2 min' : 'Evening reflection · 2 min'}
              </p>
            </div>
            <ChevronRight size={14} className="text-text-muted/40" />
          </button>
        </div>
      )}

      {/* ── Quick links ── */}
      <div className="animate-slide-up [animation-delay:400ms] opacity-0 px-5 mb-5">
        <div className="grid grid-cols-3 gap-2.5">
          {!hasWeeklyCheckIn ? (
            <button
              onClick={() => navigate('/check-in')}
              className="rounded-2xl bg-bg-card/80 border border-border p-5 text-center hover:border-white/[0.06] transition-all active:scale-[0.98] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-lime/15 to-transparent" />
              <div className="w-10 h-10 rounded-xl bg-lime/[0.08] flex items-center justify-center mx-auto mb-2.5">
                <ClipboardCheck size={18} className="text-lime/70" />
              </div>
              <p className="font-display font-bold text-[11px]">Check-in</p>
            </button>
          ) : (
            <button
              onClick={() => navigate('/nutrition')}
              className="rounded-2xl bg-bg-card/80 border border-border p-5 text-center hover:border-white/[0.06] transition-all active:scale-[0.98] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-lime/15 to-transparent" />
              <div className="w-10 h-10 rounded-xl bg-lime/[0.08] flex items-center justify-center mx-auto mb-2.5">
                <Droplets size={18} className="text-lime/70" />
              </div>
              <p className="font-display font-bold text-[11px]">Nutrition</p>
            </button>
          )}
          <button
            onClick={() => navigate('/progress')}
            className="rounded-2xl bg-bg-card/80 border border-border p-5 text-center hover:border-white/[0.06] transition-all active:scale-[0.98] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent" />
            <div className="w-10 h-10 rounded-xl bg-cyan-400/[0.08] flex items-center justify-center mx-auto mb-2.5">
              <TrendingUp size={18} className="text-cyan-400/70" />
            </div>
            <p className="font-display font-bold text-[11px]">Progress</p>
          </button>
          <a
            href="sms:+12546402697"
            className="rounded-2xl bg-bg-card/80 border border-border p-5 text-center hover:border-white/[0.06] transition-all active:scale-[0.98] block relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/15 to-transparent" />
            <div className="w-10 h-10 rounded-xl bg-blue-400/[0.08] flex items-center justify-center mx-auto mb-2.5">
              <MessageCircle size={18} className="text-blue-400/70" />
            </div>
            <p className="font-display font-bold text-[11px]">Coach</p>
          </a>
        </div>
      </div>

      {/* ── Branded footer ── */}
      <div className="flex-1 flex flex-col justify-end relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-white/[0.02]" />
        <div className="text-center relative" style={{ paddingBottom: '100px' }}>
          <img src="/logo-circle.png" alt="CTC" className="w-10 h-10 rounded-full mx-auto mb-3 opacity-30" />
          <p className="text-text-muted/30 text-[8px] uppercase tracking-[0.35em]">
            Compete Harder · Train Smarter · Feel Better
          </p>
          <p className="text-text-muted/20 text-[7px] uppercase tracking-[0.3em] mt-2">
            San Antonio, TX
          </p>
        </div>
      </div>
    </div>
  )
}
