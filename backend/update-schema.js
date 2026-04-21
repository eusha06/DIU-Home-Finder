import pool from './db/pool.js';

async function updateSchema() {
  try {
    await pool.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS gender VARCHAR(20),
      ADD COLUMN IF NOT EXISTS department VARCHAR(100);
    `);
    console.log('Columns gender and department added to users table successfully');
    process.exit(0);
  } catch (error) {
    console.error('Failed to update schema:', error);
    process.exit(1);
  }
}

updateSchema();
