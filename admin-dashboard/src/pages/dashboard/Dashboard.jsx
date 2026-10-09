import { useEffect, useState } from 'react';
import { IndianRupee, Package, ShoppingBag, Users } from 'lucide-react';
import StatCard from '../../components/dashboard/StatCard';
import RevenueChart from '../../components/dashboard/RevenueChart';
import SalesChart from '../../components/dashboard/SalesChart';
import OrderChart from '../../components/dashboard/OrderChart';
import RecentOrders from '../../components/dashboard/RecentOrders';
import TopProducts from '../../components/dashboard/TopProducts';
import LowStockAlert from '../../components/dashboard/LowStockAlert';
import RecentActivity from '../../components/dashboard/RecentActivity';
import { money } from '../../utils/formatCurrency';
import { getDashboardOverview } from '../../services/dashboardApi';

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [summaryError, setSummaryError] = useState('');

  useEffect(() => {
    getDashboardOverview()
      .then(setSummary)
      .catch((error) => setSummaryError(error.message));
  }, []);

  const growth = summary?.growth || {};

  return (
    <div className="dashboard-page">
      <div className="dashboard-hero mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-blue-400/10 px-5 py-5 sm:px-6">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">Store overview</p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-50 md:text-3xl">Good morning, Admin</h1>
          <p className="mt-1.5 text-sm text-slate-400">Here’s what’s happening with your store today.</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-slate-950/30 px-3.5 py-2 text-xs font-medium text-cyan-100 shadow-inner shadow-white/[0.02]">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.8)]" />
          Performance snapshot
        </span>
      </div>
      {summaryError && <p role="alert" className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">{summaryError}</p>}
      <div className="dashboard-stats grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Revenue" value={summary ? money(summary.revenue) : '—'} change={growth.revenue ? `${growth.revenue}%` : '—'} icon={IndianRupee} color="blue" />
        <StatCard title="Total Orders" value={summary?.orders?.toLocaleString('en-IN') ?? '—'} change={growth.orders ? `${growth.orders}%` : '—'} icon={ShoppingBag} color="violet" />
        <StatCard title="Customers" value={summary?.customers?.toLocaleString('en-IN') ?? '—'} change={growth.customers ? `${growth.customers}%` : '—'} icon={Users} color="teal" />
        <StatCard title="Products" value={summary?.products?.toLocaleString('en-IN') ?? '—'} change={growth.products ? `${growth.products}%` : '—'} icon={Package} color="amber" />
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
        <RevenueChart />
        <SalesChart />
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[.8fr_1.2fr]">
        <OrderChart />
        <RecentOrders />
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <LowStockAlert />
        <RecentActivity />
        <TopProducts />
      </div>
    </div>
  );
}