/**
 * PropertyCard.jsx
 * ────────────────
 * Individual property card shown in the listing grid.
 * Displays image, key info, and a "View Details" button.
 *
 * Props:
 *   property    - single property object from dummyProperties
 *   onViewDetails - (property) => void
 */

const PropertyCard = ({ property, onViewDetails }) => {
  const {
    title,
    location,
    rent,
    rooms,
    bathrooms,
    floor,
    availableSeats,
    available,
    images,
    gender,
  } = property

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden
                    hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
      {/* ── Image ──────────────────────────────────────────────────── */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Availability badge */}
        <span className={`
          absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full
          ${available
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-600'}
        `}>
          {available ? 'Available' : 'Full'}
        </span>

        {/* Gender badge */}
        <span className={`
          absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full
          ${gender === 'male' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}
        `}>
          {gender === 'male' ? '👨 Male' : '👩 Female'}
        </span>

        {/* Price overlay */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow">
          <p className="text-sm font-bold text-indigo-700">৳{rent.toLocaleString()}<span className="text-[10px] text-gray-500 font-normal">/mo</span></p>
        </div>
      </div>

      {/* ── Card body ──────────────────────────────────────────────── */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-gray-800 text-sm mb-1 truncate">{title}</h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{location}</span>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-4 gap-1 mb-4">
          {[
            { label: 'Rooms', value: rooms, icon: '🛏️' },
            { label: 'Bath', value: bathrooms, icon: '🚿' },
            { label: 'Floor', value: floor, icon: '🏢' },
            { label: 'Seats', value: availableSeats, icon: '💺' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="text-center bg-gray-50 rounded-md py-1.5">
              <span className="text-xs">{icon}</span>
              <p className="text-[11px] font-bold text-gray-700">{value}</p>
              <p className="text-[9px] text-gray-400">{label}</p>
            </div>
          ))}
        </div>

        {/* View Details button */}
        <button
          onClick={() => onViewDetails(property)}
          disabled={!available}
          className={`
            w-full py-2 rounded-lg text-xs font-semibold transition-all duration-200
            ${available
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] shadow-sm hover:shadow'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
          `}
        >
          {available ? 'View Details' : 'Not Available'}
        </button>
      </div>
    </div>
  )
}

export default PropertyCard
