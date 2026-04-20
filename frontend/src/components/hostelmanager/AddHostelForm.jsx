import { useState } from 'react'
import { propertiesAPI, uploadAPI } from '../../api/index.js'

/**
 * AddHostelForm.jsx
 * ─────────────────
 * Form for Hostel Managers to add a new hostel property.
 */

const amenityOptions = [
  { key: 'wifi', label: '📶 WiFi' },
  { key: 'water', label: '💧 Water' },
  { key: 'electricity', label: '⚡ Electricity' },
  { key: 'security', label: '🔒 Security' },
  { key: 'generator', label: '⚡ Generator' },
  { key: 'elevator', label: '🛗 Elevator' },
  { key: 'meals', label: '🍽️ Meals' },
  { key: 'laundry', label: '🧺 Laundry' },
  { key: 'cctv', label: '📹 CCTV' },
]

const initialFormState = {
  title: '',
  description: '',
  rent: '',
  address: '',
  area: '',
  total_seats: '',
  available_seats: '',
  is_available: true,
  gender_preference: 'any',
  amenities: [],
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

const AddHostelForm = ({ onAddHostel }) => {
  const [formData, setFormData] = useState({ ...initialFormState })
  // hostel_info floors structure
  const [floors, setFloors] = useState([{ floor_number: '1', rooms: [{ room_number: '101', beds_count: 2 }] }])
  
  const [imagePreviews, setImagePreviews] = useState([])
  const [imageFiles, setImageFiles] = useState([])
  const [errors, setErrors] = useState({})
  const [uploadWarning, setUploadWarning] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // ── Handlers ──────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAmenityToggle = (amenityKey) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenityKey)
        ? prev.amenities.filter((a) => a !== amenityKey)
        : [...prev.amenities, amenityKey],
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

  // ── Floors/Rooms Management ───────────────────────────────────────────
  const addFloor = () => {
    const newFloorNum = (floors.length + 1).toString()
    setFloors([...floors, { floor_number: newFloorNum, rooms: [{ room_number: `${newFloorNum}01`, beds_count: 2 }] }])
  }
  const removeFloor = (fIndex) => {
    setFloors(floors.filter((_, i) => i !== fIndex))
  }
  const updateFloorNumber = (fIndex, num) => {
    const newFloors = [...floors]
    newFloors[fIndex].floor_number = num
    setFloors(newFloors)
  }

  const addRoom = (fIndex) => {
    const newFloors = [...floors]
    const floor = newFloors[fIndex]
    const newRoomNum = floor.rooms.length > 0
      ? String(Number(floor.rooms[floor.rooms.length - 1].room_number) + 1)
      : `${floor.floor_number}01`
    floor.rooms.push({ room_number: newRoomNum, beds_count: 2 })
    setFloors(newFloors)
  }
  const removeRoom = (fIndex, rIndex) => {
    const newFloors = [...floors]
    newFloors[fIndex].rooms = newFloors[fIndex].rooms.filter((_, i) => i !== rIndex)
    setFloors(newFloors)
  }
  const updateRoom = (fIndex, rIndex, key, val) => {
    const newFloors = [...floors]
    newFloors[fIndex].rooms[rIndex][key] = val
    setFloors(newFloors)
  }

  const buildHostelInfo = () => {
    // Construct the hostel_info.floors array matching the required schema
    return floors.map(floor => ({
      floor_number: floor.floor_number,
      rooms: floor.rooms.map(room => {
        const beds = []
        const count = Number(room.beds_count) || 1
        for (let i = 1; i <= count; i++) {
          beds.push({ bed_number: `${room.room_number}-${String.fromCharCode(64 + i)}`, status: 'available' }) // e.g. 101-A, 101-B
        }
        return {
          room_number: room.room_number,
          beds
        }
      })
    }))
  }

  const calculateTotalsFromFloors = () => {
    let totalBeds = 0
    floors.forEach(f => {
      f.rooms.forEach(r => {
        totalBeds += (Number(r.beds_count) || 0)
      })
    })
    return totalBeds
  }

  // ── Validation ────────────────────────────────────────────────────────
  const validate = () => {
    const errs = {}
    if (!formData.title.trim()) errs.title = 'Hostel title is required.'
    if (!formData.address.trim()) errs.address = 'Address is required.'
    if (!formData.area.trim()) errs.area = 'Area is required.'
    if (!formData.rent || Number(formData.rent) <= 0) errs.rent = 'Enter a valid rent amount.'
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

      const generatedFloors = buildHostelInfo()
      const calculatedSeats = calculateTotalsFromFloors()
      const totalSeatsToUse = formData.total_seats ? Number(formData.total_seats) : calculatedSeats
      const availableSeatsToUse = formData.available_seats !== '' ? Number(formData.available_seats) : calculatedSeats

      const data = await propertiesAPI.create({
        type: 'hostel',
        title: formData.title,
        description: formData.description,
        rent: Number(formData.rent),
        address: formData.address,
        area: formData.area,
        total_seats: totalSeatsToUse,
        available_seats: availableSeatsToUse,
        is_available: formData.is_available,
        is_verified: false,
        gender_preference: formData.gender_preference,
        amenities: formData.amenities,
        hostel_info: { floors: generatedFloors }
      })

      let uploadedImageUrls = []

      // Upload images if any were selected
      if (imageFiles.length > 0) {
        try {
          const uploadResult = await uploadAPI.uploadImages(data.property.id, imageFiles)
          uploadedImageUrls = (uploadResult.images || [])
            .map((img) => img.image_url)
            .filter(Boolean)
        } catch (uploadErr) {
          console.error('Image upload failed:', uploadErr.message)
          setUploadWarning(uploadErr.message || 'Hostel was added, but image upload failed.')
        }
      }

      // parent callback
      if (onAddHostel) {
        onAddHostel({
          ...formData,
          id: data.property.id,
          rent: Number(formData.rent),
          total_seats: totalSeatsToUse,
          available_seats: availableSeatsToUse,
          hostel_info: { floors: generatedFloors },
          images: uploadedImageUrls.length > 0
            ? uploadedImageUrls
            : imagePreviews.length > 0
              ? imagePreviews
              : ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600'],
          postedAt: new Date().toISOString().split('T')[0],
        })
      }

      // Reset
      setFormData({ ...initialFormState })
      setFloors([{ floor_number: '1', rooms: [{ room_number: '101', beds_count: 2 }] }])
      setImagePreviews([])
      setImageFiles([])
      setErrors({})
      setSubmitSuccess(true)
      setTimeout(() => setSubmitSuccess(false), 3000)

    } catch (err) {
      setErrors({ api: err.message || 'Failed to add hostel' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-[#b7c5ff] bg-[linear-gradient(180deg,#eef2ff_0%,#f8f9ff_100%)] shadow-[0_22px_45px_-34px_rgba(44,61,156,0.85)]">
      <div className="relative px-5 sm:px-6 py-5 border-b border-[#d8e0ff]">
        <h3 className="text-lg sm:text-xl font-semibold text-[#1f2757]">Add New Hostel</h3>
        <p className="text-sm text-[#6570a9] mt-1">Provide hostel details including floor plans</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="relative p-4 sm:p-6 space-y-5">
        {/* Basic Info */}
        <div className="rounded-2xl border border-[#cfdaff] bg-white/80 p-4 sm:p-5">
          <p className="text-xs uppercase tracking-[0.16em] font-bold text-[#7482be] mb-3">Basic Details</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Hostel Title" name="title" placeholder="e.g. Sunny Student Hostel" value={formData.title} error={errors.title} onChange={handleChange} />
            <Field label="Area" name="area" placeholder="e.g. Dhanmondi" value={formData.area} error={errors.area} onChange={handleChange} />
            <Field label="Full Address" name="address" placeholder="e.g. 12/A, Dhanmondi, Dhaka" value={formData.address} error={errors.address} onChange={handleChange} />
            <Field label="Rent (৳/month/seat)" name="rent" type="number" placeholder="e.g. 4000" value={formData.rent} error={errors.rent} onChange={handleChange} />
            <Field label="Total Seats (Auto-calculated if blank)" name="total_seats" type="number" placeholder="e.g. 50" value={formData.total_seats} error={errors.total_seats} onChange={handleChange} />
            <Field label="Available Seats (Auto-calculated if blank)" name="available_seats" type="number" placeholder="e.g. 10" value={formData.available_seats} error={errors.available_seats} onChange={handleChange} />
            <div>
              <label className="block text-sm font-semibold text-[#303760] mb-1.5">Gender Preference</label>
              <div className="flex rounded-xl bg-[#eef1ff] border border-[#d3dcff] p-1">
                {[
                  { key: 'any', label: '🌐 Any' },
                  { key: 'male', label: '👨 Male' },
                  { key: 'female', label: '👩 Female' }
                ].map((g) => (
                  <button
                    key={g.key}
                    type="button"
                    onClick={() => setFormData({ ...formData, gender_preference: g.key })}
                    className={`flex-1 py-1.5 text-xs sm:text-sm font-medium rounded-lg capitalize transition-all ${
                      formData.gender_preference === g.key ? 'bg-white text-[#5d6ee7] shadow-sm' : 'text-[#7482be] hover:text-[#4554b4]'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-[#303760] mb-1.5">Description</label>
              <textarea
                name="description"
                rows="3"
                placeholder="Describe your hostel, rules, nearby places..."
                value={formData.description}
                onChange={handleChange}
                className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#1e244b] outline-none transition-colors duration-200 resize-none
                  ${errors.description ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-[#c9d3ff] focus:border-[#5d6ee7] focus:ring-2 focus:ring-[#cad3ff]'}`}
              />
              {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="rounded-2xl border border-[#cfdaff] bg-white/80 p-4 sm:p-5">
          <p className="text-xs uppercase tracking-[0.16em] font-bold text-[#7482be] mb-3">Amenities</p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {amenityOptions.map((amenity) => (
              <button
                key={amenity.key}
                type="button"
                onClick={() => handleAmenityToggle(amenity.key)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full cursor-pointer transition-all border ${
                  formData.amenities.includes(amenity.key)
                    ? 'border-[#5d6ee7] bg-[#5d6ee7] text-white shadow-md'
                    : 'border-[#c9d3ff] bg-[#f8f9ff] text-[#6570a9] hover:bg-[#eef2ff]'
                }`}
              >
                {amenity.label}
              </button>
            ))}
          </div>
        </div>

        {/* Floor Plan */}
        <div className="rounded-2xl border border-[#cfdaff] bg-white/80 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs uppercase tracking-[0.16em] font-bold text-[#7482be]">Accommodation Setup</p>
            <button type="button" onClick={addFloor} className="text-xs font-semibold text-blue-600 hover:underline">+ Add Floor</button>
          </div>
          
          <div className="space-y-4">
            {floors.map((floor, fIndex) => (
              <div key={fIndex} className="p-3 border border-gray-200 rounded-xl bg-gray-50/50">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-semibold text-gray-700">Floor:</span>
                  <input 
                    className="w-20 px-2 py-1 text-sm border rounded"
                    value={floor.floor_number}
                    onChange={(e) => updateFloorNumber(fIndex, e.target.value)}
                  />
                  {floors.length > 1 && (
                    <button type="button" onClick={() => removeFloor(fIndex)} className="text-xs text-red-500 ml-auto hover:underline">Remove Floor</button>
                  )}
                </div>

                <div className="space-y-2 pl-2 sm:pl-4 border-l-2 border-indigo-100">
                  {floor.rooms.map((room, rIndex) => (
                    <div key={rIndex} className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                      <span className="font-semibold text-gray-600">Room</span>
                      <input 
                        type="text"
                        className="w-16 px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-indigo-300"
                        value={room.room_number}
                        onChange={(e) => updateRoom(fIndex, rIndex, 'room_number', e.target.value)}
                      />
                      <span className="font-semibold text-gray-600 ml-2">Beds</span>
                      <input 
                        type="number"
                        min="1"
                        className="w-16 px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-indigo-300"
                        value={room.beds_count}
                        onChange={(e) => updateRoom(fIndex, rIndex, 'beds_count', e.target.value)}
                      />
                      {floor.rooms.length > 1 && (
                        <button type="button" onClick={() => removeRoom(fIndex, rIndex)} className="text-red-500 text-xs ml-auto font-medium">&times; Rm</button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={() => addRoom(fIndex)} className="text-xs text-indigo-600 font-semibold mt-2 hover:underline">+ Add Room</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="rounded-2xl border border-[#cfdaff] bg-white/80 p-4 sm:p-5">
          <p className="text-xs uppercase tracking-[0.16em] font-bold text-[#7482be] mb-3">Hostel Images</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex h-28 w-28 sm:h-32 sm:w-32 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#c9d3ff] bg-[#f8f9ff] hover:bg-[#eef2ff] hover:border-[#8ea1ff] transition-colors shrink-0">
              <span className="text-2xl sm:text-3xl mb-1 sm:mb-2">📷</span>
              <span className="text-xs font-semibold text-[#6570a9]">Add Photos</span>
              <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
            <div className="flex flex-1 gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {imagePreviews.map((src, index) => (
                <div key={index} className="relative h-28 w-28 sm:h-32 sm:w-32 shrink-0 rounded-2xl border border-[#cfdaff] overflow-hidden shadow-sm group">
                  <img src={src} alt="Preview" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  <button type="button" onClick={() => removeImage(index)} className="absolute top-1.5 right-1.5 bg-red-500/90 hover:bg-red-600 text-white rounded-full p-1 sm:p-1.5 shadow-md">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
          {uploadWarning && <p className="mt-3 text-xs text-orange-600 font-semibold">{uploadWarning}</p>}
        </div>

        {/* Global Errors */}
        {errors.api && (
          <div className="rounded-xl bg-red-50 p-4 border border-red-100">
            <p className="text-sm text-red-600 font-medium text-center">{errors.api}</p>
          </div>
        )}

        {/* Submit */}
        <div className="pt-2">
          {submitSuccess ? (
            <div className="w-full py-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-center font-bold text-sm shadow-sm flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              Hostel Added Successfully!
            </div>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3.5 rounded-xl font-bold text-white text-sm shadow-lg shadow-indigo-200 transition-all duration-300 transform active:scale-[0.98] ${
                submitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#262f84] to-[#3945bd] hover:from-[#1d256e] hover:to-[#2e379c]'
              }`}
            >
              {submitting ? 'Creating Hostel...' : 'Publish Hostel'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default AddHostelForm