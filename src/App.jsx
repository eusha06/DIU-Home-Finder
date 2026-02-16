import { useState } from 'react'
import AuthPage from './components/AuthPage'
import StudentHomePage from './components/student/StudentHomePage'
import OwnerDashboard from './components/houseowner/OwnerDashboard'

/**
 * App – root component.
 * Manages simple state-based routing between Auth, Student Homepage, and Owner Dashboard.
 *
 * State:
 *   currentPage - 'auth' | 'studentHome' | 'ownerDashboard'
 *   student     - logged-in student data { fullName, email, phone, studentId, gender }
 *   owner       - logged-in owner data { fullName, email }
 */
function App() {
  const [currentPage, setCurrentPage] = useState('auth')
  const [student, setStudent] = useState(null)
  const [owner, setOwner] = useState(null)

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

  // Called from StudentHomePage or OwnerDashboard when user clicks logout
  const handleLogout = () => {
    setStudent(null)
    setOwner(null)
    setCurrentPage('auth')
  }

  if (currentPage === 'studentHome' && student) {
    return <StudentHomePage student={student} onLogout={handleLogout} />
  }

  if (currentPage === 'ownerDashboard' && owner) {
    return <OwnerDashboard owner={owner} onLogout={handleLogout} />
  }

  return <AuthPage onStudentLogin={handleStudentLogin} onOwnerLogin={handleOwnerLogin} />
}

export default App
