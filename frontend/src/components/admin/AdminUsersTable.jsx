import { useState } from 'react'

/**
 * AdminUsersTable.jsx
 * ───────────────────
 * Users management table for the admin panel.
 * Columns: Name, Email, Role, Status, Actions (Block / Unblock / Delete).
 * All actions update local UI state only — no backend.
 *
 * Props:
 *   users     – array of user objects
 *   setUsers  – state setter passed from parent
 */
const AdminUsersTable = ({ users, setUsers }) => {
  // ── Search / filter state ──────────────────────────────────────────────
  const [search, setSearch] = useState('')

  // Filtered user list
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  )

  // ── Action handlers ────────────────────────────────────────────────────

  /** Toggle user status between active / blocked */
  const handleToggleBlock = (userId) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === 'active' ? 'blocked' : 'active' }
          : u
      )
    )
  }

  /** Delete a user from the list */
  const handleDelete = (userId) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId))
  }

  // ── Status badge helper ────────────────────────────────────────────────
  const StatusBadge = ({ status }) => {
    const isActive = status === 'active'
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium
          ${isActive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`} />
        {isActive ? 'Active' : 'Blocked'}
      </span>
    )
  }

  // ── Role badge helper ──────────────────────────────────────────────────
  const RoleBadge = ({ role }) => {
    const colors =
      role === 'owner'
        ? 'bg-purple-50 text-purple-700'
        : role === 'admin'
        ? 'bg-indigo-50 text-indigo-700'
        : 'bg-sky-50 text-sky-700'
    return (
      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${colors}`}>
        {role}
      </span>
    )
  }

  return (
    <div>
      {/* Search bar */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search users by name, email, or role…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
        />
      </div>

      {/* Table wrapper */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Head */}
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Name</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Email</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Role</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Status</th>
                <th className="text-center px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-400">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/60 transition-colors duration-150">
                    {/* Name */}
                    <td className="px-5 py-3.5 font-medium text-gray-800 whitespace-nowrap">{user.name}</td>
                    {/* Email */}
                    <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">{user.email}</td>
                    {/* Role */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <RoleBadge role={user.role} />
                    </td>
                    {/* Status */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <StatusBadge status={user.status} />
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        {/* Block / Unblock toggle */}
                        <button
                          onClick={() => handleToggleBlock(user.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200
                            ${user.status === 'active'
                              ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                              : 'bg-green-50 text-green-700 hover:bg-green-100'
                            }`}
                        >
                          {user.status === 'active' ? 'Block' : 'Unblock'}
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer summary */}
      <p className="mt-3 text-xs text-gray-400">
        Showing {filteredUsers.length} of {users.length} users
      </p>
    </div>
  )
}

export default AdminUsersTable
