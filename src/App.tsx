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

function AppRoutes() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-lime border-t-transparent rounded-full animate-spin" />
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
    !['/onboarding', '/settings'].includes(location.pathname) &&
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
