/**
 * FilterSidebar.jsx
 * ─────────────────
 * Left sidebar with property filters.
 * Gender filter is auto-set from the logged-in student and disabled.
 *
 * Props:
 *   filters   - { gender, rooms, bathrooms, floor, availableOnly }
 *   onChange  - (filterName, value) => void
 *   studentGender - 'male' | 'female' (locked filter)
 *   isOpen    - boolean (mobile sidebar visibility)
 *   onClose   - callback to close mobile sidebar
 */

const FilterSidebar = ({ filters, onChange, studentGender, isOpen, onClose }) => {
  // ── Filter section helper ───────────────────────────────────────────────
  const Section = ({ title, children }) => (
    <div className="mb-5">
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{title}</h4>
      {children}
    </div>
  )

  // ── Option button helper ────────────────────────────────────────────────
  const OptionBtn = ({ label, active, onClick, disabled = false }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border
        ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
        ${active
          ? 'bg-violet-100 text-violet-700 border-violet-300'
          : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-violet-200'}
      `}
    >
      {label}
    </button>
  )

  const sidebarContent = (
    <>
      {/* ── Gender (locked based on student) ─────────────────────── */}
      <Section title="Gender">
        <div className="flex gap-2 flex-wrap">
          <OptionBtn label="👨 Male" active={studentGender === 'male'} onClick={() => {}} disabled />
          <OptionBtn label="👩 Female" active={studentGender === 'female'} onClick={() => {}} disabled />
        </div>
        <p className="text-[11px] text-gray-400 mt-1.5 italic">
          Auto-filtered based on your profile
        </p>
      </Section>

      {/* ── Rooms ────────────────────────────────────────────────── */}
      <Section title="Rooms">
        <div className="flex gap-2 flex-wrap">
          {['all', '1', '2', '3', '4', '5+'].map((val) => (
            <OptionBtn
              key={val}
              label={val === 'all' ? 'Any' : val}
              active={filters.rooms === val}
              onClick={() => onChange('rooms', val)}
            />
          ))}
        </div>
      </Section>

      {/* ── Bathrooms ────────────────────────────────────────────── */}
      <Section title="Bathrooms">
        <div className="flex gap-2 flex-wrap">
          {['all', '1', '2', '3+'].map((val) => (
            <OptionBtn
              key={val}
              label={val === 'all' ? 'Any' : val}
              active={filters.bathrooms === val}
              onClick={() => onChange('bathrooms', val)}
            />
          ))}
        </div>
      </Section>

      {/* ── Floor ────────────────────────────────────────────────── */}
      <Section title="Floor">
        <div className="flex gap-2 flex-wrap">
          {['all', '1', '2', '3', '4', '5+'].map((val) => (
            <OptionBtn
              key={val}
              label={val === 'all' ? 'Any' : val}
              active={filters.floor === val}
              onClick={() => onChange('floor', val)}
            />
          ))}
        </div>
      </Section>

      {/* ── Availability toggle ──────────────────────────────────── */}
      <Section title="Availability">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={filters.availableOnly}
              onChange={(e) => onChange('availableOnly', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-violet-500 transition-colors" />
            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow
                            peer-checked:translate-x-5 transition-transform" />
          </div>
          <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
            Available only
          </span>
        </label>
      </Section>

      {/* ── Reset button ─────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => {
          onChange('rooms', 'all')
          onChange('bathrooms', 'all')
          onChange('floor', 'all')
          onChange('availableOnly', false)
        }}
        className="w-full py-2 rounded-lg border border-gray-300 text-xs font-medium
                   text-gray-500 hover:text-violet-600 hover:border-violet-300 transition-all"
      >
        Reset Filters
      </button>
    </>
  )

  return (
    <>
      {/* ── Desktop sidebar (always visible) ───────────────────────── */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-20">
          <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-violet-500" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </h3>
          {sidebarContent}
        </div>
      </aside>

      {/* ── Mobile sidebar (slide-in overlay) ──────────────────────── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          {/* Panel */}
          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl p-5 overflow-y-auto
                          animate-[slideIn_0.2s_ease-out]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-violet-500" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  )
}

export default FilterSidebar
