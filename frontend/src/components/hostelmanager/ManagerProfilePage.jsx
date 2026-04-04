import { useEffect, useMemo, useState } from 'react'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const bdPhonePattern = /^01[3-9]\d{8}$/

const ManagerProfilePage = ({ manager, onSaveProfile }) => {
  const initialValues = useMemo(
    () => ({
      fullName: manager?.fullName || manager?.name || '',
      email: manager?.email || '',
      phone: manager?.phone || '',
      employeeId: manager?.employeeId || '',
      hostelName: manager?.hostelName || '',
      avatarUrl: manager?.avatar || '',
      bio: manager?.bio || '',
    }),
    [manager]
  )

  const [formData, setFormData] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [saveState, setSaveState] = useState({ loading: false, success: '', error: '' })

  useEffect(() => {
    setFormData(initialValues)
    setErrors({})
    setSaveState({ loading: false, success: '', error: '' })
  }, [initialValues])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  const validate = () => {
    const nextErrors = {}

    if (!formData.fullName.trim()) {
      nextErrors.fullName = 'Full name is required.'
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!emailPattern.test(formData.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (formData.phone.trim() && !bdPhonePattern.test(formData.phone.trim())) {
      nextErrors.phone = 'Use a valid BD phone number (01XXXXXXXXX).'
    }

    if (formData.avatarUrl.trim()) {
      try {
        const parsed = new URL(formData.avatarUrl.trim())
        if (!/^https?:$/.test(parsed.protocol)) {
          nextErrors.avatarUrl = 'Image URL must start with http:// or https://.'
        }
      } catch {
        nextErrors.avatarUrl = 'Please enter a valid image URL.'
      }
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validate()) return

    const payload = {
      name: formData.fullName.trim(),
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim() || null,
      employeeId: formData.employeeId.trim(),
      hostelName: formData.hostelName.trim(),
      avatar: formData.avatarUrl.trim(),
      bio: formData.bio.trim(),
    }

    try {
      setSaveState({ loading: true, success: '', error: '' })
      await onSaveProfile(payload)
      setSaveState({ loading: false, success: 'Profile updated successfully.', error: '' })
    } catch (error) {
      setSaveState({
        loading: false,
        success: '',
        error: error?.message || 'Failed to update profile. Please try again.',
      })
    }
  }

  const handleReset = () => {
    setFormData(initialValues)
    setErrors({})
    setSaveState({ loading: false, success: '', error: '' })
  }

  const initials = (formData.fullName || 'Manager')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')

  return (
    <div className="space-y-6 sm:space-y-7">
      <section className="rounded-[22px] border border-[#9bb0ff] bg-[linear-gradient(132deg,#18205c_0%,#23358f_48%,#3650be_100%)] px-5 sm:px-7 py-6 text-white shadow-[0_24px_45px_-30px_rgba(14,27,99,0.95)]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-white/70 font-semibold">Manager Portal</p>
            <h3 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-[-0.02em]">Edit Profile</h3>
            <p className="mt-2 text-sm text-white/85 max-w-2xl">
              Keep your manager profile updated for smoother hostel operations and communication.
            </p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm">
            <p className="text-white/70">Account Type</p>
            <p className="font-semibold">Hostel Manager</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-[1.65fr_1fr] gap-5 sm:gap-6">
        <form
          onSubmit={handleSubmit}
          className="rounded-[22px] border border-[#c8d3ff] bg-[linear-gradient(180deg,#f9fbff_0%,#f2f6ff_100%)] p-4 sm:p-6 shadow-[0_20px_40px_-30px_rgba(36,56,143,0.65)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              placeholder="e.g. Rafiq Ahmed"
            />

            <Field
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="manager@example.com"
            />

            <Field
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="01XXXXXXXXX"
            />

            <Field
              label="Employee ID"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="e.g. EMP-2026-001"
            />

            <Field
              label="Hostel / Hall Name"
              name="hostelName"
              value={formData.hostelName}
              onChange={handleChange}
              placeholder="e.g. Shahjalal Hall"
            />

            <Field
              label="Profile Image URL"
              name="avatarUrl"
              value={formData.avatarUrl}
              onChange={handleChange}
              error={errors.avatarUrl}
              placeholder="https://..."
            />

            <Field
              label="Short Bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Describe your role and hostel operation focus"
              as="textarea"
              className="md:col-span-2"
            />
          </div>

          {(saveState.error || saveState.success) && (
            <div
              className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
                saveState.error
                  ? 'border-[#f4c4ca] bg-[#fff1f2] text-[#a9404b]'
                  : 'border-[#bfe8cc] bg-[#eafbf0] text-[#28623a]'
              }`}
            >
              {saveState.error || saveState.success}
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={saveState.loading}
              className="px-5 py-2.5 rounded-xl bg-[#2640b8] text-white text-sm font-semibold hover:bg-[#1f3498] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saveState.loading ? 'Saving...' : 'Save Changes'}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl border border-[#cfd8ff] bg-white text-[#485487] text-sm font-semibold hover:bg-[#f5f8ff] transition-colors"
            >
              Discard
            </button>
          </div>
        </form>

        <aside className="rounded-[22px] border border-[#c8d3ff] bg-white p-5 sm:p-6 shadow-[0_20px_38px_-32px_rgba(36,56,143,0.65)]">
          <p className="text-xs uppercase tracking-[0.12em] text-[#7e89bc] font-semibold">Live Preview</p>

          <div className="mt-4 rounded-2xl border border-[#d9e2ff] bg-[linear-gradient(165deg,#f4f7ff_0%,#ffffff_100%)] p-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#d4defe] bg-[#dce5ff] flex items-center justify-center text-[#2f4eca] font-semibold">
                {formData.avatarUrl ? (
                  <img src={formData.avatarUrl} alt={formData.fullName || 'Manager'} className="w-full h-full object-cover" />
                ) : (
                  initials || 'M'
                )}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#25305e] truncate">{formData.fullName || 'Manager Name'}</p>
                <p className="text-xs text-[#7480b2] truncate">{formData.email || 'manager@email.com'}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-xs text-[#4b578e]">
              <p><span className="font-semibold">Phone:</span> {formData.phone || '-'}</p>
              <p><span className="font-semibold">Employee ID:</span> {formData.employeeId || '-'}</p>
              <p><span className="font-semibold">Hostel:</span> {formData.hostelName || '-'}</p>
            </div>

            {formData.bio && (
              <p className="mt-4 text-xs text-[#5d699b] leading-relaxed">{formData.bio}</p>
            )}
          </div>

          <div className="mt-4 rounded-2xl border border-[#dce4ff] bg-[#f8faff] p-3.5 text-xs text-[#6471a7] leading-relaxed">
            Name, email, and phone update your account profile. Other fields are saved locally for manager workspace personalization.
          </div>
        </aside>
      </div>
    </div>
  )
}

const Field = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  as = 'input',
  className = '',
  error,
}) => {
  const sharedClasses = `w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#1f2852] outline-none transition-colors ${
    error
      ? 'border-[#ef9ca5] focus:border-[#d65766]'
      : 'border-[#d5ddff] focus:border-[#5f73e2]'
  }`

  return (
    <label className={`block ${className}`}>
      <span className="block text-xs font-semibold uppercase tracking-[0.09em] text-[#6b78ae] mb-1.5">{label}</span>

      {as === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
          className={`${sharedClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={sharedClasses}
        />
      )}

      {error && <span className="mt-1.5 block text-xs text-[#c44f5b]">{error}</span>}
    </label>
  )
}

export default ManagerProfilePage
