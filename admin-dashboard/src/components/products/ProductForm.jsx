import { useEffect, useState } from 'react';
import { getCategories } from '../../services/categoryApi';
import { validateProductImageSize } from '../../constants/productImage';

const fields = [
  ['name', 'Product Name', 'text'],
  ['brand', 'Brand', 'text'],
  ['sku', 'SKU', 'text'],
  ['price', 'Price (₹)', 'number'],
  ['discount', 'Discount %', 'number'],
  ['stock', 'Stock', 'number'],
  ['rating', 'Rating', 'number'],
];

export default function ProductForm({ initial = {}, onSubmit, label = 'Save Product' }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    brand: '',
    sku: '',
    price: '',
    discount: 0,
    stock: '',
    status: 'Active',
    rating: 4.5,
    ...initial,
  });
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [invalidImage, setInvalidImage] = useState(false);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((loadError) => setError(loadError.message))
      .finally(() => setLoadingCategories(false));
  }, []);

  function updateField(event) {
    const { name, value, files } = event.target;
    if (name === 'thumbnail' && files?.[0]) {
      const imageError = validateProductImageSize(files[0]);
      if (imageError) {
        event.target.value = '';
        setForm((current) => ({ ...current, thumbnail: initial.thumbnail || '' }));
        setInvalidImage(true);
        setError(imageError);
        return;
      }
      setInvalidImage(false);
      setError('');
    }
    setForm((current) => ({ ...current, [name]: files ? files[0] : value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (invalidImage) return;
    setSaving(true);
    setError('');
    try {
      await onSubmit({
        ...form,
        price: Number(form.price),
        discount: Number(form.discount || 0),
        stock: Number(form.stock),
        rating: Number(form.rating),
      });
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="panel max-w-4xl p-6">
      {error && <p role="alert" className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map(([name, title, type]) => (
          <label key={name}>
            <span className="mb-1.5 block text-sm muted">{title} *</span>
            <input
              required
              min={type === 'number' ? 0 : undefined}
              step={name === 'rating' ? '0.1' : type === 'number' ? 'any' : undefined}
              name={name}
              type={type}
              value={form[name]}
              onChange={updateField}
              className="field"
            />
          </label>
        ))}
        <label>
          <span className="mb-1.5 block text-sm muted">Category *</span>
          <select name="category" value={form.category} onChange={updateField} className="field" required disabled={loadingCategories}>
            <option value="">Select a category</option>
            {categories.map((category) => <option key={category.id} value={category.name}>{category.name}</option>)}
          </select>
        </label>
        <label>
          <span className="mb-1.5 block text-sm muted">Status</span>
          <select name="status" value={form.status} onChange={updateField} className="field">
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>
        <label className="md:col-span-2">
          <span className="mb-1.5 block text-sm muted">Description</span>
          <textarea name="description" value={form.description} onChange={updateField} className="field min-h-28" />
        </label>
        <label className="md:col-span-2">
          <span className="mb-1.5 block text-sm muted">Product image</span>
          <input type="file" name="thumbnail" accept="image/*" onChange={updateField} className="field" />
          <span className="mt-1.5 block text-xs text-slate-500">Image must be between 50 KB and 60 KB.</span>
        </label>
      </div>
      <button className="btn btn-primary mt-6" disabled={saving || loadingCategories || invalidImage}>
        {saving ? 'Saving…' : label}
      </button>
    </form>
  );
}
