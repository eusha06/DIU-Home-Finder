-- Add hostel_manager role support to existing users table.
-- Run this once on your current database.

ALTER TABLE users
  DROP CONSTRAINT IF EXISTS users_role_check;

-- Normalize any legacy values before adding the new strict constraint.
UPDATE users
SET role = 'hostel_manager'
WHERE role = 'manager';

ALTER TABLE users
  ADD CONSTRAINT users_role_check
  CHECK (role IN ('student', 'owner', 'hostel_manager', 'admin'));
