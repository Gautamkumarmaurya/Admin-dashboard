import { Router } from "express";
import * as c from "../controllers/customerController.js";
import {
  authMiddleware,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const r = Router();

// Authentication and base role authorization
r.use(
  authMiddleware,
  authorizeRoles("admin", "manager", "staff")
);

// Customer routes
r.get("/", c.list);

r.get(
  "/:id/orders",
  c.orders
);

r.get(
  "/:id/stats",
  c.stats
);

r.get(
  "/:id",
  c.get
);

// Update customer status
r.patch(
  "/:id/status",
  authorizeRoles("admin", "manager"),
  c.status
);

export default r;