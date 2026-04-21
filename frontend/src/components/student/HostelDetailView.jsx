import { useState, useMemo } from 'react'

/**
 * HostelDetailView.jsx
 * ────────────────────
 * Combined view for a single hostel showing:
 *   1. Hostel header with info
 *   2. Floor selector (tab buttons)
 *   3. Room cards for the selected floor
 *   4. Bed (seat) availability within each room
 *
 * Props:
 *   hostel       - hostel object with nested floors/rooms/beds
 *   onBack       - go back to hostel list
 *   onRequestBed - (bed, room, hostel) => void — triggers seat request modal
 */

// Facility icon mapping for hostel-level
const facilityLabels = {
  wifi: { icon: '📶', label: 'WiFi' },
  water: { icon: '💧', label: 'Water' },
  electricity: { icon: '⚡', label: 'Electricity' },
  security: { icon: '🔒', label: 'Security' },
  meals: { icon: '🍽️', label: 'Meals' },
  laundry: { icon: '👕', label: 'Laundry' },
  cctv: { icon: '📹', label: 'CCTV' },
  generator: { icon: '🔋', label: 'Generator' },
  elevator: { icon: '🛗', label: 'Elevator' },
  shuttle: { icon: '🚌', label: 'Shuttle' },
  rooftop: { icon: '🏙️', label: 'Rooftop' },
  ac: { icon: '❄️', label: 'AC' },
}

// Room facility icons
const roomFacilityIcons = {
  'attached bathroom': '🚿',
  'shared bathroom': '🚿',
  'ceiling fan': '🌀',
  'ac': '❄️',
  'study desk': '📚',
  'balcony': '🌇',
  'wardrobe': '🗄️',
}

