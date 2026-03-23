import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const HomeIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
  </svg>
)

const BuildingIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
)

const ShieldIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const UsersIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const ClipboardIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
)

const CheckCircleIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const StarIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const titleFont = { fontFamily: "'Poppins', sans-serif" }
const bodyFont = { fontFamily: "'Manrope', sans-serif" }

const navItems = [
  { label: 'For Students', id: 'roles' },
  { label: 'For Property Owners', id: 'roles' },
  { label: 'For Hostel Managers', id: 'roles' },
  { label: 'About', id: 'features' },
]

const quickActions = [
  {
    title: 'Rent a Room',
    desc: 'Discover verified student accommodations. Explore rooms, apartments, and co-living spaces tailored for your needs.',
    btnText: 'Find a Place',
    icon: UsersIcon,
    onClick: (onLogin) => onLogin(),
  },
  {
    title: 'List your Property',
    desc: 'Reach reliable student tenants. Manage your listings, screenings, and payments efficiently.',
    btnText: 'Get Started',
    icon: HomeIcon,
    onClick: (onLogin) => onLogin(),
  },
  {
    title: 'Manage your Hostel',
    desc: 'Streamline operations. Use advanced tools for bookings, maintenance, and resident services.',
    btnText: 'Learn More',
    icon: BuildingIcon,
    onClick: (_, onScroll) => onScroll('how-it-works'),
  },
]

