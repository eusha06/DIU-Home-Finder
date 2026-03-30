import { useState, useEffect, useCallback } from 'react'
import Sidebar from './Sidebar'
import TopNavbar from './TopNavbar'
import DashboardOverview from './DashboardOverview'
import AddPropertyForm from './AddPropertyForm'
import MyProperties from './MyProperties'
import BookingsTable from './BookingsTable'
import { propertiesAPI } from '../../api/index.js'

// Bookings still use dummy data — will connect in a later phase
import { ownerBookings as initialBookings } from './data/dummyOwnerData'

const pageTitles = {
  dashboard:   'Owner Dashboard',
  properties:  'My Listings',
  bookings:    'Revenue',
  addProperty: 'Messages',
}

const OwnerDashboard = ({ owner, onLogout }) => {
  // ── Navigation state ──────────────────────────────────────────────────
  const [activePage, setActivePage]   = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // ── Data state ────────────────────────────────────────────────────────
  const [properties, setProperties] = useState([])
  const [bookings]                  = useState(initialBookings)
  const [loadingProps, setLoadingProps] = useState(true)
  const [propsError,   setPropsError]   = useState(null)

  // ── Fetch owner's own properties from real API ────────────────────────
  const fetchMyProperties = useCallback(async () => {
    try {
      setLoadingProps(true)
      setPropsError(null)
      const data = await propertiesAPI.getMyListings()

      // Map DB fields to what MyProperties component expects
      const mapped = data.properties.map((p) => ({
        id:             p.id,
        title:          p.title,
        location:       p.area || p.address,
        address:        p.address,
        rent:           p.rent,
        gender:         p.gender_preference,
        available:      p.is_available,
        availableSeats: p.available_seats,
        rooms:          p.total_seats || 1,
        bathrooms:      1,
        floor:          1,
        facilities:     p.amenities || [],
        images:         p.primary_image ? [p.primary_image] : [],
        contactCount:   Number(p.contact_count) || 0,
        postedAt:       p.created_at,
      }))

      setProperties(mapped)
    } catch (err) {
      console.error('Failed to fetch properties:', err)
      setPropsError(err.message)
    } finally {
      setLoadingProps(false)
    }
  }, [])

  // Fetch on mount
  useEffect(() => {
    fetchMyProperties()
  }, [fetchMyProperties])

  // ── Property actions ──────────────────────────────────────────────────
  const handleAddProperty = (newProperty) => {
    // Add to local state immediately (optimistic update)
    setProperties((prev) => [newProperty, ...prev])
    // Refresh from server to get the real DB data
    fetchMyProperties()
    setActivePage('properties')
  }

  const handleUpdateProperty = (updatedProperty) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === updatedProperty.id ? updatedProperty : p))
    )
  }

  const handleDeleteProperty = (propertyId) => {
    setProperties((prev) => prev.filter((p) => p.id !== propertyId))
  }

  // ── Booking actions ───────────────────────────────────────────────────
  const handleUpdateBooking = (bookingId, newStatus) => {
    console.log(`Booking ${bookingId} status changed to: ${newStatus}`)
  }

  // ── Render content ────────────────────────────────────────────────────
  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardOverview properties={properties} bookings={bookings} />

      case 'properties':
        if (loadingProps) {
          return (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm text-gray-500">Loading your properties...</p>
              </div>
            </div>
          )
        }
        if (propsError) {
          return (
            <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 flex items-center justify-between">
              <p className="text-sm text-red-600">Failed to load properties: {propsError}</p>
              <button
                onClick={fetchMyProperties}
                className="text-xs text-red-600 font-medium underline hover:no-underline ml-4"
              >
                Try again
              </button>
            </div>
          )
        }
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