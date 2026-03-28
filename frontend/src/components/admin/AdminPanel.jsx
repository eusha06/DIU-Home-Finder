import { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminTopbar from './AdminTopbar'
import AdminDashboardStats from './AdminDashboardStats'
import AdminUsersTable from './AdminUsersTable'
import AdminPropertyApprovals from './AdminPropertyApprovals'
import AdminReports from './AdminReports'
import Unauthorized from './Unauthorized'
import {
  adminUsers as initialUsers,
  adminPendingProperties as initialProperties,
  adminReports as initialReports,
} from './data/dummyAdminData'

/**
 * AdminPanel.jsx
 * ──────────────
 * Hidden Admin Panel Dashboard — accessible only via "/admin-panel" route
 * and ONLY when the user's role is "admin".
 *
 * Features:
 *   ✔ Access control (frontend simulation) — shows 403 if role !== admin
 *   ✔ Dark sidebar + light content area layout
 *   ✔ Dashboard stats cards
 *   ✔ Users management table (block / unblock / delete)
 *   ✔ Property approvals (approve / reject)
 *   ✔ Reports section (resolve)
 *   ✔ Responsive design with mobile sidebar
 *   ✔ No admin link exposed in public UI
 *
 * Props:
 *   admin    – user object { name, role } (simulated)
 *   onLogout – callback to return to auth / main app
 */

// ── Page title map ───────────────────────────────────────────────────────────
const pageTitles = {
  dashboard: 'Dashboard',
  users: 'Users Management',
  approvals: 'Property Approvals',
  reports: 'Reports',
}

const AdminPanel = ({ admin, onLogout }) => {
  // ── Access control ─────────────────────────────────────────────────────
  // If the user's role is not "admin", render the 403 page immediately.
  if (!admin || admin.role !== 'admin') {
    return <Unauthorized onGoBack={onLogout} />
  }

  // ── Navigation state ───────────────────────────────────────────────────
  const [activePage, setActivePage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // ── Data state (all dummy, no backend) ─────────────────────────────────
  const [users, setUsers] = useState(initialUsers)
  const [properties, setProperties] = useState(initialProperties)
  const [reports, setReports] = useState(initialReports)

  // ── Render active section ──────────────────────────────────────────────
  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <AdminDashboardStats users={users} properties={properties} />
      case 'users':
        return <AdminUsersTable users={users} setUsers={setUsers} />
      case 'approvals':
        return (
          <AdminPropertyApprovals
            properties={properties}
            setProperties={setProperties}
          />
        )
      case 'reports':
        return <AdminReports reports={reports} setReports={setReports} />
      default:
        return <AdminDashboardStats users={users} properties={properties} />
    }
  }

  // ── Layout: dark sidebar + light content ───────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar (dark-themed) */}
      <AdminSidebar
        activePage={activePage}
        onNavigate={setActivePage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content area (light) */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <AdminTopbar
          admin={admin}
          pageTitle={pageTitles[activePage] || 'Dashboard'}
          onToggleSidebar={() => setSidebarOpen(true)}
          onLogout={onLogout}
        />

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto animate-[fadeIn_0.3s_ease-out]">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminPanel
