import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './lib/auth'
import BottomNav from './components/BottomNav'
import Login from './pages/Login'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Training from './pages/Training'
import TrainingDay from './pages/TrainingDay'
import Journal from './pages/Journal'
import Progress from './pages/Progress'
import Command from './pages/Command'
import Settings from './pages/Settings'
import CheckIn from './pages/CheckIn'
import Messages from './pages/Messages'
import Shop from './pages/Shop'
import Community from './pages/Community'
import Subscribe from './pages/Subscribe'
import Nutrition from './pages/Nutrition'

function AppRoutes() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center login-glow">
        <div className="animate-fade-in text-center relative z-10">
          <h1 className="font-display text-[44px] font-bold tracking-[-0.04em] leading-[0.85]">
            CALLED TO
          </h1>
          <h1 className="font-display text-[44px] font-bold tracking-[-0.04em] leading-[0.85] text-lime drop-shadow-[0_0_30px_rgba(189,255,58,0.2)] mt-1">
            COMPETE
          </h1>
          <div className="mt-10 w-8 h-8 border-2 border-lime/30 border-t-lime rounded-full animate-spin mx-auto" />
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    )
  }

  if (!user.onboarded) {
    return (
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="*" element={<Navigate to="/onboarding" replace />} />
      </Routes>
    )
  }

  const showNav =
    !['/onboarding', '/settings', '/check-in', '/messages', '/subscribe'].includes(location.pathname) &&
    !location.pathname.match(/^\/training\/\d/)

  return (
    <>
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/training" element={<Training />} />
        <Route path="/training/:dayIndex" element={<TrainingDay />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/check-in" element={<CheckIn />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/community" element={<Community />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/command" element={<Command />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      {showNav && <BottomNav />}
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <div className="max-w-lg mx-auto min-h-screen relative">
        <AppRoutes />
      </div>
    </AuthProvider>
  )
}
