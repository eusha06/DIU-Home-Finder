import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import authRoutes      from './routes/auth.routes.js';
import propertyRoutes  from './routes/properties.routes.js';
import bookmarkRoutes  from './routes/bookmarks.routes.js';
import contactRoutes   from './routes/contacts.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://your-vercel-app.vercel.app'
    : 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'DIU Home Finder API is running',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth',       authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/bookmarks',  bookmarkRoutes);
app.use('/api/contacts',   contactRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

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