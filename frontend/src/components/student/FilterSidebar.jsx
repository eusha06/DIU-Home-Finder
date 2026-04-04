
const PROPERTY_TYPE_OPTIONS = [
  { label: 'Room', value: 'room' },
  { label: 'Apartment (Flat)', value: 'flat' },
  { label: 'Shared Seat', value: 'seat' },
]

const AMENITY_OPTIONS = [
  { label: 'Wi-Fi', value: 'wifi' },
  { label: 'AC', value: 'ac' },
  { label: 'Security', value: 'security' },
  { label: 'Attached Bathroom', value: 'attached_bathroom' },
  { label: 'Shared Bathroom', value: 'shared_bathroom' },
  { label: 'Parking', value: 'parking' },
]

const PRICE_LIMITS = {
  min: 0,
  max: 30000,
  step: 100,
}

const FilterSidebar = ({ filters, onChange, studentGender, isOpen, onClose, onReset }) => {
  const toggleArrayValue = (key, value) => {
    const currentValues = filters[key] || []
    const nextValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value]
    onChange(key, nextValues)
  }

  const minSliderRaw = filters.minPrice === '' ? PRICE_LIMITS.min : Number(filters.minPrice)
  const maxSliderRaw = filters.maxPrice === '' ? PRICE_LIMITS.max : Number(filters.maxPrice)
  const safeMinSlider = Number.isFinite(minSliderRaw) ? Math.max(PRICE_LIMITS.min, Math.min(minSliderRaw, PRICE_LIMITS.max)) : PRICE_LIMITS.min
  const safeMaxSlider = Number.isFinite(maxSliderRaw) ? Math.max(PRICE_LIMITS.min, Math.min(maxSliderRaw, PRICE_LIMITS.max)) : PRICE_LIMITS.max
  const effectiveMin = Math.min(safeMinSlider, safeMaxSlider)
  const effectiveMax = Math.max(safeMinSlider, safeMaxSlider)

  return (
    <aside
      className={`
        ${isOpen ? 'block' : 'hidden'} lg:block
        w-full lg:w-[280px] shrink-0 bg-[#F4F5FA] rounded-xl p-5 border border-[#E5E7EB]
        h-fit sticky top-24
      `}
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-[#3C327B] font-bold text-lg">Filters</h2>
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden text-gray-500 hover:text-gray-700"
          aria-label="Close filters"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <p className="text-xs text-gray-500 mb-5 capitalize">
        Showing rental homes for {studentGender} students.
      </p>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0 0H4.5m0 12h9.75m-9.75 0a1.5 1.5 0 013 0 1.5 1.5 0 01-3 0zm0 0H4.5m10.5-6h5.25m-5.25 0a1.5 1.5 0 01-3 0 1.5 1.5 0 013 0zm0 0H4.5" />
          </svg>
          <span className="font-semibold text-[#1A1A1A]">Price Range</span>
        </div>

        <div className="space-y-2 mb-3">
          <label className="text-xs text-gray-500">Min Price</label>
          <input
            type="range"
            min={PRICE_LIMITS.min}
            max={PRICE_LIMITS.max}
            step={PRICE_LIMITS.step}
            value={effectiveMin}
            onChange={(event) => {
              const nextMin = Number(event.target.value)
              onChange('minPrice', String(Math.min(nextMin, effectiveMax)))
            }}
            className="w-full accent-[#3C327B]"
          />
        </div>

        <div className="space-y-2 mb-4">
          <label className="text-xs text-gray-500">Max Price</label>
          <input
            type="range"
            min={PRICE_LIMITS.min}
            max={PRICE_LIMITS.max}
            step={PRICE_LIMITS.step}
            value={effectiveMax}
            onChange={(event) => {
              const nextMax = Number(event.target.value)
              onChange('maxPrice', String(Math.max(nextMax, effectiveMin)))
            }}
            className="w-full accent-[#3C327B]"
          />
        </div>

        <div className="flex items-center justify-between gap-2">
          <input
            type="number"
            min={PRICE_LIMITS.min}
            placeholder="Min"
            value={filters.minPrice ?? ''}
            onChange={(event) => onChange('minPrice', event.target.value)}
            className="w-full bg-white border border-gray-300 text-sm rounded-lg py-1.5 px-3 focus:outline-none focus:border-[#3C327B]"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            min={PRICE_LIMITS.min}
            placeholder="Max"
            value={filters.maxPrice ?? ''}
            onChange={(event) => onChange('maxPrice', event.target.value)}
            className="w-full bg-white border border-gray-300 text-sm rounded-lg py-1.5 px-3 focus:outline-none focus:border-[#3C327B]"
          />
        </div>
      </div>

      <div className="h-[1px] w-full bg-slate-200 mb-6"></div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <span className="font-semibold text-[#1A1A1A]">Location</span>
        </div>

        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Area or address"
            value={filters.location ?? ''}
            onChange={(event) => onChange('location', event.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:border-[#3C327B]"
          />
        </div>
      </div>

      <div className="h-[1px] w-full bg-slate-200 mb-6"></div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
          </svg>
          <span className="font-semibold text-[#1A1A1A]">Property Type</span>
        </div>

        <div className="flex flex-col gap-2 pl-2">
          {PROPERTY_TYPE_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(filters.propertyTypes || []).includes(option.value)}
                onChange={() => toggleArrayValue('propertyTypes', option.value)}
                className="w-4 h-4 rounded border-gray-300 text-[#3C327B] focus:ring-[#3C327B]"
              />
              <span className="text-sm text-gray-600">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-[1px] w-full bg-slate-200 mb-6"></div>

      <div className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
          </svg>
          <span className="font-semibold text-[#1A1A1A]">Amenities</span>
        </div>

        <div className="flex flex-col gap-2 pl-2">
          {AMENITY_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={(filters.amenities || []).includes(option.value)}
                onChange={() => toggleArrayValue('amenities', option.value)}
                className="w-4 h-4 rounded border-gray-300 text-[#3C327B] focus:ring-[#3C327B]"
              />
              <span className="text-sm text-gray-600">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200">
        <p className="text-xs text-gray-500 mb-3">Filters apply automatically as you change options.</p>
        <button
          type="button"
          onClick={onReset}
          className="w-full bg-white border border-gray-300 rounded-lg py-2 text-sm font-medium text-gray-700 hover:border-[#3C327B] hover:text-[#3C327B] transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </aside>
  )
}

export default FilterSidebar
