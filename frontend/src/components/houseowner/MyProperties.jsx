import { useState } from 'react'
import { propertiesAPI } from '../../api/index.js'

/**
 * MyProperties.jsx
 * ────────────────
 * Displays the owner's listed properties as cards with management actions.
 *
 * Props:
 *   properties     – array of property objects
 *   onUpdateProperty – callback(updatedProperty) to update a property
 *   onDeleteProperty – callback(propertyId) to remove a property
 */
const MyProperties = ({ properties, onUpdateProperty, onDeleteProperty }) => {
  const [editingRent, setEditingRent] = useState(null)
  const [editingSeats, setEditingSeats] = useState(null)
  const [newRent, setNewRent] = useState('')
  const [newSeats, setNewSeats] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  // ── Actions ───────────────────────────────────────────────────────────
  const handleEditRent = (property) => {
    setEditingRent(property.id)
    setNewRent(property.rent.toString())
    setEditingSeats(null)
  }

  const saveRent = async (property) => {
  if (!newRent || Number(newRent) <= 0) return
  try {
    await propertiesAPI.update(property.id, { rent: Number(newRent) })
    onUpdateProperty({ ...property, rent: Number(newRent) })
  } catch (err) {
    alert('Failed to update rent: ' + err.message)
  }
  setEditingRent(null)
  setNewRent('')
}
  const handleEditSeats = (property) => {
    setEditingSeats(property.id)
    setNewSeats(property.availableSeats.toString())
    setEditingRent(null)
  }

  const saveSeats = async (property) => {
  if (newSeats === '' || Number(newSeats) < 0) return
  try {
    await propertiesAPI.update(property.id, { available_seats: Number(newSeats) })
    onUpdateProperty({ ...property, availableSeats: Number(newSeats) })
  } catch (err) {
    alert('Failed to update seats: ' + err.message)
  }
  setEditingSeats(null)
  setNewSeats('')
}

  const toggleAvailability = async (property) => {
  try {
    await propertiesAPI.update(property.id, { is_available: !property.available })
    onUpdateProperty({ ...property, available: !property.available })
  } catch (err) {
    alert('Failed to update availability: ' + err.message)
  }
}

  const handleDelete = async (id) => {
  try {
    await propertiesAPI.delete(id)
    onDeleteProperty(id)
    setDeleteConfirm(null)
  } catch (err) {
    alert('Failed to delete property: ' + err.message)
    setDeleteConfirm(null)
  }
}
  // ── Facility label ────────────────────────────────────────────────────
  const facilityLabels = {
    wifi: '📶 WiFi',
    water: '💧 Water',
    electricity: '⚡ Electricity',
    security: '🔒 Security',
    lift: '🛗 Lift',
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-20">
        <span className="text-5xl mb-4 block">🏚️</span>
        <h3 className="text-lg font-semibold text-gray-600 mb-1">No properties listed yet</h3>
        <p className="text-sm text-gray-400">Add your first property to start receiving bookings.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-gray-800">
          My Properties <span className="text-sm font-normal text-gray-400">({properties.length})</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 group"
          >
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={property.images?.[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600'}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Availability badge */}
              <span
                className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full
                  ${property.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
              >
                {property.available ? 'Available' : 'Not Available'}
              </span>
              {/* Gender badge */}
              <span
                className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full
                  ${property.gender === 'male' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}
              >
                {property.gender === 'male' ? '👨 Male' : '👩 Female'}
              </span>
            </div>

            {/* Info */}
            <div className="p-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-1 truncate">{property.title}</h4>
              <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {property.location}
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-gray-50 rounded-lg px-2 py-1.5 text-center">
                  <p className="text-[10px] text-gray-400">Rooms</p>
                  <p className="text-xs font-bold text-gray-700">{property.rooms}</p>
                </div>
                <div className="bg-gray-50 rounded-lg px-2 py-1.5 text-center">
                  <p className="text-[10px] text-gray-400">Bath</p>
                  <p className="text-xs font-bold text-gray-700">{property.bathrooms}</p>
                </div>
                <div className="bg-gray-50 rounded-lg px-2 py-1.5 text-center">
                  <p className="text-[10px] text-gray-400">Floor</p>
                  <p className="text-xs font-bold text-gray-700">{property.floor}</p>
                </div>
              </div>

              {/* Rent (editable) */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">Rent:</span>
                {editingRent === property.id ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      value={newRent}
                      onChange={(e) => setNewRent(e.target.value)}
                      className="w-20 px-2 py-1 text-xs border border-blue-300 rounded-md outline-none focus:ring-1 focus:ring-blue-200"
                      autoFocus
                    />
                    <button onClick={() => saveRent(property)} className="text-xs text-green-600 hover:text-green-700 font-medium">✓</button>
                    <button onClick={() => setEditingRent(null)} className="text-xs text-gray-400 hover:text-gray-600">✕</button>
                  </div>
                ) : (
                  <span className="text-sm font-bold text-blue-700">৳{property.rent.toLocaleString()}/mo</span>
                )}
              </div>

              {/* Seats (editable) */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-500">Seats:</span>
                {editingSeats === property.id ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      value={newSeats}
                      onChange={(e) => setNewSeats(e.target.value)}
                      className="w-20 px-2 py-1 text-xs border border-blue-300 rounded-md outline-none focus:ring-1 focus:ring-blue-200"
                      autoFocus
                    />
                    <button onClick={() => saveSeats(property)} className="text-xs text-green-600 hover:text-green-700 font-medium">✓</button>
                    <button onClick={() => setEditingSeats(null)} className="text-xs text-gray-400 hover:text-gray-600">✕</button>
                  </div>
                ) : (
                  <span className="text-sm font-semibold text-gray-700">{property.availableSeats}</span>
                )}
              </div>

              {/* Facilities */}
              {property.facilities && property.facilities.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {property.facilities.map((f) => (
                    <span key={f} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {facilityLabels[f] || f}
                    </span>
                  ))}
                </div>
              )}

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleEditRent(property)}
                  className="px-3 py-2 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Edit Rent
                </button>
                <button
                  onClick={() => handleEditSeats(property)}
                  className="px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Update Seats
                </button>
                <button
                  onClick={() => toggleAvailability(property)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors
                    ${property.available
                      ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                      : 'text-green-600 bg-green-50 hover:bg-green-100'
                    }`}
                >
                  {property.available ? 'Mark Unavailable' : 'Mark Available'}
                </button>
                {deleteConfirm === property.id ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDelete(property.id)}
                      className="flex-1 px-2 py-2 text-xs font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="flex-1 px-2 py-2 text-xs font-medium text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(property.id)}
                    className="px-3 py-2 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyProperties
