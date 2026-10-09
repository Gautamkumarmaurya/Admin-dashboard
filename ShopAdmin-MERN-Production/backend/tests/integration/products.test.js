import request from "supertest";
import app from "../../src/app.js";
import Category from "../../src/models/Category.js";
import Product from "../../src/models/Product.js";
import { createUser } from "../helpers.js";
import { isAllowedImageSize } from "../../src/middleware/uploadMiddleware.js";

test("product creation requires auth and valid category", async () => {
  const { token } = await createUser("admin");
  const category = await Category.create({
    name: "Shoes",
    slug: "shoes",
  });

  const response = await request(app)
    .post("/api/v1/products")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Runner",
      sku: "RUN1",
      category: category._id,
      price: 99,
      stock: 10,
    });

  expect(response.status).toBe(201);
  expect(response.body.data.name).toBe("Runner");
});

test.each([
  [49 * 1024, "below the 50 KB minimum"],
  [61 * 1024, "above the 60 KB maximum"],
])("rejects a product image %s bytes %s", async (size) => {
  const { token } = await createUser("admin");
  const category = await Category.create({
    name: `Category ${size}`,
    slug: `category-${size}`,
  });

  const response = await request(app)
    .post("/api/v1/products")
    .set("Authorization", `Bearer ${token}`)
    .field("name", `Product ${size}`)
    .field("sku", `SKU-${size}`)
    .field("category", category._id.toString())
    .field("price", "100")
    .field("stock", "5")
    .attach("thumbnail", Buffer.alloc(size), {
      filename: "product.png",
      contentType: "image/png",
    });

  expect(response.status).toBe(400);
  expect(response.body.message).toMatch(/between 50 KB and 60 KB/);
  expect(await Product.countDocuments()).toBe(0);
});

test.each([
  [50 * 1024, true],
  [60 * 1024, true],
  [50 * 1024 - 1, false],
  [60 * 1024 + 1, false],
])("allows an image of %s bytes: %s", (size, allowed) => {
  expect(isAllowedImageSize(size)).toBe(allowed);
});
