const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

// ─── Helper ──────────────────────────────────────────────────────────────────
const getToken = () => localStorage.getItem('token');

const request = async (endpoint, options = {}) => {
  const token = getToken();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
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

  updateMe: (profileData) =>
    request('/auth/me', {
      method: 'PATCH',
      body: JSON.stringify(profileData),
    }),
};

// ─── Properties API ───────────────────────────────────────────────────────────

export const propertiesAPI = {
  // filters = { type, maxRent, available, area, gender }
  getAll: (filters = {}) => {
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
  getMyListings: () => request('/properties/my-listings'),
  create: (propertyData) =>
    request('/properties', {
      method: 'POST',
      body: JSON.stringify(propertyData),
    }),

  update: (id, data) =>
    request(`/properties/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    request(`/properties/${id}`, { method: 'DELETE' }),
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

  getReceived:   () => request('/contacts/received'),
};