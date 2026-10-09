import Order from "../models/Order.js";
import {
  pagination,
  paginationMeta,
} from "../utils/pagination.js";
import { transitions } from "../constants/orderStatus.js";

// Get paginated orders
export async function list(query) {
  const {
    page,
    limit,
    skip,
  } = pagination(query);

  const filter = {};

  if (query.search) {
    filter.orderNumber = new RegExp(
      query.search,
      "i"
    );
  }

  if (query.status) {
    filter.status = query.status;
  }

  if (query.customer) {
    filter.customer = query.customer;
  }

  const [data, total] = await Promise.all([
    Order.find(filter)
      .populate("customer", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Order.countDocuments(filter),
  ]);

  return {
    data,
    meta: paginationMeta(page, limit, total),
  };
}

// Get order by ID
export async function get(id) {
  return Order.findById(id)
    .populate("customer", "name email")
    .populate(
      "items.product",
      "name thumbnail"
    );
}

// Create order
export async function create(data) {
  return Order.create(data);
}

// Update order
export async function update(id, data) {
  return Order.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
}

// Update order status
export async function updateStatus(
  id,
  status,
  note = ""
) {
  const order = await Order.findById(id);

  if (!order) {
    throw Object.assign(
      new Error("Order not found"),
      {
        status: 404,
      }
    );
  }

  if (
    status !== order.status &&
    !transitions[order.status]?.includes(status)
  ) {
    throw Object.assign(
      new Error(
        `Invalid transition from ${order.status} to ${status}`
      ),
      {
        status: 400,
      }
    );
  }

  order.status = status;

  order.timeline.push({
    status,
    note,
  });

  return order.save();
}