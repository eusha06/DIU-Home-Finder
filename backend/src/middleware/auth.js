import jwt from 'jsonwebtoken';

// ─── Verify JWT Token ──────────────────────────────────────────────────────────
// Attach decoded user payload to req.user for downstream route handlers
// Usage: router.get('/protected', verifyToken, controller)
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;   // { id, email, role }
    next();
  } catch (err) {
    next(err); // handled by global error handler
  }
};

// ─── Role Guard ────────────────────────────────────────────────────────────────
// Usage: router.post('/listings', verifyToken, requireRole('house_owner'), controller)
export const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user?.role)) {
    return res.status(403).json({
      error: `Access denied. Required role: ${roles.join(' or ')}.`,
    });
  }
  next();
};
