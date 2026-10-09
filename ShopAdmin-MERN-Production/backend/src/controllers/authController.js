import * as service from "../services/authService.js";
import { success } from "../utils/response.js";
import User from "../models/User.js";
import {
  comparePassword,
  hashPassword,
} from "../utils/hashPassword.js";

// Register user
export async function register(req, res) {
  return success(
    res,
    "Registration successful",
    await service.register(req.body),
    {},
    201
  );
}

// Login user
export async function login(req, res) {
  const result = await service.login(
    req.body.email,
    req.body.password
  );

  res.cookie("token", result.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return success(res, "Login successful", result);
}

// Logout user
export function logout(req, res) {
  res.clearCookie("token");

  return success(res, "Logout successful");
}

// Get current user
export function me(req, res) {
  return success(res, "Current user", req.user);
}

// Change password
export async function changePassword(req, res) {
  const user = await User.findById(req.user._id).select("+password");

  if (
    !(await comparePassword(
      req.body.currentPassword,
      user.password
    ))
  ) {
    return res.status(400).json({
      success: false,
      message: "Current password is incorrect",
      errors: [],
    });
  }

  user.password = await hashPassword(req.body.newPassword);

  await user.save();

  return success(res, "Password changed");
}

// Forgot password
export function forgotPassword(req, res) {
  return success(
    res,
    "If the account exists, reset instructions would be sent."
  );
}

// Reset password
export function resetPassword(req, res) {
  return success(
    res,
    "Reset-password flow placeholder is ready for email provider integration."
  );
}