import { useEffect, useMemo, useRef, useState } from 'react'

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8">
    <path d="M6.8 9.5a5.2 5.2 0 1 1 10.4 0v3.1c0 .9.3 1.8.9 2.5l1.1 1.3H4.8l1.1-1.3c.6-.7.9-1.6.9-2.5V9.5Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 18a2 2 0 0 0 4 0" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const notificationToneClasses = {
  amber: 'bg-[#fff4dd] text-[#9a6e22] border-[#f7dba2]',
  blue: 'bg-[#e7edff] text-[#3550c9] border-[#bfd0ff]',
  green: 'bg-[#dff7e6] text-[#2f7b49] border-[#a9e4bc]',
  red: 'bg-[#ffe6e8] text-[#b44f59] border-[#f3bfc5]',
}

const quickActions = [
  { id: 'nav-dashboard', label: 'Owner Dashboard', action: 'dashboard' },
  { id: 'nav-properties', label: 'My Listings', action: 'properties' },
  { id: 'nav-bookings', label: 'Booking Request', action: 'bookings' },
  { id: 'nav-add', label: 'Add Property', action: 'addProperty' },
]

const TopNavbar = ({
  owner,
  pageTitle,
  onToggleSidebar,
  onLogout,
  variant = 'default',
  notifications = [],
  onNotificationAction,
  onNavigate,
}) => {
  const isDashboard = variant === 'dashboard'
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [readNotificationIds, setReadNotificationIds] = useState(new Set())

  const notificationsRef = useRef(null)
  const profileRef = useRef(null)

  const displayName = owner?.fullName || owner?.name || 'Owner'
  const roleLabel = owner?.role
    ? owner.role.replace('_', ' ').replace(/\b\w/g, (ch) => ch.toUpperCase())
    : 'Owner'

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
    <nav className={`${isDashboard ? 'bg-transparent' : 'bg-white border-b border-[#e6e8f4]'} relative z-30`}>
      <div className="px-4 sm:px-6 lg:px-10">
        <div className={`${isDashboard ? 'h-[96px] sm:h-[112px] lg:h-[126px]' : 'h-16'} flex items-center justify-between`}>
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onToggleSidebar}
              className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${
                isDashboard
                  ? 'text-white hover:bg-white/20'
                  : 'text-[#596087] hover:bg-[#f0f2ff] hover:text-[#3e4670]'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className={`${isDashboard ? 'text-2xl sm:text-4xl lg:text-[52px] lg:leading-[1.05] text-white font-bold tracking-[-0.02em] truncate' : 'text-base sm:text-lg leading-tight text-[#23284d] font-semibold truncate'}`}>
              {pageTitle}
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div ref={notificationsRef} className="relative">
              <button
                className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isDashboard ? 'text-white hover:bg-white/15' : 'text-[#6f76a2] hover:bg-[#f0f2ff]'
                }`}
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
                className="flex items-center gap-2 rounded-full px-1.5 py-1 hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/20 shadow-lg bg-white/10 flex items-center justify-center text-sm font-bold text-white">
                  {owner?.avatar ? (
                    <img src={owner.avatar} alt={displayName} className="w-full h-full object-cover" />
                  ) : (
                    displayName.charAt(0).toUpperCase()
                  )}
                </div>

                <div className={`${isDashboard ? 'text-white/90' : 'text-[#3b4069]'} hidden sm:flex items-center`}>
                  <svg viewBox="0 0 24 24" fill="none" className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} stroke="currentColor" strokeWidth="2">
                    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-3 w-64 rounded-2xl border border-[#d2dcff] bg-white shadow-[0_24px_45px_-28px_rgba(32,49,134,0.7)] overflow-hidden z-40">
                  <div className="px-4 py-3 border-b border-[#e3e9ff]">
                    <p className="text-sm font-semibold text-[#27305f] truncate">{displayName}</p>
                    <p className="text-xs text-[#6f79ad] truncate">{roleLabel}</p>
                  </div>

                  <div className="p-2 space-y-1">
                    {quickActions.map((item) => (
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
              className={`${isDashboard ? 'text-white/80 hover:text-white' : 'text-[#7f84a9] hover:text-[#4c527d]'} text-xs font-semibold transition-colors hidden sm:inline-flex`}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default TopNavbar
