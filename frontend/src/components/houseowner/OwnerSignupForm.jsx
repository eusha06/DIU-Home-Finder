import { useState } from 'react'
import FormInput from '../shared/FormInput'
import { UserIcon, EmailIcon, PhoneIcon, IdIcon, BuildingIcon, LocationIcon, LockIcon } from '../shared/Icons'

/**
 * OwnerSignupForm.jsx
 * ────────────────────
 * Registration form for house owners (step 2 of signup).
 *
 * Fields: Full Name, Email, Phone, National ID, Building Name, Location, Password, Confirm Password
 *
 * Props:
 *   onSwitchToLogin – callback to switch to the Login tab
 */
const OwnerSignupForm = ({ onSwitchToLogin, onOwnerLogin }) => {
  // ── Form state ──────────────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    nationalId: '',
    buildingName: '',
    location: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})

  // ── Helpers ─────────────────────────────────────────────────────────────
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isValidPhone = (phone) => /^01[3-9]\d{8}$/.test(phone)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // ── Submit handler ──────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}

    // Full Name
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required.'

    // Email
    if (!formData.email) {
      errs.email = 'Email is required.'
    } else if (!isValidEmail(formData.email)) {
      errs.email = 'Please enter a valid email address.'
    }

    // Phone
    if (!formData.phone) {
      errs.phone = 'Phone number is required.'
    } else if (!isValidPhone(formData.phone)) {
      errs.phone = 'Enter a valid BD phone (e.g. 01XXXXXXXXX).'
    }

    // National ID
    if (!formData.nationalId.trim()) errs.nationalId = 'National ID is required.'

    // Building name
    if (!formData.buildingName.trim()) errs.buildingName = 'Building / property name is required.'

    // Location
    if (!formData.location.trim()) errs.location = 'Location is required.'

    // Password
    if (!formData.password) {
      errs.password = 'Password is required.'
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.'
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      errs.confirmPassword = 'Please confirm your password.'
    } else if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.'
    }

    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      console.log('Owner Signup Data:', { role: 'owner', ...formData })
      if (onOwnerLogin) {
        onOwnerLogin({
          fullName: formData.fullName,
          email: formData.email,
        })
      }
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        <FormInput
          label="Full Name"
          name="fullName"
          placeholder="e.g. Karim Ahmed"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          icon={<UserIcon />}
        />

        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          icon={<EmailIcon />}
        />

        <FormInput
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="01XXXXXXXXX"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          icon={<PhoneIcon />}
        />

        <FormInput
          label="National ID (NID)"
          name="nationalId"
          placeholder="e.g. 1234567890123"
          value={formData.nationalId}
          onChange={handleChange}
          error={errors.nationalId}
          icon={<IdIcon />}
        />

        <FormInput
          label="Building / Property Name"
          name="buildingName"
          placeholder="e.g. Green Valley Apartments"
          value={formData.buildingName}
          onChange={handleChange}
          error={errors.buildingName}
          icon={<BuildingIcon />}
        />

        <FormInput
          label="Location"
          name="location"
          placeholder="e.g. Dhanmondi, Dhaka"
          value={formData.location}
          onChange={handleChange}
          error={errors.location}
          icon={<LocationIcon />}
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          placeholder="Min. 6 characters"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          icon={<LockIcon />}
        />

        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Re-enter password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          icon={<LockIcon />}
        />

        {/* Register button */}
        <button
          type="submit"
          className="w-full py-2.5 rounded-lg bg-blue-700 text-white font-semibold
                     hover:bg-blue-800 active:scale-[0.98] transition-all duration-200
                     shadow-md hover:shadow-lg mt-1"
        >
          Create Account
        </button>
      </form>

      <p className="text-center text-xs text-gray-400 mt-5">
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="text-blue-700 hover:underline font-medium">
          Login
        </button>
      </p>
    </div>
  )
}

export default OwnerSignupForm
