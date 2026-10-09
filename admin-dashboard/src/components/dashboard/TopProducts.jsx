import { useEffect, useState } from 'react';
import { money } from '../../utils/formatCurrency';
import { getTopProducts } from '../../services/dashboardApi';
import Loader from '../common/Loader';

export default function TopProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getTopProducts()
      .then(setProducts)
      .catch((loadError) => setError(loadError.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="panel p-5">
      <h3 className="font-semibold">Top Products</h3>
      {loading ? <Loader /> : error ? <p role="alert" className="mt-4 text-sm text-red-300">{error}</p> : (
        <div className="mt-4 space-y-3">
          {products.map((product, index) => (
            <div key={product.product} className="flex items-center gap-3 border-b border-white/5 pb-3">
              <span className="muted">{index + 1}</span>
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/5">📦</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{product.product}</p>
                <p className="text-xs muted">{money(product.revenue)}</p>
              </div>
              <span className="text-xs text-emerald-400">{product.sales.toLocaleString('en-IN')} sales</span>
            </div>
          ))}
          {!products.length && <p className="text-sm muted">No sales data available yet.</p>}
        </div>
      )}
    </div>
  );
}
