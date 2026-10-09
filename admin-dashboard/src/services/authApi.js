import { request } from './apiClient';

export async function loginRequest(email, password) {
  const response = await request('/auth/login', {
    method: 'POST',
    auth: false,
    body: { email, password },
  });
  return response.data;
}

export async function getCurrentUser() {
  const response = await request('/auth/me');
  return response.data;
}

export function logoutRequest() {
  return request('/auth/logout', { method: 'POST' });
}
