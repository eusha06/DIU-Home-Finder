// ══════════════════════════════════════════════════════════════════════════════
// dummyAdminData.js
// ──────────────────
// Dummy JSON data for the Admin Panel Dashboard.
// Contains users, properties pending approval, and reported properties.
// No backend connection — all data lives here.
// ══════════════════════════════════════════════════════════════════════════════

// ── Users ────────────────────────────────────────────────────────────────────
export const adminUsers = [
  {
    id: 1,
    name: 'Rafiq Ahmed',
    email: 'rafiq@example.com',
    role: 'student',
    status: 'active',
  },
  {
    id: 2,
    name: 'Samira Akter',
    email: 'samira@example.com',
    role: 'student',
    status: 'active',
  },
  {
    id: 3,
    name: 'Kamal Hossain',
    email: 'kamal@example.com',
    role: 'owner',
    status: 'blocked',
  },
  {
    id: 4,
    name: 'Fatema Begum',
    email: 'fatema@example.com',
    role: 'owner',
    status: 'active',
  },
  {
    id: 5,
    name: 'Nusrat Jahan',
    email: 'nusrat@example.com',
    role: 'student',
    status: 'active',
  },
  {
    id: 6,
    name: 'Imran Khan',
    email: 'imran@example.com',
    role: 'student',
    status: 'blocked',
  },
  {
    id: 7,
    name: 'Tasnim Rahman',
    email: 'tasnim@example.com',
    role: 'owner',
    status: 'active',
  },
  {
    id: 8,
    name: 'Arif Miah',
    email: 'arif@example.com',
    role: 'student',
    status: 'active',
  },
]

// ── Properties pending approval ──────────────────────────────────────────────
export const adminPendingProperties = [
  {
    id: 101,
    title: 'Green Valley Apartment',
    ownerName: 'Kamal Hossain',
    rent: 4500,
    genderType: 'Male',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600',
    status: 'pending', // pending | approved | rejected
  },
  {
    id: 102,
    title: 'Sunrise Residence',
    ownerName: 'Fatema Begum',
    rent: 5000,
    genderType: 'Female',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600',
    status: 'pending',
  },
  {
    id: 103,
    title: 'City View Tower',
    ownerName: 'Tasnim Rahman',
    rent: 6500,
    genderType: 'Male',
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=600',
    status: 'pending',
  },
  {
    id: 104,
    title: 'Peaceful Garden House',
    ownerName: 'Kamal Hossain',
    rent: 3800,
    genderType: 'Female',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',
    status: 'pending',
  },
  {
    id: 105,
    title: 'Scholar\'s Den',
    ownerName: 'Fatema Begum',
    rent: 3200,
    genderType: 'Male',
    image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=600',
    status: 'pending',
  },
]

// ── Reported properties ──────────────────────────────────────────────────────
export const adminReports = [
  {
    id: 201,
    propertyName: 'Green Valley Apartment',
    reportReason: 'Misleading photos — rooms are smaller than shown.',
    reporterName: 'Rafiq Ahmed',
    resolved: false,
  },
  {
    id: 202,
    propertyName: 'Sunrise Residence',
    reportReason: 'No WiFi available despite listing claiming free WiFi.',
    reporterName: 'Samira Akter',
    resolved: false,
  },
  {
    id: 203,
    propertyName: 'City View Tower',
    reportReason: 'Unsafe building — broken fire exits.',
    reporterName: 'Nusrat Jahan',
    resolved: false,
  },
  {
    id: 204,
    propertyName: 'Peaceful Garden House',
    reportReason: 'Owner asked for extra advance outside the platform.',
    reporterName: 'Arif Miah',
    resolved: false,
  },
]
