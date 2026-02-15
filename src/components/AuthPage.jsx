import { useState } from 'react'

// ─── Inline SVG icons (no external deps) ────────────────────────────────────

/** Envelope icon */
const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm4-4v8a2 2 0 01-2 2H6a2 2 0 01-2-2V8m16 0l-8 5-8-5" />
  </svg>
)

/** Lock icon */
const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
)

/** User icon */
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 0112 15a9 9 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

/** Phone icon */
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

/** ID / Badge icon */
const IdIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
  </svg>
)

/** Building icon */
const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5" />
  </svg>
)

/** Map-pin / Location icon */
const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

/** Back-arrow icon */
const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

// ─── Reusable input wrapper ─────────────────────────────────────────────────

/**
 * FormInput – renders a labelled input with an optional leading icon
 * and an inline error message.
 */
const FormInput = ({ label, name, type = 'text', placeholder, value, onChange, error, icon }) => (
  <div className="mb-3.5">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {icon}
        </span>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full rounded-lg border bg-gray-50 px-4 py-2.5 text-sm
          transition-colors duration-200 outline-none
          ${icon ? 'pl-10' : ''}
          ${error
            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
            : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'}
        `}
      />
    </div>
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
)

// ─── Role selection card ────────────────────────────────────────────────────

/**
 * RoleCard – a clickable card used on Step 1 of Sign Up to pick user type.
 */
const RoleCard = ({ emoji, title, description, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      w-full p-5 rounded-xl border-2 text-left transition-all duration-200
      hover:shadow-md cursor-pointer group
      ${selected
        ? 'border-indigo-500 bg-indigo-50 shadow-md'
        : 'border-gray-200 bg-white hover:border-indigo-300'}
    `}
  >
    <div className="flex items-center gap-4">
      <span className="text-3xl">{emoji}</span>
      <div>
        <h3 className={`font-semibold text-sm ${selected ? 'text-indigo-700' : 'text-gray-800'}`}>
          {title}
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      {/* Radio-style circle indicator */}
      <div className="ml-auto">
        <div className={`
          w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
          ${selected ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'}
        `}>
          {selected && (
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
    </div>
  </button>
)

// ─── Main AuthPage component ────────────────────────────────────────────────

/**
 * AuthPage
 * --------
 * Authentication page with Login / Sign Up tabs.
 * Sign Up supports TWO user types with a 2-step flow:
 *
 *   Step 1 → Choose role: Student or House Owner
 *   Step 2 → Role-specific registration form
 *
 * Student fields : Full Name, DIU Email, Phone, Student ID, Password, Confirm Password
 * Owner fields   : Full Name, Email, Phone, NID, Building Name, Location, Password, Confirm Password
 *
 * Login supports both roles with a role toggle that adjusts email validation.
 */
const AuthPage = () => {
  // ── Active tab: 'login' | 'signup' ──────────────────────────────────────
  const [activeTab, setActiveTab] = useState('login')

  // ── Login state ─────────────────────────────────────────────────────────
  const [loginRole, setLoginRole] = useState('student') // 'student' | 'owner'
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [loginErrors, setLoginErrors] = useState({})

  // ── Signup state ────────────────────────────────────────────────────────
  const [signupStep, setSignupStep] = useState(1)        // 1 = choose role, 2 = form
  const [signupRole, setSignupRole] = useState('')        // 'student' | 'owner'
  const [signupErrors, setSignupErrors] = useState({})

  // Student-specific signup fields
  const [studentData, setStudentData] = useState({
    fullName: '',
    email: '',
    phone: '',
    studentId: '',
    gender: '',
    password: '',
    confirmPassword: '',
  })

  // House-owner-specific signup fields
  const [ownerData, setOwnerData] = useState({
    fullName: '',
    email: '',
    phone: '',
    nationalId: '',
    buildingName: '',
    location: '',
    password: '',
    confirmPassword: '',
  })

  // ── Helpers ─────────────────────────────────────────────────────────────

  /** Returns true when email ends with @diu.edu.bd */
  const isValidDiuEmail = (email) => /^[^\s@]+@diu\.edu\.bd$/i.test(email)

  /** Returns true for any standard email format */
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  /** Returns true for a Bangladeshi phone number (01XXXXXXXXX) */
  const isValidPhone = (phone) => /^01[3-9]\d{8}$/.test(phone)

  /** Generic change handler */
  const handleChange = (setter) => (e) => {
    const { name, value } = e.target
    setter((prev) => ({ ...prev, [name]: value }))
  }

  // ── Tab switch handler (resets signup to step 1) ────────────────────────
  const switchTab = (tab) => {
    setActiveTab(tab)
    if (tab === 'signup') {
      setSignupStep(1)
      setSignupRole('')
      setSignupErrors({})
    }
  }

  // ── Proceed from step 1 → step 2 ───────────────────────────────────────
  const handleContinueToForm = () => {
    if (!signupRole) return          // nothing selected yet
    setSignupErrors({})
    setSignupStep(2)
  }

  // ── Go back to step 1 ──────────────────────────────────────────────────
  const handleBackToRoleSelect = () => {
    setSignupStep(1)
    setSignupErrors({})
  }

  // ── Login validation & submit ───────────────────────────────────────────

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    const errors = {}

    // Email – validate based on selected role
    if (!loginData.email) {
      errors.email = 'Email is required.'
    } else if (loginRole === 'student' && !isValidDiuEmail(loginData.email)) {
      errors.email = 'Student email must end with @diu.edu.bd'
    } else if (loginRole === 'owner' && !isValidEmail(loginData.email)) {
      errors.email = 'Please enter a valid email address.'
    }

    // Password
    if (!loginData.password) {
      errors.password = 'Password is required.'
    } else if (loginData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.'
    }

    setLoginErrors(errors)
    if (Object.keys(errors).length === 0) {
      console.log('Login Data:', { role: loginRole, ...loginData })
    }
  }

  // ── Signup validation & submit ──────────────────────────────────────────

  const handleSignupSubmit = (e) => {
    e.preventDefault()
    const errors = {}
    const data = signupRole === 'student' ? studentData : ownerData

    // ── Common validations ──────────────────────────────────────────────
    if (!data.fullName.trim()) errors.fullName = 'Full name is required.'

    if (!data.phone) {
      errors.phone = 'Phone number is required.'
    } else if (!isValidPhone(data.phone)) {
      errors.phone = 'Enter a valid BD phone (e.g. 01XXXXXXXXX).'
    }

    if (!data.password) {
      errors.password = 'Password is required.'
    } else if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.'
    }

    if (!data.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password.'
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.'
    }

    // ── Student-specific validations ────────────────────────────────────
    if (signupRole === 'student') {
      if (!data.email) {
        errors.email = 'DIU email is required.'
      } else if (!isValidDiuEmail(data.email)) {
        errors.email = 'Email must end with @diu.edu.bd'
      }
      if (!data.studentId.trim()) {
        errors.studentId = 'Student ID is required.'
      }
      if (!data.gender) {
        errors.gender = 'Please select your gender.'
      }
    }

    // ── Owner-specific validations ──────────────────────────────────────
    if (signupRole === 'owner') {
      if (!data.email) {
        errors.email = 'Email is required.'
      } else if (!isValidEmail(data.email)) {
        errors.email = 'Please enter a valid email address.'
      }
      if (!data.nationalId.trim()) {
        errors.nationalId = 'National ID is required.'
      }
      if (!data.buildingName.trim()) {
        errors.buildingName = 'Building / property name is required.'
      }
      if (!data.location.trim()) {
        errors.location = 'Location is required.'
      }
    }

    setSignupErrors(errors)
    if (Object.keys(errors).length === 0) {
      console.log(`Signup Data (${signupRole}):`, { role: signupRole, ...data })
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-cyan-100 px-4 py-8">
      {/* Card container – wider on signup step 2 for owner's longer form */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300">

        {/* ── Header / branding ─────────────────────────────────────── */}
        <div className="px-8 pt-8 pb-2 text-center">
          <h1 className="text-2xl font-bold text-indigo-700 tracking-tight">
            🏠 Student Home Finder
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
            {/* Role toggle for login */}
            <div className="flex rounded-lg bg-gray-100 p-1 mb-5">
              {[
                { key: 'student', label: '🎓 Student' },
                { key: 'owner',   label: '🏠 House Owner' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => { setLoginRole(key); setLoginErrors({}) }}
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

            <form onSubmit={handleLoginSubmit} noValidate>
              <FormInput
                label={loginRole === 'student' ? 'DIU Email' : 'Email'}
                name="email"
                type="email"
                placeholder={loginRole === 'student' ? 'yourname@diu.edu.bd' : 'you@example.com'}
                value={loginData.email}
                onChange={handleChange(setLoginData)}
                error={loginErrors.email}
                icon={<EmailIcon />}
              />

              <FormInput
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={loginData.password}
                onChange={handleChange(setLoginData)}
                error={loginErrors.password}
                icon={<LockIcon />}
              />

              <div className="flex justify-end mb-4">
                <button
                  type="button"
                  className="text-xs text-indigo-500 hover:text-indigo-700 transition-colors"
                  onClick={() => console.log('Forgot password clicked')}
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-semibold
                           hover:bg-indigo-700 active:scale-[0.98] transition-all duration-200
                           shadow-md hover:shadow-lg"
              >
                Login
              </button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-5">
              Don&apos;t have an account?{' '}
              <button onClick={() => switchTab('signup')} className="text-indigo-500 hover:underline font-medium">
                Sign Up
              </button>
            </p>
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
                      : 'bg-amber-100 text-amber-700'}
                  `}>
                    {signupRole === 'student' ? '🎓 Student' : '🏠 House Owner'}
                  </span>
                </div>

                <form onSubmit={handleSignupSubmit} noValidate>
                  {/* ── STUDENT FORM FIELDS ─────────────────────────── */}
                  {signupRole === 'student' && (
                    <>
                      <FormInput
                        label="Full Name"
                        name="fullName"
                        placeholder="e.g. Rahim Uddin"
                        value={studentData.fullName}
                        onChange={handleChange(setStudentData)}
                        error={signupErrors.fullName}
                        icon={<UserIcon />}
                      />
                      <FormInput
                        label="DIU Email"
                        name="email"
                        type="email"
                        placeholder="yourname@diu.edu.bd"
                        value={studentData.email}
                        onChange={handleChange(setStudentData)}
                        error={signupErrors.email}
                        icon={<EmailIcon />}
                      />
                      <FormInput
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        value={studentData.phone}
                        onChange={handleChange(setStudentData)}
                        error={signupErrors.phone}
                        icon={<PhoneIcon />}
                      />
                      <FormInput
                        label="Student ID"
                        name="studentId"
                        placeholder="e.g. 0242310005101"
                        value={studentData.studentId}
                        onChange={handleChange(setStudentData)}
                        error={signupErrors.studentId}
                        icon={<IdIcon />}
                      />

                      {/* Gender selector */}
                      <div className="mb-3.5">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <div className="flex gap-3">
                          {['Male', 'Female'].map((g) => (
                            <button
                              key={g}
                              type="button"
                              onClick={() => setStudentData((prev) => ({ ...prev, gender: g.toLowerCase() }))}
                              className={`
                                flex-1 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200
                                ${studentData.gender === g.toLowerCase()
                                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm'
                                  : 'border-gray-300 bg-gray-50 text-gray-600 hover:border-indigo-300'}
                              `}
                            >
                              {g === 'Male' ? '👨' : '👩'} {g}
                            </button>
                          ))}
                        </div>
                        {signupErrors.gender && <p className="mt-1 text-xs text-red-500">{signupErrors.gender}</p>}
                      </div>

                      <FormInput
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Min. 6 characters"
                        value={studentData.password}
                        onChange={handleChange(setStudentData)}
                        error={signupErrors.password}
                        icon={<LockIcon />}
                      />
                      <FormInput
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        placeholder="Re-enter password"
                        value={studentData.confirmPassword}
                        onChange={handleChange(setStudentData)}
                        error={signupErrors.confirmPassword}
                        icon={<LockIcon />}
                      />
                    </>
                  )}

                  {/* ── OWNER FORM FIELDS ───────────────────────────── */}
                  {signupRole === 'owner' && (
                    <>
                      <FormInput
                        label="Full Name"
                        name="fullName"
                        placeholder="e.g. Karim Ahmed"
                        value={ownerData.fullName}
                        onChange={handleChange(setOwnerData)}
                        error={signupErrors.fullName}
                        icon={<UserIcon />}
                      />
                      <FormInput
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={ownerData.email}
                        onChange={handleChange(setOwnerData)}
                        error={signupErrors.email}
                        icon={<EmailIcon />}
                      />
                      <FormInput
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        value={ownerData.phone}
                        onChange={handleChange(setOwnerData)}
                        error={signupErrors.phone}
                        icon={<PhoneIcon />}
                      />
                      <FormInput
                        label="National ID (NID)"
                        name="nationalId"
                        placeholder="e.g. 1234567890123"
                        value={ownerData.nationalId}
                        onChange={handleChange(setOwnerData)}
                        error={signupErrors.nationalId}
                        icon={<IdIcon />}
                      />
                      <FormInput
                        label="Building / Property Name"
                        name="buildingName"
                        placeholder="e.g. Green Valley Apartments"
                        value={ownerData.buildingName}
                        onChange={handleChange(setOwnerData)}
                        error={signupErrors.buildingName}
                        icon={<BuildingIcon />}
                      />
                      <FormInput
                        label="Location"
                        name="location"
                        placeholder="e.g. Dhanmondi, Dhaka"
                        value={ownerData.location}
                        onChange={handleChange(setOwnerData)}
                        error={signupErrors.location}
                        icon={<LocationIcon />}
                      />
                      <FormInput
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Min. 6 characters"
                        value={ownerData.password}
                        onChange={handleChange(setOwnerData)}
                        error={signupErrors.password}
                        icon={<LockIcon />}
                      />
                      <FormInput
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        placeholder="Re-enter password"
                        value={ownerData.confirmPassword}
                        onChange={handleChange(setOwnerData)}
                        error={signupErrors.confirmPassword}
                        icon={<LockIcon />}
                      />
                    </>
                  )}

                  {/* Register button */}
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-semibold
                               hover:bg-indigo-700 active:scale-[0.98] transition-all duration-200
                               shadow-md hover:shadow-lg mt-1"
                  >
                    Create Account
                  </button>
                </form>

                <p className="text-center text-xs text-gray-400 mt-5">
                  Already have an account?{' '}
                  <button onClick={() => switchTab('login')} className="text-indigo-500 hover:underline font-medium">
                    Login
                  </button>
                </p>
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
