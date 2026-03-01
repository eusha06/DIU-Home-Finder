/**
 * AdminTopbar.jsx
 * ───────────────
 * Top navigation bar for the Admin Panel.
 * Shows hamburger menu (mobile), page title, admin badge, and logout.
 *
 * Props:
 *   admin            – admin user object { name, role }
 *   pageTitle        – string, current section title
 *   onToggleSidebar  – callback to open/close mobile sidebar
 *   onLogout         – callback to log out
 */
const AdminTopbar = ({ admin, pageTitle, onToggleSidebar, onLogout }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: hamburger + page title */}
          <div className="flex items-center gap-3">
            {/* Hamburger – mobile only */}
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

          {/* Right: admin info + logout */}
          <div className="flex items-center gap-3">
            {/* Admin badge */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold text-white shadow-sm">
                {admin.name ? admin.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-700 leading-tight">{admin.name}</p>
                <p className="text-[11px] text-indigo-500 leading-tight font-medium uppercase tracking-wide">{admin.role}</p>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="ml-2 text-xs text-gray-400 hover:text-red-500 transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminTopbar
