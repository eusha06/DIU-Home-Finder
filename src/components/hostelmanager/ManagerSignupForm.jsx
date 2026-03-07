import { useState } from 'react'
import FormInput from '../shared/FormInput'
import { UserIcon, EmailIcon, PhoneIcon, IdIcon, BuildingIcon, LockIcon } from '../shared/Icons'

/**
 * ManagerSignupForm.jsx
 * ─────────────────────
 * Registration form for hostel managers (step 2 of signup).
 *
 * Fields: Full Name, Email, Phone, Employee ID, Hostel Name, Password, Confirm Password
 *
 * Props:
 *   onSwitchToLogin – callback to switch to the Login tab
 *   onManagerLogin  – callback(managerData) to navigate to manager dashboard
 */
const ManagerSignupForm = ({ onSwitchToLogin, onManagerLogin }) => {
  // ── Form state ──────────────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    employeeId: '',
    hostelName: '',
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

    // Employee ID
    if (!formData.employeeId.trim()) errs.employeeId = 'Employee ID is required.'

    // Hostel Name
    if (!formData.hostelName.trim()) errs.hostelName = 'Hostel / Hall name is required.'

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
      console.log('Manager Signup Data:', { role: 'hostel_manager', ...formData })
      // Navigate to hostel manager dashboard with profile data
      if (onManagerLogin) {
        onManagerLogin({
          name: formData.fullName,
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
          label="Full Name"
          name="fullName"
          placeholder="e.g. Rafiq Ahmed"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          icon={<UserIcon />}
        />

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
          label="Employee ID"
          name="employeeId"
          placeholder="e.g. EMP-2026-001"
          value={formData.employeeId}
          onChange={handleChange}
          error={errors.employeeId}
          icon={<IdIcon />}
        />

        <FormInput
          label="Hostel / Hall Name"
          name="hostelName"
          placeholder="e.g. Shahjalal Hall"
          value={formData.hostelName}
          onChange={handleChange}
          error={errors.hostelName}
          icon={<BuildingIcon />}
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
          className="w-full py-2.5 rounded-lg bg-emerald-600 text-white font-semibold
                     hover:bg-emerald-700 active:scale-[0.98] transition-all duration-200
                     shadow-md hover:shadow-lg mt-1"
        >
          Create Account
        </button>
      </form>

      <p className="text-center text-xs text-gray-400 mt-5">
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="text-emerald-600 hover:underline font-medium">
          Login
        </button>
      </p>
    </div>
  )
}

export default ManagerSignupForm
