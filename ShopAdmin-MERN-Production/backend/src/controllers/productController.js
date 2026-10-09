import * as s from "../services/productService.js";
import { success } from "../utils/response.js";
import { uploadProductImage } from "../services/cloudinaryService.js";
import Product from "../models/Product.js";

// Get all products
export async function list(req, res) {
  const r = await s.list(req.query);

  return success(
    res,
    "Products fetched successfully",
    r.data,
    r.meta
  );
}

// Get product by ID
export async function get(req, res) {
  const p = await s.get(req.params.id);

  if (!p) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
      errors: [],
    });
  }

  return success(res, "Product fetched", p);
}

// Create product
export async function create(req, res) {
  const data = {
    ...req.body,
  };

  if (req.file) {
    const image = await uploadProductImage(req.file.buffer);
    data.thumbnail = image.url;
    data.thumbnailPublicId = image.publicId;
  }

  const p = await s.create(data, req.user._id);

  return success(
    res,
    "Product created",
    p,
    {},
    201
  );
}

// Update product
export async function update(req, res) {
  const data = {
    ...req.body,
  };

  if (req.file) {
    const image = await uploadProductImage(req.file.buffer);
    data.thumbnail = image.url;
    data.thumbnailPublicId = image.publicId;
  }

  const p = await s.update(req.params.id, data);

  if (!p) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
      errors: [],
    });
  }

  return success(res, "Product updated", p);
}

// Delete product
export async function remove(req, res) {
  const p = await s.remove(req.params.id);

  if (!p) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
      errors: [],
    });
  }

  return success(res, "Product deleted", null);
}

// Update product status
export async function status(req, res) {
  return update(req, res);
}

// Search products
export async function search(req, res) {
  return list(req, res);
}

// Get low-stock products
export async function lowStock(req, res) {
  const threshold = Number(
    req.query.threshold || 5
  );

  return success(
    res,
    "Low stock products",
    await Product.find({
      stock: {
        $lte: threshold,
      },
    }).sort({
      stock: 1,
    })
  );
}

// Get featured products
export async function featured(req, res) {
  return success(
    res,
    "Featured products",
    await Product.find({
      isFeatured: true,
      status: "active",
    })
  );
}