import { Router } from "express";
import * as c from "../controllers/analyticsController.js";
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

// Analytics routes
r.get("/overview", c.overview);
r.get("/revenue", c.revenue);
r.get("/sales", c.sales);
r.get("/orders", c.orders);
r.get("/customers", c.customers);
r.get("/conversion", c.conversion);
r.get("/categories", c.categories);
r.get("/top-products", c.topProducts);

export default r;