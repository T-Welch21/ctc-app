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
      <div className="min-h-screen flex flex-col items-center justify-center login-glow relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(179,255,29,0.06)_0%,transparent_70%)]" />
        <div className="animate-fade-in text-center relative z-10">
          <div className="flex justify-center mb-6">
            <div className="relative w-28 h-28">
              <div className="absolute -inset-4 rounded-full bg-lime/8 blur-2xl animate-pulse" />
              <img src="/logo-circle.png" alt="CTC" className="w-28 h-28 rounded-full relative drop-shadow-[0_0_40px_rgba(179,255,29,0.3)]" />
            </div>
          </div>
          <div className="mt-8 w-8 h-8 border-2 border-lime/30 border-t-lime rounded-full animate-spin mx-auto" />
          <p className="text-text-muted text-[9px] uppercase tracking-[0.35em] mt-4">Loading your training</p>
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
