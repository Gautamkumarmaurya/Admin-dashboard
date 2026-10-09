import Coupon from "../models/Coupon.js";
import * as service from "../services/couponService.js";
import { success } from "../utils/response.js";

// Get all coupons
export const list = async (req, res) =>
  success(
    res,
    "Coupons fetched",
    await Coupon.find().sort({ createdAt: -1 })
  );

// Get coupon by ID
export const get = async (req, res) =>
  success(
    res,
    "Coupon fetched",
    await Coupon.findById(req.params.id)
  );

// Create coupon
export const create = async (req, res) =>
  success(
    res,
    "Coupon created",
    await Coupon.create(req.body),
    {},
    201
  );

// Update coupon
export const update = async (req, res) =>
  success(
    res,
    "Coupon updated",
    await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
  );

// Delete coupon
export const remove = async (req, res) =>
  success(
    res,
    "Coupon deleted",
    await Coupon.findByIdAndDelete(req.params.id)
  );

// Update coupon status
export const status = async (req, res) =>
  success(
    res,
    "Coupon status updated",
    await Coupon.findByIdAndUpdate(
      req.params.id,
      {
        isActive: req.body.isActive,
      },
      {
        new: true,
      }
    )
  );

// Validate coupon
export const validate = async (req, res) =>
  success(
    res,
    "Coupon validated",
    await service.validate(
      req.body.code,
      Number(req.body.orderAmount || 0)
    )
  );