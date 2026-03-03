import { useState, useEffect } from 'react'
import {
  managerHalls as initialHalls,
  managerBookings as initialBookings,
} from './data/dummyHostelManagerData'

/**
 * HostelManagerDashboard.jsx
 * ──────────────────────────
 * Complete Hostel Manager Dashboard — accessible only via "#/hostel-manager"
 * and ONLY when user.role === "hostel_manager".
 *
 * All sub-components are defined inside this single file:
 *   ✔ 403 Unauthorized page
 *   ✔ Dark sidebar (Dashboard, Halls, Bookings)
 *   ✔ Top navbar with page title + profile avatar
 *   ✔ Dashboard Overview — stats cards
 *   ✔ Halls Management — grid cards with seat update, toggle, edit
 *   ✔ Bookings Management — table with approve / reject
 *   ✔ Responsive, mobile-friendly sidebar collapse
 *   ✔ All state managed with React hooks (no backend)
 *
 * Props:
 *   user     – { name, role } (simulated)
 *   onLogout – callback to return to auth / main app
 */

// ═══════════════════════════════════════════════════════════════════════════════
// ■  INLINE SVG ICON COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function DashboardIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10-2a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z" />
    </svg>
  )
}

function HallsIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  )
}

function BookingsIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  )
}

function MenuIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function CloseIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function LockIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  )
}

function ArrowLeftIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ■  FACILITY ICON MAP — small badge icons for hall cards
// ═══════════════════════════════════════════════════════════════════════════════

const facilityLabels = {
  wifi: '📶 WiFi',
  security: '🔒 Security',
  water: '💧 Water',
  electricity: '⚡ Electricity',
  generator: '🔋 Generator',
  lift: '🛗 Lift',
  canteen: '🍽️ Canteen',
  laundry: '👕 Laundry',
  gym: '💪 Gym',
}

// ═══════════════════════════════════════════════════════════════════════════════
// ■  403 UNAUTHORIZED COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Shown when user.role !== "hostel_manager".
 */
