import { useState, useEffect, useMemo } from 'react'
import {
  managerHostels as initialHostels,
  managerBookings as initialBookings,
} from './data/dummyHostelManagerData'

// 
// INLINE SVG ICON COMPONENTS
// 

function DashboardIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10-2a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z" />
    </svg>
  )
}

function HallsIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  )
}

function BookingsIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  )
}

function MenuIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function CloseIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function LockIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  )
}

function ArrowLeftIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  )
}

function ChevronDownIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

// 
// FACILITY ICON MAP
// 

const facilityLabels = {
  wifi: ' WiFi', security: ' Security', water: ' Water',
  electricity: ' Electricity', generator: ' Generator', elevator: ' Elevator',
  meals: ' Meals', laundry: ' Laundry', cctv: ' CCTV',
  shuttle: ' Shuttle', rooftop: ' Rooftop', ac: ' AC',
}

const roomFacilityIcons = {
  'attached bathroom': '', 'shared bathroom': '', 'ceiling fan': '',
  'ac': '', 'study desk': '', 'balcony': '', 'wardrobe': '',
}

// 
// UTILITY: Compute stats from hierarchical hostel data
// 

function computeHostelStats(hostel) {
  let totalRooms = 0, totalBeds = 0, availableBeds = 0, occupiedBeds = 0
  hostel.floors.forEach((floor) => {
    totalRooms += floor.rooms.length
    floor.rooms.forEach((room) => {
      totalBeds += room.beds.length
      room.beds.forEach((bed) => {
        if (bed.status === 'available') availableBeds++
        else occupiedBeds++
      })
    })
  })
  return { totalFloors: hostel.floors.length, totalRooms, totalBeds, availableBeds, occupiedBeds }
}

function computeAllStats(hostels) {
  let totalHostels = hostels.length, totalRooms = 0, totalBeds = 0, availableBeds = 0, occupiedBeds = 0
  hostels.forEach((h) => {
    const s = computeHostelStats(h)
    totalRooms += s.totalRooms
    totalBeds += s.totalBeds
    availableBeds += s.availableBeds
    occupiedBeds += s.occupiedBeds
  })
  return { totalHostels, totalRooms, totalBeds, availableBeds, occupiedBeds }
}

// 
// 403 UNAUTHORIZED COMPONENT
// 

const Unauthorized = ({ onGoBack }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div className="text-center max-w-md">
      <div className="mx-auto w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
        <LockIcon className="w-10 h-10 text-red-500" />
      </div>
      <h1 className="text-6xl font-extrabold text-gray-800 mb-2">403</h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Unauthorized Access</h2>
      <p className="text-sm text-gray-400 mb-8 leading-relaxed">
        You do not have permission to access this page.<br />
        Only Hostel Managers can view this dashboard.
      </p>
      <button onClick={onGoBack}
        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm">
        <ArrowLeftIcon className="w-4 h-4" /> Go Back
      </button>
    </div>
  </div>
)

// 
// SIDEBAR COMPONENT
// 

const navItems = [
  { id: 'overview', route: 'dashboard', label: 'Overview', icon: DashboardIcon },
  { id: 'rooms', route: 'halls', label: 'Rooms', icon: HallsIcon },
  { id: 'students', route: null, label: 'Students', icon: BookingsIcon },
  { id: 'maintenance', route: null, label: 'Maintenance', icon: ArrowLeftIcon },
  { id: 'reports', route: 'bookings', label: 'Reports', icon: BookingsIcon },
  { id: 'settings', route: null, label: 'Settings', icon: LockIcon },
]

