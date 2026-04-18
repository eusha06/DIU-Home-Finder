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
 *   onAddPropertyClick – callback() to navigate to add property form
 */
const MyProperties = ({ properties, onUpdateProperty, onDeleteProperty, onAddPropertyClick }) => {
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

  const availableCount = properties.filter((property) => property.available).length
  const unavailableCount = properties.length - availableCount

  if (properties.length === 0) {
    return (
      <div className="rounded-[24px] border border-[#c8d3ff] bg-[linear-gradient(160deg,#f8f9ff_0%,#eef2ff_100%)] shadow-[0_20px_40px_-34px_rgba(37,55,145,0.8)] text-center py-16 px-6">
        <span className="text-5xl mb-4 block">🏚️</span>
        <h3 className="text-xl font-semibold text-[#2b3365] mb-1">No properties listed yet</h3>
        <p className="text-sm text-[#6d77ab] mb-5 max-w-sm mx-auto">Add your first property to start receiving bookings.</p>
        <button
          type="button"
          onClick={onAddPropertyClick}
          className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white rounded-xl bg-[linear-gradient(120deg,#3f56d0_0%,#2f45bf_55%,#2639a5_100%)] hover:brightness-110 transition-all shadow-[0_16px_30px_-20px_rgba(47,69,191,0.85)]"
        >
          <span>+</span>
          Add Property
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-[#cfdaff] bg-white/85 px-4 sm:px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-[0_14px_30px_-28px_rgba(45,64,149,0.65)]">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-[#27305f]">
            My Properties <span className="text-sm font-normal text-[#7480b3]">({properties.length})</span>
          </h3>
          <div className="flex items-center gap-2 mt-2 text-xs">
            <span className="bg-[#dbf5e2] text-[#2a6d40] px-2.5 py-1 rounded-full font-semibold">{availableCount} Available</span>
            <span className="bg-[#ffe2e2] text-[#99565f] px-2.5 py-1 rounded-full font-semibold">{unavailableCount} Not Available</span>
          </div>
        </div>
        <button
          type="button"
          onClick={onAddPropertyClick}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl bg-[linear-gradient(120deg,#3f56d0_0%,#2f45bf_55%,#2639a5_100%)] hover:brightness-110 transition-all shadow-[0_16px_30px_-20px_rgba(47,69,191,0.85)]"
        >
          <span>+</span>
          Add Property
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white/90 rounded-2xl border border-[#ccd8ff] shadow-[0_18px_34px_-26px_rgba(34,52,143,0.7)] overflow-hidden hover:shadow-[0_24px_44px_-28px_rgba(34,52,143,0.78)] transition-shadow duration-200 group"
          >
            {/* Image */}
            <div className="relative h-44 sm:h-48 overflow-hidden">
              <img
                src={property.images?.[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600'}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600'; }}
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
                  ${property.gender === 'male'
                    ? 'bg-blue-100 text-blue-700'
                    : property.gender === 'female'
                      ? 'bg-pink-100 text-pink-700'
                      : 'bg-violet-100 text-violet-700'
                  }`}
              >
                {property.gender === 'male'
                  ? '👨 Male'
                  : property.gender === 'female'
                    ? '👩 Female'
                    : '🌐 Any'
                }
              </span>
            </div>

            {/* Info */}
            <div className="p-4 sm:p-5">
              <h4 className="text-base font-semibold text-[#242d59] mb-1 truncate">{property.title}</h4>
              <p className="text-xs text-[#7a84b5] mb-3 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {property.location}
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-[#f4f7ff] rounded-xl border border-[#d8e0ff] px-2 py-1.5 text-center">
                  <p className="text-[10px] text-[#7b86b8]">Rooms</p>
                  <p className="text-xs font-bold text-[#2d3568]">{property.rooms}</p>
                </div>
                <div className="bg-[#f4f7ff] rounded-xl border border-[#d8e0ff] px-2 py-1.5 text-center">
                  <p className="text-[10px] text-[#7b86b8]">Bath</p>
                  <p className="text-xs font-bold text-[#2d3568]">{property.bathrooms}</p>
                </div>
                <div className="bg-[#f4f7ff] rounded-xl border border-[#d8e0ff] px-2 py-1.5 text-center">
                  <p className="text-[10px] text-[#7b86b8]">Floor</p>
                  <p className="text-xs font-bold text-[#2d3568]">{property.floor}</p>
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
                  <span className="text-sm font-bold text-[#3650c7]">৳{property.rent.toLocaleString()}/mo</span>
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
                  <span className="text-sm font-semibold text-[#33406d]">{property.availableSeats}</span>
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
                  className="px-3 py-2 text-xs font-semibold text-[#3249c1] bg-[#e8edff] rounded-xl border border-[#c3d0ff] hover:bg-[#dde6ff] transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleEditSeats(property)}
                  className="px-3 py-2 text-xs font-semibold text-[#3249c1] bg-[#e8edff] rounded-xl border border-[#c3d0ff] hover:bg-[#dde6ff] transition-colors"
                >
                  Edit Seats
                </button>
                <button
                  onClick={() => toggleAvailability(property)}
                  className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-colors
                    ${property.available
                      ? 'text-[#996d2a] bg-[#fff1d9] border-[#f7da9d] hover:bg-[#ffe9c3]'
                      : 'text-[#2f7b49] bg-[#dff7e6] border-[#a9e4bc] hover:bg-[#d1f2db]'
                    }`}
                >
                  {property.available ? 'Mark Unavailable' : 'Mark Available'}
                </button>
                {deleteConfirm === property.id ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDelete(property.id)}
                      className="flex-1 px-2 py-2 text-xs font-semibold text-white bg-[#da4c59] rounded-xl hover:bg-[#cb3f4d] transition-colors"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="flex-1 px-2 py-2 text-xs font-semibold text-[#5e6793] bg-[#edf1ff] rounded-xl hover:bg-[#e1e8ff] transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(property.id)}
                    className="px-3 py-2 text-xs font-semibold text-[#b94853] bg-[#ffe9ec] rounded-xl border border-[#f9c9cf] hover:bg-[#ffe0e5] transition-colors"
                  >
                    Remove
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
