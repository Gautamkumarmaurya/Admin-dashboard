import { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import Loader from '../common/Loader';
import { getCategoryAnalytics } from '../../services/dashboardApi';

const colors = ['#60a5fa', '#8b5cf6', '#2dd4bf', '#fbbf24', '#f472b6', '#94a3b8'];

export default function SalesChart({ range = '30d' }) {
  const [categorySales, setCategorySales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getCategoryAnalytics(range)
      .then((rows) => setCategorySales(rows.map((row) => ({ name: row.category, value: row.sales }))))
      .catch((loadError) => setError(loadError.message))
      .finally(() => setLoading(false));
  }, [range]);

  return (
    <div className="panel p-5">
      <h3 className="font-semibold text-slate-100">Sales by category</h3>
      {loading ? <Loader /> : error ? <p role="alert" className="mt-5 text-sm text-red-300">{error}</p> : categorySales.length === 0 ? (
        <p className="mt-5 text-sm muted">No category sales data available.</p>
      ) : (
        <div className="grid items-center gap-3 sm:grid-cols-2">
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={categorySales} dataKey="value" innerRadius={55} outerRadius={82} paddingAngle={1}>
                  {categorySales.map((row, index) => <Cell key={row.name} fill={colors[index % colors.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#111c2f', border: '1px solid #334155', borderRadius: 10 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 text-xs">
            {categorySales.map((row, index) => (
              <div key={row.name} className="flex justify-between gap-2">
                <span className="truncate"><i className="mr-2 inline-block h-2 w-2 rounded-sm" style={{ background: colors[index % colors.length] }} />{row.name}</span>
                <b>{row.value.toLocaleString('en-IN')}</b>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}