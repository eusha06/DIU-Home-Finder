import { useState } from 'react'
import Sidebar from './Sidebar'
import TopNavbar from './TopNavbar'
import DashboardOverview from './DashboardOverview'
import AddPropertyForm from './AddPropertyForm'
import MyProperties from './MyProperties'
import BookingsTable from './BookingsTable'
import { ownerProperties as initialProperties, ownerBookings as initialBookings } from './data/dummyOwnerData'

/**
 * OwnerDashboard.jsx
 * ──────────────────
 * Main dashboard page for house owners.
 * Manages all state and renders the appropriate section based on sidebar navigation.
 *
 * Props:
 *   owner    – owner object { fullName, email, ... }
 *   onLogout – callback to logout
 */

const pageTitles = {
  dashboard: 'Dashboard',
  properties: 'My Properties',
  bookings: 'Bookings',
  addProperty: 'Add Property',
}

const OwnerDashboard = ({ owner, onLogout }) => {
  // ── Navigation state ──────────────────────────────────────────────────
  const [activePage, setActivePage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // ── Data state ────────────────────────────────────────────────────────
  const [properties, setProperties] = useState(initialProperties)
  const [bookings, setBookings] = useState(initialBookings)

  // ── Property actions ──────────────────────────────────────────────────
  const handleAddProperty = (newProperty) => {
    setProperties((prev) => [newProperty, ...prev])
    console.log('Property added:', newProperty)
    // Auto-navigate to My Properties after adding
    setActivePage('properties')
  }

  const handleUpdateProperty = (updatedProperty) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === updatedProperty.id ? updatedProperty : p))
    )
    console.log('Property updated:', updatedProperty)
  }

  const handleDeleteProperty = (propertyId) => {
    setProperties((prev) => prev.filter((p) => p.id !== propertyId))
    console.log('Property deleted, ID:', propertyId)
  }

  // ── Booking actions ───────────────────────────────────────────────────
  const handleUpdateBooking = (bookingId, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    )
    console.log(`Booking ${bookingId} status changed to: ${newStatus}`)
  }

  // ── Render content ────────────────────────────────────────────────────
  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardOverview properties={properties} bookings={bookings} />
      case 'properties':
        return (
          <MyProperties
            properties={properties}
            onUpdateProperty={handleUpdateProperty}
            onDeleteProperty={handleDeleteProperty}
          />
        )
      case 'bookings':
        return (
          <BookingsTable
            bookings={bookings}
            onUpdateBooking={handleUpdateBooking}
          />
        )
      case 'addProperty':
        return <AddPropertyForm onAddProperty={handleAddProperty} />
      default:
        return <DashboardOverview properties={properties} bookings={bookings} />
    }
  }

  return (
    <div className="min-h-screen bg-amber-50/30 flex" style={{ fontFamily: "'Sora', sans-serif" }}>
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top navbar */}
        <TopNavbar
          owner={owner}
          pageTitle={pageTitles[activePage] || 'Dashboard'}
          onToggleSidebar={() => setSidebarOpen(true)}
          onLogout={onLogout}
        />

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <div className="max-w-6xl mx-auto animate-[fadeIn_0.3s_ease-out]">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default OwnerDashboard
