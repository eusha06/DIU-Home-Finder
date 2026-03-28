/**
 * dummyHostelManagerData.js
 * 
 * Hierarchical hostel data for the Hostel Manager dashboard.
 * Same structure as student-side: Hostel -> Floors -> Rooms -> Beds
 * Manager can view/edit all hostels, toggle bed status, manage bookings.
 */

export const managerHostels = [
  {
    id: 'mh1',
    name: 'Yunus Khan Scholar Garden-1',
    gender: 'male',
    location: 'DIU Permanent Campus, Ashulia',
    wardenName: 'Dr. Rafiq Ahmed',
    wardenPhone: '01712345001',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop',
    facilities: ['wifi', 'meals', 'security', 'laundry', 'cctv', 'generator', 'water', 'electricity'],
    rent: 3500,
    isOpen: true,
    floors: [
      {
        floorNumber: 1,
        rooms: [
          { roomNumber: '101', type: 'Double', facilities: ['attached bathroom', 'ceiling fan', 'study desk'], beds: [{ bedId: '101A', status: 'available' }, { bedId: '101B', status: 'occupied', studentName: 'Tanvir Hasan', studentId: 'STU-2024-001' }] },
          { roomNumber: '102', type: 'Four Bed', facilities: ['attached bathroom', 'ceiling fan', 'wardrobe'], beds: [{ bedId: '102A', status: 'occupied', studentName: 'Rakib Islam', studentId: 'STU-2024-003' }, { bedId: '102B', status: 'available' }, { bedId: '102C', status: 'available' }, { bedId: '102D', status: 'occupied', studentName: 'Sakib Al Hasan', studentId: 'STU-2024-009' }] },
          { roomNumber: '103', type: 'Single', facilities: ['attached bathroom', 'ac', 'study desk', 'balcony'], beds: [{ bedId: '103A', status: 'available' }] },
          { roomNumber: '104', type: 'Double', facilities: ['shared bathroom', 'ceiling fan'], beds: [{ bedId: '104A', status: 'occupied', studentName: 'Arif Hossain', studentId: 'STU-2024-007' }, { bedId: '104B', status: 'occupied', studentName: 'Imran Kabir', studentId: 'STU-2024-005' }] },
        ],
      },
      {
        floorNumber: 2,
        rooms: [
          { roomNumber: '201', type: 'Four Bed', facilities: ['attached bathroom', 'ceiling fan', 'wardrobe'], beds: [{ bedId: '201A', status: 'available' }, { bedId: '201B', status: 'available' }, { bedId: '201C', status: 'occupied', studentName: 'Nahid Hasan', studentId: 'STU-2024-015' }, { bedId: '201D', status: 'available' }] },
          { roomNumber: '202', type: 'Double', facilities: ['attached bathroom', 'ac', 'study desk'], beds: [{ bedId: '202A', status: 'available' }, { bedId: '202B', status: 'occupied', studentName: 'Fahim Rahman', studentId: 'STU-2024-018' }] },
          { roomNumber: '203', type: 'Single', facilities: ['attached bathroom', 'ac', 'balcony'], beds: [{ bedId: '203A', status: 'occupied', studentName: 'Jubayer Ahmed', studentId: 'STU-2024-020' }] },
        ],
      },
      {
        floorNumber: 3,
        rooms: [
          { roomNumber: '301', type: 'Double', facilities: ['attached bathroom', 'ceiling fan'], beds: [{ bedId: '301A', status: 'available' }, { bedId: '301B', status: 'available' }] },
          { roomNumber: '302', type: 'Four Bed', facilities: ['shared bathroom', 'ceiling fan', 'wardrobe'], beds: [{ bedId: '302A', status: 'occupied', studentName: 'Rasel Mia', studentId: 'STU-2024-022' }, { bedId: '302B', status: 'available' }, { bedId: '302C', status: 'occupied', studentName: 'Sohag Khan', studentId: 'STU-2024-024' }, { bedId: '302D', status: 'occupied', studentName: 'Rifat Hossain', studentId: 'STU-2024-025' }] },
          { roomNumber: '303', type: 'Double', facilities: ['attached bathroom', 'ac', 'study desk', 'balcony'], beds: [{ bedId: '303A', status: 'available' }, { bedId: '303B', status: 'available' }] },
        ],
      },
    ],
  },
  {
    id: 'mh2',
    name: 'Yunus Khan Scholar Garden-2',
    gender: 'male',
    location: 'Dhanmondi 32, Dhaka',
    wardenName: 'Prof. Aminul Islam',
    wardenPhone: '01812345002',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop',
    facilities: ['wifi', 'meals', 'security', 'cctv', 'generator', 'water', 'electricity'],
    rent: 4200,
    isOpen: true,
    floors: [
      {
        floorNumber: 1,
        rooms: [
          { roomNumber: '101', type: 'Double', facilities: ['attached bathroom', 'ac', 'study desk'], beds: [{ bedId: '101A', status: 'available' }, { bedId: '101B', status: 'available' }] },
          { roomNumber: '102', type: 'Single', facilities: ['attached bathroom', 'ac', 'balcony', 'study desk'], beds: [{ bedId: '102A', status: 'occupied', studentName: 'Kamrul Hasan', studentId: 'STU-2024-030' }] },
          { roomNumber: '103', type: 'Four Bed', facilities: ['shared bathroom', 'ceiling fan', 'wardrobe'], beds: [{ bedId: '103A', status: 'available' }, { bedId: '103B', status: 'occupied', studentName: 'Shafiq Ahmed', studentId: 'STU-2024-032' }, { bedId: '103C', status: 'occupied', studentName: 'Nayeem Uddin', studentId: 'STU-2024-033' }, { bedId: '103D', status: 'available' }] },
        ],
      },
      {
        floorNumber: 2,
        rooms: [
          { roomNumber: '201', type: 'Four Bed', facilities: ['attached bathroom', 'ceiling fan', 'wardrobe'], beds: [{ bedId: '201A', status: 'occupied', studentName: 'Moinul Islam', studentId: 'STU-2024-035' }, { bedId: '201B', status: 'available' }, { bedId: '201C', status: 'occupied', studentName: 'Sohan Akter', studentId: 'STU-2024-036' }, { bedId: '201D', status: 'occupied', studentName: 'Hasan Mahmud', studentId: 'STU-2024-037' }] },
          { roomNumber: '202', type: 'Double', facilities: ['attached bathroom', 'ac'], beds: [{ bedId: '202A', status: 'available' }, { bedId: '202B', status: 'available' }] },
        ],
      },
      {
        floorNumber: 3,
        rooms: [
          { roomNumber: '301', type: 'Single', facilities: ['attached bathroom', 'ac', 'balcony', 'study desk'], beds: [{ bedId: '301A', status: 'available' }] },
          { roomNumber: '302', type: 'Double', facilities: ['attached bathroom', 'ceiling fan'], beds: [{ bedId: '302A', status: 'occupied', studentName: 'Rubel Khan', studentId: 'STU-2024-040' }, { bedId: '302B', status: 'occupied', studentName: 'Babul Hossain', studentId: 'STU-2024-041' }] },
        ],
      },
    ],
  },
  {
    id: 'mh3',
    name: 'Yunus Khan Scholar Garden-3',
    gender: 'male',
    location: 'Savar Bus Stand, Savar',
    wardenName: 'Dr. Kamal Hossain',
    wardenPhone: '01912345003',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop',
    facilities: ['water', 'electricity', 'meals', 'security'],
    rent: 2800,
    isOpen: false,
    floors: [
      {
        floorNumber: 1,
        rooms: [
          { roomNumber: '101', type: 'Four Bed', facilities: ['shared bathroom', 'ceiling fan'], beds: [{ bedId: '101A', status: 'available' }, { bedId: '101B', status: 'available' }, { bedId: '101C', status: 'occupied', studentName: 'Sojol Rana', studentId: 'STU-2024-050' }, { bedId: '101D', status: 'available' }] },
          { roomNumber: '102', type: 'Four Bed', facilities: ['shared bathroom', 'ceiling fan'], beds: [{ bedId: '102A', status: 'occupied', studentName: 'Rony Ahmed', studentId: 'STU-2024-051' }, { bedId: '102B', status: 'occupied', studentName: 'Milon Sarkar', studentId: 'STU-2024-052' }, { bedId: '102C', status: 'available' }, { bedId: '102D', status: 'occupied', studentName: 'Pavel Mia', studentId: 'STU-2024-053' }] },
          { roomNumber: '103', type: 'Double', facilities: ['shared bathroom', 'ceiling fan'], beds: [{ bedId: '103A', status: 'available' }, { bedId: '103B', status: 'available' }] },
        ],
      },
      {
        floorNumber: 2,
        rooms: [
          { roomNumber: '201', type: 'Four Bed', facilities: ['shared bathroom', 'ceiling fan'], beds: [{ bedId: '201A', status: 'available' }, { bedId: '201B', status: 'occupied', studentName: 'Naim Hossain', studentId: 'STU-2024-055' }, { bedId: '201C', status: 'available' }, { bedId: '201D', status: 'available' }] },
          { roomNumber: '202', type: 'Double', facilities: ['attached bathroom', 'ceiling fan'], beds: [{ bedId: '202A', status: 'occupied', studentName: 'Sumon Das', studentId: 'STU-2024-056' }, { bedId: '202B', status: 'occupied', studentName: 'Alamin Sheikh', studentId: 'STU-2024-057' }] },
        ],
      },
    ],
  },
  {
    id: 'mh4',
    name: 'Rowshan Ara Scholar Garden-1',
    gender: 'female',
    location: 'DIU Permanent Campus, Ashulia',
    wardenName: 'Dr. Nasreen Akter',
    wardenPhone: '01612345004',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
    facilities: ['wifi', 'meals', 'security', 'laundry', 'cctv', 'generator', 'elevator', 'water', 'electricity'],
    rent: 3500,
    isOpen: true,
    floors: [
      {
        floorNumber: 1,
        rooms: [
          { roomNumber: '101', type: 'Double', facilities: ['attached bathroom', 'ac', 'study desk'], beds: [{ bedId: '101A', status: 'occupied', studentName: 'Fatima Akhter', studentId: 'STU-2024-060' }, { bedId: '101B', status: 'available' }] },
          { roomNumber: '102', type: 'Four Bed', facilities: ['attached bathroom', 'ceiling fan', 'wardrobe'], beds: [{ bedId: '102A', status: 'occupied', studentName: 'Nusrat Jahan', studentId: 'STU-2024-061' }, { bedId: '102B', status: 'available' }, { bedId: '102C', status: 'occupied', studentName: 'Maliha Sultana', studentId: 'STU-2024-062' }, { bedId: '102D', status: 'available' }] },
          { roomNumber: '103', type: 'Single', facilities: ['attached bathroom', 'ac', 'study desk', 'balcony'], beds: [{ bedId: '103A', status: 'occupied', studentName: 'Tasnim Ferdous', studentId: 'STU-2024-063' }] },
        ],
      },
      {
        floorNumber: 2,
        rooms: [
          { roomNumber: '201', type: 'Double', facilities: ['attached bathroom', 'ceiling fan'], beds: [{ bedId: '201A', status: 'available' }, { bedId: '201B', status: 'available' }] },
          { roomNumber: '202', type: 'Four Bed', facilities: ['shared bathroom', 'ceiling fan', 'wardrobe'], beds: [{ bedId: '202A', status: 'occupied', studentName: 'Sadia Rahman', studentId: 'STU-2024-065' }, { bedId: '202B', status: 'available' }, { bedId: '202C', status: 'occupied', studentName: 'Rima Begum', studentId: 'STU-2024-066' }, { bedId: '202D', status: 'occupied', studentName: 'Tania Islam', studentId: 'STU-2024-067' }] },
          { roomNumber: '203', type: 'Single', facilities: ['attached bathroom', 'ac', 'balcony'], beds: [{ bedId: '203A', status: 'available' }] },
        ],
      },
      {
        floorNumber: 3,
        rooms: [
          { roomNumber: '301', type: 'Four Bed', facilities: ['attached bathroom', 'ceiling fan', 'wardrobe'], beds: [{ bedId: '301A', status: 'available' }, { bedId: '301B', status: 'occupied', studentName: 'Jui Akter', studentId: 'STU-2024-070' }, { bedId: '301C', status: 'available' }, { bedId: '301D', status: 'available' }] },
          { roomNumber: '302', type: 'Double', facilities: ['attached bathroom', 'ac', 'study desk'], beds: [{ bedId: '302A', status: 'occupied', studentName: 'Sumi Khatun', studentId: 'STU-2024-071' }, { bedId: '302B', status: 'occupied', studentName: 'Poly Begum', studentId: 'STU-2024-072' }] },
        ],
      },
    ],
  },
  {
    id: 'mh5',
    name: 'Rowshan Ara Scholar Garden-2',
    gender: 'female',
    location: 'Uttara Sector 3, Dhaka',
    wardenName: 'Dr. Farida Begum',
    wardenPhone: '01512345005',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
    facilities: ['wifi', 'meals', 'security', 'laundry', 'cctv', 'rooftop', 'elevator', 'water', 'electricity'],
    rent: 5500,
    isOpen: true,
    floors: [
      {
        floorNumber: 1,
        rooms: [
          { roomNumber: '101', type: 'Single', facilities: ['attached bathroom', 'ac', 'study desk', 'balcony'], beds: [{ bedId: '101A', status: 'available' }] },
          { roomNumber: '102', type: 'Double', facilities: ['attached bathroom', 'ac', 'wardrobe'], beds: [{ bedId: '102A', status: 'occupied', studentName: 'Lamia Haque', studentId: 'STU-2024-080' }, { bedId: '102B', status: 'occupied', studentName: 'Nafisa Alam', studentId: 'STU-2024-081' }] },
        ],
      },
      {
        floorNumber: 2,
        rooms: [
          { roomNumber: '201', type: 'Double', facilities: ['attached bathroom', 'ac', 'study desk'], beds: [{ bedId: '201A', status: 'available' }, { bedId: '201B', status: 'occupied', studentName: 'Sharmin Akter', studentId: 'STU-2024-083' }] },
          { roomNumber: '202', type: 'Single', facilities: ['attached bathroom', 'ac', 'balcony'], beds: [{ bedId: '202A', status: 'occupied', studentName: 'Jesmin Sultana', studentId: 'STU-2024-084' }] },
        ],
      },
      {
        floorNumber: 3,
        rooms: [
          { roomNumber: '301', type: 'Double', facilities: ['attached bathroom', 'ac', 'study desk', 'wardrobe'], beds: [{ bedId: '301A', status: 'available' }, { bedId: '301B', status: 'available' }] },
          { roomNumber: '302', type: 'Four Bed', facilities: ['attached bathroom', 'ceiling fan', 'wardrobe'], beds: [{ bedId: '302A', status: 'occupied', studentName: 'Rabeya Khatun', studentId: 'STU-2024-086' }, { bedId: '302B', status: 'available' }, { bedId: '302C', status: 'occupied', studentName: 'Sumaiya Islam', studentId: 'STU-2024-087' }, { bedId: '302D', status: 'available' }] },
        ],
      },
    ],
  },
  {
    id: 'mh6',
    name: 'DISS Female Hall',
    gender: 'female',
    location: 'Mirpur DOHS, Dhaka',
    wardenName: 'Dr. Selina Haque',
    wardenPhone: '01412345006',
    image: 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=600&h=400&fit=crop',
    facilities: ['wifi', 'meals', 'security', 'ac', 'laundry', 'shuttle', 'cctv', 'generator', 'elevator', 'water', 'electricity'],
    rent: 7000,
    isOpen: true,
    floors: [
      {
        floorNumber: 1,
        rooms: [
          { roomNumber: '101', type: 'Single', facilities: ['attached bathroom', 'ac', 'study desk', 'wardrobe'], beds: [{ bedId: '101A', status: 'occupied', studentName: 'Anika Tabassum', studentId: 'STU-2024-090' }] },
          { roomNumber: '102', type: 'Double', facilities: ['attached bathroom', 'ac', 'study desk', 'wardrobe'], beds: [{ bedId: '102A', status: 'occupied', studentName: 'Farzana Yesmin', studentId: 'STU-2024-091' }, { bedId: '102B', status: 'available' }] },
        ],
      },
      {
        floorNumber: 2,
        rooms: [
          { roomNumber: '201', type: 'Double', facilities: ['attached bathroom', 'ac', 'balcony', 'wardrobe'], beds: [{ bedId: '201A', status: 'occupied', studentName: 'Habiba Rahman', studentId: 'STU-2024-093' }, { bedId: '201B', status: 'occupied', studentName: 'Israt Jahan', studentId: 'STU-2024-094' }] },
          { roomNumber: '202', type: 'Single', facilities: ['attached bathroom', 'ac', 'study desk'], beds: [{ bedId: '202A', status: 'available' }] },
        ],
      },
      {
        floorNumber: 3,
        rooms: [
          { roomNumber: '301', type: 'Double', facilities: ['attached bathroom', 'ac', 'study desk', 'wardrobe'], beds: [{ bedId: '301A', status: 'available' }, { bedId: '301B', status: 'occupied', studentName: 'Kaniz Fatema', studentId: 'STU-2024-096' }] },
          { roomNumber: '302', type: 'Single', facilities: ['attached bathroom', 'ac', 'balcony'], beds: [{ bedId: '302A', status: 'occupied', studentName: 'Lubna Yasmin', studentId: 'STU-2024-097' }] },
        ],
      },
    ],
  },
]

