import User from "../models/User.js";
import { hashPassword } from "../utils/hashPassword.js";

// Seed admin user
export async function seedAdmin() {
  let user = await User.findOne({
    email: "admin@example.com",
  });

  if (!user) {
    user = await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: await hashPassword("admin123"),
      role: "admin",
    });
  }

  return user;
}