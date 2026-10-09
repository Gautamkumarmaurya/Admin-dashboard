import { Router } from "express";
import * as c from "../controllers/reviewController.js";
import {
  authMiddleware,
  authorizeRoles,
} from "../middleware/authMiddleware.js";
import { reviewValidation } from "../validators/reviewValidator.js";
import { validate } from "../middleware/validate.js";

const r = Router();

// Public review routes
r.get("/", c.list);

r.get(
  "/:id",
  c.get
);

// Create review
r.post(
  "/",
  authMiddleware,
  reviewValidation,
  validate,
  c.create
);

// Update review status
r.patch(
  "/:id/status",
  authMiddleware,
  authorizeRoles("admin", "manager"),
  c.status
);

// Delete review
r.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "manager"),
  c.remove
);

export default r;