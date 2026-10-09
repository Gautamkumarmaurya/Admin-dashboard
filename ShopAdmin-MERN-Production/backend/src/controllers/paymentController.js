import Payment from "../models/Payment.js";
import { success } from "../utils/response.js";

// Get all payments
export const list = async (req, res) =>
  success(
    res,
    "Payments fetched",
    await Payment.find()
      .populate("customer", "name email")
      .populate("order", "orderNumber")
      .sort({ createdAt: -1 })
  );

// Get payment by ID
export const get = async (req, res) =>
  success(
    res,
    "Payment fetched",
    await Payment.findById(req.params.id)
  );

// Update payment status
export const status = async (req, res) =>
  success(
    res,
    "Payment status updated",
    await Payment.findByIdAndUpdate(
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

// Get payment statistics
export const stats = async (req, res) =>
  success(
    res,
    "Payment stats",
    await Payment.aggregate([
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
          amount: {
            $sum: "$amount",
          },
        },
      },
    ])
  );