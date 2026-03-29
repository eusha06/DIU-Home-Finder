import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// pg.Pool manages multiple database connections efficiently
// Think of it as a "pool" of open connections ready to use
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,

  // Extra config for local development
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }  // needed for Neon.tech in Phase 6
    : false,                          // not needed locally
});

// Test the connection when the server starts
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err.message);
});

export default pool;