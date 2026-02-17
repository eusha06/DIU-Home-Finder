/**
 * Navbar.jsx
 * ──────────
 * Top navigation bar for the student homepage.
 * Shows the app logo/name, student info, and a profile avatar.
 *
 * Props:
 *   student - { fullName, gender } object of the logged-in student
 *   onLogout - callback when the user clicks logout
 */

const Navbar = ({ student, onLogout }) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo / Brand ──────────────────────────────────────── */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏠</span>
            <h1 className="text-lg font-bold text-indigo-700 tracking-tight hidden sm:block">
              Student Home Finder
            </h1>
            <h1 className="text-lg font-bold text-indigo-700 tracking-tight sm:hidden">
              SHF
            </h1>
          </div>

          {/* ── Right side: user info + logout ─────────────────────── */}
          <div className="flex items-center gap-3">
            {/* Gender badge */}
            <span className={`
              text-xs font-semibold px-2.5 py-1 rounded-full hidden sm:inline-block
              ${student.gender === 'male'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-pink-100 text-pink-700'}
            `}>
              {student.gender === 'male' ? '👨 Male' : '👩 Female'}
            </span>

            {/* Profile avatar + name */}
            <div className="flex items-center gap-2">
              <div className={`
                w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white
                ${student.gender === 'male' ? 'bg-blue-500' : 'bg-pink-500'}
              `}>
                {student.fullName.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden md:block">
                {student.fullName}
              </span>
            </div>

            {/* Logout button */}
            <button
              onClick={onLogout}
              className="ml-2 text-xs text-gray-400 hover:text-red-500 transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
