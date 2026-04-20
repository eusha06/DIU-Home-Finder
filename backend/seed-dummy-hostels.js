import pool from './db/pool.js';
import bcrypt from 'bcryptjs';

// The actual dummy hostels exported
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
          { roomNumber: '101', type: 'Double', beds: [{ bedId: '101A', status: 'available' }, { bedId: '101B', status: 'occupied' }] },
          { roomNumber: '102', type: 'Four Bed', beds: [{ bedId: '102A', status: 'occupied' }, { bedId: '102B', status: 'available' }, { bedId: '102C', status: 'available' }, { bedId: '102D', status: 'occupied' }] }
        ],
      },
      {
        floorNumber: 2,
        rooms: [
          { roomNumber: '201', type: 'Double', beds: [{ bedId: '201A', status: 'available' }, { bedId: '201B', status: 'occupied' }] }
        ]
      }
    ],
  },
  {
    id: 'h2',
    name: 'Rowshanara Scholar Garden',
    gender: 'female',
    location: 'DIU Permanent Campus, Ashulia',
    description: 'Exclusive and highly secure female hostel inside the permanent campus. Features indoor games, common room, and attached dining. Regular shuttle service to different academic buildings.',
    image: 'https://images.unsplash.com/photo-1522771731470-ea432947a525?w=600&h=400&fit=crop',
    facilities: ['wifi', 'meals', 'security', 'cctv', 'shuttle', 'generator', 'water', 'electricity'],
    rent: 4000,
    floors: [
      {
        floorNumber: 1,
        rooms: [
          { roomNumber: 'F101', type: 'Four Bed', beds: [{ bedId: 'F101A', status: 'occupied' }, { bedId: 'F101B', status: 'available' }, { bedId: 'F101C', status: 'available' }] }
        ]
      }
    ],
  },
  {
    id: 'h3',
    name: 'Daffodil Tower Student Accommodation',
    gender: 'male',
    location: 'Dhanmondi, Near Main Campus',
    description: 'Conveniently located near the city campus. Ideal for students attending classes in Dhanmondi. High-speed internet and daily room cleaning included.',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&h=400&fit=crop',
    facilities: ['wifi', 'cleaning', 'security', 'rooftop', 'water', 'electricity'],
    rent: 5500,
    floors: [
      {
        floorNumber: 1,
        rooms: [
          { roomNumber: 'D101', type: 'Double', beds: [{ bedId: 'D101A', status: 'available' }, { bedId: 'D101B', status: 'available' }] }
        ]
      }
    ],
  },
  {
    id: 'h4',
    name: 'Green View Female Hostel',
    gender: 'female',
    location: 'Sobhanbag, Dhanmondi',
    description: 'Premium accommodation for female students. Fully AC rooms, modern attached baths, and a fully equipped common kitchen. Very strict security policies.',
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=600&h=400&fit=crop',
    facilities: ['wifi', 'ac', 'security', 'cctv', 'cleaning', 'water', 'electricity'],
    rent: 6500,
    floors: [
      {
        floorNumber: 1,
        rooms: [
          { roomNumber: 'G101', type: 'Single', beds: [{ bedId: 'G101A', status: 'available' }] }
        ]
      }
    ],
  }
];

async function seed() {
  try {
    // 1. Ensure a hostel_manager exists
    const managerEmail = 'system_hostel_manager@diu.edu.bd';
    let managerRes = await pool.query('SELECT id FROM users WHERE email = $1', [managerEmail]);
    let managerId;

    if (managerRes.rows.length === 0) {
      const hash = await bcrypt.hash('password123', 10);
      const inserted = await pool.query(
        "INSERT INTO users (name, email, password_hash, role, phone, is_active) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
        ['System Hostel Manager', managerEmail, hash, 'hostel_manager', '01712345678', true]
      );
      managerId = inserted.rows[0].id;
      console.log('Created System Hostel Manager. Email: system_hostel_manager@diu.edu.bd, Password: password123');
    } else {
      managerId = managerRes.rows[0].id;
    }

    // 2. Clear old dummy hostels matching this manager (optional, to avoid duplicates)
    await pool.query("DELETE FROM properties WHERE owner_id = $1 AND type = 'hostel'", [managerId]);

    // 3. Insert hostels from array
    for (const h of dummyHostels) {
      // Calculate seats
      let total_seats = 0;
      let available_seats = 0;
      h.floors.forEach(floor => {
        floor.rooms.forEach(room => {
          total_seats += room.beds.length;
          available_seats += room.beds.filter(b => b.status === 'available').length;
        });
      });

      const hostelInfoJson = JSON.stringify({ floors: h.floors });

      await pool.query(
        "INSERT INTO properties (owner_id, title, description, type, rent, address, area, total_seats, available_seats, is_available, is_verified, gender_preference, amenities, hostel_info) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
        [
          managerId,
          h.name,
          h.description,
          'hostel',
          h.rent,
          h.location, // address
          h.location, // area
          total_seats,
          available_seats,
          available_seats > 0,
          true, // verified
          h.gender,
          h.facilities,
          hostelInfoJson
        ]
      );
      console.log(`Inserted hostel: ${h.name}`);
    }

    console.log('Dummy hostels seeded successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding Error:', err);
    process.exit(1);
  }
}

seed();