import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { saveCheckIn } from '../lib/storage'

const questions = [
  { key: 'sessions', label: 'How many sessions did you complete this week?', type: 'number', placeholder: '0' },
  { key: 'nutrition', label: 'Rate your nutrition this week', type: 'slider' },
  { key: 'sleep', label: 'Rate your sleep quality this week', type: 'slider' },
  { key: 'energy', label: 'Overall energy level', type: 'slider' },
  { key: 'wins', label: 'Biggest win this week', type: 'text', placeholder: 'What went well?' },
  { key: 'struggles', label: 'Biggest challenge', type: 'text', placeholder: 'What was hard?' },
  { key: 'goals', label: 'Top goal for next week', type: 'text', placeholder: 'What are you focused on?' },
]

export default function CheckIn() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [answers, setAnswers] = useState<Record<string, string | number>>({
    nutrition: 5,
    sleep: 5,
    energy: 5,
  })
  const [submitted, setSubmitted] = useState(false)

  const update = (key: string, value: string | number) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = () => {
    if (!user) return
    const today = new Date().toISOString().split('T')[0]
    saveCheckIn(user.id, {
      date: today,
      sessions: Number(answers.sessions) || 0,
      nutrition: Number(answers.nutrition) || 5,
      sleep: Number(answers.sleep) || 5,
      energy: Number(answers.energy) || 5,
      wins: String(answers.wins || ''),
      struggles: String(answers.struggles || ''),
      goals: String(answers.goals || ''),
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="animate-fade-in text-center">
          <div className="inline-flex p-5 rounded-2xl bg-lime/10 mb-6">
            <CheckCircle size={48} className="text-lime" />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight mb-2">Check-in submitted</h1>
          <p className="text-text-muted text-sm mb-8">Locked in. Coach Tyler's got eyes on it.</p>
          <button
            onClick={() => navigate('/progress')}
            className="bg-lime text-bg font-display font-bold text-sm py-4 px-12 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all glow-lime uppercase tracking-wider"
          >
            Done
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-28 bg-bg">
      <div className="sticky top-0 glass-heavy z-40 border-b border-border">
        <div className="max-w-lg mx-auto px-5 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate('/progress')}
            className="w-9 h-9 rounded-xl bg-bg-elevated flex items-center justify-center text-text-muted hover:text-text transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="font-display text-lg font-bold tracking-tight">Weekly Check-in</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-5 pt-6">
        <p className="animate-fade-in text-text-muted text-xs uppercase tracking-[0.2em] mb-6">
          2 minutes. Be honest — Coach Tyler reads every one.
        </p>

        <div className="space-y-4">
          {questions.map((q, i) => (
            <div
              key={q.key}
              className="animate-slide-up opacity-0 card-shine rounded-2xl bg-bg-card/80 border border-border p-5 relative overflow-hidden"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <label className="font-display font-bold text-sm tracking-tight block mb-3">{q.label}</label>

              {q.type === 'number' && (
                <input
                  type="number"
                  inputMode="numeric"
                  value={answers[q.key] || ''}
                  onChange={(e) => update(q.key, e.target.value)}
                  placeholder={q.placeholder}
                  className="w-full bg-bg-elevated border border-border rounded-xl px-4 py-3.5 text-text text-center font-display font-bold text-2xl placeholder:text-text-muted/40 focus:outline-none focus:border-lime/40 transition-colors"
                />
              )}

              {q.type === 'slider' && (
                <div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={Number(answers[q.key]) || 5}
                    onChange={(e) => update(q.key, Number(e.target.value))}
                    className="w-full accent-lime"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-text-muted text-[10px] uppercase tracking-wider">Poor</span>
                    <span className="text-lime font-display font-bold text-lg">
                      {answers[q.key] || 5}
                    </span>
                    <span className="text-text-muted text-[10px] uppercase tracking-wider">Excellent</span>
                  </div>
                </div>
              )}

              {q.type === 'text' && (
                <textarea
                  value={(answers[q.key] as string) || ''}
                  onChange={(e) => update(q.key, e.target.value)}
                  placeholder={q.placeholder}
                  rows={2}
                  className="w-full bg-bg-elevated border border-border rounded-xl px-4 py-3 text-text placeholder:text-text-muted/40 focus:outline-none focus:border-lime/40 transition-colors resize-none text-sm"
                />
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="animate-slide-up [animation-delay:500ms] opacity-0 w-full bg-lime text-bg font-display font-bold text-sm py-4 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all glow-lime mt-6 uppercase tracking-wider"
        >
          Submit Check-in
        </button>
      </div>
    </div>
  )
}
