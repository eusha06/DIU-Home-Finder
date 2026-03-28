import { createContext, useContext, useState, useCallback } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// AuthContext
// ─────────────────────────────────────────────────────────────────────────────
// Provides authentication state & helpers to the entire app.
//
// Currently uses a simulated in-memory user object.
// To connect with a real backend later:
//   1. Replace `login()` with an API call that returns user + token.
//   2. Persist the token (localStorage / httpOnly cookie).
//   3. On mount, validate the token and rehydrate `user`.
//   4. Replace `logout()` with an API call + token removal.
// ─────────────────────────────────────────────────────────────────────────────

const AuthContext = createContext(null)

/**
 * Simulated user object (for development / demo).
 * Set `isAuthenticated: false` to test the login redirect,
 * or change `role` to test role-based access.
 *
 * Valid roles: "student" | "homeowner" | "hostel_manager" | "admin"
 */
const MOCK_USER = {
  name: 'John',
  role: 'student', // change to test different roles
  isAuthenticated: true,
}

/**
 * AuthProvider – wraps the app and exposes auth state via context.
 *
 * Exposed values:
 *   user             – current user object (or null when logged out)
 *   login(userData)  – set the user (simulate login)
 *   logout()         – clear the user (simulate logout)
 *   isAuthenticated  – shorthand boolean
 */
export const AuthProvider = ({ children }) => {
  // ── State ────────────────────────────────────────────────────────────────
  // Start unauthenticated – user must log in or sign up.
  const [user, setUser] = useState(null)

  // ── Login handler ────────────────────────────────────────────────────────
  // Accepts a user object with at minimum { name, role, isAuthenticated }.
  // TODO: Replace with real API call → POST /api/auth/login
  const login = useCallback((userData) => {
    setUser({ ...userData, isAuthenticated: true })
  }, [])

  // ── Logout handler ───────────────────────────────────────────────────────
  // Clears user state. TODO: call POST /api/auth/logout & remove token.
  const logout = useCallback(() => {
    setUser(null)
  }, [])

  // ── Context value ────────────────────────────────────────────────────────
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user?.isAuthenticated,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * useAuth – convenience hook to consume AuthContext.
 * Throws if used outside of <AuthProvider>.
 */
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an <AuthProvider>')
  }
  return context
}

export default AuthContext
