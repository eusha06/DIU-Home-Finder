import { Routes, Route, Navigate } from 'react-router-dom'

// ── Auth context ──────────────────────────────────────────────────────────────
import { useAuth } from './context/AuthContext'

// ── Shared / routing components ───────────────────────────────────────────────
import ProtectedRoute from './components/shared/ProtectedRoute'
import UnauthorizedPage from './components/shared/UnauthorizedPage'

// ── Page-level components ─────────────────────────────────────────────────────
import AuthPage from './components/AuthPage'
import StudentHomePage from './components/student/StudentHomePage'
import OwnerDashboard from './components/houseowner/OwnerDashboard'
import AdminPanel from './components/admin/AdminPanel'
import HostelManagerDashboard from './components/hostelmanager/HostelManagerDashboard'

// ── Helper: redirect authenticated users to their dashboard ───────────────────
const ROLE_HOME = {
  student: '/student/home',
  homeowner: '/owner/dashboard',
  admin: '/admin',
  hostel_manager: '/hostel-manager',
}

// ─────────────────────────────────────────────────────────────────────────────
// App – root component (React Router v6)
// ─────────────────────────────────────────────────────────────────────────────
// Route structure:
//   /login                → AuthPage (public)
//   /student/home         → StudentHomePage        (student only)
//   /owner/dashboard      → OwnerDashboard         (homeowner only)
//   /admin                → AdminPanel             (admin only)
//   /hostel-manager       → HostelManagerDashboard (hostel_manager only)
//   /unauthorized         → 403 page (public, for direct navigation)
//   *                     → redirect to /login
//
// Every protected route is wrapped with <ProtectedRoute allowedRoles={[…]}>
// which handles authentication & role checks automatically.
// ─────────────────────────────────────────────────────────────────────────────

function App() {
  const { user, isAuthenticated, logout } = useAuth()

  // ── Shared logout handler (clears context + redirects via Navigate) ─────
  const handleLogout = () => {
    logout()
  }

  return (
    <Routes>
      {/* ── Public routes ──────────────────────────────────────────────── */}
      <Route
        path="/login"
        element={
          isAuthenticated
            ? <Navigate to={ROLE_HOME[user?.role] || '/login'} replace />
            : <AuthPage />
        }
      />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* ── Student routes ─────────────────────────────────────────────── */}
      <Route
        path="/student/home"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentHomePage student={user} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      {/* ── House-owner routes ─────────────────────────────────────────── */}
      <Route
        path="/owner/dashboard"
        element={
          <ProtectedRoute allowedRoles={['homeowner']}>
            <OwnerDashboard owner={user} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      {/* ── Admin routes ───────────────────────────────────────────────── */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminPanel admin={user} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      {/* ── Hostel-manager routes ──────────────────────────────────────── */}
      <Route
        path="/hostel-manager"
        element={
          <ProtectedRoute allowedRoles={['hostel_manager']}>
            <HostelManagerDashboard user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      {/* ── Catch-all: redirect unknown paths to login ─────────────────── */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
