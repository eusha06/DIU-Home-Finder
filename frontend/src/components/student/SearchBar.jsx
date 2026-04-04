
const SearchBar = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  resultCount,
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between py-2 mb-3">
        <div className="text-[15px] text-[#1A1A1A]">
          Showing {resultCount} Result{resultCount === 1 ? '' : 's'}
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

      <div className="relative max-w-md">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by title or location"
          className="w-full bg-white border border-gray-300 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-[#3C327B]"
        />
      </div>
    </div>
  )
}

export default SearchBar;
