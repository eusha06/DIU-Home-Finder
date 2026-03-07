/**
 * SeatRequestModal.jsx
 * ────────────────────
 * Confirmation modal shown when a student clicks an available bed.
 * Displays bed details and confirms the seat request.
 *
 * Props:
 *   bed        - { bedId, status }
 *   room       - { roomNumber, type, facilities }
 *   hostel     - hostel object
 *   onClose    - close the modal
 *   onConfirm  - callback after confirmed
 */

const SeatRequestModal = ({ bed, room, hostel, onClose, onConfirm }) => {
  if (!bed || !room || !hostel) return null

  const handleConfirm = () => {
    console.log('🛏️ Seat Requested:', {
      bedId: bed.bedId,
      roomNumber: room.roomNumber,
      roomType: room.type,
      hostelName: hostel.name,
      hostelId: hostel.id,
      requestedAt: new Date().toISOString(),
    })
    onConfirm()
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center
                      animate-[fadeIn_0.15s_ease-out]">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
          <span className="text-3xl">🛏️</span>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-1">Request this Seat?</h3>
        <p className="text-sm text-gray-500 mb-5">
          You are about to request the following seat:
        </p>

        {/* Seat summary */}
        <div className="bg-gray-50 rounded-xl p-4 mb-5 text-left space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Hostel</span>
            <span className="text-sm font-semibold text-gray-800">{hostel.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Room</span>
            <span className="text-sm font-semibold text-gray-800">
              {room.roomNumber} ({room.type})
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Bed / Seat</span>
            <span className="text-sm font-bold text-emerald-600">{bed.bedId}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Monthly Rent</span>
            <span className="text-sm font-bold text-indigo-600">৳{hostel.rent.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Facilities</span>
            <span className="text-xs text-gray-600">{room.facilities.join(', ')}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium
                       text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-sm font-semibold text-white
                       hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-md"
          >
            Confirm Request
          </button>
        </div>

        <p className="text-[10px] text-gray-400 mt-3">
          The hostel authority will review your request and get back to you.
        </p>
      </div>
    </div>
  )
}

export default SeatRequestModal
