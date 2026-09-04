import { Home, Dumbbell, Utensils, ShoppingBag, BookOpen, LayoutDashboard } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const tabs = [
  { path: '/dashboard', icon: Home, label: 'Home' },
  { path: '/training', icon: Dumbbell, label: 'Training' },
  { path: '/nutrition', icon: Utensils, label: 'Nutrition' },
  { path: '/shop', icon: ShoppingBag, label: 'Shop' },
  { path: '/journal', icon: BookOpen, label: 'Journal' },
  { path: '/command', icon: LayoutDashboard, label: 'Command' },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-bg/90 backdrop-blur-xl border-t border-border z-50">
      <div className="max-w-lg mx-auto flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const active = location.pathname.startsWith(tab.path)
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center gap-0.5 py-1 px-1.5 transition-all duration-200"
            >
              <div className={`p-1.5 rounded-xl transition-all duration-200 ${active ? 'bg-lime-glow' : ''}`}>
                <tab.icon
                  size={22}
                  className={`transition-colors duration-200 ${active ? 'text-lime stroke-[2.5]' : 'text-text-muted'}`}
                />
              </div>
              <span className={`text-[10px] font-medium transition-colors duration-200 ${active ? 'text-lime' : 'text-text-muted'}`}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  )
}
