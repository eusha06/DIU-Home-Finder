/**
 * AdminPropertyApprovals.jsx
 * ──────────────────────────
 * Property approval section for the admin panel.
 * Shows property cards with image, title, owner, rent, gender type,
 * and approve / reject action buttons.
 * All actions update local UI state only.
 *
 * Props:
 *   properties     – array of pending property objects
 *   setProperties  – state setter passed from parent
 */
const AdminPropertyApprovals = ({ properties, setProperties }) => {
  // ── Action handlers ────────────────────────────────────────────────────

  /** Approve a property */
  const handleApprove = (propertyId) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === propertyId ? { ...p, status: 'approved' } : p))
    )
  }

  /** Reject a property */
  const handleReject = (propertyId) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === propertyId ? { ...p, status: 'rejected' } : p))
    )
  }

  // ── Status badge colors ────────────────────────────────────────────────
  const statusStyles = {
    pending: 'bg-amber-50 text-amber-700',
    approved: 'bg-green-50 text-green-700',
    rejected: 'bg-red-50 text-red-700',
  }

  return (
    <div>
      {/* Summary bar */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <span className="text-xs text-gray-400">
          Total: <strong className="text-gray-600">{properties.length}</strong>
        </span>
        <span className="text-xs text-amber-500">
          Pending: <strong>{properties.filter((p) => p.status === 'pending').length}</strong>
        </span>
        <span className="text-xs text-green-500">
          Approved: <strong>{properties.filter((p) => p.status === 'approved').length}</strong>
        </span>
        <span className="text-xs text-red-500">
          Rejected: <strong>{properties.filter((p) => p.status === 'rejected').length}</strong>
        </span>
      </div>

      {/* Property cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              {/* Status badge overlay */}
              <span
                className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusStyles[property.status]}`}
              >
                {property.status}
              </span>
            </div>

            {/* Details */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-1">{property.title}</h3>

              <div className="space-y-1 text-xs text-gray-500 mb-3">
                <p>
                  <span className="font-medium text-gray-600">Owner:</span> {property.ownerName}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Rent:</span> ৳{property.rent}/month
                </p>
                <p>
                  <span className="font-medium text-gray-600">Gender:</span>{' '}
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium
                      ${property.genderType === 'Male' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'}`}
                  >
                    {property.genderType}
                  </span>
                </p>
              </div>

              {/* Action buttons (only show for pending properties) */}
              {property.status === 'pending' ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(property.id)}
                    className="flex-1 py-2 rounded-lg text-xs font-medium bg-green-500 text-white hover:bg-green-600 transition-colors duration-200"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(property.id)}
                    className="flex-1 py-2 rounded-lg text-xs font-medium bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <p className={`text-center text-xs font-medium py-2 rounded-lg capitalize ${statusStyles[property.status]}`}>
                  {property.status}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {properties.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No properties to review.</p>
        </div>
      )}
    </div>
  )
}

export default AdminPropertyApprovals
