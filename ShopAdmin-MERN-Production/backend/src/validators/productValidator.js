import { body } from "express-validator";

// Product validation
export const productValidation = [
  body("name")
    .trim()
    .notEmpty(),

  body("sku")
    .trim()
    .notEmpty(),

  body("category").isMongoId(),

  body("price").isFloat({
    min: 0,
  }),

  body("discount")
    .optional()
    .isFloat({
      min: 0,
      max: 100,
    }),

  body("stock")
    .optional()
    .isInt({
      min: 0,
    }),
];