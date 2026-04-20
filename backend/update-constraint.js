import pool from './db/pool.js';

async function run() {
  try {
    await pool.query(`ALTER TABLE contact_requests DROP CONSTRAINT IF EXISTS contact_requests_status_check;`);
    await pool.query(`ALTER TABLE contact_requests ADD CONSTRAINT contact_requests_status_check CHECK (status IN ('pending', 'seen', 'replied', 'approved', 'rejected'));`);
    console.log('Constraint Updated');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();