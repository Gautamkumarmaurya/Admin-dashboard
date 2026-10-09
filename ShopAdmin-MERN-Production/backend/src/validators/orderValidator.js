import { body } from "express-validator";

// Order validation
export const orderValidation = [
  body("customer").isMongoId(),

  body("items").isArray({
    min: 1,
  }),

  body("subtotal").isFloat({
    min: 0,
  }),

  body("total").isFloat({
    min: 0,
  }),
];