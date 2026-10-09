import multer from "multer";

const MIN_IMAGE_SIZE = 50 * 1024;
const MAX_IMAGE_SIZE = 60 * 1024;

// Allowed image file types
const fileFilter = (_, file, cb) =>
  /^image\/(jpeg|png|webp|gif)$/.test(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Only image files are allowed"));

// Multer upload configuration
export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: MAX_IMAGE_SIZE + 1,
  },
});

export function isAllowedImageSize(size) {
  return size >= MIN_IMAGE_SIZE && size <= MAX_IMAGE_SIZE;
}

export function validateImageSize(req, res, next) {
  if (!req.file || isAllowedImageSize(req.file.size)) {
    return next();
  }

  return res.status(400).json({
    success: false,
    message: "Product image must be between 50 KB and 60 KB.",
    errors: [],
  });
}