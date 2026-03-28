const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8">
    <path d="M6.8 9.5a5.2 5.2 0 1 1 10.4 0v3.1c0 .9.3 1.8.9 2.5l1.1 1.3H4.8l1.1-1.3c.6-.7.9-1.6.9-2.5V9.5Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 18a2 2 0 0 0 4 0" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const TopNavbar = ({ owner, pageTitle, onToggleSidebar, onLogout, variant = 'default' }) => {
  const isDashboard = variant === 'dashboard'

  return (
    <nav className={`${isDashboard ? 'bg-transparent' : 'bg-white border-b border-[#e6e8f4]'} relative z-30`}>
      <div className="px-4 sm:px-6 lg:px-10">
        <div className={`${isDashboard ? 'h-[118px]' : 'h-16'} flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${
                isDashboard
                  ? 'text-white hover:bg-white/20'
                  : 'text-[#596087] hover:bg-[#f0f2ff] hover:text-[#3e4670]'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className={`${isDashboard ? 'text-3xl sm:text-4xl lg:text-[52px] text-white font-bold tracking-[-0.02em]' : 'text-lg text-[#23284d] font-semibold'}`}>
              {pageTitle}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isDashboard ? 'text-white hover:bg-white/15' : 'text-[#6f76a2] hover:bg-[#f0f2ff]'
              }`}
              type="button"
              aria-label="notifications"
            >
              <BellIcon />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#f56a84]" />
            </button>

            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/20 shadow-lg bg-white/10 flex items-center justify-center text-sm font-bold text-white">
                {owner?.avatar ? (
                  <img src={owner.avatar} alt={owner.fullName || 'Owner'} className="w-full h-full object-cover" />
                ) : (
                  (owner?.fullName ? owner.fullName.charAt(0).toUpperCase() : 'O')
                )}
              </div>
              <div className={`${isDashboard ? 'text-white/90' : 'text-[#3b4069]'} hidden sm:flex items-center gap-1`}>
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
                  <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <button
              onClick={onLogout}
              className={`${isDashboard ? 'text-white/80 hover:text-white' : 'text-[#7f84a9] hover:text-[#4c527d]'} text-xs font-semibold transition-colors`}
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
