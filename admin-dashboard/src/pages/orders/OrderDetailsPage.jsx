import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Badge from '../../components/common/Badge';
import Loader from '../../components/common/Loader';
import { money } from '../../utils/formatCurrency';
import { getOrderById, getOrderTimeline } from '../../services/orderApi';

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    Promise.all([getOrderById(id), getOrderTimeline(id)])
      .then(([orderData, orderTimeline]) => {
        if (!active) return;
        setOrder(orderData);
        setTimeline(orderTimeline);
      })
      .catch((loadError) => {
        if (active) setError(loadError.message);
      });
    return () => {
      active = false;
    };
  }, [id]);

  return (
    <>
      <Link to="/orders" className="text-sm muted">← Back to orders</Link>
      {error && <p role="alert" className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
      {!order && !error ? <Loader /> : order && (
        <div className="panel mt-5 p-6">
          <h1 className="text-2xl font-bold">Order #{order.id}</h1>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div><p className="muted">Customer</p><b>{order.customer}</b></div>
            <div><p className="muted">Total</p><b>{money(order.total)}</b></div>
            <div><p className="muted">Status</p><Badge>{order.status}</Badge></div>
          </div>
          <h2 className="mt-8 font-semibold">Order timeline</h2>
          <div className="mt-4 space-y-3">
            {timeline.map((event, index) => (
              <div key={`${event.status}-${event.at || index}`} className="flex gap-3">
                <span className="mt-1 h-3 w-3 rounded-full bg-blue-400" />
                <div>
                  <p className="capitalize">{event.status}</p>
                  {event.note && <p className="text-sm muted">{event.note}</p>}
                  {event.at && <p className="text-xs muted">{new Date(event.at).toLocaleString('en-IN')}</p>}
                </div>
              </div>
            ))}
            {!timeline.length && <p className="text-sm muted">No timeline events are available.</p>}
          </div>
        </div>
      )}
    </>
  );
}
