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
    body('role').optional().isIn(['student', 'owner']).withMessage('Role must be student or owner'),
  ],
  async (req, res) => {
    if (handleValidation(req, res)) return;

    try {
      const { name, email, password, role = 'student', diu_student_id, phone } = req.body;

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
        `INSERT INTO users (name, email, password_hash, role, diu_student_id, phone)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, name, email, role, diu_student_id, phone, created_at`,
        [name, email, password_hash, role, diu_student_id || null, phone || null]
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
      'SELECT id, name, email, role, diu_student_id, phone, created_at FROM users WHERE id = $1',
      [req.user.id]
    );
    res.json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ success: false, message: 'Failed to get profile' });
  }
});

export default router;