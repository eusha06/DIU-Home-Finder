/**
 * AdminDashboardStats.jsx
 * ───────────────────────
 * Statistics cards for the admin dashboard overview.
 * Shows: Total Users, Total Properties, Pending Approvals, Blocked Users.
 *
 * Props:
 *   users       – array of user objects
 *   properties  – array of pending property objects
 */

const AdminDashboardStats = ({ users, properties }) => {
  // ── Computed stats ──────────────────────────────────────────────────────
  const totalUsers = users.length
  const totalProperties = properties.length
  const pendingApprovals = properties.filter((p) => p.status === 'pending').length
  const blockedUsers = users.filter((u) => u.status === 'blocked').length

  const stats = [
    {
      label: 'Total Users',
      value: totalUsers,
      color: 'bg-blue-500',
      lightBg: 'bg-blue-50',
      textColor: 'text-blue-600',
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 10-8 0 4 4 0 008 0zm6 4a4 4 0 10-8 0h8z" />
        </svg>
      ),
    },
    {
      label: 'Total Properties',
      value: totalProperties,
      color: 'bg-emerald-500',
      lightBg: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
        </svg>
      ),
    },
    {
      label: 'Pending Approvals',
      value: pendingApprovals,
      color: 'bg-amber-500',
      lightBg: 'bg-amber-50',
      textColor: 'text-amber-600',
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'Blocked Users',
      value: blockedUsers,
      color: 'bg-red-500',
      lightBg: 'bg-red-50',
      textColor: 'text-red-600',
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M18.364 5.636a9 9 0 11-12.728 0M12 9v4m0 4h.01" />
        </svg>
      ),
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between">
            {/* Icon */}
            <div className={`w-12 h-12 rounded-lg ${stat.lightBg} ${stat.textColor} flex items-center justify-center`}>
              {stat.icon}
            </div>
            {/* Value */}
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          </div>
          {/* Bottom accent bar */}
          <div className={`mt-4 h-1 rounded-full ${stat.color} opacity-60`} />
        </div>
      ))}
    </div>
  )
}

export default AdminDashboardStats
