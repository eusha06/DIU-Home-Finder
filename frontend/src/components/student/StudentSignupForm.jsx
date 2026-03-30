import { useState } from 'react'
import { authAPI } from '../../api/index.js'
import FormInput from '../shared/FormInput'
import { UserIcon, EmailIcon, PhoneIcon, IdIcon, LockIcon } from '../shared/Icons'

/**
 * StudentSignupForm.jsx
 * ─────────────────────
 * Registration form for students (step 2 of signup).
 *
 * Fields: Full Name, DIU Email, Phone, Student ID, Gender, Password, Confirm Password
 *
 * Props:
 *   onSwitchToLogin – callback to switch to the Login tab
 */
const StudentSignupForm = ({ onSwitchToLogin, onStudentLogin }) => {
  // ── Form state ──────────────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    studentId: '',
    gender: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // ── Helpers ─────────────────────────────────────────────────────────────
  const isValidDiuEmail = (email) => /^[^\s@]+@diu\.edu\.bd$/i.test(email)
  const isValidPhone = (phone) => /^01[3-9]\d{8}$/.test(phone)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // ── Submit handler ──────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = {}

    if (!formData.fullName.trim()) errs.fullName = 'Full name is required.'

    if (!formData.email) {
      errs.email = 'DIU email is required.'
    } else if (!isValidDiuEmail(formData.email)) {
      errs.email = 'Email must end with @diu.edu.bd'
    }

    if (!formData.phone) {
      errs.phone = 'Phone number is required.'
    } else if (!isValidPhone(formData.phone)) {
      errs.phone = 'Enter a valid BD phone (e.g. 01XXXXXXXXX).'
    }

    if (!formData.studentId.trim())
      errs.studentId = 'Student ID is required.'
    if (!formData.gender)
      errs.gender = 'Please select your gender.'

    if (!formData.password) {
      errs.password = 'Password is required.'
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.'
    }

    if (!formData.confirmPassword) {
      errs.confirmPassword = 'Please confirm your password.'
    } else if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.'
    }

    setErrors(errs)

    if (Object.keys(errs).length > 0) return

    try {
      setLoading(true)

      await authAPI.register({
       name:           formData.fullName,
       email:          formData.email,
       password:       formData.password,
       role:           'student',
       phone:          formData.phone,
       diu_student_id: formData.studentId,
       gender:         formData.gender,
   })

   if (onStudentLogin) {
     await onStudentLogin(formData.email, formData.password, formData.gender || 'any')
    }

    } catch (err) {
      setErrors({ api: err.message })
    } finally {
      setLoading(false)
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>

        <FormInput
          label="Full Name"
          name="fullName"
          placeholder="e.g. Rahim Uddin"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          icon={<UserIcon />}
        />

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
          label="Student ID"
          name="studentId"
          placeholder="e.g. 0242310005101"
          value={formData.studentId}
          onChange={handleChange}
          error={errors.studentId}
          icon={<IdIcon />}
        />

        {/* Gender selector */}
        <div className="mb-3.5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>

          <div className="flex gap-3">
            {['Male', 'Female'].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    gender: g.toLowerCase(),
                  }))
                }
                className={`
                  flex-1 py-2.5 rounded-lg border text-sm font-medium
                  transition-all duration-200
                  ${
                    formData.gender === g.toLowerCase()
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm'
                      : 'border-gray-300 bg-gray-50 text-gray-600 hover:border-indigo-300'
                  }
                `}
              >
                {g === 'Male' ? '👨' : '👩'} {g}
              </button>
            ))}
          </div>

          {errors.gender && (
            <p className="mt-1 text-xs text-red-500">
              {errors.gender}
            </p>
          )}
        </div>

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
            shadow-md hover:shadow-lg mt-1
            disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

      </form>
    </div>
  )
}

export default StudentSignupForm