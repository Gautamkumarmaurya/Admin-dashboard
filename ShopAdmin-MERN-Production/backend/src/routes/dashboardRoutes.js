import { Router } from "express";
import { overview } from "../controllers/dashboardController.js";
import {
  authMiddleware,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const r = Router();

// Dashboard overview
r.get(
  "/overview",
  authMiddleware,
  authorizeRoles(
    "admin",
    "manager",
    "staff"
  ),
  overview
);

export default r;