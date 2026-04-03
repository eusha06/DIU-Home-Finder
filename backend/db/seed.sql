-- ─── Sample Owner User ───────────────────────────────────────────────────────
-- Password is 'password123' hashed with bcrypt (12 rounds)
INSERT INTO users (name, email, password_hash, role, phone) VALUES
(
  'Mr. Rahman',
  'rahman@owner.com',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/HS4qFbm',
  'owner',
  '01711223344'
);

-- ─── Sample Student User ─────────────────────────────────────────────────────
INSERT INTO users (name, email, password_hash, role, diu_student_id, phone) VALUES
(
  'Eusha Ahmed',
  'eusha@diu.edu.bd',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/HS4qFbm',
  'student',
  '221-15-4567',
  '01799887766'
);

-- ─── Sample Hostel Manager User ──────────────────────────────────────────────
INSERT INTO users (name, email, password_hash, role, phone) VALUES
(
  'Rafiq Ahmed',
  'rafiq@manager.com',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/HS4qFbm',
  'hostel_manager',
  '01822334455'
);

-- ─── Sample Properties ───────────────────────────────────────────────────────
-- owner_id = 1 (Mr. Rahman created above)
INSERT INTO properties
  (owner_id, title, description, type, rent, address, area, distance_from_diu,
   total_seats, available_seats, is_available, is_verified, gender_preference, amenities)
VALUES
(
  1,
  'Comfortable Single Room near DIU Gate-1',
  'Clean and quiet single room with attached bathroom. 24/7 security guard. Very close to DIU main gate.',
  'room', 3500,
  'House 12, Road 4, Dhanmondi, Dhaka',
  'Dhanmondi',
  '5 min walk',
  1, 1, true, true, 'any',
  ARRAY['wifi', 'attached_bathroom', 'security']
),
(
  1,
  'Girls Hostel — Fully Furnished, AC Rooms',
  'Safe and secure girls hostel. Female staff on duty 24 hours. Meals available.',
  'hostel', 5000,
  'House 45, Road 8, Asad Gate, Dhaka',
  'Asad Gate',
  '10 min walk',
  20, 5, true, true, 'female',
  ARRAY['wifi', 'ac', 'meals', 'security', 'cctv']
),
(
  1,
  'Budget Seat in Shared Room — Male Students',
  'Affordable seat in a shared 4-person room. Good for students on a budget.',
  'seat', 2000,
  'Flat 3B, Mirpur Road, Dhaka',
  'Mirpur Road',
  '15 min walk',
  4, 2, true, true, 'male',
  ARRAY['wifi', 'shared_bathroom']
),
(
  1,
  '2-Bedroom Flat — Ideal for Group of Students',
  'Spacious flat perfect for 3-4 students sharing. Fully furnished with fridge and washing machine.',
  'flat', 12000,
  'Flat 5A, House 22, Jigatola, Dhaka',
  'Jigatola',
  '8 min walk',
  4, 0, false, true, 'any',
  ARRAY['wifi', 'ac', 'fridge', 'washing_machine', 'parking']
),
(
  1,
  'Single Room — Non-AC, Budget Friendly',
  'Simple room for a student. No AC but fan provided. Clean common bathroom.',
  'room', 2800,
  'House 7, Kalabagan, Dhaka',
  'Kalabagan',
  '12 min walk',
  1, 1, true, true, 'any',
  ARRAY['wifi', 'shared_bathroom']
);

-- ─── Sample Property Images ───────────────────────────────────────────────────
-- Using placeholder images for now (real images via Cloudinary in Phase 5)
INSERT INTO property_images (property_id, image_url, is_primary) VALUES
(1, 'https://placehold.co/600x400?text=Room+Photo', true),
(2, 'https://placehold.co/600x400?text=Hostel+Photo', true),
(3, 'https://placehold.co/600x400?text=Seat+Photo', true),
(4, 'https://placehold.co/600x400?text=Flat+Photo', true),
(5, 'https://placehold.co/600x400?text=Room+Photo+2', true);