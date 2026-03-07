import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

// ─────────────────────────────────────────────────────────────────────────────
// UnauthorizedPage (403)
// ─────────────────────────────────────────────────────────────────────────────
// Generic 403 page displayed when a logged-in user tries to access a route
// they are not authorised for based on their role.
//
// • "Go Back" navigates to the previous page in the browser history.
// • "Back to Home" navigates to "/" (the login / landing page).
// • If the user is logged in, a "Logout" button is also shown.
//
// This component is role-agnostic — it can be reused across the full app.
// ─────────────────────────────────────────────────────────────────────────────

const UnauthorizedPage = () => {
  const navigate = useNavigate()
  const { logout, user } = useAuth()

  // Logout and redirect to login page
  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-amber-50/40 flex items-center justify-center px-4" style={{ fontFamily: "'Sora', sans-serif" }}>
      <div className="text-center max-w-md">

        {/* Lock icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        {/* Error code */}
        <h1 className="text-6xl font-extrabold text-gray-800 mb-2">403</h1>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Unauthorized Access
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-400 mb-2 leading-relaxed">
          You do not have permission to view this page.
        </p>

        {/* Show current role for clarity */}
        {user?.role && (
          <p className="text-xs text-gray-400 mb-8">
            Your current role:{' '}
            <span className="font-semibold text-gray-600">{user.role}</span>
          </p>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Go Back (browser history) */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Go Back
          </button>

          {/* Home */}
          <button
            onClick={() => navigate('/', { replace: true })}
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Back to Home
          </button>

          {/* Logout */}
          {user && (
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-6 py-3 border border-red-300 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors duration-200"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default UnauthorizedPage
