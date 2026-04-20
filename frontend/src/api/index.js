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

  let data;
  try {
    data = await response.json();
  } catch (err) {
    // If backend returns a non-JSON error (e.g. 502 HTML)
    data = { message: `Server error: ${response.status} ${response.statusText}` };
  }

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
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

  cancelRequest: (contactId) => 
    request(`/contacts/${contactId}`, { method: 'DELETE' }),

  updateStatus:  (contactId, status) =>
    request(`/contacts/${contactId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

// ─── Upload API ───────────────────────────────────────────────────────────────

export const uploadAPI = {
  // propertyId = the property to attach images to
  // files = FileList or array of File objects from an <input type="file">
  uploadImages: async (propertyId, files) => {
    const token = localStorage.getItem('token');

    // Images must be sent as FormData — NOT JSON
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('images', file);
    });

    const response = await fetch(`${BASE_URL}/upload/property/${propertyId}`, {
      method: 'POST',
      headers: {
        // DO NOT set Content-Type here — browser sets it automatically with boundary
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Upload failed');
    return data;
  },

  deleteImage: (imageId) =>
    request(`/upload/image/${imageId}`, { method: 'DELETE' }),
};