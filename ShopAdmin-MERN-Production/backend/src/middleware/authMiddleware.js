import jwt from "jsonwebtoken";
import User from "../models/User.js";
import env from "../config/env.js";

// Authentication middleware
export async function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization;

    const token = header?.startsWith("Bearer ")
      ? header.slice(7)
      : req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
        errors: [],
      });
    }

    const decoded = jwt.verify(
      token,
      env.jwtSecret
    );

    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "User is not active",
        errors: [],
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      errors: [],
    });
  }
}

// Role authorization middleware
export const authorizeRoles =
  (...roles) =>
  (req, res, next) => {
    if (
      !req.user ||
      !roles.includes(req.user.role)
    ) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
        errors: [],
      });
    }

    next();
  };