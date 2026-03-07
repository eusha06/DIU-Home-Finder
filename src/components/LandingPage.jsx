import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// =============================================================================
// LandingPage.jsx
// =============================================================================
// Color palette:
//   Primary:   #6366F1  (Electric Indigo)  -> buttons, links, CTA
//   Secondary: #10B981  (Emerald Green)    -> success, verified, available
//   Neutral:   warm amber-50 backgrounds   -> creamy warm sections
//   Deep Tone: #0F172A  (Slate Navy)       -> headings, deep text
//
// Fonts:
//   Sora             -> body / UI text
//   DM Serif Display -> hero accent
//   Space Grotesk    -> footer
// =============================================================================

// -- Inline SVG icons --------------------------------------------------------

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

const StarIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const CheckCircleIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const MenuIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const CloseIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

// -- Font helpers ------------------------------------------------------------

const sora = { fontFamily: "'Sora', sans-serif" }
const serif = { fontFamily: "'DM Serif Display', serif" }
const grotesk = { fontFamily: "'Space Grotesk', sans-serif" }

// =============================================================================
// NAVBAR
// =============================================================================

const Navbar = ({ onLogin }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100" style={sora}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-indigo-500 flex items-center justify-center shadow-md shadow-indigo-500/25">
              <HomeIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">StudentHomeFinder</span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo('features')} className="text-sm text-slate-500 hover:text-indigo-500 transition-colors font-medium">Features</button>
            <button onClick={() => scrollTo('how-it-works')} className="text-sm text-slate-500 hover:text-indigo-500 transition-colors font-medium">How It Works</button>
            <button onClick={() => scrollTo('roles')} className="text-sm text-slate-500 hover:text-indigo-500 transition-colors font-medium">For You</button>
            <button onClick={() => scrollTo('testimonials')} className="text-sm text-slate-500 hover:text-indigo-500 transition-colors font-medium">Testimonials</button>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={onLogin} className="text-sm font-medium text-slate-600 hover:text-indigo-500 transition-colors">Log In</button>
            <button onClick={onLogin} className="text-sm font-medium px-5 py-2.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all shadow-md shadow-indigo-500/25">Get Started</button>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100">
            {mobileOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg animate-[fadeIn_0.15s_ease-out]">
          <div className="px-4 py-4 space-y-1">
            <button onClick={() => scrollTo('features')} className="block w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 rounded-lg font-medium">Features</button>
            <button onClick={() => scrollTo('how-it-works')} className="block w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 rounded-lg font-medium">How It Works</button>
            <button onClick={() => scrollTo('roles')} className="block w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 rounded-lg font-medium">For You</button>
            <button onClick={() => scrollTo('testimonials')} className="block w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 rounded-lg font-medium">Testimonials</button>
            <div className="pt-3 border-t border-slate-100 flex gap-2">
              <button onClick={onLogin} className="flex-1 text-sm font-medium px-4 py-2.5 text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">Log In</button>
              <button onClick={onLogin} className="flex-1 text-sm font-medium px-4 py-2.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">Get Started</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

// =============================================================================
// HERO SECTION  (warm amber background kept)
// =============================================================================

const Hero = ({ onLogin }) => (
  <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden bg-amber-50" style={sora}>
    {/* Background decoration */}
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-200/30 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-200/20 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text content */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium mb-6 border border-indigo-100">
             Trusted by 2,000+ Students
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6">
            Find Your Perfect
            <span className="text-indigo-500" style={serif}> Student Home</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            Discover verified hostels and rental homes near your university. Browse rooms, check bed availability, and book your seat  all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <button onClick={onLogin}
              className="px-8 py-4 bg-indigo-500 text-white text-base font-semibold rounded-xl hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5">
              Browse Hostels &amp; Homes
            </button>
            <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-slate-700 text-base font-semibold rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all">
              See How It Works
            </button>
          </div>
        </div>

        {/* Hero image / illustration */}
        <div className="relative hidden lg:block">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-200/50">
            <img
              src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=700&h=500&fit=crop"
              alt="Student hostel"
              className="w-full h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
          {/* Floating card - available (emerald) */}
          <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-slate-100 animate-[fadeIn_0.5s_ease-out]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">250+ Beds Available</p>
                <p className="text-xs text-slate-400">Updated just now</p>
              </div>
            </div>
          </div>
          {/* Floating card 2 - verified */}
          <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4 border border-slate-100 animate-[fadeIn_0.5s_ease-out_0.2s_both]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <BuildingIcon className="w-5 h-5 text-indigo-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">50+ Hostels</p>
                <p className="text-xs text-emerald-500 font-medium">Verified listings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

// =============================================================================
// FEATURES SECTION  (warm card backgrounds kept)
// =============================================================================

const features = [
  { icon: SearchIcon, title: 'Smart Search', desc: 'Filter hostels by gender, location, price range, and room type to find exactly what you need.', color: 'bg-indigo-50 text-indigo-500' },
  { icon: BuildingIcon, title: 'Hostel Drill-Down', desc: 'Browse floor by floor, room by room, and see real-time bed availability at a glance.', color: 'bg-violet-50 text-violet-500' },
  { icon: ShieldIcon, title: 'Verified Listings', desc: 'Every hostel and rental home is reviewed by our admin team before going live.', color: 'bg-emerald-50 text-emerald-500' },
  { icon: ClipboardIcon, title: 'Instant Booking', desc: 'Request a bed or room with one click. Hostel managers review and approve in real time.', color: 'bg-amber-50 text-amber-500' },
  { icon: UsersIcon, title: 'Multi-Role Platform', desc: 'Students, house owners, and hostel managers  everyone has their own tailored dashboard.', color: 'bg-pink-50 text-pink-500' },
  { icon: HomeIcon, title: 'Rental Homes Too', desc: 'Not just hostels  also discover apartments and flat-shares near your campus.', color: 'bg-sky-50 text-sky-500' },
]

const Features = () => (
  <section id="features" className="py-20 sm:py-28 bg-white" style={sora}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-indigo-100">Features</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Everything You Need in One Place</h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">From searching to booking, we make finding student accommodation effortless.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {features.map((f) => (
          <div key={f.title} className="bg-amber-50/40 rounded-2xl p-7 border border-amber-100/60 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300">
            <div className={`w-14 h-14 rounded-xl ${f.color} flex items-center justify-center mb-5`}>
              <f.icon className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">{f.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

// =============================================================================
// HOW IT WORKS SECTION  (warm background kept)
// =============================================================================

const steps = [
  { num: '01', title: 'Create an Account', desc: 'Sign up as a student, house owner, or hostel manager. It takes less than a minute.', color: 'bg-indigo-500' },
  { num: '02', title: 'Browse Listings', desc: 'Search hostels by location, filter by gender and price, or explore rental homes near campus.', color: 'bg-violet-500' },
  { num: '03', title: 'View Details', desc: 'Drill down into floors, rooms, and individual bed availability with real-time status updates.', color: 'bg-emerald-500' },
  { num: '04', title: 'Book Your Spot', desc: 'Request a bed with one click. The hostel manager reviews and approves your booking.', color: 'bg-indigo-600' },
]

const HowItWorks = () => (
  <section id="how-it-works" className="py-20 sm:py-28 bg-amber-50/50" style={sora}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-indigo-100">How It Works</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Your New Home in 4 Simple Steps</h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">No hassle, no middlemen. Just sign up, search, and book.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, idx) => (
          <div key={step.num} className="relative text-center group">
            {idx > 0 && (
              <div className="hidden lg:block absolute top-8 -left-4 w-8 border-t-2 border-dashed border-slate-300" />
            )}
            <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <span className="text-xl font-extrabold text-white">{step.num}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed max-w-[250px] mx-auto">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

// =============================================================================
// ROLES SECTION  (warm card backgrounds kept)
// =============================================================================

const roles = [
  {
    icon: '',
    title: 'For Students',
    desc: 'Browse verified hostels and rental homes. View floors, rooms, and bed availability. Request a bed instantly and track your booking status.',
    features: ['Search & filter hostels', 'Floor  Room  Bed drill-down', 'One-click bed request', 'Track booking status'],
    gradient: 'from-indigo-500 to-indigo-600',
  },
  {
    icon: '',
    title: 'For House Owners',
    desc: 'List your rental properties, manage bookings, and reach thousands of students looking for accommodation near campus.',
    features: ['Add unlimited properties', 'Manage tenant bookings', 'Dashboard with analytics', 'Direct student inquiries'],
    gradient: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: '',
    title: 'For Hostel Managers',
    desc: 'Manage your hostel hierarchy  floors, rooms, and beds. Toggle availability, approve bookings, and edit hostel information all from one dashboard.',
    features: ['Hostel  Floor  Room  Bed management', 'Toggle bed & hostel status', 'Approve/reject booking requests', 'Edit hostel info & warden details'],
    gradient: 'from-violet-500 to-violet-600',
  },
]

const Roles = ({ onLogin }) => (
  <section id="roles" className="py-20 sm:py-28 bg-white" style={sora}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-indigo-100">For Everyone</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Built for Every Role</h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">Whether you're a student, owner, or manager  we have a tailored experience for you.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {roles.map((role) => (
          <div key={role.title} className="bg-amber-50/30 rounded-2xl border border-amber-100/60 overflow-hidden hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group">
            {/* Gradient header */}
            <div className={`bg-gradient-to-r ${role.gradient} p-6`}>
              <span className="text-4xl">{role.icon}</span>
              <h3 className="text-xl font-bold text-white mt-3">{role.title}</h3>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-500 leading-relaxed mb-5">{role.desc}</p>
              <ul className="space-y-2.5 mb-6">
                {role.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    {feat}
                  </li>
                ))}
              </ul>
              <button onClick={onLogin}
                className="w-full py-3 text-sm font-semibold rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-200 hover:border-indigo-300 transition-all">
                Get Started 
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

// =============================================================================
// STATS SECTION
// =============================================================================

const statsData = [
  { value: '2,000+', label: 'Active Students' },
  { value: '50+', label: 'Verified Hostels' },
  { value: '120+', label: 'Rental Homes' },
  { value: '98%', label: 'Satisfaction Rate' },
]

const Stats = () => (
  <section className="py-16 sm:py-20 bg-gradient-to-r from-indigo-500 to-indigo-600" style={sora}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {statsData.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl sm:text-4xl font-extrabold text-white mb-1">{s.value}</p>
            <p className="text-sm text-indigo-200 font-medium">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

// =============================================================================
// TESTIMONIALS SECTION  (warm background kept)
// =============================================================================

const testimonials = [
  { name: 'Tanvir Hasan', role: 'CSE Student, DIU', avatar: 'T', text: 'I found my hostel bed in less than 5 minutes. The floor-by-floor view made it super easy to pick the best room!', stars: 5 },
  { name: 'Fatima Akhter', role: 'EEE Student, DIU', avatar: 'F', text: 'As a female student, safety was my top concern. The verified hostel listings gave me peace of mind.', stars: 5 },
  { name: 'Dr. Rafiq Ahmed', role: 'Hostel Manager', avatar: 'R', text: 'Managing 6 hostels used to be a nightmare. Now I can see every bed status and approve bookings from one dashboard.', stars: 5 },
]

const Testimonials = () => (
  <section id="testimonials" className="py-20 sm:py-28 bg-amber-50/40" style={sora}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-indigo-100">Testimonials</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">What Our Users Say</h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">Real feedback from students, owners, and managers who use StudentHomeFinder every day.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t) => (
          <div key={t.name} className="bg-white rounded-2xl border border-amber-100/60 shadow-sm p-7 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
            {/* Stars */}
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: t.stars }).map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 text-amber-400" />
              ))}
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-6 italic">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-bold text-white shadow-md shadow-indigo-500/25">
                {t.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{t.name}</p>
                <p className="text-xs text-slate-400">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

// =============================================================================
// CTA SECTION
// =============================================================================

const CTA = ({ onLogin }) => (
  <section className="py-20 sm:py-24 bg-white" style={sora}>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-600 rounded-3xl p-10 sm:p-16 shadow-2xl shadow-indigo-500/20">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to Find Your Home?</h2>
        <p className="text-indigo-200 text-lg mb-8 max-w-xl mx-auto">
          Join thousands of students who already found their perfect accommodation. It's free, fast, and verified.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={onLogin}
            className="px-8 py-4 bg-white text-indigo-600 text-base font-semibold rounded-xl hover:bg-indigo-50 transition-all shadow-lg hover:-translate-y-0.5">
            Get Started Free
          </button>
          <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white/10 text-white text-base font-semibold rounded-xl border border-white/25 hover:bg-white/20 transition-all backdrop-blur-sm">
            Learn More
          </button>
        </div>
      </div>
    </div>
  </section>
)

// =============================================================================
// FOOTER  (Space Grotesk font, bold, eye-catching)
// =============================================================================

const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 pt-16 sm:pt-20 pb-10" style={grotesk}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 mb-14">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <HomeIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">StudentHomeFinder</span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs text-slate-400">
            The easiest way for students to find verified hostels and rental homes near their university campus.
          </p>
          {/* Social dots */}
          <div className="flex gap-3 mt-5">
            <div className="w-9 h-9 rounded-full bg-slate-800 hover:bg-indigo-500 flex items-center justify-center transition-colors cursor-pointer">
              <span className="text-xs font-bold text-white">f</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-800 hover:bg-indigo-500 flex items-center justify-center transition-colors cursor-pointer">
              <span className="text-xs font-bold text-white">in</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-800 hover:bg-indigo-500 flex items-center justify-center transition-colors cursor-pointer">
              <span className="text-xs font-bold text-white">X</span>
            </div>
          </div>
        </div>
        {/* Quick links */}
        <div>
          <h4 className="text-base font-bold text-white mb-5 uppercase tracking-wider">Platform</h4>
          <ul className="space-y-3 text-sm">
            <li><button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-indigo-400 transition-colors font-medium">Features</button></li>
            <li><button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-indigo-400 transition-colors font-medium">How It Works</button></li>
            <li><button onClick={() => document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-indigo-400 transition-colors font-medium">For Students</button></li>
            <li><button onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-indigo-400 transition-colors font-medium">Testimonials</button></li>
          </ul>
        </div>
        {/* Roles */}
        <div>
          <h4 className="text-base font-bold text-white mb-5 uppercase tracking-wider">For Users</h4>
          <ul className="space-y-3 text-sm">
            <li><span className="hover:text-indigo-400 transition-colors font-medium cursor-default">Students</span></li>
            <li><span className="hover:text-indigo-400 transition-colors font-medium cursor-default">House Owners</span></li>
            <li><span className="hover:text-indigo-400 transition-colors font-medium cursor-default">Hostel Managers</span></li>
            <li><span className="hover:text-indigo-400 transition-colors font-medium cursor-default">Administrators</span></li>
          </ul>
        </div>
        {/* Contact */}
        <div>
          <h4 className="text-base font-bold text-white mb-5 uppercase tracking-wider">Contact</h4>
          <ul className="space-y-3 text-sm font-medium">
            <li className="flex items-center gap-2"> <span>support@studenthomefinder.com</span></li>
            <li className="flex items-center gap-2"> <span>+880 1700-000000</span></li>
            <li className="flex items-center gap-2"> <span>Daffodil International University</span></li>
            <li className="text-xs text-slate-500 pl-6">Ashulia, Savar, Dhaka</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500 font-medium"> 2026 <span className="text-white font-bold">StudentHomeFinder</span>. All rights reserved.</p>
        <div className="flex gap-8 text-sm text-slate-500 font-semibold">
          <span className="hover:text-indigo-400 cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-indigo-400 cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </div>
    </div>
  </footer>
)

// =============================================================================
// MAIN LANDING PAGE
// =============================================================================

const LandingPage = () => {
  const navigate = useNavigate()
  const goToLogin = () => navigate('/login')

  return (
    <div className="min-h-screen bg-white">
      <Navbar onLogin={goToLogin} />
      <Hero onLogin={goToLogin} />
      <Features />
      <HowItWorks />
      <Roles onLogin={goToLogin} />
      <Stats />
      <Testimonials />
      <CTA onLogin={goToLogin} />
      <Footer />
    </div>
  )
}

export default LandingPage
