import { Router } from "express";
import * as c from "../controllers/categoryController.js";
import {
  authMiddleware,
  authorizeRoles,
} from "../middleware/authMiddleware.js";
import { categoryValidation } from "../validators/categoryValidator.js";
import { validate } from "../middleware/validate.js";

const r = Router();

// Public routes
r.get("/", c.list);
r.get("/:id", c.get);

// Create category
r.post(
  "/",
  authMiddleware,
  authorizeRoles("admin", "manager"),
  categoryValidation,
  validate,
  c.create
);

// Update category
r.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "manager"),
  c.update
);

// Update category status
r.patch(
  "/:id/status",
  authMiddleware,
  authorizeRoles("admin", "manager"),
  c.status
);

// Delete category
r.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  c.remove
);

export default r;