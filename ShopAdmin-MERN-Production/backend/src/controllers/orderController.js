import * as s from "../services/orderService.js";
import { success } from "../utils/response.js";

// Get all orders
export const list = async (req, res) => {
  const r = await s.list(req.query);

  return success(
    res,
    "Orders fetched",
    r.data,
    r.meta
  );
};

// Get order by ID
export const get = async (req, res) => {
  const x = await s.get(req.params.id);

  if (!x) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
      errors: [],
    });
  }

  return success(res, "Order fetched", x);
};

// Create order
export const create = async (req, res) =>
  success(
    res,
    "Order created",
    await s.create(req.body),
    {},
    201
  );

// Update order
export const update = async (req, res) =>
  success(
    res,
    "Order updated",
    await s.update(req.params.id, req.body)
  );

// Update order status
export const status = async (req, res) =>
  success(
    res,
    "Order status updated",
    await s.updateStatus(
      req.params.id,
      req.body.status,
      req.body.note
    )
  );

// Cancel order
export const remove = async (req, res) =>
  success(
    res,
    "Order deleted",
    await s.update(
      req.params.id,
      {
        status: "cancelled",
      }
    )
  );

// Get order timeline
export const timeline = async (req, res) => {
  const x = await s.get(req.params.id);

  if (!x) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
      errors: [],
    });
  }

  return success(
    res,
    "Order timeline",
    x.timeline || []
  );
};