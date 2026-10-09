import { useEffect, useState } from 'react';
import { FolderKanban, Plus, X } from 'lucide-react';
import CategoryCard from '../../components/categories/CategoryCard';
import Loader from '../../components/common/Loader';
import { getCategories, createCategory } from '../../services/categoryApi';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((loadError) => setError(loadError.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      const category = await createCategory({ name, description });
      setCategories((current) => [...current, category].sort((left, right) => left.name.localeCompare(right.name)));
      setName('');
      setDescription('');
      setShowForm(false);
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  }

  const activeCategories = categories.filter((category) => (category.status || 'Active').toLowerCase() === 'active').length;

  return (
    <>
      <div className="category-hero mb-6 flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-violet-400/10 p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-violet-300/20 bg-violet-400/10 text-violet-200">
            <FolderKanban size={23} strokeWidth={1.8} />
          </span>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">Catalog management</p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">Categories</h1>
            <p className="mt-1 text-sm text-slate-400">Organize your products into clear collections.</p>
          </div>
        </div>
        <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
          <div className="flex min-w-32 items-center gap-3 rounded-xl border border-slate-700/60 bg-slate-950/25 px-3.5 py-2.5">
            <span className="text-xl font-bold tabular-nums text-white">{categories.length.toLocaleString('en-IN')}</span>
            <span className="text-xs leading-4 text-slate-400">Total<br />categories</span>
          </div>
          <button className="btn btn-primary flex-1 sm:flex-none" onClick={() => setShowForm((visible) => !visible)}>
            {showForm ? <X size={16} /> : <Plus size={16} />}
            {showForm ? 'Close form' : 'Add category'}
          </button>
        </div>
      </div>
      {error && <p role="alert" className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
      {showForm && (
        <form onSubmit={handleSubmit} className="panel category-form mb-5 grid gap-4 p-5 sm:grid-cols-[1fr_1.5fr_auto] sm:items-end">
          <label className="block text-xs font-medium text-slate-300">
            Category name
            <input className="field mt-2" placeholder="e.g. Electronics" value={name} onChange={(event) => setName(event.target.value)} required />
          </label>
          <label className="block text-xs font-medium text-slate-300">
            Description <span className="font-normal text-slate-500">(optional)</span>
            <input className="field mt-2" placeholder="What products belong here?" value={description} onChange={(event) => setDescription(event.target.value)} />
          </label>
          <button className="btn btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save category'}</button>
        </form>
      )}
      {!loading && categories.length > 0 && (
        <div className="mb-4 flex items-center justify-between px-1">
          <p className="text-sm font-medium text-slate-300">Your collections</p>
          <p className="text-xs text-slate-500">{activeCategories} active</p>
        </div>
      )}
      {loading ? <Loader /> : categories.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => (
            <CategoryCard category={category} index={index} key={category.id} />
          ))}
        </div>
      ) : (
        <div className="panel flex flex-col items-center px-6 py-14 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl border border-violet-400/20 bg-violet-400/10 text-violet-300">
            <FolderKanban size={25} />
          </span>
          <h2 className="mt-4 text-base font-semibold text-slate-100">No categories yet</h2>
          <p className="mt-1 max-w-sm text-sm text-slate-400">Create your first category to keep your product catalog organized.</p>
          <button className="btn btn-primary mt-5" onClick={() => setShowForm(true)}>
            <Plus size={16} /> Create category
          </button>
        </div>
      )}
    </>
  );
}
