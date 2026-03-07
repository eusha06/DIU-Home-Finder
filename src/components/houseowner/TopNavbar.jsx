/**
 * TopNavbar.jsx
 * ─────────────
 * Top navigation bar for owner dashboard.
 * Shows hamburger menu (mobile), page title, and profile avatar with logout.
 *
 * Props:
 *   owner          – owner object { fullName, email }
 *   pageTitle      – string, current page title
 *   onToggleSidebar– callback to open mobile sidebar
 *   onLogout       – callback to logout
 */
const TopNavbar = ({ owner, pageTitle, onToggleSidebar, onLogout }) => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: hamburger + title */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-lg font-semibold text-gray-800">{pageTitle}</h2>
          </div>

          {/* Right: avatar + logout */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center text-sm font-bold text-white shadow-sm">
                {owner.fullName ? owner.fullName.charAt(0).toUpperCase() : 'O'}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-700 leading-tight">{owner.fullName}</p>
                <p className="text-[11px] text-gray-400 leading-tight">{owner.email}</p>
              </div>
            </div>
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

export default TopNavbar
