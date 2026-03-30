import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api/index.js';

// Create the context
const AuthContext = createContext(null);

// Provider component — wraps your whole app
export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);   // logged-in user object
  const [token, setToken]     = useState(null);   // JWT token string
  const [loading, setLoading] = useState(true);   // true while checking saved login

  // On app startup — check if user was previously logged in
  // (token saved in localStorage survives page refresh)
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser  = localStorage.getItem('user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // ─── Login ─────────────────────────────────────────────────────────────────
  const login = async (email, password, extraData = {}) => {
  const data = await authAPI.login(email, password)

  // Merge backend user with any extra frontend-only fields
  // (gender is selected on the login form but not stored in DB)
  const enrichedUser = {
    ...data.user,
    fullName:   data.user.name,
    studentId:  data.user.diu_student_id || 'N/A',
    gender:     extraData.gender || 'any',
    phone:      data.user.phone || '',
  }

  setToken(data.token)
  setUser(enrichedUser)
  localStorage.setItem('token', data.token)
  localStorage.setItem('user', JSON.stringify(enrichedUser))
  return { ...data, user: enrichedUser }
};

  // ─── Register ──────────────────────────────────────────────────────────────
  const register = async (userData) => {
  const data = await authAPI.register(userData)

  const enrichedUser = {
    ...data.user,
    fullName:  data.user.name,
    studentId: data.user.diu_student_id || 'N/A',
    gender:    userData.gender || 'any',
    phone:     data.user.phone || '',
  }

  setToken(data.token)
  setUser(enrichedUser)
  localStorage.setItem('token', data.token)
  localStorage.setItem('user', JSON.stringify(enrichedUser))
  return { ...data, user: enrichedUser }
};

  // ─── Logout ────────────────────────────────────────────────────────────────
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Values available to any component that calls useAuth()
  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    isLoggedIn: !!token,
    isStudent:  user?.role === 'student',
    isOwner:    user?.role === 'owner' || user?.role === 'homeowner',
    isAdmin:    user?.role === 'admin',
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Don't render children until we've checked localStorage */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook — use this in any component instead of useContext(AuthContext)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return context;
};

export default AuthContext;