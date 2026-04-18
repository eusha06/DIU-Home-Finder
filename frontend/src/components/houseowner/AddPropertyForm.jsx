import { useState } from 'react'
import { propertiesAPI, uploadAPI } from '../../api/index.js'

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
  gender: 'any',
  rooms: '',
  bathrooms: '',
  floor: '',
  availableSeats: '',
  description: '',
  facilities: [],
  available: true,
}

const Field = ({ label, name, type = 'text', placeholder, value, error, onChange }) => (
  <div>
    <label className="block text-sm font-semibold text-[#303760] mb-1.5">{label}</label>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-[#1e244b] outline-none transition-colors duration-200
        ${error ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-[#c9d3ff] focus:border-[#5d6ee7] focus:ring-2 focus:ring-[#cad3ff]'}`}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
)

const AddPropertyForm = ({ onAddProperty }) => {
  const [formData, setFormData] = useState({ ...initialFormState })
  const [imagePreviews, setImagePreviews] = useState([])
  const [imageFiles, setImageFiles]       = useState([])
  const [errors, setErrors] = useState({})
  const [uploadWarning, setUploadWarning] = useState('')
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
  setImageFiles((prev) => [...prev, ...files])   
}

const removeImage = (index) => {
  setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  setImageFiles((prev) => prev.filter((_, i) => i !== index))  
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
    setUploadWarning('')

    // Call real backend API to create the property
    const data = await propertiesAPI.create({
      title:            formData.title,
      description:      formData.description,
      type:             'room',           // owner form doesn't pick type yet — default to room
      rent:             Number(formData.rent),
      address:          formData.location,
      area:             formData.location,
      total_seats:      Number(formData.availableSeats) || 1,
      is_available:     formData.available,
      gender_preference: formData.gender,
      amenities:        formData.facilities,
    })

    let uploadedImageUrls = []

    // Step 2 — Upload images if any were selected
if (imageFiles.length > 0) {
  try {
    const uploadResult = await uploadAPI.uploadImages(data.property.id, imageFiles)
    uploadedImageUrls = (uploadResult.images || [])
      .map((img) => img.image_url)
      .filter(Boolean)
  } catch (uploadErr) {
    console.error('Image upload failed:', uploadErr.message)
    setUploadWarning(uploadErr.message || 'Property was added, but image upload failed.')
  }
}

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
        images:         uploadedImageUrls.length > 0
                          ? uploadedImageUrls
                          : imagePreviews.length > 0
                          ? imagePreviews
                          : ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600'],
        postedAt:       new Date().toISOString().split('T')[0],
      })
    }

    // Reset form on success
    setFormData({ ...initialFormState })
    setImagePreviews([])
    setImageFiles([])
    setErrors({})
    setSubmitSuccess(true)
    setTimeout(() => setSubmitSuccess(false), 3000)

  } catch (err) {
    setErrors({ api: err.message || 'Failed to add property' })
  } finally {
    setSubmitting(false)
  }
}
  return (
    <div className="relative overflow-hidden rounded-[24px] border border-[#b7c5ff] bg-[linear-gradient(180deg,#eef2ff_0%,#f8f9ff_100%)] shadow-[0_22px_45px_-34px_rgba(44,61,156,0.85)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_6%_8%,rgba(144,162,255,0.28),transparent_35%),radial-gradient(circle_at_92%_0%,rgba(186,201,255,0.3),transparent_30%)]" />
      <div className="relative px-5 sm:px-6 py-5 border-b border-[#d8e0ff]">
        <h3 className="text-lg sm:text-xl font-semibold text-[#1f2757]">Add New Property</h3>
        <p className="text-sm text-[#6570a9] mt-1">Fill in the details to list a new property</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="relative p-4 sm:p-6 space-y-5">
        {/* Basic Info */}
        <div className="rounded-2xl border border-[#cfdaff] bg-white/80 p-4 sm:p-5">
          <p className="text-xs uppercase tracking-[0.16em] font-bold text-[#7482be] mb-3">Basic Details</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Property Title" name="title" placeholder="e.g. Green Valley Apartment" value={formData.title} error={errors.title} onChange={handleChange} />
            <Field label="Location" name="location" placeholder="e.g. Dhanmondi, Dhaka" value={formData.location} error={errors.location} onChange={handleChange} />
            <Field label="Rent (৳/month)" name="rent" type="number" placeholder="e.g. 5000" value={formData.rent} error={errors.rent} onChange={handleChange} />
            <div>
              <label className="block text-sm font-semibold text-[#303760] mb-1.5">Gender Allowed</label>
              <div className="flex rounded-xl bg-[#eef1ff] border border-[#d3dcff] p-1">
                {[
                  { key: 'any', label: '🌐 Any' },
                  { key: 'male', label: '👨 Male' },
                  { key: 'female', label: '👩 Female' },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, gender: key }))}
                    className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200
                      ${formData.gender === key ? 'bg-white text-[#3850cc] shadow-sm' : 'text-[#6370a3] hover:text-[#45518a]'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Room Details */}
        <div className="rounded-2xl border border-[#cfdaff] bg-white/80 p-4 sm:p-5">
          <p className="text-xs uppercase tracking-[0.16em] font-bold text-[#7482be] mb-3">Capacity</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Field label="Rooms" name="rooms" type="number" placeholder="e.g. 3" value={formData.rooms} error={errors.rooms} onChange={handleChange} />
            <Field label="Bathrooms" name="bathrooms" type="number" placeholder="e.g. 2" value={formData.bathrooms} error={errors.bathrooms} onChange={handleChange} />
            <Field label="Floor" name="floor" type="number" placeholder="e.g. 2" value={formData.floor} error={errors.floor} onChange={handleChange} />
            <Field label="Available Seats" name="availableSeats" type="number" placeholder="e.g. 4" value={formData.availableSeats} error={errors.availableSeats} onChange={handleChange} />
          </div>
        </div>

        {/* Description */}
        <div className="rounded-2xl border border-[#cfdaff] bg-white/80 p-4 sm:p-5">
          <label className="block text-sm font-semibold text-[#303760] mb-1.5">Description</label>
          <textarea
            name="description"
            rows={4}
            placeholder="Describe the property, surroundings, rules, etc."
            value={formData.description}
            onChange={handleChange}
            className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#1e244b] outline-none resize-none transition-colors duration-200
              ${errors.description ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-[#c9d3ff] focus:border-[#5d6ee7] focus:ring-2 focus:ring-[#cad3ff]'}`}
          />
          {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
        </div>

        {/* Facilities */}
        <div className="rounded-2xl border border-[#cfdaff] bg-white/80 p-4 sm:p-5">
          <label className="block text-sm font-semibold text-[#303760] mb-2">Facilities</label>
          <div className="flex flex-wrap gap-2">
            {facilityOptions.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => handleFacilityToggle(key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border
                  ${formData.facilities.includes(key)
                    ? 'bg-[#e8edff] text-[#3249c1] border-[#9db0ff] shadow-sm'
                    : 'bg-white text-[#5f6998] border-[#d4dcff] hover:bg-[#f3f6ff]'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div className="rounded-2xl border border-[#cfdaff] bg-white/80 p-4 sm:p-5">
          <label className="block text-sm font-semibold text-[#303760] mb-2">Upload Images</label>
          <div className="flex flex-wrap gap-3 mb-3">
            {imagePreviews.map((src, i) => (
              <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden border border-[#cdd8ff] group">
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
            <label className="w-24 h-24 rounded-xl border-2 border-dashed border-[#b8c7ff] bg-[#f5f7ff] flex flex-col items-center justify-center cursor-pointer hover:border-[#6f82ef] hover:bg-[#ebefff] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#6c7ab5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-[10px] text-[#6c7ab5] mt-1">Add</span>
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center justify-between bg-[linear-gradient(120deg,#edf1ff_0%,#f6f8ff_100%)] rounded-2xl px-5 py-4 border border-[#cdd9ff]">
          <div>
            <p className="text-sm font-semibold text-[#2d3568]">Availability Status</p>
            <p className="text-xs text-[#6f79ad] mt-0.5">
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

{uploadWarning && (
  <div className="mb-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
    Property added, but image upload failed: {uploadWarning}
  </div>
)}

<button
  type="submit"
  disabled={submitting}
  className="w-full py-3 rounded-xl bg-[linear-gradient(120deg,#3f56d0_0%,#2f45bf_55%,#2639a5_100%)] text-white font-semibold
             hover:brightness-110 active:scale-[0.98] transition-all duration-200
             shadow-[0_16px_32px_-20px_rgba(47,69,191,0.9)] disabled:opacity-60 disabled:cursor-not-allowed"
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
