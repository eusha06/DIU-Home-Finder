import { useState } from 'react'
import FormInput from '../shared/FormInput'
import { EmailIcon, LockIcon } from '../shared/Icons'

/**
 * StudentLoginForm.jsx
 * ────────────────────
 * Login form for students.
 * Validates that the email ends with @diu.edu.bd.
 *
 * Props:
 *   onSwitchToSignup – callback to switch to the Sign Up tab
 */
const StudentLoginForm = ({ onSwitchToSignup, onStudentLogin }) => {
  // ── Form state ──────────────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    gender: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // ── Helpers ─────────────────────────────────────────────────────────────
  const isValidDiuEmail = (email) => /^[^\s@]+@diu\.edu\.bd$/i.test(email)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // ── Submit handler ──────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = {}

    if (!formData.email) {
      errs.email = 'Email is required.'
    } else if (!isValidDiuEmail(formData.email)) {
      errs.email = 'Student email must end with @diu.edu.bd'
    }

    if (!formData.password) {
      errs.password = 'Password is required.'
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.'
    }

    setErrors(errs)

    // Stop here if there are validation errors
    if (Object.keys(errs).length > 0) return

    try {
      setLoading(true)

      // Delegate auth to AuthPage/AuthContext so state stays in one place
      if (onStudentLogin) {
      await onStudentLogin(formData.email, formData.password, formData.gender || 'any')
  }
    } catch (err) {
      // Show backend error (e.g. "Invalid email or password")
      setErrors({ api: err.message || 'Login failed' })
    } finally {
      setLoading(false)
    }
  }
  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        <FormInput
          label="DIU Email"
          name="email"
          type="email"
          placeholder="yourname@diu.edu.bd"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          icon={<EmailIcon />}
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          icon={<LockIcon />}
        />

        {/* Gender selector for filtering */}
        <div className="mb-3.5">
          <label className="block text-sm font-medium text-gray-700 mb-1">I am</label>
          <div className="flex gap-3">
            {['Male', 'Female'].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, gender: g.toLowerCase() }))}
                className={`
                  flex-1 py-2 rounded-lg border text-sm font-medium transition-all duration-200
                  ${formData.gender === g.toLowerCase()
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm'
                    : 'border-gray-300 bg-gray-50 text-gray-600 hover:border-indigo-300'}
                `}
              >
                {g === 'Male' ? '👨' : '👩'} {g}
              </button>
            ))}
          </div>
        </div>

        {/* Forgot password */}
        <div className="flex justify-end mb-4">
          <button
            type="button"
            className="text-xs text-violet-500 hover:text-violet-700 transition-colors"
            onClick={() => console.log('Student forgot password clicked')}
          >
            Forgot Password?
          </button>
        </div>

      {/* Show API error like "Invalid email or password" */}
{errors.api && (
  <p className="mb-3 text-sm text-red-500 text-center bg-red-50 py-2 rounded-lg">
    {errors.api}
  </p>
)}

<button
  type="submit"
  disabled={loading}
  className="w-full py-2.5 rounded-lg bg-violet-600 text-white font-semibold
             hover:bg-violet-700 active:scale-[0.98] transition-all duration-200
             shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
>
  {loading ? 'Logging in...' : 'Login'}
</button>
      </form>

      <p className="text-center text-xs text-gray-400 mt-5">
        Don&apos;t have an account?{' '}
        <button onClick={onSwitchToSignup} className="text-violet-500 hover:underline font-medium">
          Sign Up
        </button>
      </p>
    </div>
  )
}

export default StudentLoginForm
