// ─────────────────────────────────────────────────────────────────────────────
// src/context/AuthContext.jsx
// Global auth state. Any component can call useAuth() to get:
//   - user      → { id, name, email, role } or null if not logged in
//   - token     → JWT string or null
//   - isLoading → true while we're checking localStorage on first load
//   - loginUser()    → call after successful login API response
//   - logoutUser()   → clears everything
// ─────────────────────────────────────────────────────────────────────────────

import { createContext, useContext, useState, useEffect } from 'react'
import { logout } from '../api/index'   // Our API helper from Step 2

// 1. Create the context object
const AuthContext = createContext(null)


// 2. Create the Provider component
// This wraps your entire app and "provides" the auth state to all children
export function AuthProvider({ children }) {

  const [user, setUser]         = useState(null)    // Logged-in user object or null
  const [token, setToken]       = useState(null)    // JWT string or null
  const [isLoading, setIsLoading] = useState(true)  // True while reading localStorage


  // ── On first app load: check if user was already logged in ─────────────────
  // localStorage persists across page refreshes — so if they logged in yesterday,
  // they're still logged in today (until token expires or they log out).
  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser  = localStorage.getItem('user')

    if (savedToken && savedUser) {
      try {
        setToken(savedToken)
        setUser(JSON.parse(savedUser))   // Parse the JSON string back to an object
      } catch (err) {
        // If localStorage has corrupted data, clear it and start fresh
        console.error('Failed to parse saved user:', err)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }

    setIsLoading(false)   // Done checking — app can now render
  }, [])


  // ── loginUser: called right after a successful login/register API response ──
  // Pass in the { token, user } object that the server returns
  function loginUser(data) {
    setToken(data.token)
    setUser(data.user)
    // Note: the api/index.js already saves to localStorage, but we set state here
  }


  // ── logoutUser: clears everything ─────────────────────────────────────────
  function logoutUser() {
    logout()           // Clears localStorage (from api/index.js)
    setToken(null)
    setUser(null)
  }


  // ── Convenience helpers ────────────────────────────────────────────────────
  const isLoggedIn  = !!user                          // true / false
  const isStudent   = user?.role === 'student'        // true if student
  const isOwner     = user?.role === 'owner'          // true if owner
  const isAdmin     = user?.role === 'admin'          // true if admin


  // ── The value that every child component can access ────────────────────────
  const value = {
    user,
    token,
    isLoading,
    isLoggedIn,
    isStudent,
    isOwner,
    isAdmin,
    loginUser,
    logoutUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}


// 3. Custom hook — components call this instead of useContext(AuthContext) directly
// Usage: const { user, isLoggedIn, logoutUser } = useAuth()
export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    // This error means you forgot to wrap the component tree with <AuthProvider>
    throw new Error('useAuth() must be used inside an <AuthProvider> wrapper')
  }

  return context
}