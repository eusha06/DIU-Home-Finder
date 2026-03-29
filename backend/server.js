// Load environment variables from .env file FIRST — before anything else
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

// Import route files (we'll create these next)
import authRoutes from './routes/auth.routes.js';
import propertyRoutes from './routes/properties.routes.js';

// ─── App Setup ───────────────────────────────────────────────────────────────

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────

// CORS — allows your React app (running on port 5173) to talk to this server
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://your-vercel-app.vercel.app'  // ← update this in Phase 6
    : 'http://localhost:5173',              // Vite dev server default port
  credentials: true,
}));

// Parse incoming JSON request bodies (so req.body works)
app.use(express.json());

// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// ─── Routes ──────────────────────────────────────────────────────────────────

// Health check — visit http://localhost:5000/api/health to confirm server is running
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'DIU Home Finder API is running',
    timestamp: new Date().toISOString(),
  });
});

// Mount route files
app.use('/api/auth', authRoutes);           // POST /api/auth/register, /api/auth/login
app.use('/api/properties', propertyRoutes); // GET  /api/properties, GET /api/properties/:id

// ─── 404 Handler ─────────────────────────────────────────────────────────────

// If no route matched, send a clean 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// ─── Global Error Handler ────────────────────────────────────────────────────

// Catches any errors thrown anywhere in your routes
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// ─── Start Server ─────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════╗
  ║   DIU Home Finder API                   ║
  ║   Running on http://localhost:${PORT}       ║
  ║   Environment: ${process.env.NODE_ENV}          ║
  ╚══════════════════════════════════════════╝
  `);
});

export default app;