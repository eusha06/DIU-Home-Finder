import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

// ─── Helper: sign a JWT token ─────────────────────────────────────────────────
const signToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role },           // payload — stored inside the token
    process.env.JWT_SECRET,         // secret key from .env
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// ─── Helper: send validation errors ──────────────────────────────────────────
const handleValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() });
    return true; // means "there were errors, stop processing"
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
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    body('role')
      .optional()
      .isIn(['student', 'owner'])
      .withMessage('Role must be student or owner'),
  ],
  async (req, res) => {
    // Stop if validation failed
    if (handleValidation(req, res)) return;

    try {
      const { name, email, password, role = 'student', diu_student_id } = req.body;

      // ── Placeholder until DB is set up in Phase 2 ──
      // In Phase 2, you will replace this block with real DB queries like:
      // const existing = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
      // if (existing.rows.length > 0) return res.status(409).json(...)

      // Hash the password — NEVER store plain text passwords
      const saltRounds = 12; // higher = more secure but slower
      const password_hash = await bcrypt.hash(password, saltRounds);

      // Placeholder response (real DB insert comes in Phase 2)
      const mockUser = {
        id: 1,
        name,
        email,
        role,
        diu_student_id: diu_student_id || null,
      };

      const token = signToken(mockUser.id, mockUser.role);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: mockUser,
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

      // ── Placeholder until DB is set up in Phase 2 ──
      // In Phase 2 you'll replace this with a real DB lookup:
      // const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
      // const user = result.rows[0];
      // if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });
      // const valid = await bcrypt.compare(password, user.password_hash);

      // Mock login for now — accepts any email/password
      const mockUser = { id: 1, name: 'Test User', email, role: 'student' };
      const token = signToken(mockUser.id, mockUser.role);

      res.json({
        success: true,
        message: 'Login successful',
        token,
        user: mockUser,
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ success: false, message: 'Login failed' });
    }
  }
);

export default router;