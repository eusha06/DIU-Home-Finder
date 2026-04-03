import { useEffect, useMemo, useRef, useState } from 'react'

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8">
    <path d="M6.8 9.5a5.2 5.2 0 1 1 10.4 0v3.1c0 .9.3 1.8.9 2.5l1.1 1.3H4.8l1.1-1.3c.6-.7.9-1.6.9-2.5V9.5Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 18a2 2 0 0 0 4 0" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 10.8L12 3l9 7.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.8 10v9h10.4v-9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const notificationToneClasses = {
  amber: 'bg-[#fff4dd] text-[#9a6e22] border-[#f7dba2]',
  blue: 'bg-[#e7edff] text-[#3550c9] border-[#bfd0ff]',
  green: 'bg-[#dff7e6] text-[#2f7b49] border-[#a9e4bc]',
}

const Navbar = ({ student, onLogout }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [readNotificationIds, setReadNotificationIds] = useState(new Set())

  const notificationsRef = useRef(null)
  const profileRef = useRef(null)

  const displayName = student?.fullName || student?.name || 'Student'
  const initials = displayName.charAt(0).toUpperCase()

  const notifications = useMemo(
    () => [
      {
        id: 'new-listings',
        icon: '🏠',
        title: 'New listings available near DIU',
        description: 'Check latest verified rooms and flats posted today.',
        tone: 'blue',
      },
      {
        id: 'price-alert',
        icon: '💸',
        title: 'Budget friendly options are active',
        description: 'Several listings under 4000 BDT are currently available.',
        tone: 'green',
      },
      {
        id: 'profile-tip',
        icon: '📌',
        title: 'Complete your student profile',
        description: 'Accurate profile details help owners approve requests faster.',
        tone: 'amber',
      },
    ],
    []
  )

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

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !readNotificationIds.has(notification.id)).length,
    [notifications, readNotificationIds]
  )

  const markAllAsRead = () => {
    setReadNotificationIds(new Set(notifications.map((notification) => notification.id)))
  }

  const handleNotificationClick = (notificationId) => {
    setReadNotificationIds((previous) => {
      const next = new Set(previous)
      next.add(notificationId)
      return next
    })
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
    <nav className="bg-[linear-gradient(118deg,#171d59_0%,#25378f_50%,#3f57c9_100%)] text-[#F3F4F8] shadow-sm sticky top-0 z-40" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-[74px] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl border border-white/25 bg-white/10 flex items-center justify-center text-white/95 shrink-0">
              <HomeIcon />
            </div>

            <div className="min-w-0">
              <p className="text-[15px] sm:text-[18px] font-semibold text-white truncate">StudentHomeFinder</p>
              <p className="text-xs sm:text-[13px] text-white/78 font-medium tracking-[0.01em]">Student Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div ref={notificationsRef} className="relative">
              <button
                className="relative w-10 h-10 rounded-full flex items-center justify-center transition-colors text-white hover:bg-white/15"
                type="button"
                aria-label="notifications"
                onClick={toggleNotifications}
              >
                <BellIcon />
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
                    {notifications.map((notification) => {
                      const isUnread = !readNotificationIds.has(notification.id)
                      const toneClass = notificationToneClasses[notification.tone] || notificationToneClasses.blue

                      return (
                        <button
                          key={notification.id}
                          type="button"
                          onClick={() => handleNotificationClick(notification.id)}
                          className="w-full text-left rounded-xl p-3 hover:bg-[#f3f6ff] transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`shrink-0 mt-0.5 h-8 w-8 rounded-lg border flex items-center justify-center text-sm ${toneClass}`}>
                              {notification.icon}
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold text-[#27305f] leading-tight">{notification.title}</p>
                              <p className="text-xs text-[#6f79ad] mt-1 leading-relaxed">{notification.description}</p>
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
                className="flex items-center gap-2 rounded-full px-1.5 py-1 hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/20 shadow-lg bg-white/10 flex items-center justify-center text-sm font-bold text-white">
                  {student?.avatar ? (
                    <img src={student.avatar} alt={displayName} className="w-full h-full object-cover" />
                  ) : (
                    initials
                  )}
                </div>

                <div className="text-white/90 hidden sm:flex items-center">
                  <svg viewBox="0 0 24 24" fill="none" className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} stroke="currentColor" strokeWidth="2">
                    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-3 w-64 rounded-2xl border border-[#d2dcff] bg-white shadow-[0_24px_45px_-28px_rgba(32,49,134,0.7)] overflow-hidden z-40">
                  <div className="px-4 py-3 border-b border-[#e3e9ff]">
                    <p className="text-sm font-semibold text-[#27305f] truncate">{displayName}</p>
                    <p className="text-xs text-[#6f79ad] truncate">Student</p>
                  </div>

                  <div className="p-2">
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
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
