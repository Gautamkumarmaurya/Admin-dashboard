import { body } from "express-validator";

// Review validation
export const reviewValidation = [
  body("product").isMongoId(),

  body("customer").isMongoId(),

  body("rating").isInt({
    min: 1,
    max: 5,
  }),
];