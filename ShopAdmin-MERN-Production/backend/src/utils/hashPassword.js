import bcrypt from "bcryptjs";

// Hash password
export const hashPassword = (password) =>
  bcrypt.hash(password, 12);

// Compare password with hash
export const comparePassword = (password, hash) =>
  bcrypt.compare(password, hash);