const Unauthorized = ({ onGoBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
          <LockIcon className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-6xl font-extrabold text-gray-800 mb-2">403</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Unauthorized Access</h2>
        <p className="text-sm text-gray-400 mb-8 leading-relaxed">
          You do not have permission to access this page.<br />
          Only Hostel Managers can view this dashboard.
        </p>
        <button
          onClick={onGoBack}
          className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors duration-200 shadow-sm"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Go Back
        </button>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ■  SIDEBAR COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
  { key: 'halls', label: 'Halls', icon: HallsIcon },
  { key: 'bookings', label: 'Bookings', icon: BookingsIcon },
]

/**
 * Dark-themed sidebar with responsive mobile overlay.
 */
const ManagerSidebar = ({ activePage, onNavigate, isOpen, onClose }) => {
  const handleNav = (key) => {
    onNavigate(key)
    onClose()
  }

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-gray-300 z-50 flex flex-col transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Brand */}
        <div className="px-6 py-5 border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight leading-tight">Hostel Manager</h1>
              <p className="text-[10px] text-gray-500">Student Home Finder</p>
            </div>
          </div>
        </div>

        {/* Close button (mobile only) */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-300 hover:bg-gray-800 transition-colors"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        {/* Navigation items */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map(({ key, label, icon: Icon }) => {
            const isActive = activePage === key
            return (
              <button
                key={key}
                onClick={() => handleNav(key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive
                    ? 'bg-teal-600/20 text-teal-400 shadow-sm'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                  }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {label}
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-gray-700/50">
          <p className="text-[10px] text-gray-600 text-center">© 2026 Student Home Finder</p>
        </div>
      </aside>
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ■  TOP NAVBAR COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Top bar with hamburger, page title, user avatar, and logout.
 */
const ManagerTopbar = ({ user, pageTitle, onToggleSidebar, onLogout }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: hamburger + page title */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            <h2 className="text-lg font-semibold text-gray-800">{pageTitle}</h2>
          </div>

          {/* Right: user info + logout */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center text-sm font-bold text-white shadow-sm">
                {user.name ? user.name.charAt(0).toUpperCase() : 'M'}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-700 leading-tight">{user.name}</p>
                <p className="text-[11px] text-teal-600 leading-tight font-medium uppercase tracking-wide">Hostel Manager</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="ml-2 text-xs text-gray-400 hover:text-red-500 transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ■  DASHBOARD OVERVIEW — STATS CARDS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Shows computed statistics from halls and bookings data.
 * Cards: Total Halls, Total Seats, Available Seats, Pending Requests, Approved Bookings
 */
const DashboardStats = ({ halls, bookings }) => {
  // ── Computed statistics from current state ───────────────────────────────
  const totalHalls = halls.length
  const totalSeats = halls.reduce((sum, h) => sum + h.totalSeats, 0)
  const availableSeats = halls.reduce((sum, h) => sum + h.availableSeats, 0)
  const pendingRequests = bookings.filter((b) => b.status === 'pending').length
  const approvedBookings = bookings.filter((b) => b.status === 'approved').length

  const stats = [
    {
      label: 'Total Halls',
      value: totalHalls,
      color: 'bg-blue-500',
      lightBg: 'bg-blue-50',
      textColor: 'text-blue-600',
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      label: 'Total Seats',
      value: totalSeats,
      color: 'bg-emerald-500',
      lightBg: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 10-8 0 4 4 0 008 0zm6 4a4 4 0 10-8 0h8z" />
        </svg>
      ),
    },
    {
      label: 'Available Seats',
      value: availableSeats,
      color: 'bg-teal-500',
      lightBg: 'bg-teal-50',
      textColor: 'text-teal-600',
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'Pending Requests',
      value: pendingRequests,
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
      label: 'Approved Bookings',
      value: approvedBookings,
      color: 'bg-indigo-500',
      lightBg: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
  ]

  return (
    <div>
      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-lg ${stat.lightBg} ${stat.textColor} flex items-center justify-center`}>
                {stat.icon}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
              </div>
            </div>
            <div className={`mt-4 h-1 rounded-full ${stat.color} opacity-60`} />
          </div>
        ))}
      </div>

      {/* Quick summary section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Open vs Closed halls */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Hall Availability</h3>
          <div className="space-y-3">
            {halls.map((hall) => (
              <div key={hall.id} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{hall.name}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  hall.isOpen
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                }`}>
                  {hall.isOpen ? 'Open' : 'Closed'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent bookings */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Recent Booking Requests</h3>
          <div className="space-y-3">
            {bookings.slice(0, 5).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-700 font-medium">{booking.studentName}</p>
                  <p className="text-xs text-gray-400">Room {booking.roomNumber} · {booking.date}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  booking.status === 'pending'
                    ? 'bg-amber-50 text-amber-700'
                    : booking.status === 'approved'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                }`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ■  HALLS MANAGEMENT — GRID CARDS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Displays hall cards with Update Seat Count, Toggle Availability, Edit Hall Info.
 */
const HallsManagement = ({ halls, setHalls }) => {
  // ── Modal state for editing seat count ───────────────────────────────────
  const [editingSeatId, setEditingSeatId] = useState(null)
  const [seatInput, setSeatInput] = useState('')

  // ── Modal state for editing hall info ────────────────────────────────────
  const [editingHallId, setEditingHallId] = useState(null)
  const [editForm, setEditForm] = useState({ name: '', wardenName: '', gender: '' })

  // ── Update seat count handler ────────────────────────────────────────────
  const openSeatEditor = (hall) => {
    setEditingSeatId(hall.id)
    setSeatInput(String(hall.availableSeats))
  }

  const saveSeatCount = () => {
    const newCount = parseInt(seatInput, 10)
    if (isNaN(newCount) || newCount < 0) return
    setHalls((prev) =>
      prev.map((h) =>
        h.id === editingSeatId
          ? { ...h, availableSeats: Math.min(newCount, h.totalSeats) }
          : h
      )
    )
    setEditingSeatId(null)
    setSeatInput('')
  }

  // ── Toggle hall availability ─────────────────────────────────────────────
  const toggleAvailability = (hallId) => {
    setHalls((prev) =>
      prev.map((h) =>
        h.id === hallId ? { ...h, isOpen: !h.isOpen } : h
      )
    )
  }

  // ── Edit hall info handler ───────────────────────────────────────────────
  const openHallEditor = (hall) => {
    setEditingHallId(hall.id)
    setEditForm({
      name: hall.name,
      wardenName: hall.wardenName,
      gender: hall.gender,
    })
  }

  const saveHallInfo = () => {
    if (!editForm.name.trim() || !editForm.wardenName.trim()) return
    setHalls((prev) =>
      prev.map((h) =>
        h.id === editingHallId
          ? { ...h, name: editForm.name, wardenName: editForm.wardenName, gender: editForm.gender }
          : h
      )
    )
    setEditingHallId(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Managed Halls</h3>
          <p className="text-xs text-gray-400 mt-0.5">{halls.length} halls under management</p>
        </div>
      </div>

      {/* Hall cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {halls.map((hall) => (
          <div
            key={hall.id}
            className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
          >
            {/* Header strip */}
            <div className={`h-2 ${hall.isOpen ? 'bg-teal-500' : 'bg-red-400'}`} />

            <div className="p-5">
              {/* Hall name & status */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-base font-bold text-gray-800 leading-tight">{hall.name}</h4>
                  <span className={`inline-block mt-1 text-[11px] px-2 py-0.5 rounded-full font-medium ${
                    hall.gender === 'Male'
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-pink-50 text-pink-600'
                  }`}>
                    {hall.gender}
                  </span>
                </div>
                <span className={`text-[11px] px-2.5 py-1 rounded-full font-semibold ${
                  hall.isOpen
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                }`}>
                  {hall.isOpen ? 'Open' : 'Closed'}
                </span>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-sm mb-4">
                <div>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wide">Total Rooms</p>
                  <p className="font-semibold text-gray-700">{hall.totalRooms}</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wide">Total Seats</p>
                  <p className="font-semibold text-gray-700">{hall.totalSeats}</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wide">Available</p>
                  <p className={`font-semibold ${hall.availableSeats > 0 ? 'text-teal-600' : 'text-red-500'}`}>
                    {hall.availableSeats}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wide">Floors</p>
                  <p className="font-semibold text-gray-700">{hall.floors}</p>
                </div>
              </div>

              {/* Warden */}
              <div className="mb-3">
                <p className="text-[11px] text-gray-400 uppercase tracking-wide">Warden</p>
                <p className="text-sm font-medium text-gray-700">{hall.wardenName}</p>
              </div>

              {/* Facilities */}
              <div className="mb-4">
                <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-1.5">Facilities</p>
                <div className="flex flex-wrap gap-1.5">
                  {hall.facilities.map((f) => (
                    <span
                      key={f}
                      className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                    >
                      {facilityLabels[f] || f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => openSeatEditor(hall)}
                  className="flex-1 min-w-[100px] text-xs font-medium px-3 py-2 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors"
                >
                  Update Seats
                </button>
                <button
                  onClick={() => toggleAvailability(hall.id)}
                  className={`flex-1 min-w-[100px] text-xs font-medium px-3 py-2 rounded-lg transition-colors ${
                    hall.isOpen
                      ? 'bg-red-50 text-red-600 hover:bg-red-100'
                      : 'bg-green-50 text-green-600 hover:bg-green-100'
                  }`}
                >
                  {hall.isOpen ? 'Close Hall' : 'Open Hall'}
                </button>
                <button
                  onClick={() => openHallEditor(hall)}
                  className="flex-1 min-w-[100px] text-xs font-medium px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                >
                  Edit Info
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── MODAL: Update Seat Count ───────────────────────────────────────── */}
      {editingSeatId !== null && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 animate-[fadeIn_0.2s_ease-out]">
            <h3 className="text-base font-semibold text-gray-800 mb-1">Update Available Seats</h3>
            <p className="text-xs text-gray-400 mb-4">
              Hall: {halls.find((h) => h.id === editingSeatId)?.name}
            </p>
            <input
              type="number"
              min="0"
              max={halls.find((h) => h.id === editingSeatId)?.totalSeats || 999}
              value={seatInput}
              onChange={(e) => setSeatInput(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent mb-4"
              placeholder="Enter new available seat count"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setEditingSeatId(null)}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveSeatCount}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: Edit Hall Info ──────────────────────────────────────────── */}
      {editingHallId !== null && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-[fadeIn_0.2s_ease-out]">
            <h3 className="text-base font-semibold text-gray-800 mb-4">Edit Hall Information</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Hall Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Warden Name</label>
                <input
                  type="text"
                  value={editForm.wardenName}
                  onChange={(e) => setEditForm((f) => ({ ...f, wardenName: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Gender</label>
                <select
                  value={editForm.gender}
                  onChange={(e) => setEditForm((f) => ({ ...f, gender: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setEditingHallId(null)}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveHallInfo}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ■  BOOKINGS MANAGEMENT — TABLE
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Booking requests table with Approve / Reject actions.
 * Approving a booking decreases available seats for that hall.
 * Rejecting keeps seats unchanged.
 */
const BookingsManagement = ({ bookings, setBookings, halls, setHalls }) => {
  // ── Filter state ─────────────────────────────────────────────────────────
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredBookings = statusFilter === 'all'
    ? bookings
    : bookings.filter((b) => b.status === statusFilter)

  // ── Approve booking → decrease available seats ───────────────────────────
  const handleApprove = (bookingId) => {
    const booking = bookings.find((b) => b.id === bookingId)
    if (!booking) return

    // Update booking status
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'approved' } : b))
    )

    // Decrease available seats for the corresponding hall
    setHalls((prev) =>
      prev.map((h) =>
        h.id === booking.hallId && h.availableSeats > 0
          ? { ...h, availableSeats: h.availableSeats - 1 }
          : h
      )
    )
  }

  // ── Reject booking → no seat change ──────────────────────────────────────
  const handleReject = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'rejected' } : b))
    )
  }

  // ── Helper: get hall name by id ──────────────────────────────────────────
  const getHallName = (hallId) => {
    const hall = halls.find((h) => h.id === hallId)
    return hall ? hall.name : `Hall #${hallId}`
  }

  // ── Status badge styling ─────────────────────────────────────────────────
  const statusStyles = {
    pending: 'bg-amber-50 text-amber-700',
    approved: 'bg-green-50 text-green-700',
    rejected: 'bg-red-50 text-red-700',
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Booking Requests</h3>
          <p className="text-xs text-gray-400 mt-0.5">{bookings.length} total bookings</p>
        </div>

        {/* Status filter */}
        <div className="flex gap-2">
          {['all', 'pending', 'approved', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors capitalize ${
                statusFilter === status
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Student Name</th>
                <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Hall Name</th>
                <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Room No.</th>
                <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Date</th>
                <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-sm text-gray-400 py-12">
                    No bookings found for this filter.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <p className="text-sm font-medium text-gray-700">{booking.studentName}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm text-gray-600">{getHallName(booking.hallId)}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-gray-600 font-mono">{booking.roomNumber}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-gray-500">{booking.date}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusStyles[booking.status]}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      {booking.status === 'pending' ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApprove(booking.id)}
                            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(booking.id)}
                            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ■  MAIN DASHBOARD COMPONENT (Default Export)
// ═══════════════════════════════════════════════════════════════════════════════

const pageTitles = {
  dashboard: 'Dashboard',
  halls: 'Halls Management',
  bookings: 'Bookings Management',
}

const HostelManagerDashboard = ({ user, onLogout }) => {
  // ── Access control: role must be "hostel_manager" ────────────────────────
  if (!user || user.role !== 'hostel_manager') {
    return <Unauthorized onGoBack={onLogout} />
  }

  // ── Navigation state ─────────────────────────────────────────────────────
  const [activePage, setActivePage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // ── Data state (dummy, no backend) ───────────────────────────────────────
  const [halls, setHalls] = useState(initialHalls)
  const [bookings, setBookings] = useState(initialBookings)

  // Close sidebar on window resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // ── Render active section ────────────────────────────────────────────────
  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardStats halls={halls} bookings={bookings} />
      case 'halls':
        return <HallsManagement halls={halls} setHalls={setHalls} />
      case 'bookings':
        return (
          <BookingsManagement
            bookings={bookings}
            setBookings={setBookings}
            halls={halls}
            setHalls={setHalls}
          />
        )
      default:
        return <DashboardStats halls={halls} bookings={bookings} />
    }
  }

  // ── Layout: dark sidebar + light content ─────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <ManagerSidebar
        activePage={activePage}
        onNavigate={setActivePage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <ManagerTopbar
          user={user}
          pageTitle={pageTitles[activePage] || 'Dashboard'}
          onToggleSidebar={() => setSidebarOpen(true)}
          onLogout={onLogout}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto animate-[fadeIn_0.3s_ease-out]">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default HostelManagerDashboard
