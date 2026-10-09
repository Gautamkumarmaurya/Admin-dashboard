import { useNotifications } from '../../context/NotificationContext';

export default function RecentActivity() {
  const { items, error } = useNotifications();

  return (
    <div className="panel p-5">
      <h3 className="font-semibold">Recent Activity</h3>
      {error && <p role="alert" className="mt-3 text-xs text-red-300">{error}</p>}
      <div className="mt-4 space-y-3">
        {items.slice(0, 5).map((item) => (
          <div key={item.id} className="flex gap-3 text-sm">
            <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${item.read ? 'bg-slate-600' : 'bg-blue-400'}`} />
            <div className="min-w-0">
              <p className="font-medium">{item.title}</p>
              <p className="truncate text-xs muted">{item.text}</p>
              <p className="text-xs muted">{item.time}</p>
            </div>
          </div>
        ))}
        {!items.length && !error && <p className="text-sm muted">No recent activity.</p>}
      </div>
    </div>
  );
}
