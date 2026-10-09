import { Router } from "express";
import * as c from "../controllers/paymentController.js";
import {
  authMiddleware,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const r = Router();

// Authentication and role authorization
r.use(
  authMiddleware,
  authorizeRoles("admin", "manager")
);

// Payment routes
r.get("/", c.list);

r.get(
  "/stats",
  c.stats
);

r.get(
  "/:id",
  c.get
);

r.patch(
  "/:id/status",
  c.status
);

export default r;