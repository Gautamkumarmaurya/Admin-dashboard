import { request } from './apiClient';

function normalizeNotification(notification) {
  return {
    ...notification,
    id: notification._id || notification.id,
    read: Boolean(notification.isRead),
    text: notification.message || '',
    time: notification.createdAt ? new Date(notification.createdAt).toLocaleString('en-IN') : '',
  };
}

export async function getNotifications() {
  const response = await request('/notifications');
  return response.data.map(normalizeNotification);
}

export function markNotificationRead(id) {
  return request(`/notifications/${id}/read`, { method: 'PATCH' });
}

export function markAllNotificationsRead() {
  return request('/notifications/read-all', { method: 'PATCH' });
}

export function deleteNotification(id) {
  return request(`/notifications/${id}`, { method: 'DELETE' });
}
