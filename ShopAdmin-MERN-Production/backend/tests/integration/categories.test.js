import request from "supertest";
import app from "../../src/app.js";
import Category from "../../src/models/Category.js";
import Product from "../../src/models/Product.js";
import { createUser } from "../helpers.js";

// Admin can create category
test("admin can create category", async () => {
  const { token } = await createUser("admin");

  const r = await request(app)
    .post("/api/v1/categories")
    .set(
      "Authorization",
      `Bearer ${token}`
    )
    .send({
      name: "Beauty",
      slug: "beauty",
    });

  expect(r.status).toBe(201);
});

test("categories include live product counts and filter products by category", async () => {
  const electronics = await Category.create({
    name: "Electronics",
    slug: "electronics",
  });
  const fashion = await Category.create({
    name: "Fashion",
    slug: "fashion",
  });

  await Product.create([
    {
      name: "Wireless Headphones",
      slug: "wireless-headphones",
      sku: "ELEC-1",
      category: electronics._id,
      price: 100,
      stock: 4,
    },
    {
      name: "Smart Watch",
      slug: "smart-watch",
      sku: "ELEC-2",
      category: electronics._id,
      price: 200,
      stock: 8,
    },
    {
      name: "Cotton Shirt",
      slug: "cotton-shirt",
      sku: "FASH-1",
      category: fashion._id,
      price: 50,
      stock: 12,
    },
  ]);

  const categoriesResponse = await request(app).get("/api/v1/categories");
  const electronicsResponse = await request(app)
    .get("/api/v1/products")
    .query({ category: electronics._id.toString() });

  expect(categoriesResponse.status).toBe(200);
  expect(
    categoriesResponse.body.data.find((category) => category.name === "Electronics").productCount
  ).toBe(2);
  expect(
    categoriesResponse.body.data.find((category) => category.name === "Fashion").productCount
  ).toBe(1);
  expect(electronicsResponse.status).toBe(200);
  expect(electronicsResponse.body.data.map((product) => product.name)).toEqual([
    "Wireless Headphones",
    "Smart Watch",
  ]);
});