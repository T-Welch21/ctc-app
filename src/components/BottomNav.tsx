import { Home, Dumbbell, Utensils, ShoppingBag, BookOpen, LayoutDashboard } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'

const COACH_EMAILS = ['tyler21welch@gmail.com']

const baseTabs = [
  { path: '/dashboard', icon: Home, label: 'Home' },
  { path: '/training', icon: Dumbbell, label: 'Train' },
  { path: '/nutrition', icon: Utensils, label: 'Nutrition' },
  { path: '/shop', icon: ShoppingBag, label: 'Shop' },
  { path: '/journal', icon: BookOpen, label: 'Journal' },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()

  const tabs = user && COACH_EMAILS.includes(user.email)
    ? [...baseTabs, { path: '/command', icon: LayoutDashboard, label: 'Command' }]
    : baseTabs

  return (
    <nav className="fixed bottom-5 left-4 right-4 z-50">
      <div className="max-w-lg mx-auto glass-heavy rounded-[20px] border border-white/[0.06] shadow-[0_8px_40px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.03)]">
        <div className="flex justify-around items-center h-[60px] px-1">
          {tabs.map((tab) => {
            const active = location.pathname.startsWith(tab.path)
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className="flex flex-col items-center justify-center gap-[3px] py-1 px-2 transition-all duration-300 relative group"
              >
                <div className={`relative transition-all duration-300 ${active ? 'scale-110' : 'group-active:scale-90'}`}>
                  {active && (
                    <div className="absolute inset-0 -m-2 rounded-full bg-lime/[0.12] blur-lg" />
                  )}
                  <tab.icon
                    size={21}
                    className={`relative transition-colors duration-300 ${active ? 'text-lime drop-shadow-[0_0_8px_rgba(189,255,58,0.4)]' : 'text-text-muted'}`}
                    strokeWidth={active ? 2.5 : 1.8}
                  />
                </div>
                <span className={`text-[9px] font-medium transition-all duration-300 ${active ? 'text-lime' : 'text-text-muted'}`}>
                  {tab.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
