import { request } from './apiClient';

export async function getReviews() {
  const response = await request('/reviews');
  return response.data.map((review) => ({
    ...review,
    id: review._id || review.id,
    customer: review.customer?.name || 'Customer',
    product: review.product?.name || 'Product',
    review: review.comment || review.title || '',
    date: review.createdAt ? new Date(review.createdAt).toLocaleDateString('en-IN') : '',
    status: review.status ? review.status[0].toUpperCase() + review.status.slice(1) : 'Pending',
  }));
}
