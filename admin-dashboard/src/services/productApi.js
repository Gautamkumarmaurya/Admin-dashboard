import { request } from './apiClient';
import { getCategories } from './categoryApi';
import { validateProductImageSize } from '../constants/productImage';

function normalizeProduct(product) {
  return {
    ...product,
    id: product._id || product.id,
    category: typeof product.category === 'object' ? product.category?.name || '' : product.category,
    status: product.status ? product.status.replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()) : 'Active',
    price: product.price,
  };
}

function slugify(value) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function normalizePayload(product, creating = false) {
  const payload = { ...product };
  if (typeof payload.category === 'string' && !/^[a-f\d]{24}$/i.test(payload.category)) {
    const categories = await getCategories();
    const category = categories.find((item) => item.name.toLowerCase() === payload.category.toLowerCase());
    if (!category) throw new Error(`Category "${payload.category}" is not available. Add it before saving this product.`);
    payload.category = category.id;
  }
  if (payload.status) payload.status = payload.status.toLowerCase();
  if (creating) payload.slug = `${slugify(payload.name)}-${slugify(payload.sku)}`;
  return payload;
}

function bodyForProduct(payload) {
  const imageError = validateProductImageSize(payload.thumbnail instanceof File ? payload.thumbnail : null);
  if (imageError) throw new Error(imageError);
  if (!(payload.thumbnail instanceof File)) return payload;
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (key !== 'thumbnail' && value !== undefined && value !== null) formData.append(key, String(value));
  });
  formData.append('thumbnail', payload.thumbnail);
  return formData;
}

export async function getProducts(query = {}) {
  const params = new URLSearchParams({ limit: '100', ...query });
  const response = await request(`/products?${params}`);
  return response.data.map(normalizeProduct);
}

export async function getProductById(id) {
  const response = await request(`/products/${id}`);
  return normalizeProduct(response.data);
}

export async function createProduct(product) {
  const response = await request('/products', {
    method: 'POST',
    body: bodyForProduct(await normalizePayload(product, true)),
  });
  return normalizeProduct(response.data);
}

export async function updateProduct(id, product) {
  const response = await request(`/products/${id}`, {
    method: 'PUT',
    body: bodyForProduct(await normalizePayload(product)),
  });
  return normalizeProduct(response.data);
}

export async function deleteProduct(id) {
  await request(`/products/${id}`, { method: 'DELETE' });
  return true;
}

export async function getLowStockProducts() {
  const response = await request('/products/low-stock');
  return response.data.map(normalizeProduct);
}
