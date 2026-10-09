import { Router } from "express";
import * as c from "../controllers/productController.js";
import {
  authMiddleware,
  authorizeRoles,
} from "../middleware/authMiddleware.js";
import { productValidation } from "../validators/productValidator.js";
import { validate } from "../middleware/validate.js";
import { upload, validateImageSize } from "../middleware/uploadMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const r = Router();

// Public product routes
r.get("/", c.list);

r.get(
  "/search",
  c.search
);

r.get(
  "/featured",
  c.featured
);

// Low-stock products
r.get(
  "/low-stock",
  authMiddleware,
  authorizeRoles(
    "admin",
    "manager",
    "staff"
  ),
  c.lowStock
);

r.get(
  "/:id",
  c.get
);

// Create product
r.post(
  "/",
  authMiddleware,
  authorizeRoles("admin", "manager"),
  upload.single("thumbnail"),
  validateImageSize,
  productValidation,
  validate,
  asyncHandler(c.create)
);

// Update product
r.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "manager"),
  upload.single("thumbnail"),
  validateImageSize,
  asyncHandler(c.update)
);

// Update product status
r.patch(
  "/:id/status",
  authMiddleware,
  authorizeRoles(
    "admin",
    "manager",
    "staff"
  ),
  c.status
);

// Delete product
r.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "manager"),
  c.remove
);

export default r;