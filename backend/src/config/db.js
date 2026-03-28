import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// ─── Connection Pool ───────────────────────────────────────────────────────────
const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  // Keep connections alive — good for dev + low-traffic prod
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// ─── Test connection on startup ────────────────────────────────────────────────
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌  PostgreSQL connection failed:', err.message);
    process.exit(1);
  }
  release();
  console.log('✅  PostgreSQL connected →', process.env.DB_NAME);
});

// ─── Helper: run a query with automatic error logging ─────────────────────────
//  Usage:  const { rows } = await query('SELECT * FROM users WHERE id=$1', [id])
export const query = (text, params) => pool.query(text, params);

export default pool;
