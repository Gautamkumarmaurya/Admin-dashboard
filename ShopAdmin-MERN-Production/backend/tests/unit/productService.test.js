import Product from "../../src/models/Product.js";
import Category from "../../src/models/Category.js";
import * as service from "../../src/services/productService.js";

// Product listing supports pagination
test(
  "product listing supports pagination",
  async () => {
    const c = await Category.create({
      name: "Electronics",
      slug: "electronics",
    });

    await Product.create([
      {
        name: "Phone A",
        slug: "phone-a",
        sku: "A",
        category: c._id,
        price: 100,
        stock: 4,
      },
      {
        name: "Phone B",
        slug: "phone-b",
        sku: "B",
        category: c._id,
        price: 200,
        stock: 8,
      },
    ]);

    const r = await service.list({
      page: 1,
      limit: 1,
    });

    expect(r.data).toHaveLength(1);
    expect(r.meta.total).toBe(2);
  }
);