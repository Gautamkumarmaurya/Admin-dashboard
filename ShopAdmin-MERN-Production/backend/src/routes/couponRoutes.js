import { Router } from "express";
import * as c from "../controllers/couponController.js";
import {
  authMiddleware,
  authorizeRoles,
} from "../middleware/authMiddleware.js";
import { couponValidation } from "../validators/couponValidator.js";
import { validate } from "../middleware/validate.js";

const r = Router();

// Authentication for all coupon routes
r.use(authMiddleware);

// Get all coupons
r.get(
  "/",
  authorizeRoles("admin", "manager"),
  c.list
);

// Get coupon by ID
r.get(
  "/:id",
  authorizeRoles("admin", "manager"),
  c.get
);

// Create coupon
r.post(
  "/",
  authorizeRoles("admin", "manager"),
  couponValidation,
  validate,
  c.create
);

// Update coupon
r.put(
  "/:id",
  authorizeRoles("admin", "manager"),
  c.update
);

// Update coupon status
r.patch(
  "/:id/status",
  authorizeRoles("admin", "manager"),
  c.status
);

// Delete coupon
r.delete(
  "/:id",
  authorizeRoles("admin"),
  c.remove
);

// Validate coupon
r.post(
  "/validate",
  c.validate
);

export default r;