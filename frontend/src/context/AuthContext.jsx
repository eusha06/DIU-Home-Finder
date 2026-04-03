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
import { authAPI } from '../api/index'

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


  // Keep localStorage and in-memory state in sync whenever auth changes.
  function persistAuth(nextToken, nextUser) {
    localStorage.setItem('token', nextToken)
    localStorage.setItem('user', JSON.stringify(nextUser))
    setToken(nextToken)
    setUser(nextUser)
  }

  // ── login: primary login flow used by AuthPage/forms ─────────────────────
  async function login(email, password, extraUserData = {}) {
    const data = await authAPI.login(email, password)
    const mergedUser = { ...(data.user || {}), ...extraUserData }
    persistAuth(data.token, mergedUser)
    return data
  }

  // ── loginUser: compatibility helper for legacy callers ───────────────────
  function loginUser(data) {
    if (!data?.token || !data?.user) return
    persistAuth(data.token, data.user)
  }

  // ── updateProfile: updates user profile on API + local auth state ───────
  async function updateProfile(profileUpdates = {}) {
    if (!user || !token) {
      throw new Error('You must be logged in to update profile')
    }

    const apiPayload = {}
    if (Object.prototype.hasOwnProperty.call(profileUpdates, 'name')) {
      apiPayload.name = profileUpdates.name
    }
    if (Object.prototype.hasOwnProperty.call(profileUpdates, 'email')) {
      apiPayload.email = profileUpdates.email
    }
    if (Object.prototype.hasOwnProperty.call(profileUpdates, 'phone')) {
      apiPayload.phone = profileUpdates.phone
    }

    let nextUser = { ...user }

    if (Object.keys(apiPayload).length > 0) {
      const data = await authAPI.updateMe(apiPayload)
      nextUser = { ...nextUser, ...(data.user || {}) }
    }

    const localOnlyFields = { ...profileUpdates }
    delete localOnlyFields.name
    delete localOnlyFields.email
    delete localOnlyFields.phone

    nextUser = { ...nextUser, ...localOnlyFields }
    persistAuth(token, nextUser)
    return nextUser
  }


  // ── logout: clears everything ─────────────────────────────────────────────
  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  // Alias retained for existing components that still use logoutUser.
  const logoutUser = logout


  // ── Convenience helpers ────────────────────────────────────────────────────
  const isLoggedIn  = !!user && !!token               // true / false
  const isAuthenticated = isLoggedIn
  const isStudent   = user?.role === 'student'        // true if student
  const isOwner     = user?.role === 'owner' || user?.role === 'homeowner'
  const isAdmin     = user?.role === 'admin'          // true if admin


  // ── The value that every child component can access ────────────────────────
  const value = {
    user,
    token,
    isLoading,
    isLoggedIn,
    isAuthenticated,
    isStudent,
    isOwner,
    isAdmin,
    login,
    loginUser,
    updateProfile,
    logout,
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