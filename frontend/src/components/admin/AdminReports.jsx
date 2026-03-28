/**
 * AdminReports.jsx
 * ────────────────
 * Simple reports section for the admin panel.
 * Lists reported properties with: property name, report reason,
 * reporter name, and a resolve button.
 * All actions update local UI state only.
 *
 * Props:
 *   reports     – array of report objects
 *   setReports  – state setter passed from parent
 */
const AdminReports = ({ reports, setReports }) => {
  // ── Action handler ─────────────────────────────────────────────────────

  /** Mark a report as resolved */
  const handleResolve = (reportId) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, resolved: true } : r))
    )
  }

  // Separate open & resolved reports
  const openReports = reports.filter((r) => !r.resolved)
  const resolvedReports = reports.filter((r) => r.resolved)

  return (
    <div>
      {/* Summary */}
      <div className="flex items-center gap-4 mb-5">
        <span className="text-xs text-gray-400">
          Open: <strong className="text-red-500">{openReports.length}</strong>
        </span>
        <span className="text-xs text-gray-400">
          Resolved: <strong className="text-green-500">{resolvedReports.length}</strong>
        </span>
      </div>

      {/* Report list */}
      <div className="space-y-3">
        {reports.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No reports found.</p>
          </div>
        )}

        {reports.map((report) => (
          <div
            key={report.id}
            className={`bg-white rounded-xl border shadow-sm p-5 transition-all duration-200 hover:shadow-md
              ${report.resolved ? 'border-green-100 opacity-70' : 'border-gray-100'}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              {/* Report details */}
              <div className="flex-1 min-w-0">
                {/* Property name */}
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-gray-800 truncate">{report.propertyName}</h3>
                  {report.resolved && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-50 text-green-700">
                      <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Resolved
                    </span>
                  )}
                </div>

                {/* Reason */}
                <p className="text-xs text-gray-500 mb-2 leading-relaxed">{report.reportReason}</p>

                {/* Reporter */}
                <p className="text-xs text-gray-400">
                  Reported by: <span className="font-medium text-gray-600">{report.reporterName}</span>
                </p>
              </div>

              {/* Resolve button */}
              {!report.resolved && (
                <button
                  onClick={() => handleResolve(report.id)}
                  className="self-start px-4 py-2 rounded-lg text-xs font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition-colors duration-200 whitespace-nowrap"
                >
                  Resolve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminReports
