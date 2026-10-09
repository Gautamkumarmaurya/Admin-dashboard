import request from "supertest";
import app from "../../src/app.js";
import User from "../../src/models/User.js";
import { createUser } from "../helpers.js";

// Admin can create and transition order
test(
  "admin can create and transition order",
  async () => {
    const { token } = await createUser("admin");

    const c = await User.create({
      name: "C",
      email: "cust@test.com",
      password: "x",
      role: "customer",
    });

    let r = await request(app)
      .post("/api/v1/orders")
      .set(
        "Authorization",
        `Bearer ${token}`
      )
      .send({
        customer: c._id,
        items: [
          {
            product: c._id,
            name: "Item",
            quantity: 1,
            price: 20,
          },
        ],
        subtotal: 20,
        total: 20,
      });

    expect(r.status).toBe(201);

    r = await request(app)
      .patch(
        `/api/v1/orders/${r.body.data._id}/status`
      )
      .set(
        "Authorization",
        `Bearer ${token}`
      )
      .send({
        status: "processing",
      });

    expect(r.status).toBe(200);
  }
);