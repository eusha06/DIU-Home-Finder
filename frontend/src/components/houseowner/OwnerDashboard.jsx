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
  dashboard: 'Owner Dashboard',
  properties: 'My Listings',
  bookings: 'Revenue',
  addProperty: 'Messages',
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

  const isDashboard = activePage === 'dashboard'

  return (
    <div className="min-h-screen bg-[#f4f5fb] flex" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        {isDashboard ? (
          <main className="flex-1 overflow-auto">
            <div className="relative min-h-[240px] bg-[linear-gradient(118deg,#171d59_0%,#25378f_50%,#3f57c9_100%)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_8%,rgba(124,141,246,0.2),transparent_34%),radial-gradient(circle_at_16%_100%,rgba(88,102,198,0.28),transparent_58%)]" />
              <TopNavbar
                owner={owner}
                pageTitle={pageTitles[activePage] || 'Owner Dashboard'}
                onToggleSidebar={() => setSidebarOpen(true)}
                onLogout={onLogout}
                variant="dashboard"
              />
            </div>

            <div className="px-4 sm:px-6 lg:px-9 pb-10 -mt-[56px]">
              <div className="max-w-[1180px] mx-auto animate-[fadeIn_0.32s_ease-out]">
                <DashboardOverview properties={properties} bookings={bookings} />
              </div>
            </div>
          </main>
        ) : (
          <>
            <TopNavbar
              owner={owner}
              pageTitle={pageTitles[activePage] || 'Owner Dashboard'}
              onToggleSidebar={() => setSidebarOpen(true)}
              onLogout={onLogout}
            />

            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
              <div className="max-w-6xl mx-auto animate-[fadeIn_0.3s_ease-out]">
                {renderContent()}
              </div>
            </main>
          </>
        )}
      </div>
    </div>
  )
}

export default OwnerDashboard
