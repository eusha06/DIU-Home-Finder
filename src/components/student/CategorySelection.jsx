/**
 * CategorySelection.jsx
 * ─────────────────────
 * Initial view that lets the student choose between "Rental Homes" and "Hostels".
 * Displays two large animated cards centered on screen.
 * Does NOT reload page — switches view via React state (callback).
 *
 * Props:
 *   onSelect – (category: 'home' | 'hostel') => void
 */
const CategorySelection = ({ onSelect }) => {
  const categories = [
    {
      key: 'home',
      title: 'Rental Homes',
      description: 'Browse private rental apartments, messes, and residential homes near your campus.',
      gradient: 'from-indigo-500 to-blue-600',
      hoverGradient: 'hover:from-indigo-600 hover:to-blue-700',
      icon: (
        <svg className="w-16 h-16 text-white/90" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
        </svg>
      ),
      emoji: '🏠',
    },
    {
      key: 'hostel',
      title: 'Hostels',
      description: 'Find verified hostels with meals, security, and structured living for students.',
      gradient: 'from-emerald-500 to-teal-600',
      hoverGradient: 'hover:from-emerald-600 hover:to-teal-700',
      icon: (
        <svg className="w-16 h-16 text-white/90" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      emoji: '🏢',
    },
  ]

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          What are you looking for?
        </h1>
        <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto">
          Choose a category to start browsing student-friendly housing options near your campus.
        </p>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => onSelect(cat.key)}
            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${cat.gradient} ${cat.hoverGradient}
              p-8 sm:p-10 text-left text-white shadow-lg
              hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98]
              transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-300`}
          >
            {/* Background decorative circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 group-hover:scale-125 transition-transform duration-500" />
            <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-white/5 group-hover:scale-110 transition-transform duration-500" />

            {/* Icon */}
            <div className="relative mb-5 w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center
                          group-hover:bg-white/25 transition-colors duration-300">
              {cat.icon}
            </div>

            {/* Title */}
            <h2 className="relative text-xl sm:text-2xl font-bold mb-2">
              {cat.title}
            </h2>

            {/* Description */}
            <p className="relative text-sm text-white/80 leading-relaxed">
              {cat.description}
            </p>

            {/* Arrow indicator */}
            <div className="relative mt-5 flex items-center gap-2 text-sm font-medium text-white/70 group-hover:text-white transition-colors">
              Browse {cat.title}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategorySelection
