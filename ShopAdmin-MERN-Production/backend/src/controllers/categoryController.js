import Category from "../models/Category.js";
import Product from "../models/Product.js";
import { success } from "../utils/response.js";

// Get all categories
export const list = async (req, res) => {
  const [categories, productCounts] = await Promise.all([
    Category.find().sort({ name: 1 }).lean(),
    Product.aggregate([
      { $group: { _id: "$category", productCount: { $sum: 1 } } },
    ]),
  ]);
  const countsByCategory = new Map(
    productCounts.map(({ _id, productCount }) => [String(_id), productCount])
  );

  return success(
    res,
    "Categories fetched",
    categories.map((category) => ({
      ...category,
      productCount: countsByCategory.get(String(category._id)) || 0,
    }))
  );
};

// Get category by ID
export const get = async (req, res) => {
  const x = await Category.findById(req.params.id);

  if (!x) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
      errors: [],
    });
  }

  return success(res, "Category fetched", x);
};

// Create category
export const create = async (req, res) =>
  success(
    res,
    "Category created",
    await Category.create(req.body),
    {},
    201
  );

// Update category
export const update = async (req, res) => {
  const x = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!x) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
      errors: [],
    });
  }

  return success(res, "Category updated", x);
};

// Delete category
export const remove = async (req, res) => {
  const x = await Category.findByIdAndDelete(req.params.id);

  if (!x) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
      errors: [],
    });
  }

  return success(res, "Category deleted");
};

// Status update uses the same update handler
export const status = update;