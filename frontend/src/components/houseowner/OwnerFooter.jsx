const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-[15px] h-[15px]" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 10.8L12 3l9 7.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.8 10v9h10.4v-9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const navLinks = [
  { id: 'dashboard', label: 'Dashboard', action: 'dashboard' },
  { id: 'properties', label: 'My Listings', action: 'properties' },
  { id: 'bookings', label: 'Booking Request', action: 'bookings' },
  { id: 'add-property', label: 'Add Property', action: 'addProperty' },
  { id: 'profile', label: 'Edit Profile', action: 'profile' },
]

const supportLinks = [
  { id: 'support', label: 'Help Center' },
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'terms', label: 'Terms of Service' },
]

const OwnerFooter = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear()

  const handleNavigate = (action) => {
    if (onNavigate && action) {
      onNavigate(action)
    }
  }

  return (
    <footer className="mt-8 border-t border-[#d0d8ff] bg-[linear-gradient(118deg,#0a0d3c_0%,#101a57_42%,#1e2f83_100%)] text-white shadow-[0_-18px_36px_-28px_rgba(8,14,56,0.95)]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-9 pt-7 sm:pt-9 pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg border border-white/25 bg-white/10 flex items-center justify-center text-white/90">
                <HomeIcon />
              </div>
              <p className="text-base font-semibold tracking-tight">StudentHomeFinder</p>
            </div>
            <p className="mt-3 text-sm text-white/78 leading-relaxed max-w-[28ch]">
              Smart housing platform for students, property owners, and hostel managers.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-white/65 font-semibold">Quick Links</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-white/85">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavigate(link.action)}
                  className="text-left hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-white/65 font-semibold">Developer</p>
            <p className="mt-3 text-sm text-white/85 leading-relaxed">Developed by DIU Home Finder Engineering Team</p>
            <p className="mt-2 text-xs text-white/70">Version 1.0 Owner Portal</p>

            <p className="mt-4 text-xs uppercase tracking-[0.12em] text-white/65 font-semibold">Support</p>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-white/80">
              {supportLinks.map((link) => (
                <span key={link.id} className="hover:text-white transition-colors cursor-default">
                  {link.label}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-white/65 font-semibold">Contact</p>
            <div className="mt-3 space-y-2 text-sm text-white/85">
              <p>support@studenthomefinder.app</p>
              <p>+880 1712 345678</p>
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.12em] text-white/65 font-semibold">Address</p>
            <p className="mt-2 text-sm text-white/82 leading-relaxed max-w-[30ch]">
              Daffodil Smart City, Ashulia, Savar, Dhaka, Bangladesh.
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-3 border-t border-white/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] sm:text-xs text-white/70">
          <p>Copyright {currentYear} StudentHomeFinder. All rights reserved.</p>
          <p>Built for DIU housing operations.</p>
        </div>
      </div>
    </footer>
  )
}

export default OwnerFooter
