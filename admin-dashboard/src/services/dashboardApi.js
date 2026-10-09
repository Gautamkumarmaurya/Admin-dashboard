import { request } from './apiClient';

export async function getDashboardOverview() {
  const response = await request('/dashboard/overview');
  return response.data;
}

export async function getRevenueAnalytics(range = '30d') {
  const response = await request(`/analytics/revenue?range=${encodeURIComponent(range)}`);
  return response.data;
}

export async function getCategoryAnalytics(range = '30d') {
  const response = await request(`/analytics/categories?range=${encodeURIComponent(range)}`);
  return response.data;
}

export async function getOrderAnalytics(range = '30d') {
  const response = await request(`/analytics/orders?range=${encodeURIComponent(range)}`);
  return response.data;
}

export async function getTopProducts(range = '30d') {
  const response = await request(`/analytics/top-products?range=${encodeURIComponent(range)}`);
  return response.data;
}

export async function getConversionAnalytics() {
  const response = await request('/analytics/conversion');
  return response.data;
}

export async function getAnalyticsOverview() {
  const response = await request('/analytics/overview');
  return response.data;
}
