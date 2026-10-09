import User from "../models/User.js";

import {
  hashPassword,
  comparePassword,
} from "../utils/hashPassword.js";

import { generateToken } from "../utils/generateToken.js";

// Register user
export async function register(data) {
  const exists = await User.findOne({
    email: data.email,
  });

  if (exists) {
    throw Object.assign(
      new Error("Email already registered"),
      {
        status: 409,
      }
    );
  }

  const user = await User.create({
    ...data,
    password: await hashPassword(data.password),
  });

  return {
    user,
    token: generateToken(user),
  };
}

// Login user
export async function login(email, password) {
  const user = await User.findOne({
    email,
  }).select("+password");

  if (
    !user ||
    !(await comparePassword(password, user.password))
  ) {
    throw Object.assign(
      new Error("Invalid credentials"),
      {
        status: 401,
      }
    );
  }

  if (!user.isActive) {
    throw Object.assign(
      new Error("Account is inactive"),
      {
        status: 403,
      }
    );
  }

  user.lastLogin = new Date();

  await user.save();

  user.password = undefined;

  return {
    user,
    token: generateToken(user),
  };
}