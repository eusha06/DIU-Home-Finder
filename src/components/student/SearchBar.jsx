/**
 * SearchBar.jsx
 * ─────────────
 * Search & sort controls for the student homepage.
 *
 * Props:
 *   searchQuery   - current search text
 *   onSearchChange - handler for search input
 *   priceRange    - current price range key
 *   onPriceChange - handler for price dropdown
 *   sortBy        - current sort key
 *   onSortChange  - handler for sort dropdown
 *   resultCount   - number of visible properties (shown as a badge)
 */

const SearchBar = ({
  searchQuery,
  onSearchChange,
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange,
  resultCount,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-3">

        {/* ── Text search ──────────────────────────────────────────── */}
        <div className="relative flex-1">
          {/* Search icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by location or title…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50
                       text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                       transition-colors"
          />
        </div>

        {/* ── Price range dropdown ──────────────────────────────────── */}
        <select
          value={priceRange}
          onChange={(e) => onPriceChange(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-sm
                     outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                     transition-colors cursor-pointer min-w-[160px]"
        >
          <option value="all">All Prices</option>
          <option value="0-3000">Under ৳3,000</option>
          <option value="3000-5000">৳3,000 – ৳5,000</option>
          <option value="5000-7000">৳5,000 – ৳7,000</option>
          <option value="7000+">৳7,000+</option>
        </select>

        {/* ── Sort dropdown ────────────────────────────────────────── */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-sm
                     outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                     transition-colors cursor-pointer min-w-[160px]"
        >
          <option value="newest">Newest First</option>
          <option value="price-low">Lowest Price</option>
          <option value="price-high">Highest Price</option>
        </select>
      </div>

      {/* Result count badge */}
      <div className="mt-3 text-xs text-gray-500">
        Showing <span className="font-semibold text-indigo-600">{resultCount}</span> properties
      </div>
    </div>
  )
}

export default SearchBar
