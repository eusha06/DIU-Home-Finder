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
      <div className="rounded-[24px] border border-[#c8d3ff] bg-[linear-gradient(160deg,#f8f9ff_0%,#eef2ff_100%)] shadow-[0_20px_40px_-34px_rgba(37,55,145,0.8)] text-center py-16 px-6">
        <span className="text-5xl mb-4 block">📋</span>
        <h3 className="text-xl font-semibold text-[#2b3365] mb-1">No bookings yet</h3>
        <p className="text-sm text-[#6d77ab]">Booking requests from students will appear here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-[#cfdaff] bg-white/85 px-4 sm:px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-[0_14px_30px_-28px_rgba(45,64,149,0.65)]">
        <h3 className="text-lg sm:text-xl font-semibold text-[#27305f]">
          Booking Requests <span className="text-sm font-normal text-gray-400">({bookings.length})</span>
        </h3>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-[#fff1d9] text-[#996d2a] px-2.5 py-1 rounded-full font-semibold">
            {bookings.filter((b) => b.status === 'pending').length} Pending
          </span>
          <span className="bg-[#dff7e6] text-[#2f7b49] px-2.5 py-1 rounded-full font-semibold hidden sm:inline-block">
            {bookings.filter((b) => b.status === 'approved').length} Approved
          </span>
          <span className="bg-[#ffe6e8] text-[#b44f59] px-2.5 py-1 rounded-full font-semibold hidden sm:inline-block">
            {bookings.filter((b) => b.status === 'rejected').length} Rejected
          </span>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white/90 rounded-2xl border border-[#ccd8ff] shadow-[0_18px_34px_-26px_rgba(34,52,143,0.7)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[linear-gradient(180deg,#f7f9ff_0%,#eef2ff_100%)] border-b border-[#d8e0ff]">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#6672a9] uppercase tracking-wide">Student</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#6672a9] uppercase tracking-wide">Property</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#6672a9] uppercase tracking-wide">Date</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#6672a9] uppercase tracking-wide">Status</th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-[#6672a9] uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e3e9ff]">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-[#f6f8ff] transition-colors">
                {/* Student */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#e7edff] flex items-center justify-center text-xs font-bold text-[#3550c9]">
                      {booking.studentName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#2e3768]">{booking.studentName}</p>
                      <p className="text-xs text-[#7681b4]">{booking.studentEmail}</p>
                    </div>
                  </div>
                </td>
                {/* Property */}
                <td className="px-5 py-4">
                  <p className="text-sm text-[#34406f]">{booking.propertyTitle}</p>
                </td>
                {/* Date */}
                <td className="px-5 py-4">
                  <p className="text-sm text-[#6f79ad]">{booking.date}</p>
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
                        className="px-3 py-1.5 text-xs font-semibold text-[#2f7b49] bg-[#dff7e6] border border-[#a9e4bc] rounded-xl hover:bg-[#d1f2db] transition-colors"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => onUpdateBooking(booking.id, 'rejected')}
                        className="px-3 py-1.5 text-xs font-semibold text-[#b44f59] bg-[#ffe6e8] border border-[#f3bfc5] rounded-xl hover:bg-[#ffd9de] transition-colors"
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
          <div key={booking.id} className="bg-white/90 rounded-2xl border border-[#ccd8ff] shadow-[0_14px_28px_-24px_rgba(34,52,143,0.65)] p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#e7edff] flex items-center justify-center text-xs font-bold text-[#3550c9]">
                  {booking.studentName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#2e3768]">{booking.studentName}</p>
                  <p className="text-[11px] text-[#7681b4]">{booking.studentEmail}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[booking.status]}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-[#6d79ac] mb-3 bg-[#f3f6ff] border border-[#d9e1ff] rounded-xl px-3 py-2">
              <span>{booking.propertyTitle}</span>
              <span>{booking.date}</span>
            </div>

            {booking.status === 'pending' && (
              <div className="flex gap-2">
                <button
                  onClick={() => onUpdateBooking(booking.id, 'approved')}
                  className="flex-1 px-3 py-2 text-xs font-semibold text-[#2f7b49] bg-[#dff7e6] border border-[#a9e4bc] rounded-xl hover:bg-[#d1f2db] transition-colors"
                >
                  Accept
                </button>
                <button
                  onClick={() => onUpdateBooking(booking.id, 'rejected')}
                  className="flex-1 px-3 py-2 text-xs font-semibold text-[#b44f59] bg-[#ffe6e8] border border-[#f3bfc5] rounded-xl hover:bg-[#ffd9de] transition-colors"
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
