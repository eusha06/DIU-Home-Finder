import { useState } from 'react'
import AuthPage from './components/AuthPage'
import StudentHomePage from './components/student/StudentHomePage'

/**
 * App – root component.
 * Manages simple state-based routing between Auth and Homepage.
 *
 * State:
 *   currentPage - 'auth' | 'studentHome'
 *   student     - logged-in student data { fullName, email, phone, studentId, gender }
 */
function App() {
  const [currentPage, setCurrentPage] = useState('auth')
  const [student, setStudent] = useState(null)

  // Called from AuthPage after successful login/signup
  const handleStudentLogin = (studentData) => {
    setStudent(studentData)
    setCurrentPage('studentHome')
  }

  // Called from StudentHomePage when user clicks logout
  const handleLogout = () => {
    setStudent(null)
    setCurrentPage('auth')
  }

  if (currentPage === 'studentHome' && student) {
    return <StudentHomePage student={student} onLogout={handleLogout} />
  }

  return <AuthPage onStudentLogin={handleStudentLogin} />
}

export default App
