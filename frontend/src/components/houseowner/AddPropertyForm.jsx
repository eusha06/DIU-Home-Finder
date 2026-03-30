import { useState } from 'react'
import { propertiesAPI } from '../../api/index.js'

/**
 * AddPropertyForm.jsx
 * ───────────────────
 * Form for owners to add a new property listing.
 *
 * Props:
 *   onAddProperty – callback(propertyData) when form is submitted
 */

const facilityOptions = [
  { key: 'wifi', label: '📶 WiFi' },
  { key: 'water', label: '💧 Water' },
  { key: 'electricity', label: '⚡ Electricity' },
  { key: 'security', label: '🔒 Security' },
  { key: 'lift', label: '🛗 Lift' },
]

const initialFormState = {
  title: '',
  location: '',
  rent: '',
  gender: 'male',
  rooms: '',
  bathrooms: '',
  floor: '',
  availableSeats: '',
  description: '',
  facilities: [],
  available: true,
}

const AddPropertyForm = ({ onAddProperty }) => {
  const [formData, setFormData] = useState({ ...initialFormState })
  const [imagePreviews, setImagePreviews] = useState([])
  const [errors, setErrors] = useState({})
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // ── Handlers ──────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFacilityToggle = (facilityKey) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facilityKey)
        ? prev.facilities.filter((f) => f !== facilityKey)
        : [...prev.facilities, facilityKey],
    }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const previews = files.map((file) => URL.createObjectURL(file))
    setImagePreviews((prev) => [...prev, ...previews])
  }

  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAvailabilityToggle = () => {
    setFormData((prev) => ({ ...prev, available: !prev.available }))
  }

  // ── Validation ────────────────────────────────────────────────────────
  const validate = () => {
    const errs = {}
    if (!formData.title.trim()) errs.title = 'Property title is required.'
    if (!formData.location.trim()) errs.location = 'Location is required.'
    if (!formData.rent || Number(formData.rent) <= 0) errs.rent = 'Enter a valid rent amount.'
    if (!formData.rooms || Number(formData.rooms) <= 0) errs.rooms = 'Enter number of rooms.'
    if (!formData.bathrooms || Number(formData.bathrooms) <= 0) errs.bathrooms = 'Enter number of bathrooms.'
    if (!formData.floor || Number(formData.floor) <= 0) errs.floor = 'Enter floor number.'
    if (!formData.availableSeats && formData.availableSeats !== 0) errs.availableSeats = 'Enter available seats.'
    if (!formData.description.trim()) errs.description = 'Description is required.'
    return errs
  }

  // ── Submit ────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
  e.preventDefault()
  const errs = validate()
  setErrors(errs)

  if (Object.keys(errs).length > 0) return

  try {
    setSubmitting(true)

    // Call real backend API to create the property
    const data = await propertiesAPI.create({
      title:            formData.title,
      description:      formData.description,
      type:             'room',           // owner form doesn't pick type yet — default to room
      rent:             Number(formData.rent),
      address:          formData.location,
      area:             formData.location,
      total_seats:      Number(formData.availableSeats) || 1,
      gender_preference: formData.gender,
      amenities:        formData.facilities,
    })

    // Also call parent callback if it exists (for local state update)
    if (onAddProperty) {
      onAddProperty({
        ...formData,
        id:             data.property.id,
        rent:           Number(formData.rent),
        rooms:          Number(formData.rooms),
        bathrooms:      Number(formData.bathrooms),
        floor:          Number(formData.floor),
        availableSeats: Number(formData.availableSeats),
        images:         imagePreviews.length > 0
                          ? imagePreviews
                          : ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600'],
        postedAt:       new Date().toISOString().split('T')[0],
      })
    }

    // Reset form on success
    setFormData({ ...initialFormState })
    setImagePreviews([])
    setErrors({})
    setSubmitSuccess(true)
    setTimeout(() => setSubmitSuccess(false), 3000)

  } catch (err) {
    setErrors({ api: err.message || 'Failed to add property' })
  } finally {
    setSubmitting(false)
  }
}
  // ── Field component ───────────────────────────────────────────────────
  const Field = ({ label, name, type = 'text', placeholder, value, error }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={`w-full rounded-lg border bg-gray-50 px-4 py-2.5 text-sm outline-none transition-colors duration-200
          ${error ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200'}`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className="text-base font-semibold text-gray-800">Add New Property</h3>
        <p className="text-xs text-gray-400 mt-1">Fill in the details to list a new property</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="p-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Field label="Property Title" name="title" placeholder="e.g. Green Valley Apartment" value={formData.title} error={errors.title} />
          <Field label="Location" name="location" placeholder="e.g. Dhanmondi, Dhaka" value={formData.location} error={errors.location} />
          <Field label="Rent (৳/month)" name="rent" type="number" placeholder="e.g. 5000" value={formData.rent} error={errors.rent} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender Allowed</label>
            <div className="flex rounded-lg bg-gray-100 p-1">
              {[{ key: 'male', label: '👨 Male' }, { key: 'female', label: '👩 Female' }].map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, gender: key }))}
                  className={`flex-1 py-2.5 text-xs font-semibold rounded-md transition-all duration-200
                    ${formData.gender === key ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Room Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Field label="Rooms" name="rooms" type="number" placeholder="e.g. 3" value={formData.rooms} error={errors.rooms} />
          <Field label="Bathrooms" name="bathrooms" type="number" placeholder="e.g. 2" value={formData.bathrooms} error={errors.bathrooms} />
          <Field label="Floor" name="floor" type="number" placeholder="e.g. 2" value={formData.floor} error={errors.floor} />
          <Field label="Available Seats" name="availableSeats" type="number" placeholder="e.g. 4" value={formData.availableSeats} error={errors.availableSeats} />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            rows={3}
            placeholder="Describe the property, surroundings, rules, etc."
            value={formData.description}
            onChange={handleChange}
            className={`w-full rounded-lg border bg-gray-50 px-4 py-2.5 text-sm outline-none resize-none transition-colors duration-200
              ${errors.description ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200'}`}
          />
          {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
        </div>

        {/* Facilities */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Facilities</label>
          <div className="flex flex-wrap gap-2">
            {facilityOptions.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => handleFacilityToggle(key)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 border
                  ${formData.facilities.includes(key)
                    ? 'bg-blue-50 text-blue-800 border-blue-300 shadow-sm'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
          <div className="flex flex-wrap gap-3 mb-3">
            {imagePreviews.map((src, i) => (
              <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 group">
                <img src={src} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
            <label className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-[10px] text-gray-400 mt-1">Add</span>
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="mb-8 flex items-center justify-between bg-gray-50 rounded-xl px-5 py-4 border border-gray-200">
          <div>
            <p className="text-sm font-medium text-gray-700">Availability Status</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {formData.available ? 'This property is currently listed as available' : 'This property is marked as not available'}
            </p>
          </div>
          <button
            type="button"
            onClick={handleAvailabilityToggle}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${formData.available ? 'bg-green-500' : 'bg-gray-300'}`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-300
                ${formData.available ? 'translate-x-7' : 'translate-x-0'}`}
            />
          </button>
        </div>

        {/* Submit */}
        {errors.api && (
  <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
    {errors.api}
  </div>
)}

<button
  type="submit"
  disabled={submitting}
  className="w-full py-3 rounded-xl bg-blue-700 text-white font-semibold
             hover:bg-blue-800 active:scale-[0.98] transition-all duration-200
             shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
>
  {submitting ? 'Adding property...' : 'Add Property'}
</button>

        {/* Success message */}
        {submitSuccess && (
          <div className="mt-4 text-center text-sm text-green-600 font-medium bg-green-50 rounded-lg py-2.5 border border-green-200 animate-[fadeIn_0.2s_ease-out]">
            ✅ Property added successfully!
          </div>
        )}
      </form>
    </div>
  )
}

export default AddPropertyForm
