import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

// Calculate start date based on the selected range
function since(range) {
  const d = new Date();

  const days = {
    today: 1,
    "7d": 7,
    "30d": 30,
    "3m": 90,
    "6m": 180,
    "1y": 365,
  }[range] || 30;

  d.setDate(d.getDate() - days);

  return d;
}

// Get revenue analytics
export async function revenue(range = "30d") {
  return Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: since(range),
        },
        status: {
          $ne: "cancelled",
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
        revenue: {
          $sum: "$total",
        },
      },
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        revenue: 1,
      },
    },
    {
      $sort: {
        date: 1,
      },
    },
  ]);
}

// Get order analytics
export async function orders(range = "30d") {
  return Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: since(range),
        },
      },
    },
    {
      $group: {
        _id: "$status",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        status: "$_id",
        count: 1,
      },
    },
  ]);
}

// Get category analytics
export async function categories(range = "30d") {
  return Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: since(range),
        },
        status: {
          $ne: "cancelled",
        },
      },
    },
    {
      $unwind: "$items",
    },
    {
      $lookup: {
        from: "products",
        localField: "items.product",
        foreignField: "_id",
        as: "p",
      },
    },
    {
      $unwind: "$p",
    },
    {
      $lookup: {
        from: "categories",
        localField: "p.category",
        foreignField: "_id",
        as: "c",
      },
    },
    {
      $unwind: "$c",
    },
    {
      $group: {
        _id: "$c.name",
        sales: {
          $sum: "$items.quantity",
        },
        revenue: {
          $sum: {
            $multiply: [
              "$items.quantity",
              "$items.price",
            ],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        sales: 1,
        revenue: 1,
      },
    },
    {
      $sort: {
        revenue: -1,
      },
    },
  ]);
}

// Get top products
export async function topProducts(range = "30d") {
  return Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: since(range),
        },
        status: {
          $ne: "cancelled",
        },
      },
    },
    {
      $unwind: "$items",
    },
    {
      $group: {
        _id: "$items.product",
        sales: {
          $sum: "$items.quantity",
        },
        revenue: {
          $sum: {
            $multiply: [
              "$items.quantity",
              "$items.price",
            ],
          },
        },
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: "$product",
    },
    {
      $project: {
        _id: 0,
        product: "$product.name",
        sales: 1,
        revenue: 1,
        rating: "$product.rating",
      },
    },
    {
      $sort: {
        sales: -1,
      },
    },
    {
      $limit: 10,
    },
  ]);
}

// Get analytics overview
export async function overview() {
  const [
    ordersCount,
    customers,
    products,
    revenue,
  ] = await Promise.all([
    Order.countDocuments(),

    User.countDocuments({
      role: "customer",
    }),

    Product.countDocuments(),

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
  ]);

  return {
    orders: ordersCount,
    customers,
    products,
    revenue: revenue[0]?.total || 0,
  };
}