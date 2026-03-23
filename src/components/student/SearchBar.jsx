
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
    <div className="flex items-center justify-between py-2 mb-4">
      <div className="text-[15px] text-[#1A1A1A]">
        Showing 1-12 of {resultCount} Results
      </div>
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="appearance-none bg-white border border-gray-300 rounded-lg py-1.5 pl-4 pr-10 text-sm focus:outline-none focus:border-[#3C327B] text-[#1A1A1A] font-medium cursor-pointer"
        >
          <option value="newest">Sort by</option>
          <option value="price-low">Lowest Price</option>
          <option value="price-high">Highest Price</option>
        </select>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </div>
  )
}

export default SearchBar;