const HostelDetailView = ({ hostel, onBack, onRequestBed }) => {
  // Active floor index (default: first floor)
  const [activeFloor, setActiveFloor] = useState(0)
  // Track which rooms are expanded to show beds
  const [expandedRooms, setExpandedRooms] = useState({})

  // Currently active floor data
  const currentFloor = hostel.floors[activeFloor]

  // Compute hostel-wide stats
  const hostelStats = useMemo(() => {
    let totalRooms = 0, totalBeds = 0, availableBeds = 0
    ;(hostel.floors || []).forEach((floor) => {
      totalRooms += (floor.rooms || []).length
      ;(floor.rooms || []).forEach((room) => {
        totalBeds += (room.beds || []).length
        availableBeds += (room.beds || []).filter((b) => b.status === 'available').length
      })
    })
    return { totalRooms, totalBeds, availableBeds }
  }, [hostel])

  // Compute per-floor stats for floor tabs
  const floorStats = useMemo(() => {
    return (hostel.floors || []).map((floor) => {
      let beds = 0, available = 0
      ;(floor.rooms || []).forEach((room) => {
        beds += (room.beds || []).length
        available += (room.beds || []).filter((b) => b.status === 'available').length
      })
      return { rooms: (floor.rooms || []).length, beds, available }
    })
  }, [hostel])

  // Toggle room bed visibility
  const toggleRoom = (roomNumber) => {
    setExpandedRooms((prev) => ({
      ...prev,
      [roomNumber]: !prev[roomNumber],
    }))
  }

  return (
    <div className="animate-[fadeIn_0.2s_ease-out]">
      {/* ── Hostel Header ────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        {/* Cover image */}
        <div className="relative h-48 sm:h-64 overflow-hidden">
          <img
            src={hostel.image}
            alt={hostel.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Back button overlay */}
          <button
            onClick={onBack}
            className="absolute top-4 left-4 flex items-center gap-1.5 text-sm font-medium text-white
                       bg-white/20 backdrop-blur-md rounded-lg px-3 py-2 hover:bg-white/30 transition-all"
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>

          {/* Hostel name + location overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-end justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">
                  {hostel.name}
                </h2>
                <div className="flex items-center gap-1.5 text-white/80 text-sm mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {hostel.location}
                </div>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg shrink-0">
                <p className="text-lg font-bold text-violet-700">
                  ৳{hostel.rent.toLocaleString()}
                  <span className="text-[10px] text-gray-400 font-normal">/mo</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info section below image */}
        <div className="p-5">
          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed mb-4">{hostel.description}</p>

          {/* Stats strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {[
              { icon: '🏢', label: 'Floors', value: (hostel.floors || []).length },
              { icon: '🚪', label: 'Total Rooms', value: hostelStats.totalRooms },
              { icon: '🛏️', label: 'Total Beds', value: hostelStats.totalBeds },
              { icon: '✅', label: 'Available', value: hostelStats.availableBeds, highlight: true },
            ].map(({ icon, label, value, highlight }) => (
              <div key={label} className={`text-center rounded-xl py-3 border
                ${highlight ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-100'}`}>
                <span className="text-lg">{icon}</span>
                <p className={`text-lg font-bold mt-0.5 ${highlight ? 'text-emerald-600' : 'text-gray-700'}`}>
                  {value}
                </p>
                <p className="text-[10px] text-gray-400">{label}</p>
              </div>
            ))}
          </div>

          {/* Facilities */}
          <div className="flex flex-wrap gap-2">
            {(hostel.facilities || []).map((f) => {
              const info = facilityLabels[f] || { icon: '✅', label: f }
              return (
                <span key={f} className="flex items-center gap-1.5 bg-violet-50 border border-violet-100
                                        rounded-lg px-3 py-1.5 text-xs text-violet-700 font-medium">
                  <span>{info.icon}</span> {info.label}
                </span>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Floor Navigation ────────────────────────────────────── */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
          <span className="text-lg">🏢</span> Select Floor
        </h3>
        <div className="flex flex-wrap gap-2">
          {(hostel.floors || []).length === 0 && (
            <p className="text-sm text-gray-500 italic py-2">No floors available</p>
          )}
          {(hostel.floors || []).map((floor, idx) => {
            const isActive = activeFloor === idx
            const fs = floorStats[idx]
            return (
              <button
                key={floor.floorNumber}
                onClick={() => {
                  setActiveFloor(idx)
                  setExpandedRooms({}) // collapse all rooms when switching floors
                }}
                className={`
                  relative flex flex-col items-center min-w-[90px] px-4 py-3 rounded-xl border-2 text-sm
                  font-semibold transition-all duration-200
                  ${isActive
                    ? 'border-violet-500 bg-violet-50 text-violet-700 shadow-md shadow-violet-100'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-violet-300 hover:bg-violet-50/50'}
                `}
              >
                <span className="text-xs font-bold">Floor {floor.floorNumber}</span>
                <span className={`text-[10px] mt-0.5 ${isActive ? 'text-violet-500' : 'text-gray-400'}`}>
                  {fs.rooms} rooms · {fs.available} free
                </span>
                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-violet-500 rounded-full border-2 border-white" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Room List for Selected Floor ────────────────────────── */}
      {currentFloor && (
        <div className="mb-4">
          <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="text-lg">🚪</span>
            Floor {currentFloor.floorNumber} — {(currentFloor.rooms || []).length} Rooms
          </h3>

          <div className="space-y-4">
            {(currentFloor.rooms || []).map((room) => {
              const availableBeds = (room.beds || []).filter((b) => b.status === 'available').length
              const isExpanded = expandedRooms[room.roomNumber]

            return (
              <div
                key={room.roomNumber}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden
                           hover:shadow-md transition-all duration-300"
              >
                {/* Room header */}
                <div className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Left: room info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h4 className="font-bold text-gray-800">Room {room.roomNumber}</h4>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full
                          ${room.type === 'Single' ? 'bg-violet-100 text-violet-700' :
                            room.type === 'Double' ? 'bg-blue-100 text-blue-700' :
                            'bg-amber-100 text-amber-700'}`}>
                          {room.type}
                        </span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full
                          ${availableBeds > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                          {availableBeds}/{room.beds.length} beds free
                        </span>
                      </div>

                      {/* Room facilities */}
                      <div className="flex flex-wrap gap-1.5">
                        {(room.facilities || []).map((f) => (
                          <span key={f} className="text-[10px] bg-gray-50 text-gray-600 border border-gray-100
                                                   px-2 py-0.5 rounded-md font-medium">
                            {roomFacilityIcons[f] || '✅'} {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: View Beds button */}
                    <button
                      onClick={() => toggleRoom(room.roomNumber)}
                      className={`
                        flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold
                        transition-all duration-200 shrink-0
                        ${isExpanded
                          ? 'bg-violet-100 text-violet-700 border border-violet-200'
                          : 'bg-violet-600 text-white hover:bg-violet-700 shadow-sm hover:shadow'}
                      `}
                    >
                      {isExpanded ? 'Hide Beds' : 'View Beds'}
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* ── Bed Availability (expandable) ──────────────── */}
                {isExpanded && (
                  <div className="border-t border-gray-100 bg-gray-50/50 p-4 sm:p-5
                                  animate-[fadeIn_0.15s_ease-out]">
                    <p className="text-xs text-gray-500 mb-3 font-medium">
                      🛏️ Beds in Room {room.roomNumber}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {(room.beds || []).map((bed) => {
                        const isAvailable = bed.status === 'available'
                        return (
                          <button
                            key={bed.bedId}
                            onClick={() => isAvailable && onRequestBed(bed, room, hostel)}
                            disabled={!isAvailable}
                            className={`
                              relative group/bed flex flex-col items-center justify-center
                              w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 transition-all duration-200
                              ${isAvailable
                                ? 'border-emerald-300 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-100 hover:-translate-y-1 cursor-pointer'
                                : 'border-red-200 bg-red-50 cursor-not-allowed opacity-70'}
                            `}
                            title={isAvailable ? `Click to request ${bed.bedId}` : `${bed.bedId} is occupied`}
                          >
                            {/* Status circle */}
                            <div className={`
                              w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-1
                              transition-all duration-200
                              ${isAvailable
                                ? 'bg-emerald-500 text-white group-hover/bed:scale-110 group-hover/bed:shadow-md'
                                : 'bg-red-400 text-white'}
                            `}>
                              {isAvailable ? (
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              )}
                            </div>
                            {/* Bed ID label */}
                            <span className={`text-xs font-bold ${isAvailable ? 'text-emerald-700' : 'text-red-500'}`}>
                              {bed.bedId}
                            </span>
                            {/* Status text */}
                            <span className={`text-[9px] ${isAvailable ? 'text-emerald-500' : 'text-red-400'}`}>
                              {isAvailable ? 'Available' : 'Occupied'}
                            </span>
                          </button>
                        )
                      })}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-emerald-500" />
                        <span className="text-[10px] text-gray-500">Available — click to request</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-400" />
                        <span className="text-[10px] text-gray-500">Occupied</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
      )}
    </div>
  )
}

export default HostelDetailView
