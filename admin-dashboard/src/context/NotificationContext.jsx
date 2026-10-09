import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import {
  deleteNotification,
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from '../services/notificationApi';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      setItems([]);
      setError('');
      return undefined;
    }

    let active = true;
    getNotifications()
      .then((notifications) => {
        if (active) setItems(notifications);
      })
      .catch((loadError) => {
        if (active) setError(loadError.message);
      });
    return () => {
      active = false;
    };
  }, [user]);

  async function markAll() {
    await markAllNotificationsRead();
    setItems((current) => current.map((item) => ({ ...item, read: true })));
  }

  async function mark(id) {
    await markNotificationRead(id);
    setItems((current) => current.map((item) => item.id === id ? { ...item, read: true } : item));
  }

  async function remove(id) {
    await deleteNotification(id);
    setItems((current) => current.filter((item) => item.id !== id));
  }

  return (
    <NotificationContext.Provider value={{ items, unread: items.filter((item) => !item.read).length, error, markAll, mark, remove }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);
