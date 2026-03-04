import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import UnauthorizedPage from '../shared/UnauthorizedPage'

// ─────────────────────────────────────────────────────────────────────────────
// ProtectedRoute
// ─────────────────────────────────────────────────────────────────────────────
// A reusable wrapper component for React Router v6 that enforces:
//   1. Authentication – user must be logged in.
//   2. Authorization  – user's role must be in the `allowedRoles` list.
//
// Props:
//   children      – the page / component to render when access is granted
//   allowedRoles  – array of roles permitted to view this route
//                   e.g. ["admin"], ["student", "homeowner"]
//
// Behaviour:
//   • Not authenticated → redirect to /login
//   • Authenticated but wrong role → show 403 Unauthorized page
//   • Authenticated + correct role  → render children
//
// Usage:
//   <Route
//     path="/admin"
//     element={
//       <ProtectedRoute allowedRoles={["admin"]}>
//         <AdminPanel />
//       </ProtectedRoute>
//     }
//   />
// ─────────────────────────────────────────────────────────────────────────────

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated } = useAuth()

  // ── 1. Not authenticated → redirect to login ────────────────────────────
  // `replace` prevents the login redirect from creating a back-button loop.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // ── 2. Role not allowed → show 403 page ─────────────────────────────────
  // If allowedRoles is empty we treat it as "any authenticated user can access".
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <UnauthorizedPage />
  }

  // ── 3. Access granted → render the requested page ───────────────────────
  return children
}

export default ProtectedRoute
