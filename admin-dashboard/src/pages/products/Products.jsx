import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil, Trash2, X } from 'lucide-react';
import { getProducts, deleteProduct } from '../../services/productApi';
import { getCategories } from '../../services/categoryApi';
import SearchInput from '../../components/common/SearchInput';
import Badge from '../../components/common/Badge';
import Loader from '../../components/common/Loader';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { money } from '../../utils/formatCurrency';

export default function Products() {
  const [data, setData] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [query, setQuery] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category') || '';

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [products, categories] = await Promise.all([
        getProducts(categoryId ? { category: categoryId } : {}),
        categoryId ? getCategories() : Promise.resolve([]),
      ]);
      setData(products);
      setCategoryName(categories.find((category) => category.id === categoryId)?.name || '');
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    load();
  }, [load]);

  const rows = useMemo(
    () => data.filter((product) => product.name.toLowerCase().includes(query.toLowerCase())),
    [data, query],
  );

  async function confirmDelete() {
    try {
      await deleteProduct(deleteId);
      setDeleteId(null);
      await load();
    } catch (deleteError) {
      setError(deleteError.message);
      setDeleteId(null);
    }
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {categoryId && <Link to="/categories" className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium text-violet-300 hover:text-violet-200"><ArrowLeft size={14} />All categories</Link>}
          <h1 className="text-3xl font-bold">{categoryName || 'Products'}</h1>
          <p className="muted">{categoryId ? `Products in the ${categoryName || 'selected'} category.` : 'Manage your product catalog and inventory.'}</p>
        </div>
        <Link className="btn btn-primary" to="/products/add"><Plus size={16} />Add Product</Link>
      </div>
      <div className="panel p-4">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="max-w-sm flex-1"><SearchInput value={query} onChange={setQuery} placeholder="Search products..." /></div>
          {categoryId && (
            <Link to="/products" className="inline-flex items-center gap-1.5 rounded-lg border border-violet-400/20 bg-violet-400/10 px-3 py-2 text-xs font-medium text-violet-200 hover:bg-violet-400/15">
              {categoryName || 'Selected category'} <X size={14} />
            </Link>
          )}
          {!loading && <span className="ml-auto text-xs text-slate-400">{rows.length} {rows.length === 1 ? 'product' : 'products'}</span>}
        </div>
        {error && <p role="alert" className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
        {loading ? <Loader /> : (
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>Product</th><th>SKU</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Rating</th><th>Actions</th></tr></thead>
              <tbody>
                {rows.map((product) => (
                  <tr key={product.id}>
                    <td className="font-medium">{product.name}</td><td>{product.sku}</td><td>{product.category}</td>
                    <td>{money(product.price)}</td><td>{product.stock}</td><td><Badge>{product.status}</Badge></td>
                    <td>★ {product.rating}</td>
                    <td>
                      <div className="flex gap-2">
                        <Link aria-label={`Edit ${product.name}`} to={`/products/edit/${product.id}`}><Pencil size={16} /></Link>
                        <button aria-label={`Delete ${product.name}`} onClick={() => setDeleteId(product.id)} className="text-red-400"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!rows.length && <tr><td colSpan="8" className="text-center muted">{categoryId ? `No products found in ${categoryName || 'this category'}.` : 'No products found.'}</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={confirmDelete} />
    </>
  );
}