const Navbar = ({ onLogin, onScroll }) => {
  const [open, setOpen] = useState(false)

  return (
    <header className="absolute top-0 left-0 right-0 z-40" style={bodyFont}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2.5 text-white">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
              <HomeIcon className="w-4 h-4" />
            </div>
            <p className="text-xl font-semibold tracking-tight" style={titleFont}>StudentHomeFinder</p>
          </div>

          <nav className="hidden lg:flex items-center gap-10 text-sm text-white/90">
            {navItems.map((item) => (
              <button key={item.label} onClick={() => onScroll(item.id)} className="hover:text-white transition-colors">
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center">
            <button
              onClick={onLogin}
              className="px-5 py-2.5 rounded-xl bg-white text-[#0C104B] font-semibold hover:bg-[#E9EDFF] transition-colors"
            >
              Sign In / Sign Up
            </button>
          </div>

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="lg:hidden p-2 text-white border border-white/30 rounded-lg"
            aria-label="Toggle navigation"
          >
            <span className="block w-5 h-0.5 bg-white" />
            <span className="block w-5 h-0.5 bg-white mt-1" />
            <span className="block w-5 h-0.5 bg-white mt-1" />
          </button>
        </div>

        {open && (
          <div className="lg:hidden mt-2 mb-4 p-4 rounded-xl bg-[#0D1254] border border-white/15 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onScroll(item.id)
                  setOpen(false)
                }}
                className="block w-full text-left px-3 py-2 rounded-lg text-white/90 hover:bg-white/10"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={onLogin}
              className="w-full mt-2 px-3 py-2 rounded-lg bg-white text-[#0F145A] font-semibold"
            >
              Sign In / Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

const Hero = ({ onLogin, onScroll }) => {
  const [filters, setFilters] = useState({ location: '', date: '', price: '' })

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (filters.location) params.set('location', filters.location)
    if (filters.date) params.set('moveIn', filters.date)
    if (filters.price) params.set('price', filters.price)

    const suffix = params.toString() ? `?${params.toString()}` : ''
    onLogin(suffix)
  }

  return (
    <section className="bg-[#F0F3FF] px-2 sm:px-4 pt-2 sm:pt-4" style={bodyFont}>
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-b-[26px] sm:rounded-b-[34px] bg-[radial-gradient(circle_at_12%_18%,#151D5C_0%,#0A0F3F_45%,#050620_100%)] shadow-[0_38px_88px_rgba(5,6,32,0.55)]">
          <Navbar onLogin={() => onLogin('')} onScroll={onScroll} />

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-24 left-8 h-44 w-44 rounded-full bg-[#7686FF]/14 blur-3xl" />
            <div className="absolute bottom-2 right-10 h-56 w-56 rounded-full bg-[#4056D8]/28 blur-3xl" />
          </div>

          <div className="pt-28 sm:pt-32 pb-24 sm:pb-28 px-5 sm:px-8 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-6 text-white">
                <h1 className="text-5xl sm:text-6xl lg:text-[68px] leading-[1.03] font-extrabold tracking-[-0.02em]" style={titleFont}>
                  Smart Housing,
                  <br />
                  Smarter Management
                </h1>

                <div className="mt-8 w-full rounded-xl bg-white text-[#1F2552] p-2 shadow-xl shadow-[#0A0E4C]/45 border border-[#D5DBF5]">
                  <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr_1fr_auto] gap-2 items-center">
                    <input
                      value={filters.location}
                      onChange={(e) => updateFilter('location', e.target.value)}
                      placeholder="Location"
                      className="h-11 px-3 rounded-lg bg-white border border-[#E2E7FB] text-sm outline-none focus:border-[#2833A7]"
                    />
                    <input
                      type="date"
                      value={filters.date}
                      onChange={(e) => updateFilter('date', e.target.value)}
                      className="h-11 px-3 rounded-lg bg-white border border-[#E2E7FB] text-sm outline-none focus:border-[#2833A7]"
                    />
                    <select
                      value={filters.price}
                      onChange={(e) => updateFilter('price', e.target.value)}
                      className="h-11 px-3 rounded-lg bg-white border border-[#E2E7FB] text-sm outline-none focus:border-[#2833A7]"
                    >
                      <option value="">Price Range</option>
                      <option value="under-4000">Under 4,000 BDT</option>
                      <option value="4000-7000">4,000 - 7,000 BDT</option>
                      <option value="7000-10000">7,000 - 10,000 BDT</option>
                      <option value="above-10000">Above 10,000 BDT</option>
                    </select>
                    <button
                      onClick={handleSearch}
                      className="h-11 px-5 rounded-lg bg-[#2D3A8E] text-white text-sm font-semibold hover:bg-[#1F2866] transition-colors"
                    >
                      Search Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm min-h-[320px] sm:min-h-[420px]">
                  <img
                    src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1000&auto=format&fit=crop"
                    alt="Modern residence"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E4A]/50 via-[#141D7B]/30 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative -mt-16 sm:-mt-20 z-20 px-3 sm:px-6 lg:px-8 pb-10 sm:pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {quickActions.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[#D3DAFA] bg-white p-6 shadow-[0_16px_36px_rgba(19,29,102,0.16)]"
              >
                <div className="w-11 h-11 rounded-xl bg-[#E8ECFF] text-[#2B329D] flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-[30px] leading-[1.18] font-semibold text-[#0E1440]" style={titleFont}>{item.title}</h3>
                <p className="text-sm text-[#4B567A] mt-4 leading-relaxed">{item.desc}</p>
                <button
                  onClick={() => item.onClick(onLogin, onScroll)}
                  className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A1F5A] text-white text-sm font-semibold hover:bg-[#131839] transition-colors"
                >
                  <SearchIcon className="w-4 h-4" />
                  {item.btnText}
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const features = [
  { icon: SearchIcon, title: 'Smart Search', desc: 'Filter by location, price, room type, and gender preference in seconds.' },
  { icon: BuildingIcon, title: 'Hostel Drill-Down', desc: 'Inspect floors, rooms, and beds before making your booking decision.' },
  { icon: ShieldIcon, title: 'Verified Listings', desc: 'All properties pass review before being visible to students.' },
  { icon: ClipboardIcon, title: 'Instant Booking', desc: 'Submit booking requests quickly and get status updates in your dashboard.' },
  { icon: UsersIcon, title: 'Multi-Role Platform', desc: 'Dedicated experiences for students, owners, hostel managers, and admins.' },
  { icon: HomeIcon, title: 'Hostels and Homes', desc: 'Choose between hostels, flats, and rental homes near DIU.' },
]

const Features = () => (
  <section id="features" className="py-20 bg-[#F3F6FF]" style={bodyFont}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <p className="text-[#2B329D] font-semibold tracking-wide uppercase text-xs">Platform Features</p>
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#0E1440] mt-2" style={titleFont}>Built for Student Housing Workflows</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item) => (
          <article key={item.title} className="rounded-2xl border border-[#D8DFFB] bg-white p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#E8ECFF] text-[#2B329D] flex items-center justify-center mb-4">
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-[#11184B]" style={titleFont}>{item.title}</h3>
            <p className="text-sm text-[#4D5980] mt-3 leading-relaxed">{item.desc}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
)

const steps = [
  { no: '01', title: 'Create an Account', desc: 'Choose student, owner, or manager to unlock role-based tools.' },
  { no: '02', title: 'Explore Listings', desc: 'Use smart filters to shortlist hostels and nearby homes.' },
  { no: '03', title: 'Check Availability', desc: 'See floor and room details with live bed status.' },
  { no: '04', title: 'Request Booking', desc: 'Submit your booking and track approval status from your dashboard.' },
]

const HowItWorks = () => (
  <section id="how-it-works" className="py-20 bg-white" style={bodyFont}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <p className="text-[#2B329D] font-semibold tracking-wide uppercase text-xs">How It Works</p>
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#0E1440] mt-2" style={titleFont}>From Search to Stay in Four Steps</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <article key={step.no} className="rounded-2xl border border-[#E1E7FD] bg-[#F5F8FF] p-6">
            <p className="text-[#2B329D] text-2xl font-bold" style={titleFont}>{step.no}</p>
            <h3 className="text-lg font-semibold text-[#11184B] mt-2" style={titleFont}>{step.title}</h3>
            <p className="text-sm text-[#4D5980] mt-3 leading-relaxed">{step.desc}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
)

const roles = [
  {
    title: 'For Students',
    desc: 'Search verified hostels and homes with detailed room availability.',
    features: ['Smart search filters', 'Room and bed level details', 'Fast booking requests'],
  },
  {
    title: 'For Property Owners',
    desc: 'Publish rentals, handle inquiries, and manage tenant bookings.',
    features: ['Add and manage properties', 'Track booking requests', 'View dashboard insights'],
  },
  {
    title: 'For Hostel Managers',
    desc: 'Manage floors, rooms, and bed status with booking approvals.',
    features: ['Hostel structure management', 'Bed availability controls', 'Approve or reject requests'],
  },
]

const Roles = ({ onLogin }) => (
  <section id="roles" className="py-20 bg-[#F3F6FF]" style={bodyFont}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <p className="text-[#2B329D] font-semibold tracking-wide uppercase text-xs">Who It Is For</p>
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#0E1440] mt-2" style={titleFont}>One Platform, Multiple Roles</h2>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <article key={role.title} className="rounded-2xl border border-[#D8DFFB] bg-white overflow-hidden">
            <div className="bg-gradient-to-r from-[#0E145C] to-[#2E3AAE] text-white p-6">
              <h3 className="text-2xl font-semibold" style={titleFont}>{role.title}</h3>
              <p className="text-sm text-white/85 mt-2">{role.desc}</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {role.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#42507A]">
                    <CheckCircleIcon className="w-5 h-5 text-[#2B329D] mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onLogin('')}
                className="mt-6 w-full rounded-xl bg-[#1A1F5A] text-white font-semibold py-3 hover:bg-[#131839] transition-colors"
              >
                Get Started
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
)

const testimonials = [
  { name: 'Tanvir Hasan', role: 'CSE Student, DIU', text: 'I found my hostel bed in a few minutes. The room-level details made the decision easy.' },
  { name: 'Fatima Akhter', role: 'EEE Student, DIU', text: 'I only book verified listings now. This platform gave me confidence from day one.' },
  { name: 'Dr. Rafiq Ahmed', role: 'Hostel Manager', text: 'Managing bed availability and booking approvals is much faster with this system.' },
]

const Testimonials = () => (
  <section id="testimonials" className="py-20 bg-white" style={bodyFont}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <p className="text-[#2B329D] font-semibold tracking-wide uppercase text-xs">Testimonials</p>
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#0E1440] mt-2" style={titleFont}>What Users Say</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <article key={item.name} className="rounded-2xl border border-[#E0E6FF] bg-[#F5F8FF] p-6">
            <div className="flex gap-1 text-[#FFB347] mb-4">
              <StarIcon className="w-4 h-4" />
              <StarIcon className="w-4 h-4" />
              <StarIcon className="w-4 h-4" />
              <StarIcon className="w-4 h-4" />
              <StarIcon className="w-4 h-4" />
            </div>
            <p className="text-sm text-[#4D5980] leading-relaxed">{item.text}</p>
            <div className="mt-5">
              <p className="font-semibold text-[#11184B]" style={titleFont}>{item.name}</p>
              <p className="text-xs text-[#60709A]">{item.role}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
)

const CTA = ({ onLogin }) => (
  <section className="py-20 bg-[#EEF1FA]" style={bodyFont}>
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="rounded-3xl bg-gradient-to-r from-[#0D0F4C] to-[#242B7F] p-10 sm:p-14 text-white shadow-2xl shadow-[#0A0E38]/45">
        <h2 className="text-3xl sm:text-4xl font-semibold" style={titleFont}>Ready to Find Your Next Home?</h2>
        <p className="mt-4 text-white/85 max-w-2xl mx-auto">Join StudentHomeFinder to discover verified accommodations and manage bookings faster.</p>
        <button
          onClick={() => onLogin('')}
          className="mt-8 px-8 py-3 rounded-xl bg-white text-[#0C114A] font-semibold hover:bg-[#E9EDFF] transition-colors"
        >
          Sign In / Sign Up
        </button>
      </div>
    </div>
  </section>
)

const Footer = ({ onScroll }) => (
  <footer className="bg-[#0A0D3C] text-white" style={bodyFont}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
          <HomeIcon className="w-4 h-4" />
        </div>
        <p className="font-semibold" style={titleFont}>StudentHomeFinder</p>
      </div>

      <div className="flex flex-wrap items-center gap-5 text-sm text-white/85">
        <button onClick={() => onScroll('roles')} className="hover:text-white">For Students</button>
        <button onClick={() => onScroll('roles')} className="hover:text-white">For Property Owners</button>
        <button onClick={() => onScroll('roles')} className="hover:text-white">For Hostel Managers</button>
        <button onClick={() => onScroll('features')} className="hover:text-white">About</button>
      </div>

      <p className="text-sm text-white/80">Copyright StudentHomeFinder</p>
    </div>
  </footer>
)

const LandingPage = () => {
  const navigate = useNavigate()

  const goToLogin = (query = '') => {
    navigate(`/login${query}`)
  }

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#F0F3FF]" style={bodyFont}>
      <Hero onLogin={goToLogin} onScroll={scrollTo} />
      <Features />
      <HowItWorks />
      <Roles onLogin={goToLogin} />
      <Testimonials />
      <CTA onLogin={goToLogin} />
      <Footer onScroll={scrollTo} />
    </div>
  )
}

export default LandingPage
