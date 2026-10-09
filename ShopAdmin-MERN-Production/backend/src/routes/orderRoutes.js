import { Router } from "express";
import * as c from "../controllers/orderController.js";
import {
  authMiddleware,
  authorizeRoles,
} from "../middleware/authMiddleware.js";
import { orderValidation } from "../validators/orderValidator.js";
import { validate } from "../middleware/validate.js";

const r = Router();

// Authentication for all order routes
r.use(authMiddleware);

// Get all orders
r.get(
  "/",
  authorizeRoles("admin", "manager", "staff"),
  c.list
);

// Get order by ID
r.get(
  "/:id",
  c.get
);

// Get order timeline
r.get(
  "/:id/timeline",
  c.timeline
);

// Create order
r.post(
  "/",
  orderValidation,
  validate,
  c.create
);

// Update order
r.put(
  "/:id",
  authorizeRoles("admin", "manager"),
  c.update
);

// Update order status
r.patch(
  "/:id/status",
  authorizeRoles(
    "admin",
    "manager",
    "staff"
  ),
  c.status
);

// Delete / cancel order
r.delete(
  "/:id",
  authorizeRoles("admin", "manager"),
  c.remove
);

export default r;