import { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import Loader from '../common/Loader';
import { getOrderAnalytics } from '../../services/dashboardApi';

export default function OrderChart({ range = '30d' }) {
  const [orderBars, setOrderBars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getOrderAnalytics(range)
      .then((rows) => setOrderBars(rows.map((row) => ({
        n: row.status[0].toUpperCase() + row.status.slice(1),
        v: row.count,
      }))))
      .catch((loadError) => setError(loadError.message))
      .finally(() => setLoading(false));
  }, [range]);

  return (
    <div className="panel p-5">
      <h3 className="font-semibold text-slate-100">Orders by status</h3>
      {loading ? <Loader /> : error ? <p role="alert" className="mt-4 text-sm text-red-300">{error}</p> : (
        <div className="mt-4 h-52">
          <ResponsiveContainer>
            <BarChart data={orderBars}>
              <CartesianGrid stroke="rgba(148,163,184,.09)" />
              <XAxis dataKey="n" stroke="#64748b" fontSize={10} />
              <YAxis stroke="#64748b" fontSize={10} />
              <Tooltip contentStyle={{ background: '#111c2f', border: '1px solid #334155', borderRadius: 10 }} />
              <Bar dataKey="v" fill="#2dd4bf" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
