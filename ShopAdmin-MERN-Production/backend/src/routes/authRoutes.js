import { Router } from "express";
import * as c from "../controllers/authController.js";
import {
  registerValidation,
  loginValidation,
  changePasswordValidation,
} from "../validators/authValidator.js";
import { validate } from "../middleware/validate.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const r = Router();

// Authentication routes
r.post(
  "/register",
  registerValidation,
  validate,
  asyncHandler(c.register)
);

r.post(
  "/login",
  loginValidation,
  validate,
  asyncHandler(c.login)
);

r.post(
  "/logout",
  c.logout
);

// Current user
r.get(
  "/me",
  authMiddleware,
  c.me
);

// Password reset routes
r.post(
  "/forgot-password",
  c.forgotPassword
);

r.post(
  "/reset-password",
  c.resetPassword
);

// Change password
r.put(
  "/change-password",
  authMiddleware,
  changePasswordValidation,
  validate,
  asyncHandler(c.changePassword)
);

export default r;