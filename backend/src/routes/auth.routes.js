import { Router } from 'express';
// Controllers will be added in the Auth API step
// import { register, login, getMe } from '../controllers/auth.controller.js';
// import { verifyToken } from '../middleware/auth.js';

const router = Router();

// Placeholder — will be replaced with full auth routes in next step
router.get('/ping', (_req, res) => res.json({ message: 'Auth route alive ✅' }));

// POST /api/auth/register
// POST /api/auth/login
// GET  /api/auth/me  (protected)

export default router;