// Booking requests from students
export const managerBookings = [
  { id: 201, studentName: 'Tanvir Hasan', studentId: 'STU-2024-001', hostelId: 'mh1', roomNumber: '101', bedId: '101A', date: '2026-02-25', status: 'pending' },
  { id: 202, studentName: 'Fatima Akhter', studentId: 'STU-2024-060', hostelId: 'mh4', roomNumber: '101', bedId: '101B', date: '2026-02-26', status: 'pending' },
  { id: 203, studentName: 'Rakib Islam', studentId: 'STU-2024-003', hostelId: 'mh1', roomNumber: '102', bedId: '102B', date: '2026-02-20', status: 'approved' },
  { id: 204, studentName: 'Nusrat Jahan', studentId: 'STU-2024-061', hostelId: 'mh4', roomNumber: '102', bedId: '102B', date: '2026-02-22', status: 'approved' },
  { id: 205, studentName: 'Imran Kabir', studentId: 'STU-2024-005', hostelId: 'mh2', roomNumber: '201', bedId: '201B', date: '2026-02-27', status: 'pending' },
  { id: 206, studentName: 'Sadia Rahman', studentId: 'STU-2024-065', hostelId: 'mh5', roomNumber: '301', bedId: '301A', date: '2026-02-18', status: 'rejected' },
  { id: 207, studentName: 'Arif Hossain', studentId: 'STU-2024-007', hostelId: 'mh1', roomNumber: '303', bedId: '303A', date: '2026-02-28', status: 'pending' },
  { id: 208, studentName: 'Maliha Sultana', studentId: 'STU-2024-062', hostelId: 'mh4', roomNumber: '202', bedId: '202B', date: '2026-03-01', status: 'pending' },
  { id: 209, studentName: 'Sakib Al Hasan', studentId: 'STU-2024-009', hostelId: 'mh1', roomNumber: '302', bedId: '302B', date: '2026-02-15', status: 'approved' },
  { id: 210, studentName: 'Tasnim Ferdous', studentId: 'STU-2024-063', hostelId: 'mh4', roomNumber: '301', bedId: '301A', date: '2026-02-24', status: 'pending' },
]