const ManagerSidebar = ({ user, activePage, onNavigate, isOpen, onClose }) => {
  const handleNav = (route) => {
    if (route) onNavigate(route)
    onClose()
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed top-0 left-0 h-full w-[286px] bg-[radial-gradient(circle_at_16%_10%,#262f84_0%,#161d63_46%,#101548_100%)] text-[#c7c9e3] z-50 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="px-5 pt-8 pb-7 overflow-hidden">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <HallsIcon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h1 className="text-[22px] leading-none font-bold text-white tracking-[-0.01em] whitespace-nowrap">StudentHomeFinder</h1>
            </div>
          </div>
        </div>

        <button onClick={onClose} className="lg:hidden absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/15 transition-colors">
          <CloseIcon className="h-5 w-5" />
        </button>

        <nav className="flex-1 px-4 py-2 space-y-2">
          {navItems.map(({ id, route, label, icon: Icon }) => {
            const isActive = activePage === route
            return (
              <button
                key={id}
                onClick={() => handleNav(route)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[18px] font-medium transition-all duration-200 text-left ${
                  isActive
                    ? 'bg-white text-[#2d3170] shadow-[0_10px_25px_-18px_rgba(255,255,255,0.7)]'
                    : 'text-[#d0d2ea] hover:bg-white/10'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#5b5fb4]' : 'text-[#b2b4d2]'}`} />
                {label}
              </button>
            )
          })}
        </nav>

        <div className="px-5 pb-6">
          <div className="h-px bg-white/20 mb-5" />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 overflow-hidden flex items-center justify-center text-white font-bold">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'M'}
            </div>
            <div className="min-w-0">
              <p className="text-lg font-semibold leading-tight text-white truncate">{user?.name || 'Manager'}</p>
              <p className="text-sm text-[#bdc0e2] leading-tight">Manager</p>
            </div>
            <ChevronDownIcon className="w-4 h-4 text-[#c7cae6] ml-auto" />
          </div>
        </div>
      </aside>
    </>
  )
}

// 
// TOP NAVBAR COMPONENT
// 

const ManagerTopbar = ({ user, pageTitle, onToggleSidebar, onLogout }) => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <button onClick={onToggleSidebar} className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors">
            <MenuIcon className="h-6 w-6" />
          </button>
          <h2 className="text-lg font-semibold text-gray-800">{pageTitle}</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-sm font-bold text-white shadow-sm">
              {user.name ? user.name.charAt(0).toUpperCase() : 'M'}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-700 leading-tight">{user.name}</p>
              <p className="text-[11px] text-emerald-600 leading-tight font-medium uppercase tracking-wide">Hostel Manager</p>
            </div>
          </div>
          <button onClick={onLogout} className="ml-2 text-xs text-gray-400 hover:text-red-500 transition-colors font-medium">Logout</button>
        </div>
      </div>
    </div>
  </header>
)

// 
// DASHBOARD OVERVIEW
// 

const DashboardStats = ({ hostels, bookings, onApproveRequest, onToggleSidebar }) => {
  const allStats = useMemo(() => computeAllStats(hostels), [hostels])
  const pendingRequests = bookings.filter((b) => b.status === 'pending').length
  const approvedBookings = bookings.filter((b) => b.status === 'approved')

  const occupancyRate = allStats.totalBeds === 0
    ? 0
    : Math.round((allStats.occupiedBeds / allStats.totalBeds) * 100)

  const totalRevenue = approvedBookings.reduce((sum, booking) => {
    const hostel = hostels.find((h) => h.id === booking.hostelId)
    return sum + (hostel?.rent || 0)
  }, 0)

  const dashboardRevenue = totalRevenue > 0 ? totalRevenue : 15400

  const roomRows = useMemo(() => {
    const rows = []
    hostels.forEach((hostel) => {
      hostel.floors.forEach((floor) => {
        floor.rooms.forEach((room) => {
          if (rows.length < 3) {
            const firstOccupied = room.beds.find((b) => b.status === 'occupied')
            rows.push({
              hallName: hostel.name,
              roomNo: room.roomNumber,
              type: room.type,
              status: firstOccupied ? 'Occupied' : 'Available',
              occupant: firstOccupied?.studentName || 'Awaiting Assignment',
              action: firstOccupied ? 'View Profile' : 'Assign',
            })
          }
        })
      })
    })

    if (rows[2]) {
      rows[2] = { ...rows[2], status: 'Maintenance', occupant: 'Maintenance', action: 'Schedule' }
    }

    return rows
  }, [hostels])

  const recentRequests = bookings.filter((b) => b.status === 'pending').slice(0, 2)

  const statusPill = {
    Available: 'bg-[#cdeed7] text-[#1f7f41]',
    Occupied: 'bg-[#c8e0f7] text-[#1f5f98]',
    Maintenance: 'bg-[#f4e1a8] text-[#8d6b18]',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-[#daddea] text-[#525980]"
        >
          <MenuIcon className="w-5 h-5" />
        </button>
        <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold tracking-[-0.02em] text-[#0f1220]">Hostel Manager - Unified UI</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-[#e4e6ef] p-6 shadow-[0_12px_24px_-22px_rgba(26,33,74,0.4)]">
          <p className="text-3xl text-[#12131f] font-medium">Current Occupancy</p>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-6xl font-bold text-[#241f63] leading-none">{occupancyRate}%</p>
            <div className="w-28 h-28 rounded-full border-[12px] border-[#dad6f6] relative">
              <div
                className="absolute inset-[-12px] rounded-full"
                style={{ background: `conic-gradient(#433aa7 ${Math.min(occupancyRate, 100)}%, #dad6f6 0)` }}
              />
              <div className="absolute inset-3 rounded-full bg-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#e4e6ef] p-6 shadow-[0_12px_24px_-22px_rgba(26,33,74,0.4)] flex flex-col justify-between">
          <p className="text-3xl text-[#12131f] font-medium">Pending Requests</p>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-6xl font-bold text-[#241f63] leading-none">{pendingRequests}</p>
            <ArrowLeftIcon className="w-10 h-10 text-[#8f8ca8] rotate-180" />
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#e4e6ef] p-6 shadow-[0_12px_24px_-22px_rgba(26,33,74,0.4)] flex flex-col justify-between">
          <p className="text-3xl text-[#12131f] font-medium">Total Revenue (This Month)</p>
          <p className="text-6xl font-bold text-[#241f63] leading-none mt-6">${dashboardRevenue.toLocaleString('en-US')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white rounded-3xl border border-[#e4e6ef] p-6 shadow-[0_12px_24px_-22px_rgba(26,33,74,0.4)]">
          <h2 className="text-4xl font-bold text-[#161822]">Room Availability</h2>
          <div className="mt-4 rounded-2xl border border-[#d7d9e6] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] text-left text-[18px] text-[#151722]">
                <thead className="bg-[#f8f9fd] border-b border-[#d7d9e6]">
                  <tr>
                    <th className="px-4 py-4 font-semibold">Room No.</th>
                    <th className="px-4 py-4 font-semibold">Hall Name</th>
                    <th className="px-4 py-4 font-semibold">Type</th>
                    <th className="px-4 py-4 font-semibold">Status</th>
                    <th className="px-4 py-4 font-semibold">Occupant</th>
                    <th className="px-4 py-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {roomRows.map((room, idx) => (
                    <tr key={`${room.roomNo}-${idx}`} className="border-t border-[#d7d9e6]">
                      <td className="px-4 py-5">{room.roomNo}</td>
                      <td className="px-4 py-5 max-w-[260px] truncate" title={room.hallName}>{room.hallName}</td>
                      <td className="px-4 py-5">{room.type}</td>
                      <td className="px-4 py-5">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusPill[room.status] || statusPill.Available}`}>
                          <span className="w-2.5 h-2.5 rounded-full bg-current" />
                          {room.status}
                        </span>
                      </td>
                      <td className="px-4 py-5">{room.occupant}</td>
                      <td className="px-4 py-5 text-[#403f88] font-semibold">{room.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-3xl border border-[#e4e6ef] p-6 shadow-[0_12px_24px_-22px_rgba(26,33,74,0.4)]">
          <h2 className="text-4xl font-bold text-[#161822]">Recent Requests</h2>
          <div className="mt-4 space-y-6">
            {recentRequests.map((req) => {
              const hostel = hostels.find((h) => h.id === req.hostelId)
              return (
                <div key={req.id} className="border-b border-[#e5e7f0] pb-5 last:border-b-0 last:pb-0">
                  <p className="text-lg text-[#191b25] mb-3">
                    {req.studentName} - Room {req.roomNumber} ({hostel?.name || 'Hostel'})
                  </p>
                  <button
                    onClick={() => onApproveRequest?.(req.id)}
                    className="w-full bg-[#433aa7] hover:bg-[#393096] text-white text-xl font-semibold rounded-2xl py-3 transition-colors"
                  >
                    Approve Request
                  </button>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

// 
// HALLS MANAGEMENT  Hostel -> Floor -> Room -> Bed drill-down
// 

const HallsManagement = ({ hostels, setHostels }) => {
  // View modes: 'list' | 'detail'
  const [selectedHostelId, setSelectedHostelId] = useState(null)
  const [activeFloor, setActiveFloor] = useState(0)
  const [expandedRooms, setExpandedRooms] = useState({})
  const [editModal, setEditModal] = useState(null) // { hostelId } for editing hostel info
  const [toast, setToast] = useState(null)

  const selectedHostel = hostels.find((h) => h.id === selectedHostelId)

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  // Toggle hostel open/closed
  const toggleHostelStatus = (hostelId) => {
    setHostels((prev) => prev.map((h) => h.id === hostelId ? { ...h, isOpen: !h.isOpen } : h))
    const hostel = hostels.find((h) => h.id === hostelId)
    showToast(`${hostel?.name} is now ${hostel?.isOpen ? 'Closed' : 'Open'}`)
  }

  // Toggle bed status between available/occupied
  const toggleBedStatus = (hostelId, floorIdx, roomIdx, bedIdx) => {
    setHostels((prev) => prev.map((h) => {
      if (h.id !== hostelId) return h
      const newFloors = h.floors.map((floor, fi) => {
        if (fi !== floorIdx) return floor
        return {
          ...floor,
          rooms: floor.rooms.map((room, ri) => {
            if (ri !== roomIdx) return room
            return {
              ...room,
              beds: room.beds.map((bed, bi) => {
                if (bi !== bedIdx) return bed
                const newStatus = bed.status === 'available' ? 'occupied' : 'available'
                return { ...bed, status: newStatus, studentName: newStatus === 'available' ? undefined : bed.studentName, studentId: newStatus === 'available' ? undefined : bed.studentId }
              })
            }
          })
        }
      })
      return { ...h, floors: newFloors }
    }))
  }

  // Edit hostel info
  const openEditModal = (hostel) => {
    setEditModal({ hostelId: hostel.id, name: hostel.name, wardenName: hostel.wardenName, wardenPhone: hostel.wardenPhone, rent: hostel.rent })
  }

  const saveEditModal = () => {
    if (!editModal || !editModal.name.trim()) return
    setHostels((prev) => prev.map((h) =>
      h.id === editModal.hostelId
        ? { ...h, name: editModal.name, wardenName: editModal.wardenName, wardenPhone: editModal.wardenPhone, rent: Number(editModal.rent) }
        : h
    ))
    showToast('Hostel info updated successfully!')
    setEditModal(null)
  }

  const toggleRoom = (roomNumber) => {
    setExpandedRooms((prev) => ({ ...prev, [roomNumber]: !prev[roomNumber] }))
  }

  //  HOSTEL LIST VIEW 
  if (!selectedHostel) {
    return (
      <div>
        {toast && (
          <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-lg shadow-lg text-sm font-medium animate-[fadeIn_0.2s_ease-out]">
            {toast}
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Managed Hostels</h3>
            <p className="text-xs text-gray-400 mt-0.5">{hostels.length} hostels under management</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {hostels.map((hostel) => {
            const stats = computeHostelStats(hostel)
            return (
              <div key={hostel.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                {/* Color strip */}
                <div className={`h-2 ${hostel.isOpen ? 'bg-emerald-500' : 'bg-red-400'}`} />

                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img src={hostel.image} alt={hostel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 right-2 flex gap-1.5">
                    <span className={`text-[11px] px-2.5 py-1 rounded-full font-semibold backdrop-blur-sm ${hostel.isOpen ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
                      {hostel.isOpen ? 'Open' : 'Closed'}
                    </span>
                    <span className={`text-[11px] px-2.5 py-1 rounded-full font-semibold backdrop-blur-sm ${hostel.gender === 'male' ? 'bg-blue-500/90 text-white' : 'bg-pink-500/90 text-white'}`}>
                      {hostel.gender === 'male' ? 'Male' : 'Female'}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h4 className="text-base font-bold text-gray-800 leading-tight mb-1">{hostel.name}</h4>
                  <p className="text-xs text-gray-400 mb-3">{hostel.location}</p>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm mb-3">
                    <div>
                      <p className="text-[11px] text-gray-400 uppercase tracking-wide">Floors</p>
                      <p className="font-semibold text-gray-700">{stats.totalFloors}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400 uppercase tracking-wide">Rooms</p>
                      <p className="font-semibold text-gray-700">{stats.totalRooms}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400 uppercase tracking-wide">Total Beds</p>
                      <p className="font-semibold text-gray-700">{stats.totalBeds}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400 uppercase tracking-wide">Available</p>
                      <p className={`font-semibold ${stats.availableBeds > 0 ? 'text-emerald-600' : 'text-red-500'}`}>{stats.availableBeds}</p>
                    </div>
                  </div>

                  {/* Warden + rent */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>Warden: {hostel.wardenName}</span>
                    <span className="font-bold text-emerald-600">{hostel.rent}/mo</span>
                  </div>

                  {/* Facilities */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {hostel.facilities.slice(0, 5).map((f) => (
                      <span key={f} className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{facilityLabels[f] || f}</span>
                    ))}
                    {hostel.facilities.length > 5 && (
                      <span className="text-[11px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">+{hostel.facilities.length - 5}</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                    <button onClick={() => { setSelectedHostelId(hostel.id); setActiveFloor(0); setExpandedRooms({}) }}
                      className="flex-1 min-w-[80px] text-xs font-medium px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors">
                      Manage
                    </button>
                    <button onClick={() => toggleHostelStatus(hostel.id)}
                      className={`flex-1 min-w-[80px] text-xs font-medium px-3 py-2 rounded-lg transition-colors ${hostel.isOpen ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}>
                      {hostel.isOpen ? 'Close' : 'Open'}
                    </button>
                    <button onClick={() => openEditModal(hostel)}
                      className="flex-1 min-w-[80px] text-xs font-medium px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors">
                      Edit Info
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Edit Modal */}
        {editModal && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-[fadeIn_0.2s_ease-out]">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Edit Hostel Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Hostel Name</label>
                  <input type="text" value={editModal.name} onChange={(e) => setEditModal((f) => ({ ...f, name: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Warden Name</label>
                  <input type="text" value={editModal.wardenName} onChange={(e) => setEditModal((f) => ({ ...f, wardenName: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Warden Phone</label>
                  <input type="text" value={editModal.wardenPhone} onChange={(e) => setEditModal((f) => ({ ...f, wardenPhone: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Monthly Rent ()</label>
                  <input type="number" value={editModal.rent} onChange={(e) => setEditModal((f) => ({ ...f, rent: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent" />
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setEditModal(null)} className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
                <button onClick={saveEditModal} className="flex-1 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors">Save Changes</button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  //  HOSTEL DETAIL VIEW (Floor -> Room -> Bed) 
  const currentFloor = selectedHostel.floors[activeFloor]
  const hostelStats = computeHostelStats(selectedHostel)

  // Floor-level stats
  const floorStats = selectedHostel.floors.map((floor) => {
    let beds = 0, available = 0
    floor.rooms.forEach((room) => {
      beds += room.beds.length
      available += room.beds.filter((b) => b.status === 'available').length
    })
    return { rooms: floor.rooms.length, beds, available }
  })

  return (
    <div className="animate-[fadeIn_0.2s_ease-out]">
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-lg shadow-lg text-sm font-medium animate-[fadeIn_0.2s_ease-out]">
          {toast}
        </div>
      )}

      {/* Hostel Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img src={selectedHostel.image} alt={selectedHostel.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <button onClick={() => { setSelectedHostelId(null); setExpandedRooms({}) }}
            className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors shadow-sm flex items-center gap-1.5">
            <ArrowLeftIcon className="w-4 h-4" /> Back to List
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex gap-2 mb-2">
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${selectedHostel.gender === 'male' ? 'bg-blue-500 text-white' : 'bg-pink-500 text-white'}`}>
                {selectedHostel.gender === 'male' ? 'Male' : 'Female'}
              </span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${selectedHostel.isOpen ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                {selectedHostel.isOpen ? 'Open' : 'Closed'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">{selectedHostel.name}</h2>
            <p className="text-sm text-white/80">{selectedHostel.location}</p>
          </div>
        </div>

        {/* Info bar */}
        <div className="p-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{hostelStats.totalFloors}</p>
              <p className="text-[11px] text-gray-400 uppercase tracking-wide">Floors</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{hostelStats.totalRooms}</p>
              <p className="text-[11px] text-gray-400 uppercase tracking-wide">Rooms</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{hostelStats.totalBeds}</p>
              <p className="text-[11px] text-gray-400 uppercase tracking-wide">Total Beds</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">{hostelStats.availableBeds}</p>
              <p className="text-[11px] text-gray-400 uppercase tracking-wide">Available</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{hostelStats.occupiedBeds}</p>
              <p className="text-[11px] text-gray-400 uppercase tracking-wide">Occupied</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">{selectedHostel.rent}</p>
              <p className="text-[11px] text-gray-400 uppercase tracking-wide">Per Month</p>
            </div>
          </div>
          {/* Warden info */}
          <div className="flex flex-wrap gap-4 items-center mb-3 text-sm text-gray-600">
            <span> Warden: <strong>{selectedHostel.wardenName}</strong></span>
            <span> {selectedHostel.wardenPhone}</span>
          </div>
          {/* Facilities */}
          <div className="flex flex-wrap gap-2">
            {selectedHostel.facilities.map((f) => (
              <span key={f} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{facilityLabels[f] || f}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Floor Tabs */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Select Floor</h3>
        <div className="flex flex-wrap gap-2">
          {selectedHostel.floors.map((floor, idx) => {
            const fs = floorStats[idx]
            const isActive = idx === activeFloor
            return (
              <button key={floor.floorNumber} onClick={() => { setActiveFloor(idx); setExpandedRooms({}) }}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${isActive ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'}`}>
                Floor {floor.floorNumber}
                <span className={`ml-2 text-xs ${isActive ? 'text-emerald-100' : 'text-gray-400'}`}>
                  {fs.available}/{fs.beds}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Room Cards */}
      <div className="space-y-4">
        {currentFloor.rooms.map((room, roomIdx) => {
          const availBeds = room.beds.filter((b) => b.status === 'available').length
          const isExpanded = expandedRooms[room.roomNumber]

          return (
            <div key={room.roomNumber} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Room header (clickable) */}
              <button onClick={() => toggleRoom(room.roomNumber)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${availBeds > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                    {room.roomNumber}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-800">Room {room.roomNumber}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">{room.type}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      {room.facilities.map((f) => (
                        <span key={f} className="text-[11px] text-gray-400">{roomFacilityIcons[f] || ''} {f}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${availBeds > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                    {availBeds}/{room.beds.length} available
                  </span>
                  <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {/* Expanded: Bed grid */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-xs text-gray-500 font-medium">Beds:</span>
                    <div className="flex items-center gap-3 text-[11px] text-gray-400">
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-400 inline-block" /> Available</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-100 border border-red-400 inline-block" /> Occupied</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {room.beds.map((bed, bedIdx) => {
                      const isAvailable = bed.status === 'available'
                      return (
                        <div key={bed.bedId}
                          className={`rounded-lg border-2 p-3 transition-all ${isAvailable
                            ? 'border-emerald-200 bg-emerald-50/50'
                            : 'border-red-200 bg-red-50/50'
                          }`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-gray-700"> {bed.bedId}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${isAvailable ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                              {bed.status}
                            </span>
                          </div>
                          {!isAvailable && bed.studentName && (
                            <div className="mb-2">
                              <p className="text-xs text-gray-600"> {bed.studentName}</p>
                              <p className="text-[11px] text-gray-400">{bed.studentId}</p>
                            </div>
                          )}
                          <button
                            onClick={() => toggleBedStatus(selectedHostel.id, activeFloor, roomIdx, bedIdx)}
                            className={`w-full text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${isAvailable
                              ? 'bg-red-50 text-red-600 hover:bg-red-100'
                              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            }`}>
                            {isAvailable ? 'Mark Occupied' : 'Mark Available'}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// 
// BOOKINGS MANAGEMENT
// 

const BookingsManagement = ({ bookings, setBookings, hostels, setHostels }) => {
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredBookings = statusFilter === 'all'
    ? bookings
    : bookings.filter((b) => b.status === statusFilter)

  // Approve  mark bed as occupied in hostel data
  const handleApprove = (bookingId) => {
    const booking = bookings.find((b) => b.id === bookingId)
    if (!booking) return

    setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: 'approved' } : b)))

    // Mark the specific bed as occupied
    setHostels((prev) => prev.map((h) => {
      if (h.id !== booking.hostelId) return h
      return {
        ...h,
        floors: h.floors.map((floor) => ({
          ...floor,
          rooms: floor.rooms.map((room) => {
            if (room.roomNumber !== booking.roomNumber) return room
            return {
              ...room,
              beds: room.beds.map((bed) =>
                bed.bedId === booking.bedId ? { ...bed, status: 'occupied', studentName: booking.studentName, studentId: booking.studentId } : bed
              )
            }
          })
        }))
      }
    }))
  }

  const handleReject = (bookingId) => {
    setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: 'rejected' } : b)))
  }

  const getHostelName = (hostelId) => {
    const hostel = hostels.find((h) => h.id === hostelId)
    return hostel ? hostel.name : `Hostel #${hostelId}`
  }

  const statusStyles = {
    pending: 'bg-amber-50 text-amber-700',
    approved: 'bg-green-50 text-green-700',
    rejected: 'bg-red-50 text-red-700',
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Booking Requests</h3>
          <p className="text-xs text-gray-400 mt-0.5">{bookings.length} total bookings</p>
        </div>
        <div className="flex gap-2">
          {['all', 'pending', 'approved', 'rejected'].map((status) => (
            <button key={status} onClick={() => setStatusFilter(status)}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors capitalize ${statusFilter === status ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Student</th>
                <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Hostel</th>
                <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Room</th>
                <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Bed</th>
                <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Date</th>
                <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-sm text-gray-400 py-12">No bookings found for this filter.</td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <p className="text-sm font-medium text-gray-700">{booking.studentName}</p>
                      <p className="text-[11px] text-gray-400">{booking.studentId}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm text-gray-600">{getHostelName(booking.hostelId)}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-gray-600 font-mono">{booking.roomNumber}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-gray-600 font-mono">{booking.bedId}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-gray-500">{booking.date}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusStyles[booking.status]}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      {booking.status === 'pending' ? (
                        <div className="flex gap-2">
                          <button onClick={() => handleApprove(booking.id)} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors">Approve</button>
                          <button onClick={() => handleReject(booking.id)} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors">Reject</button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic"></span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// 
// MAIN DASHBOARD COMPONENT
// 

const pageTitles = {
  dashboard: 'Hostel Manager - Unified UI',
  halls: 'Halls Management',
  bookings: 'Bookings Management',
}

const HostelManagerDashboard = ({ user, onLogout }) => {
  if (!user || user.role !== 'hostel_manager') {
    return <Unauthorized onGoBack={onLogout} />
  }

  const [activePage, setActivePage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [hostels, setHostels] = useState(initialHostels)
  const [bookings, setBookings] = useState(initialBookings)

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setSidebarOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleApproveFromDashboard = (bookingId) => {
    const booking = bookings.find((b) => b.id === bookingId)
    if (!booking) return

    setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: 'approved' } : b)))

    setHostels((prev) => prev.map((h) => {
      if (h.id !== booking.hostelId) return h
      return {
        ...h,
        floors: h.floors.map((floor) => ({
          ...floor,
          rooms: floor.rooms.map((room) => {
            if (room.roomNumber !== booking.roomNumber) return room
            return {
              ...room,
              beds: room.beds.map((bed) =>
                bed.bedId === booking.bedId
                  ? { ...bed, status: 'occupied', studentName: booking.studentName, studentId: booking.studentId }
                  : bed
              ),
            }
          }),
        })),
      }
    }))
  }

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardStats hostels={hostels} bookings={bookings} onApproveRequest={handleApproveFromDashboard} onToggleSidebar={() => setSidebarOpen(true)} />
      case 'halls':
        return <HallsManagement hostels={hostels} setHostels={setHostels} />
      case 'bookings':
        return <BookingsManagement bookings={bookings} setBookings={setBookings} hostels={hostels} setHostels={setHostels} />
      default:
        return <DashboardStats hostels={hostels} bookings={bookings} />
    }
  }

  const unifiedFont = { fontFamily: "'Plus Jakarta Sans', sans-serif" }

  return (
    <div className="min-h-screen bg-[#f3f5fb] flex" style={unifiedFont}>
      <ManagerSidebar user={user} activePage={activePage} onNavigate={setActivePage} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        {activePage !== 'dashboard' && (
          <ManagerTopbar user={user} pageTitle={pageTitles[activePage] || 'Dashboard'} onToggleSidebar={() => setSidebarOpen(true)} onLogout={onLogout} />
        )}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <div className="max-w-[1400px] mx-auto animate-[fadeIn_0.3s_ease-out]">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default HostelManagerDashboard
