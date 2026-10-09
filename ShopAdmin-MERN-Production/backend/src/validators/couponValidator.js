import { body } from "express-validator";

// Coupon validation
export const couponValidation = [
  body("code")
    .trim()
    .notEmpty(),

  body("discountType").isIn([
    "percentage",
    "fixed",
  ]),

  body("discountValue").isFloat({
    min: 0,
  }),
];