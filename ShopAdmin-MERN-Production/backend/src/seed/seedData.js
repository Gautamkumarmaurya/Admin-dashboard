import mongoose from "mongoose";
import env from "../config/env.js";

import { seedAdmin } from "./seedAdmin.js";
import { seedProducts } from "./seedProducts.js";

import User from "../models/User.js";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import Review from "../models/Review.js";
import Notification from "../models/Notification.js";
import Coupon from "../models/Coupon.js";

async function run() {
  await mongoose.connect(env.mongoUri);

  const admin = await seedAdmin();

  const customers = [];

  // Create customers
  for (let i = 1; i <= 8; i++) {
    let u = await User.findOne({
      email: `customer${i}@example.com`,
    });

    if (!u) {
      u = await User.create({
        name: `Customer ${i}`,
        email: `customer${i}@example.com`,
        password: "customer123",
        role: "customer",
      });
    }

    customers.push(u);
  }

  // Seed products
  const count = await seedProducts(admin);

  const products = await (
    await import("../models/Product.js")
  ).default.find().limit(15);

  // Seed orders, payments and reviews
  if ((await Order.countDocuments()) === 0) {
    for (let i = 0; i < 18; i++) {
      const customer =
        customers[i % customers.length];

      const p =
        products[i % products.length];

      const qty = (i % 3) + 1;

      const total = p.finalPrice * qty;

      const o = await Order.create({
        customer: customer._id,

        items: [
          {
            product: p._id,
            name: p.name,
            quantity: qty,
            price: p.finalPrice,
            image: p.thumbnail,
          },
        ],

        subtotal: total,
        discount: 0,
        shippingFee: 0,
        tax: 0,
        total,

        status: [
          "pending",
          "processing",
          "shipped",
          "delivered",
        ][i % 4],

        timeline: [
          {
            status: "pending",
            note: "Order placed",
          },
        ],
      });

      await Payment.create({
        transactionId: `TX-${Date.now()}-${i}`,
        order: o._id,
        customer: customer._id,
        amount: total,
        method: [
          "card",
          "upi",
          "paypal",
        ][i % 3],
        status: "success",
      });

      if (i < 10) {
        await Review.create({
          product: p._id,
          customer: customer._id,
          rating: 4 + (i % 2),
          title: "Great product",
          comment: "Looks and works great.",
          status: "approved",
        });
      }
    }
  }

  // Seed coupon
  if ((await Coupon.countDocuments()) === 0) {
    await Coupon.create({
      code: "WELCOME10",
      description: "10% welcome discount",
      discountType: "percentage",
      discountValue: 10,
      minimumOrder: 50,
      maximumDiscount: 50,
      usageLimit: 1000,
    });
  }

  // Seed notification
  if ((await Notification.countDocuments()) === 0) {
    await Notification.create({
      user: admin._id,
      type: "system",
      title: "ShopAdmin ready",
      message: "Seed data has been created.",
      metadata: {
        seeded: true,
      },
    });
  }

  console.log({
    admin: "admin@example.com / admin123",
    products: count,
    customers: customers.length,
  });

  await mongoose.disconnect();
}

run().catch(async (e) => {
  console.error(e);

  await mongoose
    .disconnect()
    .catch(() => {});

  process.exit(1);
});