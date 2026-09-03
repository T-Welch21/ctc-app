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

function AppRoutes() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <div className="animate-fade-in text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight">
            CALLED TO<br />
            <span className="text-lime">COMPETE</span>
          </h1>
          <div className="mt-6 w-8 h-8 border-2 border-lime border-t-transparent rounded-full animate-spin mx-auto" />
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
    !['/onboarding', '/settings', '/check-in', '/messages', '/shop'].includes(location.pathname) &&
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
