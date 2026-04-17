import { useState, useEffect, useMemo, useRef } from 'react'
import {
  managerHostels as initialHostels,
  managerBookings as initialBookings,
} from './data/dummyHostelManagerData'
import ManagerFooter from './ManagerFooter'
import ManagerProfilePage from './ManagerProfilePage'
import { useAuth } from '../../context/AuthContext'

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

function ClockIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l2.5 1.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function BellIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <path d="M6.8 9.5a5.2 5.2 0 1 1 10.4 0v3.1c0 .9.3 1.8.9 2.5l1.1 1.3H4.8l1.1-1.3c.6-.7.9-1.6.9-2.5V9.5Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 18a2 2 0 0 0 4 0" strokeLinecap="round" strokeLinejoin="round" />
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
  { id: 'requests', route: 'bookings', label: 'Requests', icon: BookingsIcon },
  { id: 'settings', route: null, label: 'Settings', icon: LockIcon },
]

const ManagerSidebar = ({ user, activePage, onNavigate, isOpen, onClose, totalRequests = 0 }) => {
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
            const isDisabled = !route
            const showRequestCount = id === 'requests'
            return (
              <button
                key={id}
                onClick={() => handleNav(route)}
                disabled={isDisabled}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[18px] font-medium transition-all duration-200 text-left ${
                  isActive
                    ? 'bg-white text-[#2d3170] shadow-[0_10px_25px_-18px_rgba(255,255,255,0.7)]'
                    : isDisabled
                      ? 'text-[#9ba1cb] bg-white/[0.03] cursor-not-allowed'
                      : 'text-[#d0d2ea] hover:bg-white/10'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#5b5fb4]' : 'text-[#b2b4d2]'}`} />
                <span className="truncate">{label}</span>

                {showRequestCount && (
                  <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-[#2f3c90] text-[#dce2ff] border border-white/15">
                    {totalRequests}
                  </span>
                )}

                {isDisabled && (
                  <span className="ml-auto text-[10px] font-semibold uppercase tracking-[0.08em] text-[#bbc0e4]">Soon</span>
                )}
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

const notificationToneClasses = {
  amber: 'bg-[#fff4dd] text-[#9a6e22] border-[#f7dba2]',
  blue: 'bg-[#e7edff] text-[#3550c9] border-[#bfd0ff]',
  green: 'bg-[#dff7e6] text-[#2f7b49] border-[#a9e4bc]',
  red: 'bg-[#ffe6e8] text-[#b44f59] border-[#f3bfc5]',
}

const managerQuickActions = [
  { id: 'manager-overview', label: 'Manager Overview', action: 'dashboard' },
  { id: 'manager-rooms', label: 'Rooms', action: 'halls' },
  { id: 'manager-requests', label: 'Requests', action: 'bookings' },
  { id: 'manager-profile', label: 'Edit Profile', action: 'profile' },
]

const ManagerTopbar = ({
  user,
  pageTitle,
  onToggleSidebar,
  onLogout,
  notifications = [],
  onNotificationAction,
  onNavigate,
}) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [readNotificationIds, setReadNotificationIds] = useState(new Set())

  const notificationsRef = useRef(null)
  const profileRef = useRef(null)

  const displayName = user?.fullName || user?.name || 'Manager'

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false)
      }

      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }

    const handleEscClose = (event) => {
      if (event.key === 'Escape') {
        setIsNotificationsOpen(false)
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscClose)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscClose)
    }
  }, [])

  useEffect(() => {
    setReadNotificationIds((previous) => {
      const next = new Set()

      notifications.forEach((notification) => {
        if (previous.has(notification.id)) {
          next.add(notification.id)
        }
      })

      return next
    })
  }, [notifications])

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !readNotificationIds.has(notification.id)).length,
    [notifications, readNotificationIds]
  )

  const markAllAsRead = () => {
    setReadNotificationIds(new Set(notifications.map((notification) => notification.id)))
  }

  const handleNotificationClick = (notification) => {
    setReadNotificationIds((previous) => {
      const next = new Set(previous)
      next.add(notification.id)
      return next
    })

    if (notification.action && onNotificationAction) {
      onNotificationAction(notification.action)
    }

    setIsNotificationsOpen(false)
  }

  const handleQuickAction = (action) => {
    if (onNavigate && action) {
      onNavigate(action)
    }

    setIsProfileOpen(false)
  }

  const toggleNotifications = () => {
    setIsNotificationsOpen((previous) => !previous)
    setIsProfileOpen(false)
  }

  const toggleProfileMenu = () => {
    setIsProfileOpen((previous) => !previous)
    setIsNotificationsOpen(false)
  }

  return (
    <header className="bg-gradient-to-r from-[#f8faff] via-[#f1f5ff] to-[#ecf4ff] border-b border-[#d8e1fb] shadow-[0_8px_24px_-22px_rgba(30,58,138,0.65)] sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-[#4f5d93] hover:bg-white hover:text-[#2f417d] transition-colors border border-transparent hover:border-[#d5def6]"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            <h2 className="text-base sm:text-lg font-semibold text-[#1f2d5f] truncate">{pageTitle}</h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div ref={notificationsRef} className="relative">
              <button
                className="relative w-10 h-10 rounded-full flex items-center justify-center transition-colors text-[#4d5f9b] bg-white/80 border border-[#d8e0fb] hover:bg-white"
                type="button"
                aria-label="notifications"
                onClick={toggleNotifications}
              >
                <BellIcon className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#f56a84] text-white text-[10px] font-bold flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 top-full mt-3 w-[320px] max-w-[88vw] rounded-2xl border border-[#d2dcff] bg-white shadow-[0_24px_45px_-28px_rgba(32,49,134,0.7)] overflow-hidden z-40">
                  <div className="px-4 py-3 border-b border-[#e3e9ff] flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#27305f]">Notifications</p>
                      <p className="text-xs text-[#6f79ad]">{notifications.length} item(s)</p>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={markAllAsRead}
                        className="text-xs font-semibold text-[#3a52cc] hover:text-[#2d41a6]"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-[320px] overflow-y-auto p-2 space-y-1">
                    {notifications.length === 0 && (
                      <div className="px-3 py-8 text-center text-sm text-[#7a84b5]">
                        No new notifications right now.
                      </div>
                    )}

                    {notifications.map((notification) => {
                      const isUnread = !readNotificationIds.has(notification.id)
                      const toneClass = notificationToneClasses[notification.tone] || notificationToneClasses.blue

                      return (
                        <button
                          key={notification.id}
                          type="button"
                          onClick={() => handleNotificationClick(notification)}
                          className="w-full text-left rounded-xl p-3 hover:bg-[#f3f6ff] transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`shrink-0 mt-0.5 h-8 w-8 rounded-lg border flex items-center justify-center text-sm ${toneClass}`}>
                              {notification.icon || '•'}
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold text-[#27305f] leading-tight">{notification.title}</p>
                              {notification.description && (
                                <p className="text-xs text-[#6f79ad] mt-1 leading-relaxed">{notification.description}</p>
                              )}
                              {notification.actionLabel && (
                                <p className="text-xs font-semibold text-[#3a52cc] mt-1.5">{`${notification.actionLabel} ->`}</p>
                              )}
                            </div>

                            {isUnread && <span className="mt-2 h-2 w-2 rounded-full bg-[#f56a84]" />}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            <div ref={profileRef} className="relative">
              <button
                type="button"
                onClick={toggleProfileMenu}
                className="flex items-center gap-2 rounded-full px-1.5 py-1 hover:bg-white transition-colors border border-transparent hover:border-[#d8e0fb]"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#dce2ff] shadow-sm bg-[#e8edff] flex items-center justify-center text-sm font-bold text-[#2c3f9f]">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={displayName} className="w-full h-full object-cover" />
                  ) : (
                    displayName.charAt(0).toUpperCase()
                  )}
                </div>

                <div className="text-[#5f688f] hidden sm:flex items-center">
                  <ChevronDownIcon className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-3 w-64 rounded-2xl border border-[#d2dcff] bg-white shadow-[0_24px_45px_-28px_rgba(32,49,134,0.7)] overflow-hidden z-40">
                  <div className="px-4 py-3 border-b border-[#e3e9ff]">
                    <p className="text-sm font-semibold text-[#27305f] truncate">{displayName}</p>
                    <p className="text-xs text-[#6f79ad] truncate">Hostel Manager</p>
                  </div>

                  <div className="p-2 space-y-1">
                    {managerQuickActions.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleQuickAction(item.action)}
                        className="w-full text-left text-sm font-medium text-[#33406d] px-3 py-2.5 rounded-xl hover:bg-[#f3f6ff] transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <div className="p-2 border-t border-[#e3e9ff]">
                    <button
                      type="button"
                      onClick={onLogout}
                      className="w-full text-left text-sm font-semibold text-[#b44f59] px-3 py-2.5 rounded-xl hover:bg-[#ffe9ec] transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={onLogout}
              className="text-xs font-semibold text-[#5c6ca8] hover:text-[#324886] transition-colors hidden sm:inline-flex"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

// 
// DASHBOARD OVERVIEW
// 

const DashboardStats = ({ hostels, bookings, onOpenRequests, onOpenRooms, onToggleSidebar }) => {
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
          if (rows.length < 8) {
            const totalBeds = room.beds.length
            const occupiedBeds = room.beds.filter((bed) => bed.status === 'occupied').length
            const availableBeds = totalBeds - occupiedBeds

            let status = 'Partially Occupied'
            if (occupiedBeds === 0) {
              status = 'Available'
            } else if (availableBeds === 0) {
              status = 'Occupied'
            }

            rows.push({
              hallName: hostel.name,
              floorNo: floor.floorNumber,
              roomNo: room.roomNumber,
              type: room.type,
              occupiedBeds,
              totalBeds,
              status,
            })
          }
        })
      })
    })

    return rows
  }, [hostels])

  const statusPill = {
    Available: 'bg-[#cdeed7] text-[#1f7f41]',
    Occupied: 'bg-[#c8e0f7] text-[#1f5f98]',
    'Partially Occupied': 'bg-[#d9e7ff] text-[#2f5ba3]',
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
        <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold tracking-[-0.02em] text-[#0f1220]">Hostel Manager Dashboard</h1>
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
            <button
              type="button"
              onClick={onOpenRequests}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#d1d6f0] bg-[#f4f6ff] px-3 py-2 text-xs font-semibold text-[#3f4a93] hover:bg-[#e9edff] transition-colors"
            >
              Open Queue
              <ArrowLeftIcon className="w-3.5 h-3.5 rotate-180" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#e4e6ef] p-6 shadow-[0_12px_24px_-22px_rgba(26,33,74,0.4)] flex flex-col justify-between">
          <p className="text-3xl text-[#12131f] font-medium">Total Revenue (This Month)</p>
          <p className="text-6xl font-bold text-[#241f63] leading-none mt-6">${dashboardRevenue.toLocaleString('en-US')}</p>
        </div>
      </div>

      <section className="bg-white rounded-3xl border border-[#e4e6ef] p-6 shadow-[0_12px_24px_-22px_rgba(26,33,74,0.4)]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-4xl font-bold text-[#161822]">Room Availability</h2>
            <p className="mt-1 text-sm text-[#6a6f8d]">Quick room snapshot across managed hostels with direct access to Room Management.</p>
          </div>
          <button
            type="button"
            onClick={onOpenRooms}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#d1d6f0] bg-[#f4f6ff] px-3 py-2 text-xs font-semibold text-[#3f4a93] hover:bg-[#e9edff] transition-colors"
          >
            Open Room Management
            <ArrowLeftIcon className="w-3.5 h-3.5 rotate-180" />
          </button>
        </div>

        <div className="mt-4 rounded-2xl border border-[#d7d9e6] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-base text-[#151722]">
              <thead className="bg-[#f8f9fd] border-b border-[#d7d9e6]">
                <tr>
                  <th className="px-4 py-4 font-semibold">Hall Name</th>
                  <th className="px-4 py-4 font-semibold">Floor</th>
                  <th className="px-4 py-4 font-semibold">Room No.</th>
                  <th className="px-4 py-4 font-semibold">Type</th>
                  <th className="px-4 py-4 font-semibold">Bed Usage</th>
                  <th className="px-4 py-4 font-semibold">Status</th>
                  <th className="px-4 py-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {roomRows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-7 text-sm text-[#687095] text-center">
                      No room data available yet.
                    </td>
                  </tr>
                )}

                {roomRows.map((room, idx) => (
                  <tr key={`${room.roomNo}-${idx}`} className="border-t border-[#d7d9e6]">
                    <td className="px-4 py-4 max-w-[290px] truncate" title={room.hallName}>{room.hallName}</td>
                    <td className="px-4 py-4">{room.floorNo}</td>
                    <td className="px-4 py-4 font-semibold">{room.roomNo}</td>
                    <td className="px-4 py-4">{room.type}</td>
                    <td className="px-4 py-4 text-[#424a74]">{room.occupiedBeds}/{room.totalBeds} occupied</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusPill[room.status] || statusPill.Available}`}>
                        <span className="w-2.5 h-2.5 rounded-full bg-current" />
                        {room.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={onOpenRooms}
                        className="text-xs font-semibold rounded-lg border border-[#d4daf6] bg-white px-3 py-1.5 text-[#4252aa] hover:bg-[#f4f7ff] transition-colors"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-[#7a82a8]">Showing latest rooms across managed hostels.</p>
          <button
            type="button"
            onClick={onOpenRequests}
            className="text-xs font-semibold text-[#3d4d9f] hover:text-[#2c3b82]"
          >
            Open Pending Requests
          </button>
        </div>
      </section>
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

const BookingsManagement = ({ bookings, setBookings, hostels, setHostels, initialFilter = 'all' }) => {
  const [statusFilter, setStatusFilter] = useState(initialFilter)
  const [selectedStudentId, setSelectedStudentId] = useState(null)

  useEffect(() => {
    setStatusFilter(initialFilter)
  }, [initialFilter])

  useEffect(() => {
    if (selectedStudentId && !bookings.some((booking) => booking.studentId === selectedStudentId)) {
      setSelectedStudentId(null)
    }
  }, [bookings, selectedStudentId])

  const filteredBookings = statusFilter === 'all'
    ? bookings
    : bookings.filter((b) => b.status === statusFilter)

  const studentProfileBookings = useMemo(() => {
    if (!selectedStudentId) return []

    return bookings
      .filter((booking) => booking.studentId === selectedStudentId)
      .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())
  }, [bookings, selectedStudentId])

  const studentProfileStats = useMemo(() => {
    return studentProfileBookings.reduce(
      (stats, booking) => {
        stats.total += 1
        stats[booking.status] += 1
        return stats
      },
      { total: 0, pending: 0, approved: 0, rejected: 0 }
    )
  }, [studentProfileBookings])

  const studentCurrentSeat = useMemo(() => {
    if (!selectedStudentId) return null

    for (const hostel of hostels) {
      for (const floor of hostel.floors) {
        for (const room of floor.rooms) {
          for (const bed of room.beds) {
            if (bed.studentId === selectedStudentId && bed.status === 'occupied') {
              return {
                hostelName: hostel.name,
                roomNumber: room.roomNumber,
                bedId: bed.bedId,
              }
            }
          }
        }
      }
    }

    return null
  }, [hostels, selectedStudentId])

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

  const selectedStudent = studentProfileBookings[0] || null

  if (selectedStudent) {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => setSelectedStudentId(null)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#d4d9ee] bg-white text-[#2e3864] text-sm font-medium hover:bg-[#f8f9ff] transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Requests
        </button>

        <div className="bg-white rounded-2xl border border-[#e3e7f5] shadow-sm p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#e9eeff] text-[#2f46a1] flex items-center justify-center text-xl font-bold">
              {selectedStudent.studentName?.charAt(0)?.toUpperCase() || 'S'}
            </div>

            <div className="min-w-0">
              <h3 className="text-xl font-semibold text-[#1f2747] truncate">{selectedStudent.studentName}</h3>
              <p className="text-sm text-[#6c7398]">{selectedStudent.studentId}</p>
              <p className="text-sm text-[#4f5a87] mt-1">
                {studentCurrentSeat
                  ? `Current Allocation: ${studentCurrentSeat.hostelName} | Room ${studentCurrentSeat.roomNumber} | Bed ${studentCurrentSeat.bedId}`
                  : 'Current Allocation: Not assigned yet'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-[#e7ebf7] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#8690bb]">Total Requests</p>
            <p className="mt-2 text-2xl font-bold text-[#1f2747]">{studentProfileStats.total}</p>
          </div>
          <div className="bg-white rounded-xl border border-[#e7ebf7] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#8690bb]">Pending</p>
            <p className="mt-2 text-2xl font-bold text-amber-600">{studentProfileStats.pending}</p>
          </div>
          <div className="bg-white rounded-xl border border-[#e7ebf7] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#8690bb]">Approved</p>
            <p className="mt-2 text-2xl font-bold text-emerald-600">{studentProfileStats.approved}</p>
          </div>
          <div className="bg-white rounded-xl border border-[#e7ebf7] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#8690bb]">Rejected</p>
            <p className="mt-2 text-2xl font-bold text-rose-600">{studentProfileStats.rejected}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#e3e7f5] shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-[#ebeffb] flex items-center justify-between gap-3">
            <h4 className="text-sm font-semibold text-[#28325b]">Request History</h4>
            <p className="text-xs text-[#7a83ad]">Latest first</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f8f9ff] border-b border-[#eef1fb]">
                  <th className="text-left text-[11px] font-semibold text-[#6f79a6] uppercase tracking-wider px-5 py-3">Date</th>
                  <th className="text-left text-[11px] font-semibold text-[#6f79a6] uppercase tracking-wider px-5 py-3">Hostel</th>
                  <th className="text-left text-[11px] font-semibold text-[#6f79a6] uppercase tracking-wider px-5 py-3">Room</th>
                  <th className="text-left text-[11px] font-semibold text-[#6f79a6] uppercase tracking-wider px-5 py-3">Bed</th>
                  <th className="text-left text-[11px] font-semibold text-[#6f79a6] uppercase tracking-wider px-5 py-3">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#f1f3fa]">
                {studentProfileBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-[#fafbff] transition-colors">
                    <td className="px-5 py-3.5 text-sm text-[#535f8e]">{booking.date}</td>
                    <td className="px-5 py-3.5 text-sm text-[#394572]">{getHostelName(booking.hostelId)}</td>
                    <td className="px-5 py-3.5 text-sm text-[#5a668f] font-mono">{booking.roomNumber}</td>
                    <td className="px-5 py-3.5 text-sm text-[#5a668f] font-mono">{booking.bedId}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusStyles[booking.status]}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
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
                      <button
                        type="button"
                        onClick={() => setSelectedStudentId(booking.studentId)}
                        className="text-left"
                      >
                        <p className="text-sm font-semibold text-[#2f48ac] hover:text-[#20367f] hover:underline">{booking.studentName}</p>
                        <p className="text-[11px] text-gray-400">{booking.studentId}</p>
                      </button>
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
  dashboard: 'Hostel Manager',
  halls: 'Halls Management',
  bookings: 'Bookings Management',
  profile: 'Edit Profile',
}

const HostelManagerDashboard = ({ user, onLogout }) => {
  const { updateProfile } = useAuth()

  if (!user || (user.role !== 'hostel_manager' && user.role !== 'manager')) {
    return <Unauthorized onGoBack={onLogout} />
  }

  const [activePage, setActivePage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [hostels, setHostels] = useState(initialHostels)
  const [bookings, setBookings] = useState(initialBookings)
  const [bookingsInitialFilter, setBookingsInitialFilter] = useState('all')
  const [managerProfile, setManagerProfile] = useState(user)

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setSidebarOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    setManagerProfile(user)
  }, [user])

  const notificationItems = useMemo(() => {
    const pendingRequests = bookings.filter((booking) => booking.status === 'pending').length
    const approvedRequests = bookings.filter((booking) => booking.status === 'approved').length
    const closedHostels = hostels.filter((hostel) => !hostel.isOpen).length

    const items = []

    if (pendingRequests > 0) {
      items.push({
        id: 'manager-pending-requests',
        icon: '⏳',
        title: `${pendingRequests} request${pendingRequests > 1 ? 's' : ''} pending approval`,
        description: 'Open Requests and use the Pending tab to process quickly.',
        actionLabel: 'Open requests',
        action: 'bookings_pending',
        tone: 'amber',
      })
    }

    if (closedHostels > 0) {
      items.push({
        id: 'manager-closed-hostels',
        icon: '🏠',
        title: `${closedHostels} hostel${closedHostels > 1 ? 's are' : ' is'} currently closed`,
        description: 'Review room availability and reopen hostels when ready.',
        actionLabel: 'Open rooms',
        action: 'halls',
        tone: 'red',
      })
    }

    items.push({
      id: 'manager-approved-summary',
      icon: '✅',
      title: `${approvedRequests} request${approvedRequests > 1 ? 's' : ''} approved`,
      description: 'Track all booking decisions from the Requests page.',
      actionLabel: 'View requests',
      action: 'bookings',
      tone: 'green',
    })

    return items
  }, [bookings, hostels])

  const openBookingsPage = (filter = 'all') => {
    setBookingsInitialFilter(filter)
    setActivePage('bookings')
    setSidebarOpen(false)
  }

  const handleSidebarNavigate = (nextPage) => {
    if (nextPage === 'bookings') {
      openBookingsPage('all')
      return
    }

    setActivePage(nextPage)
    setSidebarOpen(false)
  }

  const handleTopbarNavigate = (action) => {
    if (!action) return

    if (action === 'bookings_pending') {
      openBookingsPage('pending')
      return
    }

    if (action === 'bookings') {
      openBookingsPage('all')
      return
    }

    setActivePage(action)
    setSidebarOpen(false)
  }

  const handleSaveProfile = async (profileData) => {
    const updated = await updateProfile(profileData)
    setManagerProfile(updated)
    return updated
  }

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <DashboardStats
            hostels={hostels}
            bookings={bookings}
            onOpenRequests={() => openBookingsPage('pending')}
            onOpenRooms={() => setActivePage('halls')}
            onToggleSidebar={() => setSidebarOpen(true)}
          />
        )
      case 'halls':
        return <HallsManagement hostels={hostels} setHostels={setHostels} />
      case 'bookings':
        return <BookingsManagement bookings={bookings} setBookings={setBookings} hostels={hostels} setHostels={setHostels} initialFilter={bookingsInitialFilter} />
      case 'profile':
        return <ManagerProfilePage manager={managerProfile} onSaveProfile={handleSaveProfile} />
      default:
        return (
          <DashboardStats
            hostels={hostels}
            bookings={bookings}
            onOpenRequests={() => openBookingsPage('pending')}
            onOpenRooms={() => setActivePage('halls')}
            onToggleSidebar={() => setSidebarOpen(true)}
          />
        )
    }
  }

  const unifiedFont = { fontFamily: "'Plus Jakarta Sans', sans-serif" }

  return (
    <div className="min-h-screen bg-[#f3f5fb] flex" style={unifiedFont}>
      <ManagerSidebar
        user={managerProfile}
        activePage={activePage}
        onNavigate={handleSidebarNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        totalRequests={bookings.length}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <ManagerTopbar
          user={managerProfile}
          pageTitle={pageTitles[activePage] || 'Dashboard'}
          onToggleSidebar={() => setSidebarOpen(true)}
          onLogout={onLogout}
          notifications={notificationItems}
          onNotificationAction={handleTopbarNavigate}
          onNavigate={handleTopbarNavigate}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <div className="max-w-[1400px] mx-auto animate-[fadeIn_0.3s_ease-out]">
            {renderContent()}
          </div>
          <ManagerFooter onNavigate={handleTopbarNavigate} />
        </main>
      </div>
    </div>
  )
}

export default HostelManagerDashboard
