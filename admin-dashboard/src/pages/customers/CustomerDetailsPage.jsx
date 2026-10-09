import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loader from '../../components/common/Loader';
import Badge from '../../components/common/Badge';
import { money } from '../../utils/formatCurrency';
import { getCustomerById, getCustomerStats } from '../../services/customerApi';

export default function CustomerDetailsPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    Promise.all([getCustomerById(id), getCustomerStats(id)])
      .then(([customerData, customerStats]) => {
        if (!active) return;
        setCustomer(customerData);
        setStats(customerStats);
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
      <Link to="/customers" className="text-sm muted">← Back</Link>
      {error && <p role="alert" className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
      {!customer && !error ? <Loader /> : customer && (
        <div className="panel mt-5 p-6">
          <h1 className="text-2xl font-bold">{customer.name}</h1>
          <p className="muted">{customer.email} · {customer.phone || 'No phone number'}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div><b className="text-2xl">{stats?.totalOrders ?? '—'}</b><p className="muted">Orders</p></div>
            <div><b className="text-2xl">{stats ? money(stats.totalSpent) : '—'}</b><p className="muted">Total spent</p></div>
            <div><Badge>{customer.isActive ? 'Active' : 'Inactive'}</Badge><p className="mt-2 muted">Status</p></div>
          </div>
        </div>
      )}
    </>
  );
}
