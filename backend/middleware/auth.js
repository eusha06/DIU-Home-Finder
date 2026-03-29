import jwt from 'jsonwebtoken';

// This middleware runs BEFORE your route handler
// It checks if the request has a valid JWT token
const protect = (req, res, next) => {
  try {
    // The token comes in the Authorization header like:
    // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized. Please log in first.',
      });
    }

    // Extract just the token part (remove "Bearer ")
    const token = authHeader.split(' ')[1];

    // Verify the token using your JWT_SECRET
    // If the token is fake, expired, or tampered — this throws an error
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user info to the request
    // Now any route using this middleware can access req.user
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next(); // Move on to the actual route handler

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Session expired. Please log in again.',
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Invalid token. Please log in again.',
    });
  }
};

// Middleware to restrict routes to specific roles
// Usage: restrictTo('admin') or restrictTo('owner', 'admin')
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. This route is for ${roles.join(' or ')} only.`,
      });
    }
    next();
  };
};

export default protect;