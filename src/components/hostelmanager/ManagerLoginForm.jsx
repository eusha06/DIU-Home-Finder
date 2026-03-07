import { useState } from 'react'
import FormInput from '../shared/FormInput'
import { EmailIcon, LockIcon } from '../shared/Icons'

/**
 * ManagerLoginForm.jsx
 * ────────────────────
 * Login form for hostel managers.
 * Accepts any valid email format.
 *
 * Props:
 *   onSwitchToSignup – callback to switch to the Sign Up tab
 *   onManagerLogin   – callback(managerData) to navigate to manager dashboard
 */
const ManagerLoginForm = ({ onSwitchToSignup, onManagerLogin }) => {
  // ── Form state ──────────────────────────────────────────────────────────
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  // ── Helpers ─────────────────────────────────────────────────────────────
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // ── Submit handler ──────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}

    if (!formData.email) {
      errs.email = 'Email is required.'
    } else if (!isValidEmail(formData.email)) {
      errs.email = 'Please enter a valid email address.'
    }

    if (!formData.password) {
      errs.password = 'Password is required.'
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.'
    }

    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      console.log('Manager Login Data:', { role: 'hostel_manager', ...formData })
      // Simulate login – pass manager data to dashboard
      if (onManagerLogin) {
        onManagerLogin({
          name: formData.email.split('@')[0].replace(/[._]/g, ' '),
          email: formData.email,
          role: 'hostel_manager',
        })
      }
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="manager@example.com"
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

        {/* Forgot password */}
        <div className="flex justify-end mb-4">
          <button
            type="button"
            className="text-xs text-emerald-600 hover:text-emerald-700 transition-colors"
            onClick={() => console.log('Manager forgot password clicked')}
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-lg bg-emerald-600 text-white font-semibold
                     hover:bg-emerald-700 active:scale-[0.98] transition-all duration-200
                     shadow-md hover:shadow-lg"
        >
          Login
        </button>
      </form>

      <p className="text-center text-xs text-gray-400 mt-5">
        Don&apos;t have an account?{' '}
        <button onClick={onSwitchToSignup} className="text-emerald-600 hover:underline font-medium">
          Sign Up
        </button>
      </p>
    </div>
  )
}

export default ManagerLoginForm
