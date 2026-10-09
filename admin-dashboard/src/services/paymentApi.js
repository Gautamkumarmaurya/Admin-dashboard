import { request } from './apiClient';

export async function getPayments() {
  const response = await request('/payments');
  return response.data.map((payment) => ({
    ...payment,
    id: payment.transactionId || payment._id,
    order: payment.order?.orderNumber || '—',
    customer: payment.customer?.name || payment.customer?.email || 'Customer',
    date: payment.createdAt ? new Date(payment.createdAt).toLocaleDateString('en-IN') : '',
    status: payment.status ? payment.status[0].toUpperCase() + payment.status.slice(1) : 'Pending',
  }));
}
