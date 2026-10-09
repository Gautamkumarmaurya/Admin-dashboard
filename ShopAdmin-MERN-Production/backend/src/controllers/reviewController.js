import Review from "../models/Review.js";
import { success } from "../utils/response.js";

// Get all reviews
export const list = async (req, res) =>
  success(
    res,
    "Reviews fetched",
    await Review.find()
      .populate("product", "name")
      .populate("customer", "name email")
      .sort({ createdAt: -1 })
  );

// Get review by ID
export const get = async (req, res) =>
  success(
    res,
    "Review fetched",
    await Review.findById(req.params.id)
  );

// Create review
export const create = async (req, res) =>
  success(
    res,
    "Review created",
    await Review.create(req.body),
    {},
    201
  );

// Update review status
export const status = async (req, res) =>
  success(
    res,
    "Review status updated",
    await Review.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
        runValidators: true,
      }
    )
  );

// Delete review
export const remove = async (req, res) =>
  success(
    res,
    "Review deleted",
    await Review.findByIdAndDelete(req.params.id)
  );