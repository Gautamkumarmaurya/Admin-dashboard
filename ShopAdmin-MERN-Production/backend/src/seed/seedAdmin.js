import User from "../models/User.js";
import { hashPassword } from "../utils/hashPassword.js";

// Seed admin user
export async function seedAdmin() {
  let user = await User.findOne({
    email: "user@example.com",
  });

  if (!user) {
    user = await User.create({
      name: "User",
      email: "user@example.com",
      password: await hashPassword("user123"),
      role: "customer",
    });
  }

  return user;
}