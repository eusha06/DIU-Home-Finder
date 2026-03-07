/**
 * DashboardOverview.jsx
 * ─────────────────────
 * Shows summary statistics and quick glance info for the owner dashboard.
 *
 * Props:
 *   properties – array of owner property objects
 *   bookings   – array of booking objects
 */

const StatCard = ({ label, value, color }) => (
  <div className="bg-white rounded-2xl shadow p-5 flex flex-col gap-1">
    <span className="text-sm text-gray-500">{label}</span>
    <span className={`text-3xl font-bold ${color}`}>{value}</span>
  </div>
)

const DashboardOverview = ({ properties = [], bookings = [] }) => {
  const totalProperties = properties.length
  const availableProperties = properties.filter((p) => p.available).length
  const totalBookings = bookings.length
  const pendingBookings = bookings.filter((b) => b.status === 'pending').length
  const approvedBookings = bookings.filter((b) => b.status === 'approved').length
  const rejectedBookings = bookings.filter((b) => b.status === 'rejected').length

  return (
    <div className="space-y-8">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Properties" value={totalProperties} color="text-blue-700" />
        <StatCard label="Available" value={availableProperties} color="text-green-600" />
        <StatCard label="Total Bookings" value={totalBookings} color="text-blue-600" />
        <StatCard label="Pending Bookings" value={pendingBookings} color="text-yellow-600" />
      </div>

      {/* Recent bookings */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Recent Bookings</h3>
        </div>

        {bookings.length === 0 ? (
          <p className="p-5 text-gray-500 text-sm">No bookings yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-5 py-3">Student</th>
                  <th className="px-5 py-3">Property</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.slice(0, 5).map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-3 whitespace-nowrap">{b.studentName}</td>
                    <td className="px-5 py-3 whitespace-nowrap">{b.propertyTitle}</td>
                    <td className="px-5 py-3 whitespace-nowrap">{b.date}</td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          b.status === 'approved'
                            ? 'bg-green-100 text-green-700'
                            : b.status === 'rejected'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Booking summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">{pendingBookings}</p>
          <p className="text-sm text-yellow-700">Pending</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{approvedBookings}</p>
          <p className="text-sm text-green-700">Approved</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{rejectedBookings}</p>
          <p className="text-sm text-red-700">Rejected</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardOverview
