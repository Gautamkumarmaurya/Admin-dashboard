import Order from "../../src/models/Order.js";
import User from "../../src/models/User.js";
import * as service from "../../src/services/orderService.js";

// Valid order status transition
test(
  "valid order status transition",
  async () => {
    const u = await User.create({
      name: "C",
      email: "c@test.com",
      password: "x",
      role: "customer",
    });

    const o = await Order.create({
      customer: u._id,
      items: [
        {
          product: u._id,
          name: "x",
          quantity: 1,
          price: 10,
        },
      ],
      subtotal: 10,
      total: 10,
    });

    const x = await service.updateStatus(
      o._id,
      "processing"
    );

    expect(x.status).toBe("processing");
  }
);