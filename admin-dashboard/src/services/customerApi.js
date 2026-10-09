import { request } from './apiClient';

export async function getCustomers(query = {}) {
  const params = new URLSearchParams({ limit: '100', ...query });
  const response = await request(`/customers?${params}`);
  return Promise.all(response.data.map(async (customer) => {
    const statsResponse = await request(`/customers/${customer._id}/stats`);
    const stats = statsResponse.data;
    return {
      ...customer,
      id: customer._id,
      phone: customer.phone || '—',
      orders: stats.totalOrders,
      spent: stats.totalSpent,
      status: customer.isActive ? 'Active' : 'Inactive',
      joined: customer.createdAt ? new Date(customer.createdAt).toLocaleDateString('en-IN') : '',
    };
  }));
}

export async function getCustomerById(id) {
  const response = await request(`/customers/${id}`);
  return { ...response.data, id: response.data._id };
}

export async function getCustomerOrders(id) {
  const response = await request(`/customers/${id}/orders`);
  return response.data;
}

export async function getCustomerStats(id) {
  const response = await request(`/customers/${id}/stats`);
  return response.data;
}
