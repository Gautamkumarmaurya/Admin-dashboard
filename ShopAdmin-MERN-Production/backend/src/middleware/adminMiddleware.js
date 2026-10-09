import { authorizeRoles } from "./authMiddleware.js";

// Admin-level roles
export const adminMiddleware = authorizeRoles(
  "admin",
  "manager",
  "staff"
);