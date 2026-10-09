import { request } from './apiClient';

function normalizeOrder(order) {
  const customer = order.customer;
  return {
    ...order,
    id: order.orderNumber || order._id,
    mongoId: order._id,
    customer: typeof customer === 'object' ? customer?.name || customer?.email || 'Customer' : 'Customer',
    date: order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN') : '',
    items: order.items?.reduce((count, item) => count + (item.quantity || 0), 0) || 0,
    total: order.total || 0,
    payment: order.paymentStatus || '—',
    status: order.status ? order.status.replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()) : 'Pending',
  };
}

export async function getOrders(query = {}) {
  const params = new URLSearchParams({ limit: '100', ...query });
  const response = await request(`/orders?${params}`);
  return response.data.map(normalizeOrder);
}

export async function getOrderById(id) {
  const response = await request(`/orders/${id}`);
  return normalizeOrder(response.data);
}

export async function getOrderTimeline(id) {
  const response = await request(`/orders/${id}/timeline`);
  return response.data;
}
