import { useState, useEffect } from 'react'
import AuthPage from './components/AuthPage'
import StudentHomePage from './components/student/StudentHomePage'
import OwnerDashboard from './components/houseowner/OwnerDashboard'
import AdminPanel from './components/admin/AdminPanel'
import HostelManagerDashboard from './components/hostelmanager/HostelManagerDashboard'

/**
 * App – root component.
 * Manages simple state-based routing between Auth, Student Homepage,
 * Owner Dashboard, and a **hidden** Admin Panel.
 *
 * State:
 *   currentPage - 'auth' | 'studentHome' | 'ownerDashboard' | 'adminPanel' | 'hostelManager'
 *   student     - logged-in student data { fullName, email, phone, studentId, gender }
 *   owner       - logged-in owner data { fullName, email }
 *   manager     - logged-in manager data { name, email, role }
 *
 * Admin Panel Access:
 *   - NOT linked anywhere in public UI.
 *   - Accessible ONLY by navigating to  #/admin-panel  in the URL bar.
 *   - Uses a simulated admin user: { name: "Admin", role: "admin" }
 *   - If role !== "admin", a 403 page is shown.
 *
 * Hostel Manager Dashboard Access:
 *   - NOT linked anywhere in public UI.
 *   - Accessible ONLY by navigating to  #/hostel-manager  in the URL bar.
 *   - Uses a simulated manager user: { name: "Manager", role: "hostel_manager" }
 *   - If role !== "hostel_manager", a 403 page is shown.
 */
function App() {
  // ── Detect hidden admin route from URL hash on mount & hash change ─────
  const getInitialPage = () => {
    if (window.location.hash === '#/admin-panel') return 'adminPanel'
    if (window.location.hash === '#/hostel-manager') return 'hostelManager'
    return 'auth'
  }

  const [currentPage, setCurrentPage] = useState(getInitialPage)
  const [student, setStudent] = useState(null)
  const [owner, setOwner] = useState(null)
  const [manager, setManager] = useState(null)

  // Listen for hash changes so the admin panel can be reached at any time
  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash === '#/admin-panel') {
        setCurrentPage('adminPanel')
      } else if (window.location.hash === '#/hostel-manager') {
        setCurrentPage('hostelManager')
      }
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // ── Auth callbacks ─────────────────────────────────────────────────────

  // Called from AuthPage after successful student login/signup
  const handleStudentLogin = (studentData) => {
    setStudent(studentData)
    setCurrentPage('studentHome')
  }

  // Called from AuthPage after successful owner login/signup
  const handleOwnerLogin = (ownerData) => {
    setOwner(ownerData)
    setCurrentPage('ownerDashboard')
  }

  // Called from AuthPage after successful manager login/signup
  const handleManagerLogin = (managerData) => {
    setManager(managerData)
    setCurrentPage('hostelManager')
  }

  // Called from any dashboard when user clicks logout
  const handleLogout = () => {
    setStudent(null)
    setOwner(null)
    setManager(null)
    window.location.hash = ''           // clear hash so admin route isn't sticky
    setCurrentPage('auth')
  }

  // ── Render pages ───────────────────────────────────────────────────────

  // Hidden Admin Panel – simulated admin user
  if (currentPage === 'adminPanel') {
    const adminUser = { name: 'Admin', role: 'admin' }
    return <AdminPanel admin={adminUser} onLogout={handleLogout} />
  }

  // Hidden Hostel Manager Dashboard – via hash or auth login
  if (currentPage === 'hostelManager') {
    // Use real manager data if logged in, otherwise simulate
    const managerUser = manager || { name: 'Manager', role: 'hostel_manager' }
    return <HostelManagerDashboard user={managerUser} onLogout={handleLogout} />
  }

  if (currentPage === 'studentHome' && student) {
    return <StudentHomePage student={student} onLogout={handleLogout} />
  }

  if (currentPage === 'ownerDashboard' && owner) {
    return <OwnerDashboard owner={owner} onLogout={handleLogout} />
  }

  return <AuthPage onStudentLogin={handleStudentLogin} onOwnerLogin={handleOwnerLogin} onManagerLogin={handleManagerLogin} />
}

export default App
