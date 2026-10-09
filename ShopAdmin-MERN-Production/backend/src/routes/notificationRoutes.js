import { Router } from "express";
import * as c from "../controllers/notificationController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const r = Router();

// Authentication for all notification routes
r.use(authMiddleware);

// Notification routes
r.get("/", c.list);

r.get(
  "/unread-count",
  c.unread
);

r.patch(
  "/read-all",
  c.readAll
);

r.patch(
  "/:id/read",
  c.read
);

r.delete(
  "/:id",
  c.remove
);

export default r;