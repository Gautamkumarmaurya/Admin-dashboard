import { body } from "express-validator";

// Category validation
export const categoryValidation = [
  body("name")
    .trim()
    .notEmpty(),

  body("slug")
    .trim()
    .notEmpty(),
];