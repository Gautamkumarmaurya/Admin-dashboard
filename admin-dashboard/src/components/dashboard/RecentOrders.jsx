import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../common/Badge';
import Loader from '../common/Loader';
import { money } from '../../utils/formatCurrency';
import { getOrders } from '../../services/orderApi';

export default function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getOrders({ limit: '5' })
      .then(setOrders)
      .catch((loadError) => setError(loadError.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="panel p-5">
      <div className="mb-3 flex justify-between">
        <h3 className="font-semibold">Recent Orders</h3>
        <Link to="/orders" className="text-xs text-blue-300">View all</Link>
      </div>
      {loading ? <Loader /> : error ? <p role="alert" className="text-sm text-red-300">{error}</p> : (
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td><td>{order.customer}</td><td>{money(order.total)}</td>
                  <td><Badge>{order.status}</Badge></td>
                </tr>
              ))}
              {orders.length === 0 && <tr><td colSpan="4" className="text-center muted">No orders found.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}