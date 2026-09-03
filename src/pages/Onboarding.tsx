import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Flame, Briefcase, Crown, Palette, Shapes, Shield, Target, Zap, Heart, TrendingUp } from 'lucide-react'
import { useAuth } from '../lib/auth'

const identities = [
  { id: 'athlete', label: 'Athlete', icon: Flame, desc: 'I compete in sport. The field is my proving ground.' },
  { id: 'entrepreneur', label: 'Entrepreneur', icon: Briefcase, desc: 'I build things. Discipline fuels the hustle.' },
  { id: 'executive', label: 'Executive', icon: Crown, desc: 'I lead people. Performance starts with me.' },
  { id: 'creator', label: 'Creator', icon: Palette, desc: 'I create and perform. My craft demands my best.' },
  { id: 'other', label: 'Competitor', icon: Shapes, desc: 'I compete in my own way. Every day.' },
]

const goals = [
  { text: 'Build strength & power', icon: Shield, desc: 'Get stronger, move heavier weight' },
  { text: 'Improve conditioning', icon: Zap, desc: 'Better endurance, faster recovery' },
  { text: 'Sharpen mental discipline', icon: Target, desc: 'Unbreakable mindset, daily habits' },
  { text: 'Level up overall performance', icon: TrendingUp, desc: 'Everything — body, mind, life' },
  { text: 'Recover & stay healthy', icon: Heart, desc: 'Move better, feel better, last longer' },
]

export default function Onboarding() {
  const { user, completeOnboarding } = useAuth()
  const navigate = useNavigate()
  const isReOnboarding = !!user?.onboarded
  const [step, setStep] = useState(0)
  const [selectedIdentity, setSelectedIdentity] = useState(user?.identity || '')
  const [selectedGoal, setSelectedGoal] = useState(user?.goal || '')

  const handleFinish = () => {
    completeOnboarding(selectedIdentity, selectedGoal)
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="min-h-screen flex flex-col px-6 py-12">
      {/* Back button for re-onboarding */}
      {isReOnboarding && step === 0 && (
        <button
          onClick={() => navigate(-1)}
          className="animate-fade-in flex items-center gap-1.5 text-text-secondary hover:text-text text-sm mb-4 transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>
      )}

      {/* Progress bar */}
      <div className="flex gap-2 mb-10">
        <div className={`flex-1 h-1 rounded-full transition-all duration-500 ${step >= 0 ? 'bg-lime' : 'bg-border'}`} />
        <div className={`flex-1 h-1 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-lime' : 'bg-border'}`} />
      </div>

      {step === 0 && (
        <div className="animate-fade-in flex-1 flex flex-col max-w-sm mx-auto w-full">
          <div className="mb-8">
            <p className="text-lime text-[10px] font-bold uppercase tracking-widest mb-2">Step 1 — Identity</p>
            <h1 className="font-display text-3xl font-bold leading-tight mb-2">
              Who are you<span className="text-lime">?</span>
            </h1>
            <p className="text-text-muted text-sm">
              This isn't a label. It's how you show up every day.
            </p>
          </div>

          <div className="space-y-2.5 flex-1">
            {identities.map((item) => {
              const active = selectedIdentity === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedIdentity(item.id)}
                  className={`w-full flex items-center gap-3.5 p-4 rounded-2xl border transition-all duration-200 text-left active:scale-[0.98] ${
                    active
                      ? 'border-lime/50 bg-lime/5'
                      : 'border-border bg-bg-card hover:border-border-light'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl transition-colors ${active ? 'bg-lime/20' : 'bg-bg-elevated'}`}>
                    <item.icon size={20} className={active ? 'text-lime' : 'text-text-muted'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-display font-bold text-sm ${active ? 'text-lime' : 'text-text'}`}>
                      {item.label}
                    </p>
                    <p className="text-text-muted text-xs mt-0.5">{item.desc}</p>
                  </div>
                  {active && (
                    <div className="w-5 h-5 rounded-full bg-lime flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-bg" />
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          <button
            onClick={() => setStep(1)}
            disabled={!selectedIdentity}
            className="mt-8 w-full bg-lime text-bg font-display font-bold text-lg py-4 rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all duration-150 disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            Next <ArrowRight size={20} />
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="animate-fade-in flex-1 flex flex-col max-w-sm mx-auto w-full">
          <div className="mb-8">
            <p className="text-lime text-[10px] font-bold uppercase tracking-widest mb-2">Step 2 — Mission</p>
            <h1 className="font-display text-3xl font-bold leading-tight mb-2">
              What are you<br />chasing<span className="text-lime">?</span>
            </h1>
            <p className="text-text-muted text-sm">
              Pick the goal that keeps you up at night.
            </p>
          </div>

          <div className="space-y-2.5 flex-1">
            {goals.map((goal) => {
              const active = selectedGoal === goal.text
              return (
                <button
                  key={goal.text}
                  onClick={() => setSelectedGoal(goal.text)}
                  className={`w-full flex items-center gap-3.5 p-4 rounded-2xl border transition-all duration-200 text-left active:scale-[0.98] ${
                    active
                      ? 'border-lime/50 bg-lime/5'
                      : 'border-border bg-bg-card hover:border-border-light'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl transition-colors ${active ? 'bg-lime/20' : 'bg-bg-elevated'}`}>
                    <goal.icon size={20} className={active ? 'text-lime' : 'text-text-muted'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-display font-bold text-sm ${active ? 'text-lime' : 'text-text'}`}>
                      {goal.text}
                    </p>
                    <p className="text-text-muted text-xs mt-0.5">{goal.desc}</p>
                  </div>
                  {active && (
                    <div className="w-5 h-5 rounded-full bg-lime flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-bg" />
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => setStep(0)}
              className="flex-1 border border-border text-text-secondary font-display font-semibold py-4 rounded-2xl hover:bg-bg-card transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleFinish}
              disabled={!selectedGoal}
              className="flex-[2] bg-lime text-bg font-display font-bold text-lg py-4 rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all duration-150 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              {isReOnboarding ? 'Save Changes' : "Let's Compete"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
