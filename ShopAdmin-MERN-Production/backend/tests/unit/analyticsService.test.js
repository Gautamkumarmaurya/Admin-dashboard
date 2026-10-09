import Order from "../../src/models/Order.js";
import User from "../../src/models/User.js";
import * as a from "../../src/services/analyticsService.js";

// Revenue comes from database
test("revenue comes from database", async () => {
  const u = await User.create({
    name: "C",
    email: "a@test.com",
    password: "x",
    role: "customer",
  });

  await Order.create({
    customer: u._id,
    items: [
      {
        product: u._id,
        name: "x",
        quantity: 1,
        price: 50,
      },
    ],
    subtotal: 50,
    total: 50,
  });

  const data = await a.revenue("30d");

  expect(data[0].revenue).toBe(50);
});