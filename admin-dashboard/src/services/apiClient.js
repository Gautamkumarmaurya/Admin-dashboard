import { API_BASE_URL } from '../config/apiConfig';

const TOKEN_KEY = 'admin_token';

export class ApiError extends Error {
  constructor(message, { status = 0, errors = [] } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

export function saveAuthToken(token, remember = true) {
  clearAuthToken();
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(TOKEN_KEY, token);
}

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
}

export async function request(path, { method = 'GET', body, headers = {}, auth = true } = {}) {
  const token = auth ? getAuthToken() : null;
  const requestHeaders = new Headers(headers);
  if (token) requestHeaders.set('Authorization', `Bearer ${token}`);

  let requestBody = body;
  if (body !== undefined && !(body instanceof FormData)) {
    requestHeaders.set('Content-Type', 'application/json');
    requestBody = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: requestHeaders,
      body: requestBody,
      credentials: 'include',
    });
  } catch (error) {
    throw new ApiError(`Cannot reach the ShopAdmin API at ${API_BASE_URL}. Check that the backend is running.`, {
      errors: [error.message],
    });
  }

  let payload;
  try {
    payload = await response.json();
  } catch {
    throw new ApiError(`The API returned an invalid response (${response.status}).`, { status: response.status });
  }

  if (!response.ok || payload.success === false) {
    throw new ApiError(payload.message || `Request failed (${response.status}).`, {
      status: response.status,
      errors: payload.errors || [],
    });
  }

  return payload;
}
