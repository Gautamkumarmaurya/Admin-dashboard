import { request } from './apiClient';

function normalizeCoupon(coupon) {
  return {
    ...coupon,
    id: coupon._id || coupon.id,
    type: coupon.discountType === 'percentage' ? 'Percentage' : 'Fixed',
    value: coupon.discountValue,
    min: coupon.minimumOrder || 0,
    expiry: coupon.expiresAt ? new Date(coupon.expiresAt).toLocaleDateString('en-IN') : 'No expiry',
    status: coupon.isActive ? 'Active' : 'Inactive',
  };
}

export async function getCoupons() {
  const response = await request('/coupons');
  return response.data.map(normalizeCoupon);
}

export async function createCoupon(coupon) {
  const response = await request('/coupons', {
    method: 'POST',
    body: {
      code: coupon.code,
      discountType: coupon.type.toLowerCase(),
      discountValue: Number(coupon.value),
      minimumOrder: Number(coupon.min || 0),
    },
  });
  return normalizeCoupon(response.data);
}
