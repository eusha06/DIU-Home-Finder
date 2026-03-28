import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage }  from 'multer-storage-cloudinary';
import multer                  from 'multer';

// ─── Configure Cloudinary ─────────────────────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ─── Cloudinary Storage Engine ────────────────────────────────────────────────
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'diu-home-finder',         // folder name in your Cloudinary account
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1200, crop: 'limit', quality: 'auto' }],
  },
});

// ─── Multer Instance ──────────────────────────────────────────────────────────
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },   // 5 MB max per file
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG, PNG, and WEBP images are allowed.'));
    }
  },
});

// ─── Exports ──────────────────────────────────────────────────────────────────
// Single file:   upload.single('image')
// Multiple files: upload.array('images', 5)
export default upload;
export { cloudinary };
