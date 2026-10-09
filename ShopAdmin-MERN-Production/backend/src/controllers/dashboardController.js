import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import { success } from "../utils/response.js";
import env from "../config/env.js";

// Get dashboard overview
export async function overview(req, res) {
  const [
    rev,
    orders,
    customers,
    products,
    pending,
    low,
  ] = await Promise.all([
    Order.aggregate([
      {
        $match: {
          status: {
            $ne: "cancelled",
          },
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$total",
          },
        },
      },
    ]),

    Order.countDocuments(),

    User.countDocuments({
      role: "customer",
    }),

    Product.countDocuments(),

    Order.countDocuments({
      status: "pending",
    }),

    Product.countDocuments({
      stock: {
        $lte: env.lowStockThreshold,
      },
    }),
  ]);

  return success(res, "Dashboard overview", {
    revenue: rev[0]?.total || 0,
    orders,
    customers,
    products,

    growth: {
      revenue: 0,
      orders: 0,
      customers: 0,
      products: 0,
    },

    pendingOrders: pending,
    lowStockProducts: low,
  });
}