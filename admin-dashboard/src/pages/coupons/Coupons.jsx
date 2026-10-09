import { useEffect, useState } from 'react';
import Badge from '../../components/common/Badge';
import Loader from '../../components/common/Loader';
import { money } from '../../utils/formatCurrency';
import { createCoupon, getCoupons } from '../../services/couponApi';

export default function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getCoupons()
      .then(setCoupons)
      .catch((loadError) => setError(loadError.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleCreate() {
    setCreating(true);
    setError('');
    try {
      const coupon = await createCoupon({ code: `SHOP${Date.now().toString().slice(-6)}`, type: 'Percentage', value: 15, min: 40 });
      setCoupons((current) => [coupon, ...current]);
    } catch (createError) {
      setError(createError.message);
    } finally {
      setCreating(false);
    }
  }

  return (
    <>
      <div className="mb-6 flex justify-between">
        <div><h1 className="text-3xl font-bold">Coupons</h1><p className="muted">Create and manage promotional offers.</p></div>
        <button className="btn btn-primary" onClick={handleCreate} disabled={creating}>
          {creating ? 'Creating…' : 'Create Coupon'}
        </button>
      </div>
      {error && <p role="alert" className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
      <div className="panel table-wrap">
        {loading ? <Loader /> : (
          <table className="data-table">
            <thead><tr><th>Code</th><th>Type</th><th>Value</th><th>Minimum</th><th>Expiry</th><th>Status</th></tr></thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon.id}>
                  <td className="font-mono text-violet-300">{coupon.code}</td>
                  <td>{coupon.type}</td>
                  <td>{coupon.type === 'Percentage' ? `${coupon.value}%` : money(coupon.value)}</td>
                  <td>{money(coupon.min)}</td>
                  <td>{coupon.expiry}</td>
                  <td><Badge>{coupon.status}</Badge></td>
                </tr>
              ))}
              {!coupons.length && <tr><td colSpan="6" className="text-center muted">No coupons found.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
