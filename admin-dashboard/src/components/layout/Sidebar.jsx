import { Link, NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight, LogOut, Plus, Sparkles, Tags } from 'lucide-react';
import { navigation } from '../../data/navigation';
import { useAuth } from '../../hooks/useAuth';

export default function Sidebar({ collapsed, setCollapsed, mobile = false, onClose }) {
  const { logout } = useAuth();

  return (
    <aside className={`${mobile ? 'w-64' : `hidden lg:flex ${collapsed ? 'w-[76px]' : 'w-60'}`} flex-col border-r border-slate-700/50 bg-[#0a1220]/95 transition-all duration-200`}>
      <div className="flex h-16 items-center gap-3 border-b border-slate-700/50 px-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-lg shadow-blue-950/40">
          <Sparkles size={19} />
        </span>
        {!collapsed && (
          <b className="text-lg tracking-tight text-slate-100">
            Shop<span className="text-blue-300">Admin</span>
          </b>
        )}
        {!mobile && (
          <button
            type="button"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="ml-auto rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
          </button>
        )}
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {navigation.map(([name, to, Icon]) => (
          <div key={to}>
            <NavLink
              title={name}
              onClick={onClose}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-blue-500/15 text-blue-200 ring-1 ring-inset ring-blue-400/20'
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-100'
                }`
              }
            >
              <Icon size={18} />
              {!collapsed && <span>{name}</span>}
            </NavLink>
            {name === 'Products' && !collapsed && (
              <div className="ml-9 mt-1 space-y-1 text-xs text-slate-500">
                <Link className="block py-1.5 transition hover:text-blue-200" to="/products/add">
                  <Plus size={12} className="mr-1 inline" /> Add Product
                </Link>
                <Link className="block py-1.5 transition hover:text-blue-200" to="/categories">
                  <Tags size={12} className="mr-1 inline" /> Categories
                </Link>
              </div>
            )}
          </div>
        ))}
      </nav>
      <div className="m-3 border-t border-slate-700/50 pt-3">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-rose-500/10 hover:text-rose-300"
        >
          <LogOut size={18} />
          {!collapsed && 'Logout'}
        </button>
        {!collapsed && (
          <div className="mt-3 rounded-xl border border-slate-700/60 bg-slate-800/40 p-3">
            <b className="text-sm text-slate-200">Admin</b>
            <p className="mt-0.5 text-xs text-slate-500">admin@example.com</p>
          </div>
        )}
      </div>
    </aside>
  );
}
