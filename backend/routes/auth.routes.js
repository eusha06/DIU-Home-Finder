import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db/pool.js';

const router = Router();

const signToken = (userId, role) =>
  jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

const handleValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() });
    return true;
  }
  return false;
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/auth/register
// ─────────────────────────────────────────────────────────────────────────────
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role')
      .optional()
      .isIn(['student', 'owner', 'hostel_manager', 'manager'])
      .withMessage('Role must be student, owner, or hostel_manager'),
  ],
  async (req, res) => {
    if (handleValidation(req, res)) return;

    try {
      const { name, email, password, role = 'student', diu_student_id, phone, national_id, building_name, location, gender } = req.body;
      const normalizedRole = role === 'manager' ? 'hostel_manager' : role;

      // Check if email already exists in the database
      const existing = await pool.query(
        'SELECT id FROM users WHERE email = $1',
        [email]
      );
      if (existing.rows.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'An account with this email already exists',
        });
      }

      // Hash the password — never store plain text
      const password_hash = await bcrypt.hash(password, 12);

      // Insert the new user into the database
      const result = await pool.query(
        `INSERT INTO users (name, email, password_hash, role, diu_student_id, phone, national_id, building_name, location, gender)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING id, name, email, role, diu_student_id, phone, national_id as "nationalId", building_name as "buildingName", location, gender, department, created_at, updated_at`,
        [name, email, password_hash, normalizedRole, diu_student_id || null, phone || null, national_id || null, building_name || null, location || null, gender || null]
      );

      const user = result.rows[0];
      const token = signToken(user.id, user.role);

      res.status(201).json({
        success: true,
        message: 'Account created successfully',
        token,
        user,
      });

    } catch (error) {
      console.error('Register error:', error);

      if (error.code === '23514' && error.constraint === 'users_role_check') {
        return res.status(500).json({
          success: false,
          message: 'Role constraint is outdated in database. Run the hostel_manager role migration first.',
        });
      }

      res.status(500).json({ success: false, message: 'Registration failed' });
    }
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/auth/login
// ─────────────────────────────────────────────────────────────────────────────
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    if (handleValidation(req, res)) return;

    try {
      const { email, password } = req.body;

      // Find user by email
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1 AND is_active = true',
        [email]
      );

      const user = result.rows[0];

      // If user not found OR password doesn't match — same vague error message
      // (don't tell attackers which one failed)
      if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }

      const token = signToken(user.id, user.role);

      // Don't send the password hash back to the client
      const { password_hash, ...safeUser } = user;

      res.json({
        success: true,
        message: 'Login successful',
        token,
        user: safeUser,
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ success: false, message: 'Login failed' });
    }
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/auth/me  — get the currently logged-in user's profile
// ─────────────────────────────────────────────────────────────────────────────
import protect from '../middleware/auth.js';

router.get('/me', protect, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role, diu_student_id, phone, national_id as "nationalId", building_name as "buildingName", location, bio, avatar, gender, department, created_at, updated_at FROM users WHERE id = $1',
      [req.user.id]
    );
    res.json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ success: false, message: 'Failed to get profile' });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// PATCH /api/auth/me  — update the currently logged-in user's profile
// ─────────────────────────────────────────────────────────────────────────────
router.patch(
  '/me',
  protect,
  [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('phone')
      .optional({ nullable: true })
      .custom((value) => {
        if (value === '' || value === null) return true;
        return /^01[3-9]\d{8}$/.test(String(value));
      })
      .withMessage('Phone must be a valid BD number (01XXXXXXXXX)'),
  ],
  async (req, res) => {
    if (handleValidation(req, res)) return;

    try {
      const { name, email, phone, nationalId, buildingName, location, bio, avatar, gender, department, studentId } = req.body;
      const updates = {};

      if (name !== undefined) {
        updates.name = name.trim();
      }

      if (email !== undefined) {
        updates.email = email.toLowerCase().trim();
      }

      if (phone !== undefined) {
        const normalized = String(phone ?? '').trim();
        updates.phone = normalized === '' ? null : normalized;
      }
      
      if (nationalId !== undefined) updates.national_id = nationalId === '' ? null : nationalId.trim();
      if (buildingName !== undefined) updates.building_name = buildingName === '' ? null : buildingName.trim();
      if (location !== undefined) updates.location = location === '' ? null : location.trim();
      if (bio !== undefined) updates.bio = bio === '' ? null : bio.trim();
      if (avatar !== undefined) updates.avatar = avatar === '' ? null : avatar.trim();
      if (gender !== undefined) updates.gender = gender === '' ? null : gender.trim().toLowerCase();
      if (department !== undefined) updates.department = department === '' ? null : department.trim();
      // Using 'diu_student_id' map back from 'studentId' or 'diu_student_id'
      if (studentId !== undefined) updates.diu_student_id = studentId === '' ? null : studentId.trim();

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No profile fields provided for update',
        });
      }

      if (updates.email) {
        const existing = await pool.query(
          'SELECT id FROM users WHERE email = $1 AND id <> $2',
          [updates.email, req.user.id]
        );

        if (existing.rows.length > 0) {
          return res.status(409).json({
            success: false,
            message: 'An account with this email already exists',
          });
        }
      }

      const setClauses = [];
      const values = [];
      let idx = 1;

      Object.entries(updates).forEach(([key, value]) => {
        setClauses.push(`${key} = $${idx}`);
        values.push(value);
        idx += 1;
      });

      setClauses.push('updated_at = NOW()');
      values.push(req.user.id);

      const result = await pool.query(
        `UPDATE users
         SET ${setClauses.join(', ')}
         WHERE id = $${idx}
         RETURNING id, name, email, role, diu_student_id, phone, national_id as "nationalId", building_name as "buildingName", location, bio, avatar, gender, department, created_at, updated_at`,
        values
      );

      res.json({
        success: true,
        message: 'Profile updated successfully',
        user: result.rows[0],
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ success: false, message: 'Failed to update profile' });
    }
  }
);

export default router;