import User from "../models/User.js";
import Order from "../models/Order.js";
import { success } from "../utils/response.js";
import {
  pagination,
  paginationMeta,
} from "../utils/pagination.js";

// Get all customers
export async function list(req, res) {
  const { page, limit, skip } = pagination(req.query);

  const f = {
    role: "customer",
  };

  if (req.query.search) {
    f.$or = [
      {
        name: new RegExp(req.query.search, "i"),
      },
      {
        email: new RegExp(req.query.search, "i"),
      },
    ];
  }

  const [data, total] = await Promise.all([
    User.find(f)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    User.countDocuments(f),
  ]);

  return success(
    res,
    "Customers fetched",
    data,
    paginationMeta(page, limit, total)
  );
}

// Get customer by ID
export async function get(req, res) {
  const x = await User.findOne({
    _id: req.params.id,
    role: "customer",
  });

  if (!x) {
    return res.status(404).json({
      success: false,
      message: "Customer not found",
      errors: [],
    });
  }

  return success(res, "Customer fetched", x);
}

// Get customer orders
export async function orders(req, res) {
  return success(
    res,
    "Customer orders",
    await Order.find({
      customer: req.params.id,
    }).sort({ createdAt: -1 })
  );
}

// Get customer statistics
export async function stats(req, res) {
  const data = await Order.aggregate([
    {
      $match: {
        customer: new (
          await import("mongoose")
        ).default.Types.ObjectId(req.params.id),
        status: {
          $ne: "cancelled",
        },
      },
    },
    {
      $group: {
        _id: null,
        totalOrders: {
          $sum: 1,
        },
        totalSpent: {
          $sum: "$total",
        },
        lastOrder: {
          $max: "$createdAt",
        },
      },
    },
  ]);

  const x = data[0] || {
    totalOrders: 0,
    totalSpent: 0,
    lastOrder: null,
  };

  return success(res, "Customer stats", {
    ...x,
    averageOrderValue: x.totalOrders
      ? x.totalSpent / x.totalOrders
      : 0,
  });
}

// Update customer status
export async function status(req, res) {
  const x = await User.findOneAndUpdate(
    {
      _id: req.params.id,
      role: "customer",
    },
    {
      isActive: req.body.isActive,
    },
    {
      new: true,
    }
  );

  return success(
    res,
    "Customer status updated",
    x
  );
}