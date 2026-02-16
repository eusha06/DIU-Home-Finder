import { useState, useEffect, useMemo } from 'react'

// ── Student homepage components ───────────────────────────────────────────
import Navbar from './Navbar'
import SearchBar from './SearchBar'
import FilterSidebar from './FilterSidebar'
import PropertyCard from './PropertyCard'
import PropertyDetailModal from './PropertyDetailModal'
import BookingConfirmModal from './BookingConfirmModal'
import dummyProperties from './data/dummyProperties'

/**
 * StudentHomePage
 * ───────────────
 * Main orchestrator for the student dashboard / property listing page.
 *
 * Responsibilities:
 *   • Auto-filter properties by student gender
 *   • Text search (title + location)
 *   • Price range filter
 *   • Sort (newest, price-low, price-high)
 *   • Sidebar filters (rooms, bathrooms, floor, availability)
 *   • Property detail modal
 *   • Booking confirmation flow
 *
 * Props:
 *   student  - { fullName, email, phone, studentId, gender }
 *   onLogout - callback to return to auth page
 */
const StudentHomePage = ({ student, onLogout }) => {
  // ── Search & sort state ─────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  // ── Sidebar filter state ────────────────────────────────────────────────
  const [filters, setFilters] = useState({
    gender: student.gender,
    rooms: 'all',
    bathrooms: 'all',
    floor: 'all',
    availableOnly: false,
  })

  // ── Mobile sidebar toggle ───────────────────────────────────────────────
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // ── Modals ──────────────────────────────────────────────────────────────
  const [selectedProperty, setSelectedProperty] = useState(null)   // for detail modal
  const [bookingProperty, setBookingProperty] = useState(null)     // for confirm modal
  const [bookingSuccess, setBookingSuccess] = useState(false)      // show success toast

  // ── Filter change handler ───────────────────────────────────────────────
  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }))
  }

  // ── Derived filtered + sorted list ──────────────────────────────────────
  const filteredProperties = useMemo(() => {
    let result = [...dummyProperties]

    // 1) Gender filter (auto from student profile)
    result = result.filter((p) => p.gender === student.gender || p.gender === 'any')

    // 2) Text search (title + location)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q)
      )
    }

    // 3) Price range
    if (priceRange !== 'all') {
      if (priceRange === '7000+') {
        result = result.filter((p) => p.rent >= 7000)
      } else {
        const [min, max] = priceRange.split('-').map(Number)
        result = result.filter((p) => p.rent >= min && p.rent <= max)
      }
    }

    // 4) Rooms
    if (filters.rooms !== 'all') {
      if (filters.rooms === '5+') {
        result = result.filter((p) => p.rooms >= 5)
      } else {
        result = result.filter((p) => p.rooms === Number(filters.rooms))
      }
    }

    // 5) Bathrooms
    if (filters.bathrooms !== 'all') {
      if (filters.bathrooms === '3+') {
        result = result.filter((p) => p.bathrooms >= 3)
      } else {
        result = result.filter((p) => p.bathrooms === Number(filters.bathrooms))
      }
    }

    // 6) Floor
    if (filters.floor !== 'all') {
      if (filters.floor === '5+') {
        result = result.filter((p) => p.floor >= 5)
      } else {
        result = result.filter((p) => p.floor === Number(filters.floor))
      }
    }

    // 7) Availability
    if (filters.availableOnly) {
      result = result.filter((p) => p.available)
    }

    // 8) Sort
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt))
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.rent - b.rent)
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.rent - a.rent)
    }

    return result
  }, [searchQuery, priceRange, sortBy, filters, student.gender])

  // ── Booking flow ────────────────────────────────────────────────────────
  const handleRequestBooking = (propertyId) => {
    const prop = dummyProperties.find((p) => p.id === propertyId)
    if (prop) {
      setSelectedProperty(null) // close detail modal
      setBookingProperty(prop)   // open confirm modal
    }
  }

  const handleBookingConfirm = () => {
    setBookingProperty(null)
    setBookingSuccess(true)
    setTimeout(() => setBookingSuccess(false), 3000)
  }

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Navbar ──────────────────────────────────────────────────── */}
      <Navbar student={student} onLogout={onLogout} />

      {/* ── Mobile filter toggle ────────────────────────────────────── */}
      <div className="lg:hidden px-4 pt-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 text-sm font-medium text-indigo-600 bg-white
                     border border-indigo-200 rounded-lg px-4 py-2 shadow-sm hover:bg-indigo-50
                     transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
        </button>
      </div>

      {/* ── Main content area ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <FilterSidebar
            filters={filters}
            onChange={handleFilterChange}
            studentGender={student.gender}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Main column */}
          <div className="flex-1 min-w-0">
            {/* Search & sort */}
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              sortBy={sortBy}
              onSortChange={setSortBy}
              resultCount={filteredProperties.length}
            />

            {/* Property grid */}
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onViewDetails={(p) => setSelectedProperty(p)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <span className="text-5xl mb-4 block">🏚️</span>
                <h3 className="text-lg font-semibold text-gray-600 mb-1">No properties found</h3>
                <p className="text-sm text-gray-400">
                  Try adjusting your search or filters to find available homes.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Property detail modal ──────────────────────────────────── */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onRequestBooking={handleRequestBooking}
        />
      )}

      {/* ── Booking confirm modal ──────────────────────────────────── */}
      {bookingProperty && (
        <BookingConfirmModal
          property={bookingProperty}
          student={{ name: student.fullName, email: student.email }}
          onClose={() => setBookingProperty(null)}
          onConfirm={handleBookingConfirm}
        />
      )}

      {/* ── Success toast ──────────────────────────────────────────── */}
      {bookingSuccess && (
        <div className="fixed bottom-6 right-6 z-[70] bg-green-600 text-white px-5 py-3 rounded-xl
                       shadow-lg flex items-center gap-2 animate-[fadeIn_0.2s_ease-out]">
          <span className="text-lg">✅</span>
          <span className="text-sm font-medium">Booking request sent successfully!</span>
        </div>
      )}
    </div>
  )
}

export default StudentHomePage
