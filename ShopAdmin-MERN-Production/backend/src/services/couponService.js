import Coupon from "../models/Coupon.js";

// Validate coupon
export async function validate(code, orderAmount) {
  const coupon = await Coupon.findOne({
    code: code.toUpperCase(),
    isActive: true,
  });

  if (!coupon) {
    throw Object.assign(
      new Error("Invalid coupon"),
      {
        status: 400,
      }
    );
  }

  if (
    coupon.expiresAt &&
    coupon.expiresAt < new Date()
  ) {
    throw Object.assign(
      new Error("Coupon expired"),
      {
        status: 400,
      }
    );
  }

  if (
    coupon.usageLimit &&
    coupon.usedCount >= coupon.usageLimit
  ) {
    throw Object.assign(
      new Error("Coupon usage limit reached"),
      {
        status: 400,
      }
    );
  }

  if (orderAmount < coupon.minimumOrder) {
    throw Object.assign(
      new Error("Minimum order amount not met"),
      {
        status: 400,
      }
    );
  }

  let discount =
    coupon.discountType === "percentage"
      ? (orderAmount * coupon.discountValue) / 100
      : coupon.discountValue;

  if (coupon.maximumDiscount) {
    discount = Math.min(
      discount,
      coupon.maximumDiscount
    );
  }

  return {
    coupon,
    discount,
  };
}