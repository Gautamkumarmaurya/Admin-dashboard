import { createContext, useContext, useEffect, useState } from 'react';
import { clearAuthToken, getAuthToken, saveAuthToken } from '../services/apiClient';
import { getCurrentUser, loginRequest, logoutRequest } from '../services/authApi';
import { getItem, removeItem, setItem } from '../utils/localStorage';

const AuthContext = createContext(null);

function normalizeUser(user) {
  return {
    ...user,
    id: user._id || user.id,
    role: user.role === 'admin' ? 'Super Admin' : user.role,
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getAuthToken() ? getItem('admin_user') : null);
  const [loading, setLoading] = useState(Boolean(getAuthToken()));

  useEffect(() => {
    if (!getAuthToken()) return;

    let active = true;
    getCurrentUser()
      .then((currentUser) => {
        if (!active) return;
        const normalized = normalizeUser(currentUser);
        setUser(normalized);
        setItem('admin_user', normalized);
      })
      .catch(() => {
        if (!active) return;
        clearAuthToken();
        removeItem('admin_user');
        setUser(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function login(email, password, remember = true) {
    const result = await loginRequest(email, password);
    saveAuthToken(result.token, remember);
    const normalized = normalizeUser(result.user);
    setUser(normalized);
    if (remember) setItem('admin_user', normalized);
    else removeItem('admin_user');
    return normalized;
  }

  async function logout() {
    try {
      await logoutRequest();
    } finally {
      clearAuthToken();
      removeItem('admin_user');
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
