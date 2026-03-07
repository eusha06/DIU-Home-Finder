/**
 * BookingConfirmModal.jsx
 * ───────────────────────
 * Small confirmation dialog shown when a student clicks "Request Booking".
 * On confirm → console.log with booking details.
 *
 * Props:
 *   property  - property object for the booking
 *   student   - logged-in student object (name, email, gender)
 *   onClose   - close the dialog
 *   onConfirm - callback after confirmed
 */

const BookingConfirmModal = ({ property, student, onClose, onConfirm }) => {
  if (!property) return null

  const handleConfirm = () => {
    console.log('📬 Booking Requested', {
      propertyId: property.id,
      propertyTitle: property.title,
      rent: property.rent,
      owner: property.owner,
      studentName: student.name,
      studentEmail: student.email,
      requestedAt: new Date().toISOString(),
    })
    onConfirm()
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center
                      animate-[fadeIn_0.15s_ease-out]">
        {/* Icon */}
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-violet-100 flex items-center justify-center
                       text-3xl">
          🏠
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-1">Confirm Booking Request</h3>
        <p className="text-sm text-gray-500 mb-4">
          You're about to request a booking for:
        </p>

        {/* Property summary */}
        <div className="bg-gray-50 rounded-xl p-3 mb-5 text-left">
          <p className="text-sm font-semibold text-gray-800">{property.title}</p>
          <p className="text-xs text-gray-500 mt-0.5">{property.location}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">Monthly Rent</span>
            <span className="text-sm font-bold text-violet-600">৳{property.rent.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-500">Owner</span>
            <span className="text-xs font-medium text-gray-700">{property.owner}</span>
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
            className="flex-1 py-2.5 rounded-xl bg-violet-600 text-sm font-semibold text-white
                       hover:bg-violet-700 active:scale-[0.98] transition-all shadow-md"
          >
            Confirm
          </button>
        </div>

        <p className="text-[10px] text-gray-400 mt-3">
          The owner will be notified and will contact you shortly.
        </p>
      </div>
    </div>
  )
}

export default BookingConfirmModal
