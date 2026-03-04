import { useState, useEffect, useMemo } from 'react'

// ── Student homepage components ───────────────────────────────────────────
import Navbar from './Navbar'
import CategorySelection from './CategorySelection'
import SearchBar from './SearchBar'
import FilterSidebar from './FilterSidebar'
import PropertyCard from './PropertyCard'
import PropertyDetailModal from './PropertyDetailModal'
import BookingConfirmModal from './BookingConfirmModal'
import dummyProperties from './data/dummyProperties'
import dummyHostels from './data/dummyHostelData'

// ── Constants ─────────────────────────────────────────────────────────────
const ITEMS_PER_PAGE = 6
const LOADING_DELAY_MS = 1500

// ═══════════════════════════════════════════════════════════════════════════
// SkeletonCard – placeholder shown while listings are loading
// ═══════════════════════════════════════════════════════════════════════════
// Mirrors the PropertyCard layout so the page doesn't jump when real
// cards replace the skeletons. Uses Tailwind `animate-pulse`.

const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
    {/* Image placeholder */}
    <div className="h-48 bg-gray-200" />

    {/* Body */}
    <div className="p-4">
      {/* Title */}
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      {/* Location */}
      <div className="h-3 bg-gray-100 rounded w-1/2 mb-4" />

      {/* Quick stats grid (4 boxes) */}
      <div className="grid grid-cols-4 gap-1 mb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-md py-3" />
        ))}
      </div>

      {/* Button placeholder */}
      <div className="h-9 bg-gray-200 rounded-lg" />
    </div>
  </div>
)

// ═══════════════════════════════════════════════════════════════════════════
// EmptyState – shown when filtered results have zero matches
// ═══════════════════════════════════════════════════════════════════════════

const EmptyState = ({ category, onResetFilters }) => (
  <div className="flex flex-col items-center justify-center py-20 px-4">
    {/* Icon */}
    <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mb-5">
      <svg
        className="w-10 h-10 text-indigo-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
        />
      </svg>
    </div>

    {/* Title */}
    <h3 className="text-lg font-semibold text-gray-700 mb-1">
      No Properties Found
    </h3>

    {/* Subtitle */}
    <p className="text-sm text-gray-400 mb-6 text-center max-w-xs">
      Try adjusting your filters or search criteria to find available{' '}
      {category === 'hostel' ? 'hostels' : 'homes'}.
    </p>

    {/* Reset button */}
    <button
      onClick={onResetFilters}
      className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm
                 font-medium rounded-lg hover:bg-indigo-700 active:scale-[0.98]
                 transition-all duration-200 shadow-sm hover:shadow"
    >
      <svg
        className="w-4 h-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      Reset Filters
    </button>
  </div>
)

