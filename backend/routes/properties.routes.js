import { Router } from 'express';

const router = Router();

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/properties
// Supports query params: ?type=hostel&maxRent=5000&available=true
// ─────────────────────────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const { type, maxRent, available } = req.query;

    // ── Mock data for now — real DB queries come in Phase 2 & 3 ──
    // In Phase 3 you'll replace this with:
    // const result = await pool.query(
    //   'SELECT * FROM properties WHERE is_verified = true ...',
    //   [...]
    // );
    const mockProperties = [
      {
        id: 1,
        title: 'Comfortable Single Room near DIU Gate-1',
        type: 'room',
        rent: 3500,
        address: 'Dhanmondi, Dhaka',
        distance_from_diu: '5 min walk',
        is_available: true,
        is_verified: true,
      },
      {
        id: 2,
        title: 'Girls Hostel — Fully Furnished',
        type: 'hostel',
        rent: 5000,
        address: 'Asad Gate, Dhaka',
        distance_from_diu: '10 min walk',
        is_available: true,
        is_verified: true,
      },
      {
        id: 3,
        title: '2-Bed Flat for Students',
        type: 'flat',
        rent: 8000,
        address: 'Mirpur Road, Dhaka',
        distance_from_diu: '15 min walk',
        is_available: false,
        is_verified: true,
      },
    ];

    // Apply filters even on mock data (so your frontend filtering works now)
    let filtered = mockProperties;

    if (type) {
      filtered = filtered.filter(p => p.type === type);
    }
    if (maxRent) {
      filtered = filtered.filter(p => p.rent <= Number(maxRent));
    }
    if (available !== undefined) {
      filtered = filtered.filter(p => p.is_available === (available === 'true'));
    }

    res.json({
      success: true,
      count: filtered.length,
      properties: filtered,
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

    // ── Mock single property ──
    const mockProperty = {
      id: Number(id),
      title: 'Comfortable Single Room near DIU Gate-1',
      description: 'Clean, quiet room. 24/7 security. Near Gate 1.',
      type: 'room',
      rent: 3500,
      address: 'Dhanmondi, Dhaka',
      distance_from_diu: '5 min walk',
      is_available: true,
      is_verified: true,
      images: [],
      owner: { name: 'Mr. Rahman', phone: '017XXXXXXXX' },
    };

    res.json({ success: true, property: mockProperty });

  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch property' });
  }
});

export default router;