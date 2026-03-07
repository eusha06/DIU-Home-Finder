import { useMemo } from 'react'

/**
 * HostelCard.jsx
 * ──────────────
 * Card component for hostel list view.
 * Shows hostel summary: name, location, floors, rooms, available seats, facilities.
 *
 * Props:
 *   hostel       - hostel object from hierarchical data
 *   onViewHostel - (hostel) => void
 */

// Facility icon mapping
const facilityIcons = {
  wifi: '📶', water: '💧', electricity: '⚡', security: '🔒',
  meals: '🍽️', laundry: '👕', cctv: '📹', generator: '🔋',
  elevator: '🛗', shuttle: '🚌', rooftop: '🏙️', ac: '❄️',
}

const HostelCard = ({ hostel, onViewHostel }) => {
  // Derive stats from nested data
  const stats = useMemo(() => {
    const totalFloors = hostel.floors.length
    let totalRooms = 0
    let totalBeds = 0
    let availableBeds = 0

    hostel.floors.forEach((floor) => {
      totalRooms += floor.rooms.length
      floor.rooms.forEach((room) => {
        totalBeds += room.beds.length
        availableBeds += room.beds.filter((b) => b.status === 'available').length
      })
    })

    return { totalFloors, totalRooms, totalBeds, availableBeds }
  }, [hostel])

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden
                    hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      {/* Image section */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={hostel.image}
          alt={hostel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gender badge */}
        <span className={`
          absolute top-3 right-3 text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-sm
          ${hostel.gender === 'male'
            ? 'bg-blue-500/90 text-white'
            : 'bg-pink-500/90 text-white'}
        `}>
          {hostel.gender === 'male' ? '👨 Male' : '👩 Female'}
        </span>

        {/* Availability indicator */}
        <div className={`
          absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-sm
          ${stats.availableBeds > 0
            ? 'bg-emerald-500/90 text-white'
            : 'bg-red-500/90 text-white'}
        `}>
          <span className={`w-2 h-2 rounded-full ${stats.availableBeds > 0 ? 'bg-green-200 animate-pulse' : 'bg-red-200'}`} />
          {stats.availableBeds > 0 ? `${stats.availableBeds} Seats Available` : 'Full'}
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl px-3.5 py-2 shadow-lg">
          <p className="text-sm font-bold text-violet-700">
            ৳{hostel.rent.toLocaleString()}
            <span className="text-[10px] text-gray-400 font-normal">/mo</span>
          </p>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        {/* Name */}
        <h3 className="font-bold text-gray-800 text-base mb-1 truncate group-hover:text-violet-700 transition-colors">
          {hostel.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-400" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{hostel.location}</span>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            { label: 'Floors', value: stats.totalFloors, icon: '🏢' },
            { label: 'Rooms', value: stats.totalRooms, icon: '🚪' },
            { label: 'Total', value: stats.totalBeds, icon: '🛏️' },
            { label: 'Free', value: stats.availableBeds, icon: '✅' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="text-center bg-gray-50 rounded-xl py-2.5 border border-gray-100">
              <span className="text-sm">{icon}</span>
              <p className="text-sm font-bold text-gray-700 mt-0.5">{value}</p>
              <p className="text-[10px] text-gray-400">{label}</p>
            </div>
          ))}
        </div>

        {/* Facilities row */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {hostel.facilities.slice(0, 5).map((f) => (
            <span key={f} className="text-[10px] bg-violet-50 text-violet-600 font-medium px-2 py-1 rounded-md">
              {facilityIcons[f] || '✅'} {f}
            </span>
          ))}
          {hostel.facilities.length > 5 && (
            <span className="text-[10px] bg-gray-100 text-gray-500 font-medium px-2 py-1 rounded-md">
              +{hostel.facilities.length - 5} more
            </span>
          )}
        </div>

        {/* View Hostel button */}
        <button
          onClick={() => onViewHostel(hostel)}
          disabled={stats.availableBeds === 0}
          className={`
            w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
            flex items-center justify-center gap-2
            ${stats.availableBeds > 0
              ? 'bg-violet-600 text-white hover:bg-violet-700 active:scale-[0.98] shadow-md hover:shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
          `}
        >
          {stats.availableBeds > 0 ? (
            <>
              View Hostel
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </>
          ) : (
            'No Seats Available'
          )}
        </button>
      </div>
    </div>
  )
}

export default HostelCard
