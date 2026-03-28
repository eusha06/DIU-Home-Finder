/**
 * BookingsTable.jsx
 * ─────────────────
 * Table showing booking requests for the owner's properties.
 * Actions: Accept → Approved, Reject → Rejected.
 *
 * Props:
 *   bookings        – array of booking objects
 *   onUpdateBooking – callback(bookingId, newStatus) to update status
 */
const BookingsTable = ({ bookings, onUpdateBooking }) => {
  const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-20">
        <span className="text-5xl mb-4 block">📋</span>
        <h3 className="text-lg font-semibold text-gray-600 mb-1">No bookings yet</h3>
        <p className="text-sm text-gray-400">Booking requests from students will appear here.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-gray-800">
          Booking Requests <span className="text-sm font-normal text-gray-400">({bookings.length})</span>
        </h3>
        <div className="flex gap-2 text-xs">
          <span className="bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full font-medium">
            {bookings.filter((b) => b.status === 'pending').length} Pending
          </span>
          <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium hidden sm:inline-block">
            {bookings.filter((b) => b.status === 'approved').length} Approved
          </span>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Student</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Property</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                {/* Student */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">
                      {booking.studentName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">{booking.studentName}</p>
                      <p className="text-xs text-gray-400">{booking.studentEmail}</p>
                    </div>
                  </div>
                </td>
                {/* Property */}
                <td className="px-5 py-4">
                  <p className="text-sm text-gray-700">{booking.propertyTitle}</p>
                </td>
                {/* Date */}
                <td className="px-5 py-4">
                  <p className="text-sm text-gray-500">{booking.date}</p>
                </td>
                {/* Status */}
                <td className="px-5 py-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[booking.status]}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </td>
                {/* Actions */}
                <td className="px-5 py-4 text-right">
                  {booking.status === 'pending' ? (
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onUpdateBooking(booking.id, 'approved')}
                        className="px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => onUpdateBooking(booking.id, 'rejected')}
                        className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400 italic">Resolved</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">
                  {booking.studentName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">{booking.studentName}</p>
                  <p className="text-[11px] text-gray-400">{booking.studentEmail}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[booking.status]}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-3 bg-gray-50 rounded-lg px-3 py-2">
              <span>{booking.propertyTitle}</span>
              <span>{booking.date}</span>
            </div>

            {booking.status === 'pending' && (
              <div className="flex gap-2">
                <button
                  onClick={() => onUpdateBooking(booking.id, 'approved')}
                  className="flex-1 px-3 py-2 text-xs font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  Accept
                </button>
                <button
                  onClick={() => onUpdateBooking(booking.id, 'rejected')}
                  className="flex-1 px-3 py-2 text-xs font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookingsTable
