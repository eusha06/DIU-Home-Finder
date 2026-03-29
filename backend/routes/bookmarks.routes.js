import { Router } from 'express';
import pool from '../db/pool.js';
import protect from '../middleware/auth.js';

const router = Router();

// ALL bookmark routes require login — apply protect to the whole router
router.use(protect);

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/bookmarks
// Get all bookmarks for the logged-in student
// ─────────────────────────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
         b.id          AS bookmark_id,
         b.created_at  AS bookmarked_at,
         p.id          AS property_id,
         p.title,
         p.type,
         p.rent,
         p.address,
         p.area,
         p.distance_from_diu,
         p.is_available,
         p.gender_preference,
         img.image_url AS primary_image
       FROM bookmarks b
       JOIN properties p   ON b.property_id = p.id
       LEFT JOIN property_images img ON img.property_id = p.id AND img.is_primary = true
       WHERE b.user_id = $1
       ORDER BY b.created_at DESC`,
      [req.user.id]
    );

    res.json({
      success: true,
      count: result.rows.length,
      bookmarks: result.rows,
    });

  } catch (error) {
    console.error('Get bookmarks error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch bookmarks' });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/bookmarks/:propertyId
// Add a bookmark
// ─────────────────────────────────────────────────────────────────────────────
router.post('/:propertyId', async (req, res) => {
  try {
    const { propertyId } = req.params;

    // Check the property actually exists first
    const property = await pool.query(
      'SELECT id FROM properties WHERE id = $1 AND is_verified = true',
      [propertyId]
    );

    if (property.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    // Insert bookmark — ON CONFLICT DO NOTHING handles duplicate bookmarks gracefully
    // instead of throwing an error (because of UNIQUE constraint in schema)
    const result = await pool.query(
      `INSERT INTO bookmarks (user_id, property_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, property_id) DO NOTHING
       RETURNING *`,
      [req.user.id, propertyId]
    );

    if (result.rows.length === 0) {
      // ON CONFLICT triggered — already bookmarked
      return res.status(200).json({
        success: true,
        message: 'Property was already bookmarked',
        alreadyExists: true,
      });
    }

    res.status(201).json({
      success: true,
      message: 'Property bookmarked successfully',
      bookmark: result.rows[0],
    });

  } catch (error) {
    console.error('Add bookmark error:', error);
    res.status(500).json({ success: false, message: 'Failed to add bookmark' });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/bookmarks/:propertyId
// Remove a bookmark
// ─────────────────────────────────────────────────────────────────────────────
router.delete('/:propertyId', async (req, res) => {
  try {
    const { propertyId } = req.params;

    const result = await pool.query(
      'DELETE FROM bookmarks WHERE user_id = $1 AND property_id = $2 RETURNING *',
      [req.user.id, propertyId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Bookmark not found',
      });
    }

    res.json({
      success: true,
      message: 'Bookmark removed successfully',
    });

  } catch (error) {
    console.error('Remove bookmark error:', error);
    res.status(500).json({ success: false, message: 'Failed to remove bookmark' });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/bookmarks/check/:propertyId
// Check if a specific property is bookmarked by the current user
// Useful for showing a filled/unfilled heart icon on the UI
// ─────────────────────────────────────────────────────────────────────────────
router.get('/check/:propertyId', async (req, res) => {
  try {
    const { propertyId } = req.params;

    const result = await pool.query(
      'SELECT id FROM bookmarks WHERE user_id = $1 AND property_id = $2',
      [req.user.id, propertyId]
    );

    res.json({
      success: true,
      isBookmarked: result.rows.length > 0,
    });

  } catch (error) {
    console.error('Check bookmark error:', error);
    res.status(500).json({ success: false, message: 'Failed to check bookmark' });
  }
});

export default router;