// ═══════════════════════════════════════════════════════════════════════════
// Pagination – page navigation controls
// ═══════════════════════════════════════════════════════════════════════════
// Shows Previous / page-numbers / Next.
// Active page is highlighted; first/last page disables Prev/Next.

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Don't render pagination when there's only one page (or none)
  if (totalPages <= 1) return null

  // ── Build the array of page numbers to display ─────────────────────────
  // Shows up to 5 page buttons with ellipses for large page counts.
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      // Few pages → show all
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      // Always show first page
      pages.push(1)

      // Left ellipsis
      if (currentPage > 3) pages.push('...')

      // Middle pages
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      for (let i = start; i <= end; i++) pages.push(i)

      // Right ellipsis
      if (currentPage < totalPages - 2) pages.push('...')

      // Always show last page
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className="flex items-center justify-center gap-1.5 mt-8 mb-2 flex-wrap">
      {/* ── Previous button ──────────────────────────────────────── */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          flex items-center gap-1 px-3.5 py-2 rounded-lg text-xs font-medium
          border transition-all duration-200
          ${currentPage === 1
            ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50'
            : 'border-gray-300 text-gray-600 hover:border-indigo-300 hover:text-indigo-600 bg-white shadow-sm hover:shadow'}
        `}
      >
        <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </button>

      {/* ── Page number buttons ──────────────────────────────────── */}
      {getPageNumbers().map((page, idx) =>
        page === '...' ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 text-xs select-none">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              w-9 h-9 rounded-lg text-xs font-semibold transition-all duration-200 border
              ${page === currentPage
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200'
                : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600 shadow-sm hover:shadow'}
            `}
          >
            {page}
          </button>
        )
      )}

      {/* ── Next button ──────────────────────────────────────────── */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          flex items-center gap-1 px-3.5 py-2 rounded-lg text-xs font-medium
          border transition-all duration-200
          ${currentPage === totalPages
            ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50'
            : 'border-gray-300 text-gray-600 hover:border-indigo-300 hover:text-indigo-600 bg-white shadow-sm hover:shadow'}
        `}
      >
        Next
        <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// StudentHomePage – main orchestrator
// ═══════════════════════════════════════════════════════════════════════════
//
// Flow:
//   1. Category selection: "Rental Homes" or "Hostels"
//   2. Listing page for the chosen category with filters, search, modals
//
// Responsibilities:
//   • Show category selection cards on first load
//   • After selection → show listings for that category only
//   • Auto-filter properties by student gender
//   • Text search (title + location)
//   • Price range filter
//   • Sort (newest, price-low, price-high)
//   • Sidebar filters (rooms, bathrooms, floor, availability)
//   • Pagination (6 per page)
//   • Loading skeleton (simulated 1.5s delay)
//   • Empty state with reset-filters action
//   • Property detail modal with booking flow
//
// Props:
//   student  - { fullName, email, phone, studentId, gender }
//   onLogout - callback to return to auth page
//
const StudentHomePage = ({ student, onLogout }) => {
  // ── Category state ──────────────────────────────────────────────────────
  // null = show category selection view; 'home' | 'hostel' = show listings
  const [selectedCategory, setSelectedCategory] = useState(null)

  // ── Combine both data sources into one array ────────────────────────────
  const allProperties = useMemo(
    () => [...dummyProperties, ...dummyHostels],
    []
  )

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

  // ── Pagination state ────────────────────────────────────────────────────
  const [currentPage, setCurrentPage] = useState(1)

  // ── Loading state (simulated) ───────────────────────────────────────────
  const [isLoading, setIsLoading] = useState(false)

  // ── Mobile sidebar toggle ───────────────────────────────────────────────
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // ── Modals ──────────────────────────────────────────────────────────────
  const [selectedProperty, setSelectedProperty] = useState(null)   // for detail modal
  const [bookingProperty, setBookingProperty] = useState(null)     // for confirm modal
  const [bookingSuccess, setBookingSuccess] = useState(false)      // show success toast

  // ── Simulate loading whenever category changes ──────────────────────────
  // This gives a realistic skeleton-card experience while "fetching" data.
  useEffect(() => {
    if (selectedCategory) {
      setIsLoading(true)
      const timer = setTimeout(() => setIsLoading(false), LOADING_DELAY_MS)
      return () => clearTimeout(timer)
    }
  }, [selectedCategory])

  // ── Reset to page 1 whenever any filter / search / sort changes ─────────
  // This prevents the user from seeing a blank page after narrowing results.
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, priceRange, sortBy, filters, selectedCategory])

  // ── Filter change handler ───────────────────────────────────────────────
  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }))
  }

  // ── Reset ALL filters (used by EmptyState "Reset Filters" button) ───────
  const resetAllFilters = () => {
    setSearchQuery('')
    setPriceRange('all')
    setSortBy('newest')
    setFilters({
      gender: student.gender,
      rooms: 'all',
      bathrooms: 'all',
      floor: 'all',
      availableOnly: false,
    })
  }

  // ── Derived filtered + sorted list ──────────────────────────────────────
  const filteredProperties = useMemo(() => {
    let result = [...allProperties]

    // 0) Category filter — only show selected type
    if (selectedCategory) {
      result = result.filter((p) => p.type === selectedCategory)
    }

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
  }, [searchQuery, priceRange, sortBy, filters, student.gender, selectedCategory, allProperties])

  // ── Pagination derived values ───────────────────────────────────────────
  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE)
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredProperties.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredProperties, currentPage])

  // ── Page change handler ─────────────────────────────────────────────────
  const handlePageChange = (page) => {
    // Clamp page within valid bounds
    const clamped = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(clamped)
    // Smooth scroll to top of listing area
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ── Booking flow ────────────────────────────────────────────────────────
  const handleRequestBooking = (propertyId) => {
    const prop = allProperties.find((p) => p.id === propertyId)
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

  // ── Handle going back to category selection ─────────────────────────────
  const handleBackToCategories = () => {
    setSelectedCategory(null)
    // Reset filters, search & pagination when going back
    resetAllFilters()
    setCurrentPage(1)
  }

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Navbar ──────────────────────────────────────────────────── */}
      <Navbar student={student} onLogout={onLogout} />

      {/* ── Category selection view (initial) ──────────────────────── */}
      {!selectedCategory && (
        <CategorySelection onSelect={setSelectedCategory} />
      )}

      {/* ── Listing view (after category is selected) ──────────────── */}
      {selectedCategory && (
        <>
          {/* Back button + category title bar */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBackToCategories}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-indigo-600 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm hover:border-indigo-300 transition-all duration-200"
              >
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </button>
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {selectedCategory === 'home' ? '🏠 Rental Homes' : '🏢 Hostels'}
                </h2>
                <p className="text-xs text-gray-400">
                  Showing {selectedCategory === 'home' ? 'rental homes' : 'hostels'} for {student.gender} students
                </p>
              </div>
            </div>
          </div>

          {/* ── Mobile filter toggle ────────────────────────────────── */}
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

            {/* Property grid — skeleton / empty / listing + pagination */}
            {isLoading ? (
              /* ── Loading skeletons ────────────────────────────────── */
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : filteredProperties.length === 0 ? (
              /* ── Empty state ──────────────────────────────────────── */
              <EmptyState
                category={selectedCategory}
                onResetFilters={resetAllFilters}
              />
            ) : (
              /* ── Property cards + pagination ──────────────────────── */
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {paginatedProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onViewDetails={(p) => setSelectedProperty(p)}
                    />
                  ))}
                </div>

                {/* Showing X-Y of Z indicator */}
                <div className="text-center mt-4 text-xs text-gray-400">
                  Showing{' '}
                  <span className="font-semibold text-gray-600">
                    {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredProperties.length)}
                  </span>{' '}
                  of{' '}
                  <span className="font-semibold text-gray-600">
                    {filteredProperties.length}
                  </span>{' '}
                  properties
                </div>

                {/* Pagination controls */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
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
        </>
      )}
    </div>
  )
}

export default StudentHomePage
