import { request } from './apiClient';

function normalizeCategory(category) {
  return {
    ...category,
    id: category._id || category.id,
    status: category.status ? category.status[0].toUpperCase() + category.status.slice(1) : 'Active',
  };
}

export async function getCategories() {
  const response = await request('/categories');
  return response.data.map(normalizeCategory);
}

export async function createCategory(category) {
  const slug = category.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const response = await request('/categories', {
    method: 'POST',
    body: { ...category, slug },
  });
  return normalizeCategory(response.data);
}
