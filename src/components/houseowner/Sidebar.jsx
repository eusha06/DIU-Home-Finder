import { useState } from 'react'

/**
 * Sidebar.jsx
 * ───────────
 * Sidebar navigation for house owner dashboard.
 * Desktop: fixed left sidebar. Mobile: slide-in overlay.
 *
 * Props:
 *   activePage  – current active page key
 *   onNavigate  – callback(pageKey) when a nav item is clicked
 *   isOpen      – whether mobile sidebar is open
 *   onClose     – callback to close mobile sidebar
 */

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: '📊' },
  { key: 'properties', label: 'My Properties', icon: '🏘️' },
  { key: 'bookings', label: 'Bookings', icon: '📋' },
  { key: 'addProperty', label: 'Add Property', icon: '➕' },
]

const Sidebar = ({ activePage, onNavigate, isOpen, onClose }) => {
  const handleNav = (key) => {
    onNavigate(key)
    onClose()
  }

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg z-50 flex flex-col transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:shadow-none lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Brand */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏠</span>
            <div>
              <h1 className="text-base font-bold text-indigo-700 tracking-tight leading-tight">Owner Panel</h1>
              <p className="text-[10px] text-gray-400">Student Home Finder</p>
            </div>
          </div>
        </div>

        {/* Close button (mobile) */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5">
          {navItems.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => handleNav(key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                ${activePage === key
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
            >
              <span className="text-lg">{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100">
          <p className="text-[10px] text-gray-300 text-center">© 2026 DIU Smart Home Finder</p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
