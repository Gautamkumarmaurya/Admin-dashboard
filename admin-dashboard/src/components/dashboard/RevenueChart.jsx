import { useMemo, useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { IndianRupee } from 'lucide-react';
import Loader from '../common/Loader';
import { money } from '../../utils/formatCurrency';
import { getRevenueAnalytics } from '../../services/dashboardApi';

const rangeDays = { today: 1, '7d': 7, '30d': 30, '3m': 90, '6m': 180, '1y': 365 };
const rangeOptions = [
  { label: '7 days', value: '7d' },
  { label: '30 days', value: '30d' },
  { label: '3 months', value: '3m' },
  { label: '6 months', value: '6m' },
  { label: '1 year', value: '1y' },
];
const compactMoney = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  notation: 'compact',
  maximumFractionDigits: 1,
});

function fillMissingDates(rows, range) {
  const revenueByDate = new Map(rows.map((row) => [row.date, row.revenue]));
  const days = rangeDays[range] || 30;
  const today = new Date();
  const end = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());

  return Array.from({ length: days + 1 }, (_, index) => {
    const date = new Date(end - (days - index) * 24 * 60 * 60 * 1000);
    const dateKey = date.toISOString().slice(0, 10);

    return {
      date: dateKey,
      n: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', timeZone: 'UTC' }),
      v: revenueByDate.get(dateKey) ?? 0,
    };
  });
}

export default function RevenueChart({ range = '30d' }) {
  const [revenue, setRevenue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRange, setSelectedRange] = useState(range);

  useEffect(() => {
    setLoading(true);
    setError('');
    getRevenueAnalytics(selectedRange)
      .then((rows) => setRevenue(fillMissingDates(rows, selectedRange)))
      .catch((loadError) => setError(loadError.message))
      .finally(() => setLoading(false));
  }, [selectedRange]);

  const totalRevenue = useMemo(() => revenue.reduce((total, row) => total + row.v, 0), [revenue]);
  const averageRevenue = revenue.length ? Math.round(totalRevenue / revenue.length) : 0;

  return (
    <div className="panel overflow-hidden p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-300">
              <IndianRupee size={19} strokeWidth={2.2} />
            </span>
            <div>
              <h3 className="font-semibold tracking-tight text-slate-100">Revenue overview</h3>
              <p className="mt-0.5 text-xs muted">Track your store’s earnings over time</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-end gap-x-3 gap-y-1">
            <p className="text-3xl font-bold tracking-tight text-white">{loading ? '—' : money(totalRevenue)}</p>
            <span className="mb-1 text-xs font-medium text-slate-400">in selected period</span>
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 sm:items-end">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.07] px-2.5 py-1 text-[11px] font-medium text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Live data
          </span>
          <div className="flex flex-wrap gap-1 rounded-xl border border-slate-700/70 bg-slate-950/40 p-1" aria-label="Revenue date range">
            {rangeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setSelectedRange(option.value)}
                aria-pressed={selectedRange === option.value}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  selectedRange === option.value
                    ? 'bg-blue-500/20 text-blue-200 shadow-sm'
                    : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {!loading && !error && (
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-700/50 pt-4 text-xs">
          <p className="text-slate-400">Daily average <span className="ml-1.5 font-semibold text-slate-200">{money(averageRevenue)}</span></p>
          <p className="text-slate-400">Period <span className="ml-1.5 font-semibold text-slate-200">{rangeOptions.find((option) => option.value === selectedRange)?.label || 'Today'}</span></p>
        </div>
      )}
      {loading ? <Loader /> : error ? <p role="alert" className="mt-5 text-sm text-red-300">{error}</p> : (
        <div className="mt-4 h-64 min-w-0 sm:h-72" aria-label="Revenue trend chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenue} margin={{ top: 12, right: 8, left: 4, bottom: 0 }}>
              <defs>
                <linearGradient id="revenue-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity=".34" />
                  <stop offset="75%" stopColor="#3b82f6" stopOpacity=".08" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="rgba(148,163,184,.10)" strokeDasharray="4 6" />
              <XAxis
                dataKey="n"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#8291a7', fontSize: 11 }}
                tickMargin={12}
                minTickGap={24}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#8291a7', fontSize: 11 }}
                tickFormatter={(value) => compactMoney.format(value)}
                width={62}
              />
              <Tooltip
                cursor={{ stroke: 'rgba(148,163,184,.35)', strokeDasharray: '4 4' }}
                content={({ active, payload, label }) => active && payload?.length ? (
                  <div className="rounded-xl border border-slate-700 bg-slate-900/95 px-3.5 py-2.5 shadow-xl shadow-black/30">
                    <p className="text-xs text-slate-400">{label}</p>
                    <p className="mt-1 text-sm font-semibold text-sky-300">{money(payload[0].value)}</p>
                  </div>
                ) : null}
              />
              <Area
                type="monotone"
                dataKey="v"
                name="Revenue"
                stroke="#38bdf8"
                fill="url(#revenue-gradient)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: '#38bdf8', stroke: '#e0f2fe', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}