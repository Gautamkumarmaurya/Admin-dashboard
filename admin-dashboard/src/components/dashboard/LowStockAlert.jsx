import { useEffect, useState } from 'react';
import Badge from '../common/Badge';
import Loader from '../common/Loader';
import { getLowStockProducts } from '../../services/productApi';

export default function LowStockAlert() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getLowStockProducts()
      .then(setProducts)
      .catch((loadError) => setError(loadError.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="panel min-w-0 p-5">
      <h3 className="font-semibold">Low Stock Products</h3>
      <div className="mt-4">
        <div className="flex items-center gap-3 px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          <span className="min-w-0 flex-1">Product</span>
          <span className="w-16 text-center">In stock</span>
          <span className="flex w-24 shrink-0 justify-end">Status</span>
        </div>
        {loading ? <Loader /> : error ? (
          <p role="alert" className="rounded-lg bg-red-500/10 p-3 text-sm text-red-300">{error}</p>
        ) : (
          <div className="space-y-2">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 rounded-xl border border-slate-700/30 bg-slate-800/35 px-3 py-3"
              >
                <span className="min-w-0 flex-1 truncate text-xs font-medium text-slate-200" title={product.name}>
                  {product.name}
                </span>
                <span className="w-16 shrink-0 text-center text-sm font-semibold tabular-nums text-slate-100">
                  {product.stock}
                  <span className="ml-1 text-[10px] font-normal text-slate-500">qty</span>
                </span>
                <span className="flex w-24 shrink-0 justify-end"><Badge>Low Stock</Badge></span>
              </div>
            ))}
            {products.length === 0 && (
              <p className="rounded-xl border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-4 text-center text-sm text-emerald-300">
                All products are adequately stocked.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
