const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 10.8L12 3l9 7.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.8 10v9h10.4v-9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ListIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8">
    <rect x="5" y="3.5" width="14" height="17" rx="2" />
    <path d="M9 8h6M9 12h6M9 16h4" strokeLinecap="round" />
  </svg>
)

const PieIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 3v9h9" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 12a9 9 0 1 1-9-9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M4 7l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const GearIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Z" />
    <path d="M19.4 12a7.5 7.5 0 0 0-.1-1.2l2-1.6-2-3.5-2.5 1a7.8 7.8 0 0 0-2-1.2L14.4 3h-4.1l-.5 2.5a8 8 0 0 0-2 1.2l-2.5-1-2 3.5 2 1.6a7.5 7.5 0 0 0 0 2.4l-2 1.6 2 3.5 2.5-1a7.8 7.8 0 0 0 2 1.2l.5 2.5h4.1l.5-2.5a8 8 0 0 0 2-1.2l2.5 1 2-3.5-2-1.6c.1-.4.1-.8.1-1.2Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const HelpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" />
    <path d="M9.6 9.2a2.8 2.8 0 1 1 3.3 4.4c-.9.5-1.3.9-1.3 1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 17.2h.01" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const navItems = [
  { id: 'dashboard', route: 'dashboard', label: 'Dashboard', icon: HomeIcon },
  { id: 'listings', route: 'properties', label: 'My Listings', icon: ListIcon },
  { id: 'revenue', route: 'bookings', label: 'Revenue', icon: PieIcon },
  { id: 'add-property', route: 'addProperty', label: 'Add Property', icon: MailIcon },
  { id: 'settings', route: null, label: 'Settings', icon: GearIcon },
  { id: 'help', route: null, label: 'Help', icon: HelpIcon },
]

const Sidebar = ({ activePage, onNavigate, isOpen, onClose }) => {
  const handleNav = (route) => {
    if (route) {
      onNavigate(route)
    }
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

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#f7f8fc] border-r border-[#e6e7f3] z-50 flex flex-col transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="px-6 py-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e8ebff] text-[#5d68d6] flex items-center justify-center">
              <HomeIcon />
            </div>
            <div>
              <h1 className="text-[20px] leading-none font-bold text-[#25294a] tracking-[-0.01em]">
                StudentHomeFinder
              </h1>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-xl text-[#888db1] hover:text-[#4e5487] hover:bg-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <nav className="flex-1 px-5 py-2 space-y-2">
          {navItems.map(({ id, route, label, icon: Icon }) => (
            // Items without a route are visual placeholders to match the reference sidebar.
            // They intentionally keep the current page unchanged.
            <button
              key={id}
              onClick={() => handleNav(route)}
              className={`w-full flex items-center gap-3 px-4 py-[13px] rounded-2xl text-base lg:text-[26px] font-medium transition-all duration-200 text-left
                ${activePage === route
                  ? 'bg-white text-[#23284d] shadow-[0_14px_25px_-22px_rgba(102,86,181,0.55)] ring-1 ring-[#e8e6ff]'
                  : 'text-[#2e3357] hover:bg-white/70'
                }`}
            >
              <span className={`${activePage === route ? 'text-[#6c76e7]' : 'text-[#8b8fb1]'}`}>
                <Icon />
              </span>
              {label}
            </button>
          ))}
        </nav>

        <div className="px-6 py-5">
          <p className="text-xs text-[#a8acc8]">© 2026 StudentHomeFinder</p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
