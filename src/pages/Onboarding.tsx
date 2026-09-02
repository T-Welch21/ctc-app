import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Flame, Briefcase, Crown, Palette, Shapes } from 'lucide-react'
import { useAuth } from '../lib/auth'

const identities = [
  { id: 'athlete', label: 'Athlete', icon: Flame, desc: 'I compete in sport' },
  { id: 'entrepreneur', label: 'Entrepreneur', icon: Briefcase, desc: 'I build businesses' },
  { id: 'executive', label: 'Executive', icon: Crown, desc: 'I lead organizations' },
  { id: 'creator', label: 'Creator', icon: Palette, desc: 'I create and perform' },
  { id: 'other', label: 'Other', icon: Shapes, desc: 'I compete in my own way' },
]

const goals = [
  'Build strength & power',
  'Improve conditioning',
  'Sharpen mental discipline',
  'Level up overall performance',
  'Recover & stay healthy',
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

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-12">
        {[0, 1].map((i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === step ? 'w-8 bg-lime' : i < step ? 'w-4 bg-lime/40' : 'w-4 bg-border'
            }`}
          />
        ))}
      </div>

      {step === 0 && (
        <div className="animate-fade-in flex-1 flex flex-col max-w-sm mx-auto w-full">
          <div className="mb-8">
            <h1 className="font-display text-2xl font-bold mb-2">
              How do you <span className="text-lime">compete</span>?
            </h1>
            <p className="text-text-secondary text-sm">
              {isReOnboarding
                ? 'Switch your training track anytime.'
                : 'This shapes your training track. You can always change it later.'}
            </p>
          </div>

          <div className="space-y-3 flex-1">
            {identities.map((item) => {
              const active = selectedIdentity === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedIdentity(item.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 text-left ${
                    active
                      ? 'border-lime/50 bg-lime-glow glow-lime'
                      : 'border-border bg-bg-card hover:border-border-light'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${active ? 'bg-lime/20' : 'bg-bg-elevated'}`}>
                    <item.icon size={22} className={active ? 'text-lime' : 'text-text-secondary'} />
                  </div>
                  <div>
                    <p className={`font-display font-semibold ${active ? 'text-text' : 'text-text'}`}>
                      {item.label}
                    </p>
                    <p className="text-text-secondary text-sm">{item.desc}</p>
                  </div>
                </button>
              )
            })}
          </div>

          <button
            onClick={() => setStep(1)}
            disabled={!selectedIdentity}
            className="mt-8 w-full bg-lime text-bg font-display font-semibold text-lg py-3.5 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 glow-lime"
          >
            Continue <ArrowRight size={20} />
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="animate-fade-in flex-1 flex flex-col max-w-sm mx-auto w-full">
          <div className="mb-8">
            <h1 className="font-display text-2xl font-bold mb-2">
              What's your <span className="text-lime">goal</span>?
            </h1>
            <p className="text-text-secondary text-sm">
              Pick your primary focus. We'll build your path around it.
            </p>
          </div>

          <div className="space-y-3 flex-1">
            {goals.map((goal) => {
              const active = selectedGoal === goal
              return (
                <button
                  key={goal}
                  onClick={() => setSelectedGoal(goal)}
                  className={`w-full p-4 rounded-2xl border transition-all duration-200 text-left font-medium ${
                    active
                      ? 'border-lime/50 bg-lime-glow text-text glow-lime'
                      : 'border-border bg-bg-card hover:border-border-light text-text-secondary'
                  }`}
                >
                  {goal}
                </button>
              )
            })}
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => setStep(0)}
              className="flex-1 border border-border text-text-secondary font-display font-semibold py-3.5 rounded-xl hover:bg-bg-card transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleFinish}
              disabled={!selectedGoal}
              className="flex-[2] bg-lime text-bg font-display font-semibold text-lg py-3.5 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed glow-lime"
            >
              {isReOnboarding ? 'Save Changes' : "Let's Go"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
