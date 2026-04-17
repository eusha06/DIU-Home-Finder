import { Router } from 'express';
import pool from '../db/pool.js';
import protect from '../middleware/auth.js';
import { upload } from '../config/cloudinary.js';

const router = Router();

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/upload/property/:propertyId
// Upload 1 or more images for a property
// Only the property owner can upload images for their property
// ─────────────────────────────────────────────────────────────────────────────
router.post(
  '/property/:propertyId',
  protect,                          // must be logged in
  upload.array('images', 5),        // accept up to 5 files, field name = "images"
  async (req, res) => {
    try {
      const { propertyId } = req.params;

      // Verify property belongs to this owner
      const check = await pool.query(
        'SELECT id FROM properties WHERE id = $1 AND owner_id = $2',
        [propertyId, req.user.id]
      );

      if (check.rows.length === 0) {
        return res.status(403).json({
          success: false,
          message: 'Property not found or access denied',
        });
      }

      // req.files is the array of uploaded files — each has a .path (Cloudinary URL)
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No images uploaded',
        });
      }

      // Check if property already has a primary image
      const existingPrimary = await pool.query(
        'SELECT id FROM property_images WHERE property_id = $1 AND is_primary = true',
        [propertyId]
      );

      const hasPrimary = existingPrimary.rows.length > 0;

      // Save each image URL to the database
      const savedImages = [];

      for (let i = 0; i < req.files.length; i++) {
        const imageUrl = req.files[i].path;  // Cloudinary URL
        // First image becomes primary if no primary exists yet
        const isPrimary = !hasPrimary && i === 0;

        const result = await pool.query(
          `INSERT INTO property_images (property_id, image_url, is_primary)
           VALUES ($1, $2, $3)
           RETURNING *`,
          [propertyId, imageUrl, isPrimary]
        );

        savedImages.push(result.rows[0]);
      }

      res.status(201).json({
        success: true,
        message: `${savedImages.length} image(s) uploaded successfully`,
        images: savedImages,
      });

    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ success: false, message: 'Upload failed' });
    }
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/upload/image/:imageId
// Delete a single image
// ─────────────────────────────────────────────────────────────────────────────
router.delete('/image/:imageId', protect, async (req, res) => {
  try {
    const { imageId } = req.params;

    // Get the image and verify ownership through property
    const result = await pool.query(
      `SELECT pi.*, p.owner_id
       FROM property_images pi
       JOIN properties p ON pi.property_id = p.id
       WHERE pi.id = $1`,
      [imageId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    const image = result.rows[0];

    if (image.owner_id !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    // Delete from database
    await pool.query('DELETE FROM property_images WHERE id = $1', [imageId]);

    res.json({ success: true, message: 'Image deleted successfully' });

  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete image' });
  }
});

export default router;