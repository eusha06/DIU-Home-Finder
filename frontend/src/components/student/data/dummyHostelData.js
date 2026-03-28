/**
 * dummyHostelData.js
 * Hierarchical hostel data: Hostel -> Floors -> Rooms -> Beds
 * Each hostel is gender-specific (male / female).
 * Beds have status: "available" | "occupied"
 */

const dummyHostels = [
  // MALE HOSTELS
  {
    id: 'h1',
    name: 'Yunus Khan Scholar Garden-1',
    gender: 'male',
    location: 'DIU Permanent Campus, Ashulia',
    description: 'Official DIU male hostel located inside the permanent campus. Fully furnished rooms with bunk beds, study tables, and personal lockers. 24/7 security with biometric access. Mess hall serves 3 meals a day.',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop',
    facilities: ['wifi', 'meals', 'security', 'laundry', 'cctv', 'generator', 'water', 'electricity'],
    rent: 3500,
    floors: [
      {
        floorNumber: 1,
        rooms: [
          { roomNumber: '101', type: 'Double', facilities: ['attached bathroom', 'ceiling fan', 'study desk'], beds: [{ bedId: '101A', status: 'available' }, { bedId: '101B', status: 'occupied' }] },
          { roomNumber: '102', type: 'Four Bed', facilities: ['attached bathroom', 'ceiling fan', 'wardrobe'], beds: [{ bedId: '102A', status: 'occupied' }, { bedId: '102B', status: 'available' }, { bedId: '102C', status: 'available' }, { bedId: '102D', status: 'occupied' }] },
          { roomNumber: '103', type: 'Single', facilities: ['attached bathroom', 'ac', 'study desk', 'balcony'], beds: [{ bedId: '103A', status: 'available' }] },
          { roomNumber: '104', type: 'Double', facilities: ['shared bathroom', 'ceiling fan'], beds: [{ bedId: '104A', status: 'occupied' }, { bedId: '104B', status: 'occupied' }] },
        ],
      },
      {
        floorNumber: 2,
        rooms: [
          { roomNumber: '201', type: 'Four Bed', facilities: ['attached bathroom', 'ceiling fan', 'wardrobe'], beds: [{ bedId: '201A', status: 'available' }, { bedId: '201B', status: 'available' }, { bedId: '201C', status: 'occupied' }, { bedId: '201D', status: 'available' }] },
          { roomNumber: '202', type: 'Double', facilities: ['attached bathroom', 'ac', 'study desk'], beds: [{ bedId: '202A', status: 'available' }, { bedId: '202B', status: 'occupied' }] },
          { roomNumber: '203', type: 'Single', facilities: ['attached bathroom', 'ac', 'balcony'], beds: [{ bedId: '203A', status: 'occupied' }] },
        ],
      },
      {
        floorNumber: 3,
        rooms: [
          { roomNumber: '301', type: 'Double', facilities: ['attached bathroom', 'ceiling fan'], beds: [{ bedId: '301A', status: 'available' }, { bedId: '301B', status: 'available' }] },
          { roomNumber: '302', type: 'Four Bed', facilities: ['shared bathroom', 'ceiling fan', 'wardrobe'], beds: [{ bedId: '302A', status: 'occupied' }, { bedId: '302B', status: 'available' }, { bedId: '302C', status: 'occupied' }, { bedId: '302D', status: 'occupied' }] },
          { roomNumber: '303', type: 'Double', facilities: ['attached bathroom', 'ac', 'study desk', 'balcony'], beds: [{ bedId: '303A', status: 'available' }, { bedId: '303B', status: 'available' }] },
        ],
      },
    ],
  },
  {
    id: 'h2',
    name: 'Yunus Khan Scholar Garden-2',
    gender: 'male',
    location: 'Dhanmondi 32, Dhaka',
    description: 'Private male hostel focused on academic environment. Dedicated study lounges on every floor, high-speed fiber internet, and quiet hours strictly enforced.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop',
    facilities: ['wifi', 'meals', 'security', 'cctv', 'generator', 'water', 'electricity'],
    rent: 4200,
    floors: [
      {
        floorNumber: 1,
        rooms: [
          { roomNumber: '101', type: 'Double', facilities: ['attached bathroom', 'ac', 'study desk'], beds: [{ bedId: '101A', status: 'available' }, { bedId: '101B', status: 'available' }] },
          { roomNumber: '102', type: 'Single', facilities: ['attached bathroom', 'ac', 'balcony', 'study desk'], beds: [{ bedId: '102A', status: 'occupied' }] },
          { roomNumber: '103', type: 'Four Bed', facilities: ['shared bathroom', 'ceiling fan', 'wardrobe'], beds: [{ bedId: '103A', status: 'available' }, { bedId: '103B', status: 'occupied' }, { bedId: '103C', status: 'occupied' }, { bedId: '103D', status: 'available' }] },
        ],
      },
      {
        floorNumber: 2,
        rooms: [
          { roomNumber: '201', type: 'Four Bed', facilities: ['attached bathroom', 'ceiling fan', 'wardrobe'], beds: [{ bedId: '201A', status: 'occupied' }, { bedId: '201B', status: 'available' }, { bedId: '201C', status: 'occupied' }, { bedId: '201D', status: 'occupied' }] },
          { roomNumber: '202', type: 'Double', facilities: ['attached bathroom', 'ac'], beds: [{ bedId: '202A', status: 'available' }, { bedId: '202B', status: 'available' }] },
        ],
      },
      {
        floorNumber: 3,
        rooms: [
          { roomNumber: '301', type: 'Single', facilities: ['attached bathroom', 'ac', 'balcony', 'study desk'], beds: [{ bedId: '301A', status: 'available' }] },
          { roomNumber: '302', type: 'Double', facilities: ['attached bathroom', 'ceiling fan'], beds: [{ bedId: '302A', status: 'occupied' }, { bedId: '302B', status: 'occupied' }] },
        ],
      },
      {
        floorNumber: 4,
        rooms: [
          { roomNumber: '401', type: 'Four Bed', facilities: ['attached bathroom', 'ceiling fan', 'wardrobe'], beds: [{ bedId: '401A', status: 'available' }, { bedId: '401B', status: 'available' }, { bedId: '401C', status: 'available' }, { bedId: '401D', status: 'occupied' }] },
          { roomNumber: '402', type: 'Double', facilities: ['attached bathroom', 'ac', 'study desk'], beds: [{ bedId: '402A', status: 'occupied' }, { bedId: '402B', status: 'available' }] },
        ],
      },
    ],
  },
  {
    id: 'h3',
    name: 'Yunus Khan Scholar Garden-3',
    gender: 'male',
    location: 'Savar Bus Stand, Savar',
    description: 'Affordable male hostel near Savar bus stand with easy commute to DIU. Simple and clean rooms. Mess provides breakfast and dinner.',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop',
    facilities: ['water', 'electricity', 'meals', 'security'],
    rent: 2800,
    floors: [
      {
        floorNumber: 1,
        rooms: [
          { roomNumber: '101', type: 'Four Bed', facilities: ['shared bathroom', 'ceiling fan'], beds: [{ bedId: '101A', status: 'available' }, { bedId: '101B', status: 'available' }, { bedId: '101C', status: 'occupied' }, { bedId: '101D', status: 'available' }] },
          { roomNumber: '102', type: 'Four Bed', facilities: ['shared bathroom', 'ceiling fan'], beds: [{ bedId: '102A', status: 'occupied' }, { bedId: '102B', status: 'occupied' }, { bedId: '102C', status: 'available' }, { bedId: '102D', status: 'occupied' }] },
          { roomNumber: '103', type: 'Double', facilities: ['shared bathroom', 'ceiling fan'], beds: [{ bedId: '103A', status: 'available' }, { bedId: '103B', status: 'available' }] },
        ],
      },
      {
        floorNumber: 2,
        rooms: [
          { roomNumber: '201', type: 'Four Bed', facilities: ['shared bathroom', 'ceiling fan'], beds: [{ bedId: '201A', status: 'available' }, { bedId: '201B', status: 'occupied' }, { bedId: '201C', status: 'available' }, { bedId: '201D', status: 'available' }] },
          { roomNumber: '202', type: 'Double', facilities: ['attached bathroom', 'ceiling fan'], beds: [{ bedId: '202A', status: 'occupied' }, { bedId: '202B', status: 'occupied' }] },
          { roomNumber: '203', type: 'Double', facilities: ['shared bathroom', 'ceiling fan'], beds: [{ bedId: '203A', status: 'available' }, { bedId: '203B', status: 'occupied' }] },
        ],
      },
    ],
  },
  // FEMALE HOSTELS
  {
    id: 'h4',
    name: 'Rowshan Ara Scholar Garden-1',
    gender: 'female',
    location: 'DIU Permanent Campus, Ashulia',
    description: 'Official DIU female hostel with warden supervision round the clock. Separate wings with card access. Includes study rooms, prayer rooms, and a mini library.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
    facilities: ['wifi', 'meals', 'security', 'laundry', 'cctv', 'generator', 'elevator', 'water', 'electricity'],
    rent: 3500,
    floors: [
      {
        floorNumber: 1,
        rooms: [
          { roomNumber: '101', type: 'Double', facilities: ['attached bathroom', 'ac', 'study desk'], beds: [{ bedId: '101A', status: 'occupied' }, { bedId: '101B', status: 'available' }] },
          { roomNumber: '102', type: 'Four Bed', facilities: ['attached bathroom', 'ceiling fan', 'wardrobe'], beds: [{ bedId: '102A', status: 'occupied' }, { bedId: '102B', status: 'available' }, { bedId: '102C', status: 'occupied' }, { bedId: '102D', status: 'available' }] },
          { roomNumber: '103', type: 'Single', facilities: ['attached bathroom', 'ac', 'study desk', 'balcony'], beds: [{ bedId: '103A', status: 'occupied' }] },
        ],
      },
      {
        floorNumber: 2,
        rooms: [
          { roomNumber: '201', type: 'Double', facilities: ['attached bathroom', 'ceiling fan'], beds: [{ bedId: '201A', status: 'available' }, { bedId: '201B', status: 'available' }] },
          { roomNumber: '202', type: 'Four Bed', facilities: ['shared bathroom', 'ceiling fan', 'wardrobe'], beds: [{ bedId: '202A', status: 'occupied' }, { bedId: '202B', status: 'available' }, { bedId: '202C', status: 'occupied' }, { bedId: '202D', status: 'occupied' }] },
          { roomNumber: '203', type: 'Single', facilities: ['attached bathroom', 'ac', 'balcony'], beds: [{ bedId: '203A', status: 'available' }] },
        ],
      },
      {
        floorNumber: 3,
        rooms: [
          { roomNumber: '301', type: 'Four Bed', facilities: ['attached bathroom', 'ceiling fan', 'wardrobe'], beds: [{ bedId: '301A', status: 'available' }, { bedId: '301B', status: 'occupied' }, { bedId: '301C', status: 'available' }, { bedId: '301D', status: 'available' }] },
          { roomNumber: '302', type: 'Double', facilities: ['attached bathroom', 'ac', 'study desk'], beds: [{ bedId: '302A', status: 'occupied' }, { bedId: '302B', status: 'occupied' }] },
        ],
      },
      {
        floorNumber: 4,
        rooms: [
          { roomNumber: '401', type: 'Double', facilities: ['attached bathroom', 'ac', 'balcony'], beds: [{ bedId: '401A', status: 'available' }, { bedId: '401B', status: 'available' }] },
          { roomNumber: '402', type: 'Four Bed', facilities: ['attached bathroom', 'ceiling fan', 'wardrobe'], beds: [{ bedId: '402A', status: 'occupied' }, { bedId: '402B', status: 'available' }, { bedId: '402C', status: 'occupied' }, { bedId: '402D', status: 'available' }] },
        ],
      },
    ],
  },
  {
    id: 'h5',
    name: 'Rowshan Ara Scholar Garden-2',
    gender: 'female',
    location: 'Uttara Sector 3, Dhaka',
    description: 'Premium female hostel with modern amenities and a homely atmosphere. Rooms are spacious with attached bathrooms. Rooftop garden for relaxation.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
    facilities: ['wifi', 'meals', 'security', 'laundry', 'cctv', 'rooftop', 'elevator', 'water', 'electricity'],
    rent: 5500,
    floors: [
      {
        floorNumber: 1,
        rooms: [
          { roomNumber: '101', type: 'Single', facilities: ['attached bathroom', 'ac', 'study desk', 'balcony'], beds: [{ bedId: '101A', status: 'available' }] },
          { roomNumber: '102', type: 'Double', facilities: ['attached bathroom', 'ac', 'wardrobe'], beds: [{ bedId: '102A', status: 'occupied' }, { bedId: '102B', status: 'occupied' }] },
        ],
      },
      {
        floorNumber: 2,
        rooms: [
          { roomNumber: '201', type: 'Double', facilities: ['attached bathroom', 'ac', 'study desk'], beds: [{ bedId: '201A', status: 'available' }, { bedId: '201B', status: 'occupied' }] },
          { roomNumber: '202', type: 'Single', facilities: ['attached bathroom', 'ac', 'balcony'], beds: [{ bedId: '202A', status: 'occupied' }] },
        ],
      },
      {
        floorNumber: 3,
        rooms: [
          { roomNumber: '301', type: 'Double', facilities: ['attached bathroom', 'ac', 'study desk', 'wardrobe'], beds: [{ bedId: '301A', status: 'available' }, { bedId: '301B', status: 'available' }] },
          { roomNumber: '302', type: 'Four Bed', facilities: ['attached bathroom', 'ceiling fan', 'wardrobe'], beds: [{ bedId: '302A', status: 'occupied' }, { bedId: '302B', status: 'available' }, { bedId: '302C', status: 'occupied' }, { bedId: '302D', status: 'available' }] },
        ],
      },
    ],
  },
  {
    id: 'h6',
    name: 'DISS Female Hall',
    gender: 'female',
    location: 'Mirpur DOHS, Dhaka',
    description: 'Secure female hostel in an upscale residential area. Each room is air-conditioned with personal wardrobe and study desk. Shuttle service to nearby universities.',
    image: 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=600&h=400&fit=crop',
    facilities: ['wifi', 'meals', 'security', 'ac', 'laundry', 'shuttle', 'cctv', 'generator', 'elevator', 'water', 'electricity'],
    rent: 7000,
    floors: [
      {
        floorNumber: 1,
        rooms: [
          { roomNumber: '101', type: 'Single', facilities: ['attached bathroom', 'ac', 'study desk', 'wardrobe'], beds: [{ bedId: '101A', status: 'occupied' }] },
          { roomNumber: '102', type: 'Double', facilities: ['attached bathroom', 'ac', 'study desk', 'wardrobe'], beds: [{ bedId: '102A', status: 'occupied' }, { bedId: '102B', status: 'available' }] },
        ],
      },
      {
        floorNumber: 2,
        rooms: [
          { roomNumber: '201', type: 'Double', facilities: ['attached bathroom', 'ac', 'balcony', 'wardrobe'], beds: [{ bedId: '201A', status: 'occupied' }, { bedId: '201B', status: 'occupied' }] },
          { roomNumber: '202', type: 'Single', facilities: ['attached bathroom', 'ac', 'study desk'], beds: [{ bedId: '202A', status: 'available' }] },
        ],
      },
      {
        floorNumber: 3,
        rooms: [
          { roomNumber: '301', type: 'Double', facilities: ['attached bathroom', 'ac', 'study desk', 'wardrobe'], beds: [{ bedId: '301A', status: 'available' }, { bedId: '301B', status: 'occupied' }] },
          { roomNumber: '302', type: 'Single', facilities: ['attached bathroom', 'ac', 'balcony'], beds: [{ bedId: '302A', status: 'occupied' }] },
        ],
      },
      {
        floorNumber: 4,
        rooms: [
          { roomNumber: '401', type: 'Four Bed', facilities: ['attached bathroom', 'ac', 'wardrobe'], beds: [{ bedId: '401A', status: 'occupied' }, { bedId: '401B', status: 'available' }, { bedId: '401C', status: 'occupied' }, { bedId: '401D', status: 'occupied' }] },
          { roomNumber: '402', type: 'Double', facilities: ['attached bathroom', 'ac', 'study desk', 'balcony'], beds: [{ bedId: '402A', status: 'available' }, { bedId: '402B', status: 'available' }] },
        ],
      },
      {
        floorNumber: 5,
        rooms: [
          { roomNumber: '501', type: 'Single', facilities: ['attached bathroom', 'ac', 'study desk', 'wardrobe', 'balcony'], beds: [{ bedId: '501A', status: 'available' }] },
          { roomNumber: '502', type: 'Double', facilities: ['attached bathroom', 'ac', 'wardrobe'], beds: [{ bedId: '502A', status: 'occupied' }, { bedId: '502B', status: 'occupied' }] },
        ],
      },
    ],
  },
]

export default dummyHostels
