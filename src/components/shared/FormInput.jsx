/**
 * FormInput.jsx
 * ─────────────
 * Reusable input component with label, leading icon, and inline error.
 * Used by both Student and House Owner forms.
 */

const FormInput = ({ label, name, type = 'text', placeholder, value, onChange, error, icon }) => (
  <div className="mb-3.5">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {icon}
        </span>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full rounded-lg border bg-gray-50 px-4 py-2.5 text-sm
          transition-colors duration-200 outline-none
          ${icon ? 'pl-10' : ''}
          ${error
            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
            : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'}
        `}
      />
    </div>
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
)

export default FormInput
