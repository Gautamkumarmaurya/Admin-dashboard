import Product from "../models/Product.js";
import {
  pagination,
  paginationMeta,
} from "../utils/pagination.js";

// Get paginated products
export async function list(query) {
  const {
    page,
    limit,
    skip,
  } = pagination(query);

  const filter = {};

  if (query.search) {
    filter.$or = [
      {
        name: new RegExp(query.search, "i"),
      },
      {
        sku: new RegExp(query.search, "i"),
      },
      {
        brand: new RegExp(query.search, "i"),
      },
    ];
  }

  if (query.category) {
    filter.category = query.category;
  }

  if (query.status) {
    filter.status = query.status;
  }

  if (query.minPrice || query.maxPrice) {
    filter.price = {};

    if (query.minPrice) {
      filter.price.$gte = Number(
        query.minPrice
      );
    }

    if (query.maxPrice) {
      filter.price.$lte = Number(
        query.maxPrice
      );
    }
  }

  if (query.minStock || query.maxStock) {
    filter.stock = {};

    if (query.minStock) {
      filter.stock.$gte = Number(
        query.minStock
      );
    }

    if (query.maxStock) {
      filter.stock.$lte = Number(
        query.maxStock
      );
    }
  }

  const sort =
    {
      price_asc: {
        price: 1,
      },

      price_desc: {
        price: -1,
      },

      rating: {
        rating: -1,
      },

      newest: {
        createdAt: -1,
      },
    }[query.sort] || {
      createdAt: -1,
    };

  const [data, total] = await Promise.all([
    Product.find(filter)
      .populate("category", "name slug")
      .sort(sort)
      .skip(skip)
      .limit(limit),

    Product.countDocuments(filter),
  ]);

  return {
    data,
    meta: paginationMeta(
      page,
      limit,
      total
    ),
  };
}

// Get product by ID
export async function get(id) {
  return Product.findById(id).populate(
    "category",
    "name slug"
  );
}

// Create product
export async function create(data, userId) {
  const slug =
    data.slug ||
    `${data.name}-${data.sku}`
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  return Product.create({
    ...data,
    slug,
    createdBy: userId,
  });
}

// Update product
export async function update(id, data) {
  return Product.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
}

// Delete product
export async function remove(id) {
  return Product.findByIdAndDelete(id);
}