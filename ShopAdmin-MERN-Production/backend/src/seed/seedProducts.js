import Category from "../models/Category.js";
import Product from "../models/Product.js";

// Seed products and categories
export async function seedProducts(admin) {
  const names = [
    ["Electronics", "iPhone 15 Pro", 999],
    ["Electronics", "Samsung Galaxy S24", 899],
    ["Shoes", "Nike Air Max", 129],
    ["Electronics", "Wireless Earbuds", 59],
    ["Beauty", "Skincare Kit", 49],
    ["Accessories", "Backpack", 79],
    ["Fashion", "Men's Jacket", 89],
    ["Home & Living", "Smart Lamp", 39],
    ["Electronics", "Apple Watch Series 9", 399],
    ["Beauty", "Perfume", 69],
    ["Shoes", "Running Shoes", 109],
    ["Electronics", "Smart Speaker", 89],
    ["Home & Living", "Coffee Maker", 129],
    ["Accessories", "Travel Case", 39],
    ["Fashion", "Hoodie", 59],
  ];

  const map = {};

  // Create or update categories
  for (const n of [
    ...new Set(names.map((x) => x[0])),
  ]) {
    map[n] = await Category.findOneAndUpdate(
      {
        name: n,
      },
      {
        name: n,
        slug: n
          .toLowerCase()
          .replaceAll(" ", "-"),
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );
  }

  // Create products only when no products exist
  if ((await Product.countDocuments()) === 0) {
    await Product.insertMany(
      names.map(([cat, name, price], i) => ({
        name,

        slug: `${name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")}-${i}`,

        description: `Premium ${name} for modern customers.`,

        brand: "ShopSphere",

        sku: `SS-${1000 + i}`,

        category: map[cat]._id,

        price,

        discount: i % 3 === 0 ? 10 : 5,

        stock: i % 5 === 0 ? 3 : 20 + i,

        rating: 4 + (i % 10) / 10,

        reviewCount: 10 + i,

        status: "active",

        isFeatured: i < 4,

        createdBy: admin._id,
      }))
    );
  }

  return Product.countDocuments();
}