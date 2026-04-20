import pool from '../pool.js';

async function run() {
  try {
    await pool.query(`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS national_id VARCHAR(50),
      ADD COLUMN IF NOT EXISTS building_name VARCHAR(150),
      ADD COLUMN IF NOT EXISTS location VARCHAR(200),
      ADD COLUMN IF NOT EXISTS bio TEXT,
      ADD COLUMN IF NOT EXISTS avatar TEXT;
    `);
    console.log('Columns added successfully');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();