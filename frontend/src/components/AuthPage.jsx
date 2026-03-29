import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ── Auth context ──────────────────────────────────────────────────────────
import { useAuth } from '../context/AuthContext'

// ── Shared components ─────────────────────────────────────────────────────
import { BackIcon } from './shared/Icons'
import RoleCard from './shared/RoleCard'

// ── Student components ────────────────────────────────────────────────────
import StudentLoginForm from './student/StudentLoginForm'
import StudentSignupForm from './student/StudentSignupForm'

// ── House Owner components ────────────────────────────────────────────────
import OwnerLoginForm from './houseowner/OwnerLoginForm'
import OwnerSignupForm from './houseowner/OwnerSignupForm'

// ── Hostel Manager components ─────────────────────────────────────────────
import ManagerLoginForm from './hostelmanager/ManagerLoginForm'
import ManagerSignupForm from './hostelmanager/ManagerSignupForm'

/**
 * AuthPage
 * ────────
 * Orchestrator component that manages:
 *   • Login / Sign Up tab switching
 *   • Login role toggle (Student ↔ House Owner)
 *   • Sign Up 2-step flow (Step 1: choose role → Step 2: role-specific form)
 *
 * All form logic and validation lives inside the respective
 * student/ and houseowner/ components.
 */
const AuthPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  // ── Login/signup callbacks that update auth context & navigate ──────────
 const onStudentLogin = async (email, password) => {
  try {
    await login(email, password)   // calls AuthContext login → saves token
    navigate('/student/home', { replace: true })
  } catch (err) {
    console.error('Student login failed:', err.message)
    throw err
  }
}

const onOwnerLogin = async (email, password) => {
  try {
    await login(email, password)
    navigate('/owner/dashboard', { replace: true })
  } catch (err) {
    console.error('Owner login failed:', err.message)
    throw err
  }
}

