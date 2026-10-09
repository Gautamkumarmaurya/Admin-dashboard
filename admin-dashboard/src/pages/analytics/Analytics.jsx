import { useEffect, useState } from 'react';
import RevenueChart from '../../components/dashboard/RevenueChart';
import SalesChart from '../../components/dashboard/SalesChart';
import OrderChart from '../../components/dashboard/OrderChart';
import Loader from '../../components/common/Loader';
import { getAnalyticsOverview, getConversionAnalytics } from '../../services/dashboardApi';
import { money } from '../../utils/formatCurrency';

const ranges = [
  ['7d', '7 days'],
  ['30d', '30 days'],
  ['3m', '3 months'],
  ['6m', '6 months'],
  ['1y', '1 year'],
];

export default function Analytics() {
  const [range, setRange] = useState('30d');
  const [overview, setOverview] = useState(null);
  const [conversion, setConversion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    Promise.all([getAnalyticsOverview(), getConversionAnalytics()])
      .then(([analyticsOverview, conversionData]) => {
        if (!active) return;
        setOverview(analyticsOverview);
        setConversion(conversionData);
      })
      .catch((loadError) => {
        if (active) setError(loadError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div><h1 className="text-3xl font-bold">Analytics</h1><p className="muted">Performance insights from your store data.</p></div>
        <select className="field w-auto" value={range} onChange={(event) => setRange(event.target.value)} aria-label="Analytics date range">
          {ranges.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </div>
      {error && <p role="alert" className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
      <div className="grid gap-4 xl:grid-cols-2">
        <RevenueChart range={range} />
        <SalesChart range={range} />
        <OrderChart range={range} />
        <div className="panel p-5">
          <h3 className="font-semibold">Store performance</h3>
          {loading ? <Loader /> : (
            <div className="mt-8 grid grid-cols-2 gap-4 text-center sm:grid-cols-3">
              <div><b className="text-xl">{overview ? money(overview.revenue) : '—'}</b><p className="text-xs muted">Revenue</p></div>
              <div><b className="text-xl">{overview?.orders?.toLocaleString('en-IN') ?? '—'}</b><p className="text-xs muted">Orders</p></div>
              <div><b className="text-xl">{overview?.customers?.toLocaleString('en-IN') ?? '—'}</b><p className="text-xs muted">Customers</p></div>
              <div><b className="text-xl">{conversion?.conversionRate ?? '—'}{conversion ? '%' : ''}</b><p className="text-xs muted">Conversion</p></div>
              <div><b className="text-xl">{overview?.products?.toLocaleString('en-IN') ?? '—'}</b><p className="text-xs muted">Products</p></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
