const formatDate = (dateString) => {
  const parsed = new Date(dateString)
  if (Number.isNaN(parsed.getTime())) {
    return dateString
  }

  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const StatCard = ({ label, value, trend, trendTone }) => (
  <div className="relative rounded-[20px] border border-[#6677df] bg-[linear-gradient(135deg,#273487_0%,#3445a9_46%,#4157c3_100%)] shadow-[0_20px_30px_-24px_rgba(18,28,102,0.95)] p-2.5 sm:p-3 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_46%,rgba(147,165,255,0.28),transparent_54%)]" />
    <div className="relative z-10 rounded-[16px] border border-white/45 bg-[linear-gradient(138deg,rgba(255,255,255,0.23)_0%,rgba(255,255,255,0.08)_100%)] backdrop-blur-sm px-4 sm:px-5 py-3.5 sm:py-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-white/95 leading-tight">{label}</p>
        <span className="text-sm sm:text-base lg:text-lg bg-white/25 text-white/90 rounded-full px-2.5 sm:px-3 py-1 leading-none whitespace-nowrap">Soft-UI</span>
      </div>
      <div className="mt-4 sm:mt-5 flex items-end justify-between gap-3">
        <p className="text-3xl sm:text-4xl lg:text-5xl leading-none font-bold text-white tracking-[-0.02em]">{value}</p>
        <p
          className={`text-sm sm:text-base lg:text-lg rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border leading-none whitespace-nowrap ${
            trendTone === 'green'
              ? 'bg-[#c8f1d4]/95 text-[#285f3a] border-[#a8e6be]'
              : 'bg-[#ffe9bb]/95 text-[#986f1f] border-[#f7d78e]'
          }`}
        >
          {trend}
        </p>
      </div>
    </div>
  </div>
)

const statusStyles = {
  Pending: 'bg-[#f8e4b8] text-[#956a1f]',
  Approved: 'bg-[#cfeccc] text-[#2f6e38]',
  'In Progress': 'bg-[#cde4f8] text-[#2f6d9c]',
  Completed: 'bg-[#c6e8ca] text-[#296b35]',
}

const DashboardOverview = ({ properties = [], bookings = [], onStatusClick }) => {
  const totalProperties = properties.length
  const approvedBookings = bookings.filter((b) => b.status === 'approved')
  const totalRevenue = approvedBookings.reduce((sum, booking) => {
    const property = properties.find((item) => item.id === booking.propertyId)
    return sum + (property?.rent || 0)
  }, 0)

  const rows = bookings.slice(0, 5).map((booking, index) => {
    const statusLookup = {
      pending: 'Pending',
      approved: index === 1 ? 'Approved' : 'Completed',
      rejected: 'In Progress',
    }

    const actionLookup = {
      pending: `Application Submitted by ${booking.studentName}`,
      approved: `Lease Signed by ${booking.studentName}`,
      rejected: `Follow Up Required with ${booking.studentName}`,
    }

    return {
      id: booking.id,
      date: booking.date,
      property: booking.propertyTitle || booking.property,
      action: actionLookup[booking.status] || `Activity from ${booking.studentName}`,
      status: statusLookup[booking.status] || 'Pending',
      filterStatus: booking.status,
    }
  })

  const approvedBookingsCount = bookings.filter((b) => b.status === 'approved').length

  return (
    <div className="space-y-5 sm:space-y-7 pb-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <StatCard label="Active Listings" value={totalProperties} trend="↑ +2 this month" trendTone="green" />
        <StatCard
          label="Total Revenue (YTD)"
          value={`$${totalRevenue.toLocaleString('en-US')}`}
          trend={`↑ +${approvedBookingsCount * 5 || 15}% from last year`}
          trendTone="green"
        />
      </div>

      <section className="bg-[#f7f8ff] border border-[#b6a6e0] rounded-2xl p-4 sm:p-5 shadow-[0_20px_40px_-34px_rgba(86,61,171,0.65)]">
        <h3 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#141734] tracking-[-0.02em] mb-3 sm:mb-4">Recent Activity</h3>

        <div className="rounded-2xl border border-[#b9addd] bg-white/55 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm sm:text-base text-[#1a1f3e]">
              <thead className="bg-[linear-gradient(180deg,#f8f8ff_0%,#f0f1fb_100%)] text-[#202447]">
                <tr>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 font-bold">Date</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 font-bold">Property</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 font-bold">Action</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.length > 0 ? (
                  rows.map((row) => (
                    <tr key={row.id} className="border-t border-[#c8b9e8]">
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">{formatDate(row.date)}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">{row.property}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">{row.action}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => onStatusClick?.(row.filterStatus || 'pending')}
                          className={`inline-flex items-center rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5f6fe0] focus-visible:ring-offset-2 ${
                            statusStyles[row.status] || statusStyles.Pending
                          } ${onStatusClick ? 'cursor-pointer hover:brightness-95 active:scale-[0.98]' : 'cursor-default'}`}
                          title="Open Booking Request with this status filter"
                        >
                          {row.status}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-4 sm:px-6 py-6 sm:py-8 text-center text-[#555a7a]">
                      No recent activity. Booking requests and updates will appear here.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DashboardOverview
