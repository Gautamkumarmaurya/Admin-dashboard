import User from "../src/models/User.js";

import {
  hashPassword,
} from "../src/utils/hashPassword.js";

import {
  generateToken,
} from "../src/utils/generateToken.js";

// Create test user
export async function createUser(
  role = "admin"
) {
  const u = await User.create({
    name: "Test User",
    email: `${role}-${Date.now()}@example.com`,
    password: await hashPassword("secret123"),
    role,
  });

  return {
    user: u,
    token: generateToken(u),
  };
}