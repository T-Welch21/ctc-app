import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flame, ChevronRight, Settings, Play, Check, Megaphone, X, Bell, BookOpen, ClipboardCheck, TrendingUp, MessageCircle, MessageSquare, Swords, Zap, Droplets, Plus, Minus } from 'lucide-react'
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
  { text: "Pain is temporary. Quitting lasts forever.", author: "Lance Armstrong" },
  { text: "Don't count the days. Make the days count.", author: "Muhammad Ali" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi" },
  { text: "The harder the battle, the sweeter the victory.", author: "Les Brown" },
  { text: "Compete harder. Train smarter. Feel better.", author: "Called to Compete" },
  { text: "Today I will do what others won't, so tomorrow I can accomplish what others can't.", author: "Jerry Rice" },
  { text: "Your body can stand almost anything. It's your mind you have to convince.", author: "Unknown" },
  { text: "Be stronger than your excuses.", author: "Coach Tyler" },
  { text: "You don't have to be extreme, just consistent.", author: "Coach Tyler" },
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
  const firstName = user?.name?.split(' ')[0] || 'Competitor'
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
      })
      .catch(() => {})
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
  const todayStr = new Date().toISOString().split('T')[0]
  const trainedToday = sessions.some((s) => s.date === todayStr)

  const savedProgramId = user ? getSelectedProgramId(user.id) : null
  const program = (savedProgramId && getProgramById(savedProgramId)) || getProgram(user?.identity || '')
  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  const todaySessions = sessions.filter((s) => s.date === todayStr)
  const completedDayIndexes = new Set(todaySessions.map((s) => s.dayIndex))
  let nextDayIndex = 0
  for (let i = 0; i < program.days.length; i++) {
    if (!completedDayIndexes.has(i)) {
      nextDayIndex = i
      break
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

  const ringRadius = 38
  const ringCircumference = 2 * Math.PI * ringRadius
  const ringOffset = ringCircumference - (accountabilityPct / 100) * ringCircumference

  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="min-h-screen pb-24">
      {/* Hero section with logo + ambient glow */}
      <div className="relative overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-lime/6 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -top-10 -right-20 w-40 h-40 bg-cyan-400/4 rounded-full blur-[60px] pointer-events-none" />

        <div className="animate-fade-in px-5 pt-12 pb-1 relative">
          {/* Top bar: logo + icons */}
          <div className="flex items-center justify-between mb-5">
            <img
              src="/logo-wide.png"
              alt="Called to Compete"
              className="h-10 w-auto"
            />
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => navigate('/messages')}
                className="w-10 h-10 rounded-xl hover:bg-bg-card transition-colors text-text-muted hover:text-text flex items-center justify-center relative"
              >
                <Bell size={20} />
                {latestBroadcast && dismissedBroadcast !== latestBroadcast.id && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                )}
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="w-10 h-10 rounded-xl hover:bg-bg-card transition-colors text-text-muted hover:text-text flex items-center justify-center"
              >
                <Settings size={20} />
              </button>
            </div>
          </div>

          {/* Greeting */}
          <div className="mb-5">
            <p className="text-text-muted text-[10px] uppercase tracking-[0.25em] font-medium mb-1">{greeting}</p>
            <h1 className="font-display text-4xl font-bold tracking-tight">
              {firstName}<span className="text-lime">.</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Accountability ring + streak + 7-day */}
      <div className="animate-slide-up px-5 mb-5">
        <div className="rounded-2xl bg-bg-card border border-border p-4 flex items-center gap-4">
          {/* Ring */}
          <div className="relative w-[92px] h-[92px] shrink-0">
            <svg viewBox="0 0 92 92" className="w-full h-full -rotate-90">
              <circle cx="46" cy="46" r={ringRadius} fill="none" stroke="#1E1E1E" strokeWidth="6" />
              <circle
                cx="46" cy="46" r={ringRadius}
                fill="none"
                stroke={accountabilityPct > 0 ? '#B3FF1D' : '#2A2A2A'}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={ringCircumference}
                strokeDashoffset={ringOffset}
                className="transition-all duration-700 ease-out"
                style={accountabilityPct === 100 ? { filter: 'drop-shadow(0 0 6px rgba(179,255,29,0.4))' } : undefined}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`font-display font-bold text-xl leading-none ${accountabilityPct === 100 ? 'text-lime' : ''}`}>{accountabilityPct}%</span>
              <span className="text-text-muted text-[8px] uppercase tracking-wider mt-0.5">Today</span>
            </div>
          </div>

          {/* Streak + dots */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <Flame size={18} className={streak > 0 ? 'text-lime' : 'text-text-muted'} />
              {streak > 0 ? (
                <p className="font-display font-bold text-sm">
                  <span className="text-lime">{streak}</span> day streak
                </p>
              ) : (
                <p className="font-display font-bold text-sm text-text-muted">Build your streak</p>
              )}
            </div>
            <div className="flex gap-1">
              {last7.map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                  <div className={`w-full h-2 rounded-full transition-colors ${
                    day.trained ? 'bg-lime' : day.isToday ? 'bg-border-light' : 'bg-bg-elevated'
                  }`} />
                  <span className={`text-[8px] ${day.isToday ? 'text-text font-semibold' : 'text-text-muted'}`}>
                    {day.label}
                  </span>
                </div>
              ))}
            </div>
            {/* Action chips */}
            <div className="flex items-center gap-1.5 mt-2.5">
              <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                trainedToday ? 'bg-lime/15 text-lime' : 'bg-bg-elevated text-text-muted'
              }`}>
                {trainedToday ? <Check size={10} /> : <Zap size={10} />}
                Train
              </div>
              <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                journaledToday ? 'bg-lime/15 text-lime' : 'bg-bg-elevated text-text-muted'
              }`}>
                {journaledToday ? <Check size={10} /> : <BookOpen size={10} />}
                Journal
              </div>
              <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                challengeAccepted ? 'bg-lime/15 text-lime' : 'bg-bg-elevated text-text-muted'
              }`}>
                {challengeAccepted ? <Check size={10} /> : <Swords size={10} />}
                Challenge
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coach Broadcast */}
      {latestBroadcast && dismissedBroadcast !== latestBroadcast.id && (
        <div className="animate-slide-up px-5 mb-4">
          <div className="rounded-2xl bg-blue-400/10 border border-blue-400/30 p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-400/20 flex items-center justify-center shrink-0">
                <Megaphone size={18} className="text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.15em]">Coach Tyler</p>
                  <button
                    onClick={() => dismissBroadcast(latestBroadcast.id)}
                    className="w-7 h-7 rounded-lg hover:bg-bg-elevated transition-colors flex items-center justify-center"
                  >
                    <X size={14} className="text-text-muted" />
                  </button>
                </div>
                <p className="text-sm leading-relaxed">{latestBroadcast.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Next workout — hero CTA */}
      <div className="animate-slide-up [animation-delay:100ms] opacity-0 px-5 mb-4">
        <button
          onClick={() => {
            if (user && !isSubscribed(user)) { navigate('/subscribe'); return }
            navigate(trainedToday ? '/training' : `/training/${nextDayIndex}`)
          }}
          className={`w-full rounded-2xl p-5 text-left transition-all active:scale-[0.98] relative overflow-hidden ${
            trainedToday
              ? 'bg-lime/5 border border-lime/20'
              : 'bg-gradient-to-br from-lime/20 via-lime/5 to-transparent border border-lime/40'
          }`}
        >
          {!trainedToday && (
            <>
              <div className="absolute -right-8 -top-8 w-36 h-36 bg-lime/8 rounded-full blur-3xl" />
              <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-lime/5 rounded-full blur-2xl" />
            </>
          )}
          <div className="relative flex items-center justify-between">
            <div className="flex-1">
              <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5 text-lime`}>
                {trainedToday ? 'Session Done' : 'Time to Work'}
              </p>
              <p className="font-display font-bold text-xl tracking-tight mb-1">
                {nextDay?.title || 'Ready to train'}
              </p>
              <div className="flex items-center gap-2 text-text-muted text-xs">
                <span>{nextDay?.exercises.length} exercises</span>
                <span>·</span>
                <span>{nextDay?.duration}</span>
              </div>
            </div>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${trainedToday ? 'bg-lime/10' : 'bg-lime/20 shadow-lg shadow-lime/10'}`}>
              {trainedToday ? (
                <Check size={26} className="text-lime" />
              ) : (
                <Play size={26} className="text-lime ml-0.5" />
              )}
            </div>
          </div>
        </button>
      </div>

      {/* Community */}
      <div className="animate-slide-up [animation-delay:150ms] opacity-0 px-5 mb-4">
        <button
          onClick={() => navigate('/community')}
          className="w-full rounded-2xl bg-bg-card border border-border p-4 text-left transition-all active:scale-[0.98] hover:border-lime/20"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-lime/10 flex items-center justify-center shrink-0">
              <MessageSquare size={20} className="text-lime" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-display font-bold text-sm tracking-tight">Community</p>
                <ChevronRight size={16} className="text-text-muted" />
              </div>
              <p className="text-text-muted text-xs mt-0.5">Share wins and connect with the community</p>
            </div>
          </div>
        </button>
      </div>

      {/* Daily Challenge */}
      <div className="animate-slide-up [animation-delay:200ms] opacity-0 px-5 mb-4">
        <div className={`rounded-2xl border p-4 transition-all ${
          challengeAccepted
            ? 'bg-lime/5 border-lime/20'
            : 'bg-bg-card border-border'
        }`}>
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${challengeAccepted ? 'bg-lime/15' : 'bg-cyan-400/10'}`}>
              <Swords size={18} className={challengeAccepted ? 'text-lime' : 'text-cyan-400'} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                  challengeAccepted ? 'text-lime' : 'text-cyan-400'
                }`}>Daily Challenge</p>
                <span className="text-[9px] text-text-muted bg-bg-elevated px-1.5 py-0.5 rounded-full uppercase tracking-wider font-medium">
                  {challenge.tag}
                </span>
              </div>
              <p className={`text-sm leading-relaxed font-medium ${challengeAccepted ? 'text-text-secondary' : 'text-text'}`}>
                {challenge.text}
              </p>
              {!challengeAccepted ? (
                <button
                  onClick={acceptChallenge}
                  className="mt-3 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-display font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-lg hover:bg-cyan-400/20 transition-colors active:scale-[0.97]"
                >
                  I Accept
                </button>
              ) : (
                <p className="mt-2 text-lime text-xs font-display font-bold flex items-center gap-1.5">
                  <Check size={12} /> Challenge accepted. Now go do it.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Water Tracker */}
      <div className="animate-slide-up [animation-delay:250ms] opacity-0 px-5 mb-4">
        <div className="rounded-2xl bg-bg-card border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-400/10 flex items-center justify-center">
                <Droplets size={16} className="text-cyan-400" />
              </div>
              <div>
                <p className="font-display font-bold text-sm tracking-tight">Hydration</p>
                <p className="text-text-muted text-[10px]">{waterCups} of {waterGoal} cups</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  if (!user || waterCups <= 0) return
                  const next = waterCups - 1
                  setWaterCups(next)
                  saveWaterIntake(user.id, next)
                }}
                className="w-8 h-8 rounded-lg bg-bg-elevated flex items-center justify-center active:scale-90 transition-transform"
              >
                <Minus size={14} className="text-text-muted" />
              </button>
              <button
                onClick={() => {
                  if (!user) return
                  const next = waterCups + 1
                  setWaterCups(next)
                  saveWaterIntake(user.id, next)
                  if (next >= waterGoal && navigator.vibrate) navigator.vibrate(100)
                }}
                className="w-8 h-8 rounded-lg bg-cyan-400/10 flex items-center justify-center active:scale-90 transition-transform"
              >
                <Plus size={14} className="text-cyan-400" />
              </button>
            </div>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: waterGoal }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-2.5 rounded-full transition-all duration-300 ${
                  i < waterCups
                    ? waterCups >= waterGoal ? 'bg-cyan-400' : 'bg-cyan-400/60'
                    : 'bg-bg-elevated'
                }`}
                style={i < waterCups && waterCups >= waterGoal ? { filter: 'drop-shadow(0 0 4px rgba(34,211,238,0.3))' } : undefined}
              />
            ))}
          </div>
          {waterCups >= waterGoal && (
            <p className="text-cyan-400 text-[10px] font-display font-bold flex items-center gap-1 mt-2">
              <Check size={10} /> Hydration goal hit. Keep it up.
            </p>
          )}
        </div>
      </div>

      {/* Daily Word */}
      <div className="animate-slide-up [animation-delay:300ms] opacity-0 px-5 mb-4">
        <div className="rounded-2xl bg-bg-card border border-border p-5 relative overflow-hidden">
          <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-lime/4 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-cyan-400/3 rounded-full blur-2xl pointer-events-none" />
          <p className="text-text-muted text-[10px] uppercase tracking-[0.2em] font-medium mb-3 relative">Daily Word</p>
          <p className="font-display font-medium text-[15px] leading-relaxed italic relative">
            "{devotional.text}"
          </p>
          <p className="text-text-muted text-xs mt-3 relative">— {devotional.author}</p>
        </div>
      </div>

      {/* Smart nudge */}
      {!journaledToday && (isMorning || isEvening) && (
        <div className="animate-slide-up [animation-delay:400ms] opacity-0 px-5 mb-4">
          <button
            onClick={() => navigate('/journal')}
            className={`w-full rounded-2xl border p-4 text-left transition-all active:scale-[0.98] flex items-center gap-3 ${
              isMorning
                ? 'bg-cyan-400/5 border-cyan-400/20 hover:border-cyan-400/40'
                : 'bg-blue-400/5 border-blue-400/20 hover:border-blue-400/40'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isMorning ? 'bg-cyan-400/10' : 'bg-blue-400/10'}`}>
              <BookOpen size={20} className={isMorning ? 'text-cyan-400' : 'text-blue-400'} />
            </div>
            <div className="flex-1">
              <p className="font-display font-bold text-sm tracking-tight">
                {isMorning ? 'Set Your Mind Right' : 'Close Out the Day'}
              </p>
              <p className="text-text-muted text-xs mt-0.5">
                {isMorning ? 'Morning visualization — 2 min' : 'Evening reflection — 2 min'}
              </p>
            </div>
            <ChevronRight size={16} className="text-text-muted" />
          </button>
        </div>
      )}

      {/* Quick links */}
      <div className="animate-slide-up [animation-delay:500ms] opacity-0 px-5 mb-4">
        <div className="flex gap-2">
          {!hasWeeklyCheckIn && (
            <button
              onClick={() => navigate('/check-in')}
              className="flex-1 rounded-xl bg-bg-card border border-border p-3.5 text-center hover:border-lime/20 transition-colors active:scale-[0.98]"
            >
              <div className="w-9 h-9 rounded-lg bg-bg-elevated flex items-center justify-center mx-auto mb-1.5">
                <ClipboardCheck size={18} className="text-text-secondary" />
              </div>
              <p className="font-display font-bold text-[11px]">Check-in</p>
            </button>
          )}
          <button
            onClick={() => navigate('/progress')}
            className="flex-1 rounded-xl bg-bg-card border border-border p-3.5 text-center hover:border-lime/20 transition-colors active:scale-[0.98]"
          >
            <div className="w-9 h-9 rounded-lg bg-bg-elevated flex items-center justify-center mx-auto mb-1.5">
              <TrendingUp size={18} className="text-text-secondary" />
            </div>
            <p className="font-display font-bold text-[11px]">Progress</p>
          </button>
          <a
            href="sms:+12546402697"
            className="flex-1 rounded-xl bg-bg-card border border-border p-3.5 text-center hover:border-lime/20 transition-colors active:scale-[0.98] block"
          >
            <div className="w-9 h-9 rounded-lg bg-bg-elevated flex items-center justify-center mx-auto mb-1.5">
              <MessageCircle size={18} className="text-text-secondary" />
            </div>
            <p className="font-display font-bold text-[11px]">Coach</p>
          </a>
        </div>
      </div>
    </div>
  )
}
