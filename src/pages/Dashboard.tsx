import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flame, ChevronRight, Quote, Settings, Play, Check, Megaphone, X } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { getStreak, getCompletedSessions } from '../lib/storage'
import { getProgram } from '../lib/programs'
import { supabase } from '../lib/supabase'

const devotionals = [
  { text: "You were not created to settle. You were created to lead.", author: "Coach Tyler" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
  { text: "The only way to prove you are a good sport is to lose.", author: "Ernie Banks" },
  { text: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke" },
  { text: "Champions keep playing until they get it right.", author: "Billie Jean King" },
  { text: "The body achieves what the mind believes.", author: "Napoleon Hill" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Pain is temporary. Quitting lasts forever.", author: "Lance Armstrong" },
  { text: "The difference between the impossible and the possible lies in determination.", author: "Tommy Lasorda" },
  { text: "Don't count the days. Make the days count.", author: "Muhammad Ali" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi" },
  { text: "The harder the battle, the sweeter the victory.", author: "Les Brown" },
  { text: "Compete harder. Train smarter. Feel better.", author: "Called to Compete" },
  { text: "Excellence is not a singular act, but a habit. You are what you repeatedly do.", author: "Shaquille O'Neal" },
  { text: "If you want something you've never had, you must be willing to do something you've never done.", author: "Thomas Jefferson" },
  { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
  { text: "Sweat is just fat crying.", author: "Unknown" },
  { text: "Today I will do what others won't, so tomorrow I can accomplish what others can't.", author: "Jerry Rice" },
  { text: "Your body can stand almost anything. It's your mind you have to convince.", author: "Unknown" },
  { text: "Be stronger than your excuses.", author: "Coach Tyler" },
]

function getDevotional() {
  const day = Math.floor(Date.now() / 86400000)
  return devotionals[day % devotionals.length]
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
  const firstName = user?.name?.split(' ')[0] || 'Competitor'
  const devotional = getDevotional()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

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

  const streak = user ? getStreak(user.id) : 0
  const sessions = user ? getCompletedSessions(user.id) : []
  const todayStr = new Date().toISOString().split('T')[0]
  const trainedToday = sessions.some((s) => s.date === todayStr)

  const program = getProgram(user?.identity || '')
  const trackName = program.name
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

  return (
    <div className="min-h-screen pb-24 px-5 pt-14">
      {/* Header */}
      <div className="animate-fade-in mb-6 flex items-start justify-between">
        <div>
          <p className="text-text-secondary text-sm">{greeting}</p>
          <h1 className="font-display text-2xl font-bold mt-0.5">
            {firstName} <span className="text-lime">.</span>
          </h1>
        </div>
        <button
          onClick={() => navigate('/settings')}
          className="p-2 rounded-xl hover:bg-bg-card transition-colors text-text-secondary hover:text-text"
        >
          <Settings size={22} />
        </button>
      </div>

      {/* Coach Broadcast */}
      {latestBroadcast && dismissedBroadcast !== latestBroadcast.id && (
        <div className="animate-slide-up rounded-2xl bg-[#818cf8]/10 border border-[#818cf8]/30 p-4 mb-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-[#818cf8]/20 shrink-0">
              <Megaphone size={16} className="text-[#818cf8]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[#818cf8] text-xs font-semibold uppercase tracking-wider">From Coach Tyler</p>
                <button
                  onClick={() => dismissBroadcast(latestBroadcast.id)}
                  className="p-1 rounded-lg hover:bg-bg-elevated transition-colors"
                >
                  <X size={14} className="text-text-muted" />
                </button>
              </div>
              <p className="text-sm leading-relaxed">{latestBroadcast.message}</p>
              <p className="text-text-muted text-[10px] mt-2">
                {new Date(latestBroadcast.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Streak card */}
      <div className={`animate-slide-up rounded-2xl bg-bg-card border border-border p-5 mb-4 ${streak > 0 ? 'gradient-border' : ''}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Flame size={20} className={streak > 0 ? 'text-lime' : 'text-text-muted'} />
            <span className="font-display font-semibold text-sm">
              {streak > 0 ? `${streak} Day Streak` : 'Current Streak'}
            </span>
          </div>
          {streak === 0 && <span className="text-text-muted text-xs">Start training to begin</span>}
        </div>
        <div className="flex gap-1.5">
          {last7.map((day, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className={`w-full h-2 rounded-full transition-colors ${
                day.trained ? 'bg-lime' : day.isToday ? 'bg-border-light' : 'bg-bg-elevated'
              }`} />
              <span className={`text-[10px] ${day.isToday ? 'text-text font-medium' : 'text-text-muted'}`}>
                {day.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Session — smart suggestion */}
      <button
        onClick={() => navigate(trainedToday ? '/training' : `/training/${nextDayIndex}`)}
        className="animate-slide-up [animation-delay:100ms] opacity-0 w-full rounded-2xl bg-bg-card border border-border p-5 mb-4 text-left"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">
              {trainedToday ? 'Completed Today' : 'Up Next'}
            </p>
            <p className="font-display font-semibold">
              {trainedToday ? nextDay?.title || 'All done today' : nextDay?.title || 'Ready to train'}
            </p>
            <p className="text-text-muted text-sm mt-1">
              {trackName} · {nextDay?.duration || ''}
            </p>
          </div>
          {trainedToday ? (
            <div className="p-2.5 rounded-xl bg-lime/10">
              <Check size={20} className="text-lime" />
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-lime/10">
              <Play size={20} className="text-lime" />
            </div>
          )}
        </div>
      </button>

      {/* Devotional */}
      <div className="animate-slide-up [animation-delay:200ms] opacity-0 rounded-2xl bg-bg-card border border-border p-5 mb-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-lime/10 shrink-0 mt-0.5">
            <Quote size={18} className="text-lime" />
          </div>
          <div>
            <p className="text-text-secondary text-xs uppercase tracking-wider mb-2">Daily Devotional</p>
            <p className="font-display font-medium text-[15px] leading-relaxed italic">
              "{devotional.text}"
            </p>
            <p className="text-text-muted text-sm mt-2">— {devotional.author}</p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="animate-slide-up [animation-delay:300ms] opacity-0 grid grid-cols-2 gap-3">
        <button
          onClick={() => navigate('/check-in')}
          className="rounded-2xl bg-bg-card border border-border p-4 text-left hover:border-border-light transition-colors"
        >
          <p className="font-display font-semibold text-sm">Weekly Check-in</p>
          <p className="text-text-muted text-xs mt-1">Log your progress</p>
        </button>
        <a
          href="sms:+12546402697"
          className="rounded-2xl bg-bg-card border border-border p-4 text-left hover:border-border-light transition-colors block"
        >
          <p className="font-display font-semibold text-sm">Message Coach</p>
          <p className="text-text-muted text-xs mt-1">Text Tyler directly</p>
        </a>
      </div>
    </div>
  )
}
