import { Bell, Menu, Moon, Search, Sun, UserRound } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar({ onMenu }) {
  const { theme, toggle } = useTheme();
  const { unread } = useNotifications();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const notificationsOpen = location.pathname === '/notifications';
  const [query, setQuery] = useState('');

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-slate-700/50 bg-[#080d18]/85 px-4 backdrop-blur-xl md:px-6">
      <button
        type="button"
        aria-label="Open navigation menu"
        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
        onClick={onMenu}
      >
        <Menu size={20} />
      </button>
      <label className="relative hidden w-full max-w-md md:block">
        <Search size={16} className="muted absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          className="field py-2 pl-9 text-sm"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products, orders, customers..."
          aria-label="Search products, orders, customers"
        />
      </label>
      <div className="ml-auto flex items-center gap-1.5">
        <button
          type="button"
          aria-label={`Notifications${unread > 0 ? `, ${unread} unread` : ''}`}
          aria-pressed={notificationsOpen}
          className="relative rounded-xl p-2.5 text-slate-400 transition hover:bg-slate-800 hover:text-blue-200"
          onClick={() => navigate(notificationsOpen ? '/dashboard' : '/notifications')}
        >
          <Bell size={18} />
          {unread > 0 && (
            <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white ring-2 ring-[#080d18]">
              {unread}
            </span>
          )}
        </button>
        <button
          type="button"
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          className="rounded-xl p-2.5 text-slate-400 transition hover:bg-slate-800 hover:text-amber-200"
          onClick={toggle}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div className="mx-2 hidden h-7 w-px bg-slate-700 sm:block" />
        <button
          type="button"
          onClick={() => navigate('/settings')}
          className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-800/80"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-md shadow-blue-950/40">
            <UserRound size={15} />
          </span>
          <span className="hidden text-left text-xs sm:block">
            <b className="block text-slate-200">{user?.name}</b>
            <span className="text-slate-500">{user?.role}</span>
          </span>
        </button>
      </div>
    </header>
  );
}
