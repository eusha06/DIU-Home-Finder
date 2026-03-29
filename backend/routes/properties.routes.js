import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../db/pool.js';
import protect, { restrictTo } from '../middleware/auth.js';

const router = Router();

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/properties
// Query params: ?type=hostel&maxRent=5000&available=true&area=Dhanmondi&gender=female
// ─────────────────────────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const { type, maxRent, available, area, gender } = req.query;

    // Build query dynamically based on which filters are provided
    // $1, $2 etc. are parameterized — prevents SQL injection attacks
    let query = `
      SELECT
        p.*,
        u.name    AS owner_name,
        u.phone   AS owner_phone,
        img.image_url AS primary_image
      FROM properties p
      JOIN users u ON p.owner_id = u.id
      LEFT JOIN property_images img ON img.property_id = p.id AND img.is_primary = true
      WHERE p.is_verified = true
    `;

    const params = [];
    let paramCount = 1;

    if (type) {
      query += ` AND p.type = $${paramCount++}`;
      params.push(type);
    }
    if (maxRent) {
      query += ` AND p.rent <= $${paramCount++}`;
      params.push(Number(maxRent));
    }
    if (available !== undefined) {
      query += ` AND p.is_available = $${paramCount++}`;
      params.push(available === 'true');
    }
    if (area) {
      query += ` AND LOWER(p.area) LIKE $${paramCount++}`;
      params.push(`%${area.toLowerCase()}%`);
    }
    if (gender && gender !== 'any') {
      query += ` AND (p.gender_preference = $${paramCount++} OR p.gender_preference = 'any')`;
      params.push(gender);
    }

    query += ' ORDER BY p.created_at DESC';

    const result = await pool.query(query, params);

    res.json({
      success: true,
      count: result.rows.length,
      properties: result.rows,
    });

  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch properties' });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/properties/:id
// ─────────────────────────────────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Get property with owner info and ALL images
    const propertyResult = await pool.query(
      `SELECT p.*, u.name AS owner_name, u.phone AS owner_phone
       FROM properties p
       JOIN users u ON p.owner_id = u.id
       WHERE p.id = $1 AND p.is_verified = true`,
      [id]
    );

    if (propertyResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    // Get all images for this property
    const imagesResult = await pool.query(
      'SELECT * FROM property_images WHERE property_id = $1 ORDER BY is_primary DESC',
      [id]
    );

    res.json({
      success: true,
      property: {
        ...propertyResult.rows[0],
        images: imagesResult.rows,
      },
    });

  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch property' });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/properties  — create a new listing (owners only)
// ─────────────────────────────────────────────────────────────────────────────
router.post(
  '/',
  protect,
  restrictTo('owner', 'admin'),
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('type').isIn(['hostel', 'room', 'flat', 'seat']).withMessage('Invalid property type'),
    body('rent').isInt({ min: 1 }).withMessage('Rent must be a positive number'),
    body('address').trim().notEmpty().withMessage('Address is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const {
        title, description, type, rent, address, area,
        distance_from_diu, total_seats, gender_preference, amenities,
      } = req.body;

      const result = await pool.query(
        `INSERT INTO properties
          (owner_id, title, description, type, rent, address, area,
           distance_from_diu, total_seats, available_seats, gender_preference, amenities)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$9,$10,$11)
         RETURNING *`,
        [
          req.user.id, title, description, type, rent, address, area,
          distance_from_diu, total_seats || 1, gender_preference || 'any',
          amenities || [],
        ]
      );

      res.status(201).json({
        success: true,
        message: 'Property listed successfully. Pending admin verification.',
        property: result.rows[0],
      });

    } catch (error) {
      console.error('Create property error:', error);
      res.status(500).json({ success: false, message: 'Failed to create property' });
    }
  }
);

export default router;