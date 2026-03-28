/**
 * Unauthorized.jsx
 * ────────────────
 * 403 Unauthorized page shown when a non-admin user
 * tries to access the admin panel route.
 *
 * Props:
 *   onGoBack – callback to navigate away (e.g. back to auth page)
 */
const Unauthorized = ({ onGoBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        {/* Error code */}
        <h1 className="text-6xl font-extrabold text-gray-800 mb-2">403</h1>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Unauthorized Access</h2>

        {/* Description */}
        <p className="text-sm text-gray-400 mb-8 leading-relaxed">
          You do not have permission to access this page.<br />
          Only administrators can view the Admin Panel.
        </p>

        {/* Go back button */}
        <button
          onClick={onGoBack}
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
        >
          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Go Back
        </button>
      </div>
    </div>
  )
}

export default Unauthorized
