import * as a from "../services/analyticsService.js";
import { success } from "../utils/response.js";

// Analytics overview
export const overview = async (req, res) =>
  success(res, "Analytics overview", await a.overview());

// Revenue analytics
export const revenue = async (req, res) =>
  success(res, "Revenue analytics", await a.revenue(req.query.range));

// Orders analytics
export const orders = async (req, res) =>
  success(res, "Orders analytics", await a.orders(req.query.range));

// Category analytics
export const categories = async (req, res) =>
  success(res, "Category analytics", await a.categories(req.query.range));

// Top products
export const topProducts = async (req, res) =>
  success(res, "Top products", await a.topProducts(req.query.range));

// Sales uses the same handler as orders
export const sales = orders;

// Customer growth analytics
export const customers = async (req, res) => {
  const { range = "30d" } = req.query;

  return success(
    res,
    "Customer growth",
    await (async () => {
      const d = new Date();

      d.setDate(
        d.getDate() -
          ({
            today: 1,
            "7d": 7,
            "30d": 30,
            "3m": 90,
            "6m": 180,
            "1y": 365,
          }[range] || 30)
      );

      return (
        await import("../models/User.js")
      ).default.aggregate([
        {
          $match: {
            role: "customer",
            createdAt: {
              $gte: d,
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
              },
            },
            customers: {
              $sum: 1,
            },
          },
        },
        {
          $project: {
            _id: 0,
            date: "$_id",
            customers: 1,
          },
        },
        {
          $sort: {
            date: 1,
          },
        },
      ]);
    })()
  );
};

// Conversion analytics
export const conversion = async (req, res) =>
  success(res, "Conversion analytics", {
    conversionRate: 0,
  });