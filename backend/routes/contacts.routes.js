import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../db/pool.js';
import protect, { restrictTo } from '../middleware/auth.js';

const router = Router();

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/contacts
// Student sends a contact request to an owner about a property
// ─────────────────────────────────────────────────────────────────────────────
router.post(
  '/',
  protect,
  restrictTo('student'),
  [
    body('property_id').isInt({ min: 1 }).withMessage('Valid property ID is required'),
    body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { property_id, message } = req.body;

      // Verify the property exists
      const property = await pool.query(
        'SELECT id, title FROM properties WHERE id = $1 AND is_verified = true',
        [property_id]
      );

      if (property.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Property not found',
        });
      }

      const result = await pool.query(
        `INSERT INTO contact_requests (student_id, property_id, message)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [req.user.id, property_id, message]
      );

      res.status(201).json({
        success: true,
        message: 'Contact request sent successfully. The owner will get back to you.',
        contact: result.rows[0],
      });

    } catch (error) {
      console.error('Send contact error:', error);
      res.status(500).json({ success: false, message: 'Failed to send contact request' });
    }
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/contacts/my-requests
// Student sees all their own contact requests
// ─────────────────────────────────────────────────────────────────────────────
router.get('/my-requests', protect, restrictTo('student'), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
         cr.*,
         p.title   AS property_title,
         p.address AS property_address,
         p.type    AS property_type,
         u.name    AS owner_name,
         u.phone   AS owner_phone
       FROM contact_requests cr
       JOIN properties p ON cr.property_id = p.id
       JOIN users u      ON p.owner_id = u.id
       WHERE cr.student_id = $1
       ORDER BY cr.created_at DESC`,
      [req.user.id]
    );

    res.json({ success: true, requests: result.rows });

  } catch (error) {
    console.error('Get my requests error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch requests' });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/contacts/received
// Owner sees all contact requests for their properties
// ─────────────────────────────────────────────────────────────────────────────
router.get('/received', protect, restrictTo('owner', 'admin'), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
         cr.*,
         p.title       AS property_title,
         u.name        AS student_name,
         u.email       AS student_email,
         u.phone       AS student_phone,
         u.diu_student_id
       FROM contact_requests cr
       JOIN properties p ON cr.property_id = p.id
       JOIN users u      ON cr.student_id = u.id
       WHERE p.owner_id = $1
       ORDER BY cr.created_at DESC`,
      [req.user.id]
    );

    res.json({ success: true, requests: result.rows });

  } catch (error) {
    console.error('Get received requests error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch requests' });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// PATCH /api/contacts/:id/status
// Owner marks a request as 'seen', 'replied', 'approved', or 'rejected'
// ─────────────────────────────────────────────────────────────────────────────
router.patch(
  '/:id/status',
  protect,
  restrictTo('owner', 'admin'),
  [
    body('status').isIn(['seen', 'replied', 'approved', 'rejected']).withMessage('Status must be seen, replied, approved, or rejected'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const { status } = req.body;

      const result = await pool.query(
        `UPDATE contact_requests SET status = $1
         WHERE id = $2
         RETURNING *`,
        [status, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Request not found' });
      }

      const requestRow = result.rows[0];

      // Auto-update availability if approved
      if (status === 'approved') {
        try {
          await pool.query(
            `UPDATE properties 
             SET available_seats = GREATEST(available_seats - 1, 0),
                 is_available = CASE WHEN available_seats - 1 <= 0 THEN false ELSE true END
             WHERE id = $1`,
            [requestRow.property_id]
          );
        } catch (updateErr) {
          console.error('Failed to auto-update property availability:', updateErr);
          // Non-fatal, so we don't throw, but log it.
        }
      }

      res.json({ success: true, message: `Marked as ${status}`, request: requestRow });

    } catch (error) {
      console.error('Update status error:', error);
      res.status(500).json({ success: false, message: 'Failed to update status' });
    }
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/contacts/:id
// Student cancels their pending booking request
// ─────────────────────────────────────────────────────────────────────────────
router.delete('/:id', protect, restrictTo('student'), async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM contact_requests
       WHERE id = $1 AND student_id = $2 AND status = 'pending'
       RETURNING *`,
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Request not found or cannot be cancelled' });
    }

    res.json({ success: true, message: 'Booking request cancelled successfully' });
  } catch (error) {
    console.error('Delete request error:', error);
    res.status(500).json({ success: false, message: 'Failed to cancel the booking request' });
  }
});

export default router;