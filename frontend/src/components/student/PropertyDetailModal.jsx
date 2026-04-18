import { useState } from 'react'

/**
 * PropertyDetailModal.jsx
 * ───────────────────────
 * Full-screen modal showing all details of a selected property.
 * Includes image gallery, description, owner info, rules, facilities,
 * and a "Request Booking" button.
 *
 * Props:
 *   property        - the property object to display
 *   onClose         - close the modal
 *   onRequestBooking - (propertyId) => void
 */

// ── Facility icon mapping ────────────────────────────────────────────────
const facilityLabels = {
  wifi: { icon: '📶', label: 'WiFi' },
  water: { icon: '💧', label: 'Water Supply' },
  electricity: { icon: '⚡', label: 'Electricity' },
  security: { icon: '🔒', label: 'Security' },
  gas: { icon: '🔥', label: 'Gas' },
  parking: { icon: '🅿️', label: 'Parking' },
  ac: { icon: '❄️', label: 'Air Conditioning' },
  cleaning: { icon: '🧹', label: 'Cleaning' },
  meals: { icon: '🍽️', label: 'Meals' },
  laundry: { icon: '👕', label: 'Laundry' },
  generator: { icon: '🔋', label: 'Generator' },
  elevator: { icon: '🛗', label: 'Elevator' },
  cctv: { icon: '📹', label: 'CCTV' },
  shuttle: { icon: '🚌', label: 'Shuttle Service' },
  rooftop: { icon: '🏙️', label: 'Rooftop Access' },
  gym: { icon: '💪', label: 'Gym' },
}

const PropertyDetailModal = ({ property, onClose, onRequestBooking }) => {
  // ── Image gallery state ─────────────────────────────────────────────────
  const [activeImage, setActiveImage] = useState(0)

  if (!property) return null

  const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600'

  const {
    id, title, location, description, gender = 'any', rent, rooms, bathrooms,
    floor, availableSeats, available,
    owner = property.ownerName || 'Owner',
    contact = property.ownerPhone || 'N/A',
    rules = [],
    facilities = property.amenities || [],
  } = property

  // Build images array from various possible sources
  const images = Array.isArray(property.images) && property.images.length > 0
    ? property.images
    : property.image
      ? [property.image]
      : [DEFAULT_IMAGE]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* ── Backdrop ───────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* ── Modal card ─────────────────────────────────────────────── */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh]
                      overflow-y-auto animate-[fadeIn_0.2s_ease-out]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur
                     flex items-center justify-center text-gray-500 hover:text-gray-800
                     hover:bg-white shadow transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* ── Image gallery ──────────────────────────────────────── */}
        <div className="relative">
          <img
            src={images[activeImage]}
            alt={`${title} - ${activeImage + 1}`}
            className="w-full h-64 sm:h-80 object-cover"
          />
          {/* Thumbnails */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`
                  w-14 h-10 rounded-md overflow-hidden border-2 transition-all
                  ${idx === activeImage ? 'border-indigo-500 shadow-lg scale-105' : 'border-white/60 opacity-70 hover:opacity-100'}
                `}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* ── Content ────────────────────────────────────────────── */}
        <div className="p-6">
          {/* Title + badges */}
          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
            <div>
              <h2 className="text-xl font-bold text-gray-800">{title}</h2>
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-indigo-600">৳{rent.toLocaleString()}</p>
              <p className="text-[11px] text-gray-400">per month</p>
            </div>
          </div>

          {/* Quick stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 my-4">
            {[
              { icon: '🛏️', label: 'Rooms', value: rooms },
              { icon: '🚿', label: 'Bathrooms', value: bathrooms },
              { icon: '🏢', label: 'Floor', value: floor },
              { icon: '💺', label: 'Available Seats', value: availableSeats },
              { icon: gender === 'male' ? '👨' : '👩', label: 'Gender', value: gender.charAt(0).toUpperCase() + gender.slice(1) },
            ].map(({ icon, label, value }) => (
              <div key={label} className="bg-gray-50 rounded-lg p-2.5 text-center">
                <span className="text-lg">{icon}</span>
                <p className="text-xs font-bold text-gray-700 mt-0.5">{value}</p>
                <p className="text-[10px] text-gray-400">{label}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-1.5">Description</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
          </div>

          {/* Owner & Contact */}
          <div className="bg-indigo-50 rounded-xl p-4 mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
                {owner.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{owner}</p>
                <p className="text-xs text-gray-500">{property.type === 'hostel' ? 'Hostel Authority' : 'Property Owner'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-indigo-600 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {contact}
            </div>
          </div>

          {/* Facilities */}
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Facilities</h3>
            <div className="flex flex-wrap gap-2">
              {facilities.map((f) => {
                const info = facilityLabels[f] || { icon: '✅', label: f }
                return (
                  <span key={f} className="flex items-center gap-1.5 bg-gray-50 border border-gray-200
                                          rounded-lg px-3 py-1.5 text-xs text-gray-700">
                    <span>{info.icon}</span> {info.label}
                  </span>
                )
              })}
            </div>
          </div>

          {/* Rules */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Property Rules</h3>
            <ul className="space-y-1.5">
              {rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-indigo-500 mt-0.5 shrink-0">•</span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          {/* Request Booking button */}
          <button
            onClick={() => onRequestBooking(id)}
            disabled={!available}
            className={`
              w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200
              ${available
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] shadow-md hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
            `}
          >
            {available ? '🏠 Request Booking' : 'Not Available'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetailModal
