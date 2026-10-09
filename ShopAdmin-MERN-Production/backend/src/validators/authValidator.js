import { body } from "express-validator";

// Register validation
export const registerValidation = [
  body("name")
    .trim()
    .isLength({
      min: 2,
      max: 100,
    }),

  body("email")
    .isEmail()
    .normalizeEmail(),

  body("password").isLength({
    min: 6,
    max: 128,
  }),
];

// Login validation
export const loginValidation = [
  body("email")
    .isEmail()
    .normalizeEmail(),

  body("password")
    .isString()
    .notEmpty(),
];

// Change password validation
export const changePasswordValidation = [
  body("currentPassword")
    .isString()
    .notEmpty(),

  body("newPassword").isLength({
    min: 6,
    max: 128,
  }),
];