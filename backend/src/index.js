import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import authRoutes     from './routes/auth.routes.js';
import listingRoutes  from './routes/listings.routes.js';
import hostelRoutes   from './routes/hostel.routes.js';
import bookingRoutes  from './routes/bookings.routes.js';

const app  = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status : 'ok',
    message: 'DIU Home Finder API is running 🏠',
    time   : new Date().toISOString(),
  });
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth',     authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/hostels',  hostelRoutes);
app.use('/api/bookings', bookingRoutes);

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('❌ Server error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 Environment : ${process.env.NODE_ENV}`);
  console.log(`🏠 DIU Home Finder API ready\n`);
});
