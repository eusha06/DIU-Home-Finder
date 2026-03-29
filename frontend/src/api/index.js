// Base URL — in development Vite proxies /api to localhost:5000
// In production (Vercel) you'll set VITE_API_URL env variable
const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

// ─── Helper ──────────────────────────────────────────────────────────────────
// Reads JWT token from localStorage
const getToken = () => localStorage.getItem('token');

const parseResponseBody = async (response) => {
  // 204/205 responses intentionally contain no response body.
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  const raw = await response.text();
  if (!raw) {
    return null;
  }

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  // Some proxies/middlewares omit the JSON content-type. Try once anyway.
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
};

// Core fetch wrapper — handles auth header and JSON parsing automatically
const request = async (endpoint, options = {}) => {
  const token = getToken();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      // Attach token if it exists
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  let response;
  try {
    response = await fetch(`${BASE_URL}${endpoint}`, config);
  } catch {
    throw new Error('Cannot connect to API server. Make sure backend is running on port 5000.');
  }

  const data = await parseResponseBody(response);

  // If response is not ok (4xx, 5xx), throw so caller can catch it
  if (!response.ok) {
    const message =
      (data && typeof data === 'object' && data.message) ||
      (typeof data === 'string' && data.trim()) ||
      `Request failed (${response.status})`;
    throw new Error(message);
  }

  // Keep return shape predictable for callers when server sends an empty body.
  return data ?? {};
};

// ─── Auth API ─────────────────────────────────────────────────────────────────

export const authAPI = {
  register: (userData) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getMe: () => request('/auth/me'),
};

// ─── Properties API ───────────────────────────────────────────────────────────

export const propertiesAPI = {
  // filters = { type, maxRent, available, area, gender }
  getAll: (filters = {}) => {
    // Convert filters object to URL query string
    // e.g. { type: 'hostel', maxRent: 5000 } → '?type=hostel&maxRent=5000'
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== undefined && val !== '' && val !== null) {
        params.append(key, val);
      }
    });
    const query = params.toString() ? `?${params.toString()}` : '';
    return request(`/properties${query}`);
  },

  getById: (id) => request(`/properties/${id}`),

  create: (propertyData) =>
    request('/properties', {
      method: 'POST',
      body: JSON.stringify(propertyData),
    }),
};

// ─── Bookmarks API ────────────────────────────────────────────────────────────

export const bookmarksAPI = {
  getAll: () => request('/bookmarks'),

  add: (propertyId) =>
    request(`/bookmarks/${propertyId}`, { method: 'POST' }),

  remove: (propertyId) =>
    request(`/bookmarks/${propertyId}`, { method: 'DELETE' }),

  check: (propertyId) =>
    request(`/bookmarks/check/${propertyId}`),
};

// ─── Contacts API ─────────────────────────────────────────────────────────────

export const contactsAPI = {
  send: (property_id, message) =>
    request('/contacts', {
      method: 'POST',
      body: JSON.stringify({ property_id, message }),
    }),

  getMyRequests: () => request('/contacts/my-requests'),

  getReceived: () => request('/contacts/received'),
};