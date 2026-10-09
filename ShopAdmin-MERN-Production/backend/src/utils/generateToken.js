import jwt from "jsonwebtoken";

import env from "../config/env.js";

// Generate JWT token
export function generateToken(user) {
  return jwt.sign(
    {
      id: user._id.toString(),
      role: user.role,
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn,
    }
  );
}