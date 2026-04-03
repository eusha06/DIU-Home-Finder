const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 10.8L12 3l9 7.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.8 10v9h10.4v-9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ListIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]" stroke="currentColor" strokeWidth="1.8">
    <rect x="5" y="3.5" width="14" height="17" rx="2" />
    <path d="M9 8h6M9 12h6M9 16h4" strokeLinecap="round" />
  </svg>
)

const PieIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 3v9h9" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 12a9 9 0 1 1-9-9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M4 7l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const GearIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Z" />
    <path d="M19.4 12a7.5 7.5 0 0 0-.1-1.2l2-1.6-2-3.5-2.5 1a7.8 7.8 0 0 0-2-1.2L14.4 3h-4.1l-.5 2.5a8 8 0 0 0-2 1.2l-2.5-1-2 3.5 2 1.6a7.5 7.5 0 0 0 0 2.4l-2 1.6 2 3.5 2.5-1a7.8 7.8 0 0 0 2 1.2l.5 2.5h4.1l.5-2.5a8 8 0 0 0 2-1.2l2.5 1 2-3.5-2-1.6c.1-.4.1-.8.1-1.2Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const HelpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" />
    <path d="M9.6 9.2a2.8 2.8 0 1 1 3.3 4.4c-.9.5-1.3.9-1.3 1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 17.2h.01" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const navItems = [
  { id: 'dashboard', route: 'dashboard', label: 'Dashboard', icon: HomeIcon },
  { id: 'listings', route: 'properties', label: 'My Listings', icon: ListIcon },
  { id: 'booking-request', route: 'bookings', label: 'Booking Request', icon: PieIcon },
  { id: 'add-property', route: 'addProperty', label: 'Add Property', icon: MailIcon },
  { id: 'settings', route: 'profile', label: 'Settings', icon: GearIcon },
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
        className={`fixed top-0 left-0 h-screen w-[236px] bg-[linear-gradient(180deg,#f9faff_0%,#f4f6ff_100%)] border-r border-[#dde2f6] shadow-[inset_-1px_0_0_rgba(255,255,255,0.75)] z-50 flex flex-col transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:self-start lg:z-20
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="px-5 pt-6 pb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-[34px] h-[34px] rounded-lg bg-[#e8ebff] text-[#5d68d6] flex items-center justify-center">
              <HomeIcon />
            </div>
            <div>
              <h1 className="text-[17px] leading-[1.1] font-semibold text-[#25294a] tracking-[-0.01em]">
                StudentHomeFinder
              </h1>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="lg:hidden absolute top-3.5 right-3.5 w-8 h-8 flex items-center justify-center rounded-lg text-[#888db1] hover:text-[#4e5487] hover:bg-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <nav className="flex-1 px-3 py-2.5 space-y-1.5">
          {navItems.map(({ id, route, label, icon: Icon }) => (
            // Items without a route are visual placeholders to match the reference sidebar.
            // They intentionally keep the current page unchanged.
            <button
              key={id}
              onClick={() => handleNav(route)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[15px] font-medium leading-tight tracking-[-0.01em] transition-all duration-200 text-left
                ${activePage === route
                  ? 'bg-white text-[#1f2550] shadow-[0_14px_26px_-24px_rgba(62,79,180,0.65)] ring-1 ring-[#dfe5ff]'
                  : 'text-[#353d6d] hover:bg-white/75'
                }`}
            >
              <span className={`shrink-0 ${activePage === route ? 'text-[#5c68df]' : 'text-[#8b8fb1]'}`}>
                <Icon />
              </span>
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-auto px-5 py-3 border-t border-[#e4e8fa]/80">
          <p className="text-[11px] tracking-[0.01em] text-[#9ca3c7]">© 2026 StudentHomeFinder</p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
