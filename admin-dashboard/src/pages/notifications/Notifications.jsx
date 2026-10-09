import { useState } from 'react';
import { useNotifications } from '../../context/NotificationContext';

export default function Notifications() {
  const { items, error, markAll, mark, remove } = useNotifications();
  const [actionError, setActionError] = useState('');

  async function runAction(action) {
    setActionError('');
    try {
      await action();
    } catch (requestError) {
      setActionError(requestError.message);
    }
  }

  return (
    <>
      <div className="mb-6 flex justify-between">
        <div><h1 className="text-3xl font-bold">Notifications</h1><p className="muted">Stay on top of store activity.</p></div>
        <button className="btn btn-ghost" onClick={() => runAction(markAll)}>Mark all as read</button>
      </div>
      {(error || actionError) && <p role="alert" className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">{actionError || error}</p>}
      <div className="panel divide-y divide-white/10">
        {items.map((notification) => (
          <div key={notification.id} className={`flex gap-4 p-4 ${!notification.read ? 'bg-blue-500/[.04]' : ''}`}>
            <span className={`mt-2 h-2 w-2 rounded-full ${notification.read ? 'bg-slate-700' : 'bg-blue-400'}`} />
            <div className="flex-1">
              <b className="text-sm">{notification.title}</b>
              <p className="text-sm muted">{notification.text}</p>
              <p className="mt-1 text-xs muted">{notification.time}</p>
            </div>
            <div className="flex gap-2 text-xs">
              {!notification.read && <button onClick={() => runAction(() => mark(notification.id))} className="text-blue-300">Read</button>}
              <button onClick={() => runAction(() => remove(notification.id))} className="text-red-400">Delete</button>
            </div>
          </div>
        ))}
        {!items.length && !error && <p className="p-6 text-sm muted">No notifications.</p>}
      </div>
    </>
  );
}