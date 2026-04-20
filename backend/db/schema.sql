-- Drop tables if they exist (useful when resetting during development)
-- The order matters because of foreign key dependencies
DROP TABLE IF EXISTS contact_requests CASCADE;
DROP TABLE IF EXISTS bookmarks CASCADE;
DROP TABLE IF EXISTS property_images CASCADE;
DROP TABLE IF EXISTS properties CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ─── Users ───────────────────────────────────────────────────────────────────
-- Stores all users: students, property owners, hostel managers, and admins
CREATE TABLE users (
  id              SERIAL PRIMARY KEY,
  name            VARCHAR(100)        NOT NULL,
  email           VARCHAR(150)        UNIQUE NOT NULL,
  password_hash   TEXT                NOT NULL,
  role            VARCHAR(20)         NOT NULL DEFAULT 'student'
                  CHECK (role IN ('student', 'owner', 'hostel_manager', 'admin')),
  diu_student_id  VARCHAR(50),        -- only for students e.g. "221-15-4567"
  phone           VARCHAR(20),
  national_id     VARCHAR(50),
  building_name   VARCHAR(150),
  location        VARCHAR(200),
  bio             TEXT,
  avatar          TEXT,
  is_active       BOOLEAN             DEFAULT true,
  created_at      TIMESTAMP           DEFAULT NOW(),
  updated_at      TIMESTAMP           DEFAULT NOW()
);

-- ─── Properties ──────────────────────────────────────────────────────────────
-- Each listing posted by an owner
CREATE TABLE properties (
  id                  SERIAL PRIMARY KEY,
  owner_id            INTEGER         NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title               VARCHAR(200)    NOT NULL,
  description         TEXT,
  type                VARCHAR(20)     NOT NULL
                      CHECK (type IN ('hostel', 'room', 'flat', 'seat')),
  rent                INTEGER         NOT NULL,  -- monthly rent in BDT
  address             TEXT            NOT NULL,
  area                VARCHAR(100),              -- e.g. "Dhanmondi", "Mirpur"
  distance_from_diu   VARCHAR(100),              -- e.g. "5 min walk"
  total_seats         INTEGER         DEFAULT 1,
  available_seats     INTEGER         DEFAULT 1,
  is_available        BOOLEAN         DEFAULT true,
  is_verified         BOOLEAN         DEFAULT false,  -- admin verifies listings
  gender_preference   VARCHAR(20)     DEFAULT 'any'
                      CHECK (gender_preference IN ('male', 'female', 'any')),
  amenities           TEXT[],                    -- array: ['wifi', 'ac', 'parking']
  created_at          TIMESTAMP       DEFAULT NOW(),
  updated_at          TIMESTAMP       DEFAULT NOW()
);

-- ─── Property Images ─────────────────────────────────────────────────────────
-- Multiple images per property (from Cloudinary in Phase 5)
CREATE TABLE property_images (
  id            SERIAL PRIMARY KEY,
  property_id   INTEGER     NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  image_url     TEXT        NOT NULL,
  is_primary    BOOLEAN     DEFAULT false,  -- the main display image
  created_at    TIMESTAMP   DEFAULT NOW()
);

-- ─── Bookmarks ───────────────────────────────────────────────────────────────
-- Students saving properties they like
CREATE TABLE bookmarks (
  id            SERIAL PRIMARY KEY,
  user_id       INTEGER     NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  property_id   INTEGER     NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  created_at    TIMESTAMP   DEFAULT NOW(),

  -- Prevent a user from bookmarking the same property twice
  UNIQUE(user_id, property_id)
);

-- ─── Contact Requests ────────────────────────────────────────────────────────
-- Students contacting owners about a property
CREATE TABLE contact_requests (
  id            SERIAL PRIMARY KEY,
  student_id    INTEGER     NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  property_id   INTEGER     NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  message       TEXT        NOT NULL,
  status        VARCHAR(20) DEFAULT 'pending'
                CHECK (status IN ('pending', 'seen', 'replied', 'approved', 'rejected')),
  created_at    TIMESTAMP   DEFAULT NOW()
);

-- ─── Indexes ─────────────────────────────────────────────────────────────────
-- These make queries faster, especially filtering and lookups
CREATE INDEX idx_properties_type        ON properties(type);
CREATE INDEX idx_properties_rent        ON properties(rent);
CREATE INDEX idx_properties_is_available ON properties(is_available);
CREATE INDEX idx_properties_owner       ON properties(owner_id);
CREATE INDEX idx_bookmarks_user         ON bookmarks(user_id);
CREATE INDEX idx_contact_student        ON contact_requests(student_id);