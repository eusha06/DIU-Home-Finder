
const FilterSidebar = ({ filters, onChange, studentGender, isOpen, onClose }) => {
  return (
    <aside className="w-full lg:w-[280px] shrink-0 bg-[#F4F5FA] rounded-xl p-5 border border-[#E5E7EB] lg:block h-fit sticky top-24">
      <h2 className="text-[#3C327B] font-bold text-lg mb-6">Filters</h2>

      {/* Price Range */}
      <div className="mb-6">
        <button className="flex items-center justify-between w-full text-left mb-4">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0 0H4.5m0 12h9.75m-9.75 0a1.5 1.5 0 013 0 1.5 1.5 0 01-3 0zm0 0H4.5m10.5-6h5.25m-5.25 0a1.5 1.5 0 01-3 0 1.5 1.5 0 013 0zm0 0H4.5" />
            </svg>
            <span className="font-semibold text-[#1A1A1A]">Price Range</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>
        <div className="px-1">
          <div className="relative w-full h-1 bg-gray-200 rounded-full mb-5">
            <div className="absolute top-0 left-0 h-full w-[100%] bg-[#3C327B] rounded-full"></div>
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-3.5 h-3.5 bg-[#3C327B] rounded-full shadow cursor-pointer"></div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-3.5 h-3.5 bg-[#3C327B] rounded-full shadow cursor-pointer"></div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="bg-white border text-center border-gray-300 text-gray-400 text-sm rounded-lg py-1.5 px-3 w-full">Inputs</div>
            <span className="text-gray-400">-</span>
            <div className="bg-white border text-center border-gray-300 text-gray-400 text-sm rounded-lg py-1.5 px-3 w-full">Inputs</div>
          </div>
        </div>
      </div>

      <div className="h-[1px] w-full bg-slate-200 mb-6"></div>

      {/* Location */}
      <div className="mb-6">
        <button className="flex items-center justify-between w-full text-left mb-3">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span className="font-semibold text-[#1A1A1A]">Location</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input type="text" placeholder="Search" className="w-full bg-white border border-gray-300 rounded-lg py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:border-[#3C327B]" />
        </div>
      </div>

      <div className="h-[1px] w-full bg-slate-200 mb-6"></div>

      {/* Property Type */}
      <div className="mb-6">
        <button className="flex items-center justify-between w-full text-left mb-3">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
            </svg>
            <span className="font-semibold text-[#1A1A1A]">Property Type</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>
        <div className="flex flex-col gap-2 pl-2">
          {["Apartment", "House", "Dorm", "Shared Room"].map((type) => (
            <label key={type} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#3C327B] focus:ring-[#3C327B]" />
              <span className="text-sm text-gray-600">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-[1px] w-full bg-slate-200 mb-6"></div>

      {/* Amenities */}
      <div className="mb-6">
        <button className="flex items-center justify-between w-full text-left mb-3">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
            </svg>
            <span className="font-semibold text-[#1A1A1A]">Amenities</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>
        <div className="flex flex-col gap-2 pl-2">
          {["Wi-Fi", "Furnished", "Gym", "Laundry", "Parking"].map((amenity) => (
            <label key={amenity} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#3C327B] focus:ring-[#3C327B]" />
              <span className="text-sm text-gray-600">{amenity}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
