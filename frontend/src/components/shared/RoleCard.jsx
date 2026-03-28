/**
 * RoleCard.jsx
 * ────────────
 * Clickable card for choosing between Student and House Owner
 * during the first step of the Sign Up flow.
 */

const RoleCard = ({ emoji, title, description, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      w-full p-5 rounded-xl border-2 text-left transition-all duration-200
      hover:shadow-md cursor-pointer group
      ${selected
        ? 'border-indigo-500 bg-indigo-50 shadow-md'
        : 'border-gray-200 bg-white hover:border-indigo-300'}
    `}
  >
    <div className="flex items-center gap-4">
      <span className="text-3xl">{emoji}</span>
      <div>
        <h3 className={`font-semibold text-sm ${selected ? 'text-indigo-700' : 'text-gray-800'}`}>
          {title}
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      {/* Radio-style circle indicator */}
      <div className="ml-auto">
        <div className={`
          w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
          ${selected ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'}
        `}>
          {selected && (
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
    </div>
  </button>
)

export default RoleCard