const onManagerLogin = async (email, password) => {
  try {
    await login(email, password)
    navigate('/hostel-manager', { replace: true })
  } catch (err) {
    console.error('Manager login failed:', err.message)
    throw err
  }
}

  // ── Active tab: 'login' | 'signup' ──────────────────────────────────────
  const [activeTab, setActiveTab] = useState('login')

  // ── Login role toggle ───────────────────────────────────────────────────
  const [loginRole, setLoginRole] = useState('student') // 'student' | 'owner' | 'manager'

  // ── Signup step & role ──────────────────────────────────────────────────
  const [signupStep, setSignupStep] = useState(1)   // 1 = choose role, 2 = form
  const [signupRole, setSignupRole] = useState('')   // 'student' | 'owner' | 'manager'

  // ── Tab switch handler (resets signup to step 1) ────────────────────────
  const switchTab = (tab) => {
    setActiveTab(tab)
    if (tab === 'signup') {
      setSignupStep(1)
      setSignupRole('')
    }
  }

  // ── Proceed from step 1 → step 2 ───────────────────────────────────────
  const handleContinueToForm = () => {
    if (!signupRole) return
    setSignupStep(2)
  }

  // ── Go back to step 1 ──────────────────────────────────────────────────
  const handleBackToRoleSelect = () => {
    setSignupStep(1)
  }

  // ── Render ──────────────────────────────────────────────────────────────
  // Font helpers
  const sora = { fontFamily: "'Sora', sans-serif" }
  const serif = { fontFamily: "'DM Serif Display', serif" }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-amber-50/40 px-4 py-8" style={sora}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 border border-amber-100/60">

        {/* ── Header / branding ─────────────────────────────────────── */}
        <div className="px-8 pt-8 pb-2 text-center">
          <h1 className="text-2xl font-bold text-indigo-700 tracking-tight" style={serif}>
            🏠 DIU Student Home Finder
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Find your perfect home near DIU campus
          </p>
        </div>

        {/* ── Tab switcher ──────────────────────────────────────────── */}
        <div className="flex px-8 pt-4">
          {['login', 'signup'].map((tab) => (
            <button
              key={tab}
              onClick={() => switchTab(tab)}
              className={`
                flex-1 py-2.5 text-sm font-semibold tracking-wide uppercase
                transition-all duration-300 border-b-2
                ${activeTab === tab
                  ? 'text-indigo-600 border-indigo-600'
                  : 'text-gray-400 border-transparent hover:text-gray-600'}
              `}
            >
              {tab === 'login' ? 'Login' : 'Sign Up'}
            </button>
          ))}
        </div>

        {/* ── Form area ─────────────────────────────────────────────── */}
        <div className="px-8 py-6">

          {/* ═══════════════ LOGIN ═══════════════════════════════════ */}
          <div className={`transition-all duration-300 ${
            activeTab === 'login' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 hidden'
          }`}>
            {/* Role toggle */}
            <div className="flex rounded-lg bg-gray-100 p-1 mb-5">
              {[
                { key: 'student', label: '🎓 Student' },
                { key: 'owner',   label: '🏠 Owner' },
                { key: 'manager', label: '🏢 Manager' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setLoginRole(key)}
                  className={`
                    flex-1 py-2 text-xs font-semibold rounded-md transition-all duration-200
                    ${loginRole === key
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'}
                  `}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Render the appropriate login form based on role */}
            {loginRole === 'student' && (
              <StudentLoginForm onSwitchToSignup={() => switchTab('signup')} onStudentLogin={onStudentLogin} />
            )}
            {loginRole === 'owner' && (
              <OwnerLoginForm onSwitchToSignup={() => switchTab('signup')} onOwnerLogin={onOwnerLogin} />
            )}
            {loginRole === 'manager' && (
              <ManagerLoginForm onSwitchToSignup={() => switchTab('signup')} onManagerLogin={onManagerLogin} />
            )}
          </div>

          {/* ═══════════════ SIGN UP ════════════════════════════════= */}
          <div className={`transition-all duration-300 ${
            activeTab === 'signup' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 hidden'
          }`}>

            {/* ── Step 1: Choose role ──────────────────────────────── */}
            {signupStep === 1 && (
              <div className="transition-all duration-300">
                <p className="text-sm text-gray-600 mb-4 text-center font-medium">
                  I am a …
                </p>

                <div className="space-y-3 mb-6">
                  <RoleCard
                    emoji="🎓"
                    title="Student"
                    description="I study at DIU and I'm looking for a place to stay"
                    selected={signupRole === 'student'}
                    onClick={() => setSignupRole('student')}
                  />
                  <RoleCard
                    emoji="🏠"
                    title="House Owner"
                    description="I own property near DIU and want to list it"
                    selected={signupRole === 'owner'}
                    onClick={() => setSignupRole('owner')}
                  />
                  <RoleCard
                    emoji="🏢"
                    title="Hostel Manager"
                    description="I manage university hostel halls and student accommodations"
                    selected={signupRole === 'manager'}
                    onClick={() => setSignupRole('manager')}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleContinueToForm}
                  disabled={!signupRole}
                  className={`
                    w-full py-2.5 rounded-lg font-semibold transition-all duration-200
                    shadow-md active:scale-[0.98]
                    ${signupRole
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                  `}
                >
                  Continue
                </button>

                <p className="text-center text-xs text-gray-400 mt-5">
                  Already have an account?{' '}
                  <button onClick={() => switchTab('login')} className="text-indigo-500 hover:underline font-medium">
                    Login
                  </button>
                </p>
              </div>
            )}

            {/* ── Step 2: Registration form ────────────────────────── */}
            {signupStep === 2 && (
              <div className="transition-all duration-300">
                {/* Back button + role badge */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    type="button"
                    onClick={handleBackToRoleSelect}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-indigo-600 transition-colors"
                  >
                    <BackIcon /> Back
                  </button>
                  <span className={`
                    text-xs font-semibold px-3 py-1 rounded-full
                    ${signupRole === 'student'
                      ? 'bg-blue-100 text-blue-700'
                      : signupRole === 'owner'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-teal-100 text-teal-700'}
                  `}>
                    {signupRole === 'student' ? '🎓 Student' : signupRole === 'owner' ? '🏠 House Owner' : '🏢 Hostel Manager'}
                  </span>
                </div>

                {/* Render the appropriate signup form based on role */}
                {signupRole === 'student' && (
                  <StudentSignupForm onSwitchToLogin={() => switchTab('login')} onStudentLogin={onStudentLogin} />
                )}
                {signupRole === 'owner' && (
                  <OwnerSignupForm onSwitchToLogin={() => switchTab('login')} onOwnerLogin={onOwnerLogin} />
                )}
                {signupRole === 'manager' && (
                  <ManagerSignupForm onSwitchToLogin={() => switchTab('login')} onManagerLogin={onManagerLogin} />
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Footer ───────────────────────────────────────────────── */}
        <div className="px-8 pb-6 text-center">
          <p className="text-[11px] text-gray-300">
            © 2026 Student Home Finder · DIU
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
