export const MIN_PRODUCT_IMAGE_SIZE = 50 * 1024;
export const MAX_PRODUCT_IMAGE_SIZE = 60 * 1024;

export function validateProductImageSize(file) {
  if (!file) return '';
  if (file.size < MIN_PRODUCT_IMAGE_SIZE) return 'Product image must be at least 50 KB.';
  if (file.size > MAX_PRODUCT_IMAGE_SIZE) return 'Product image must be no larger than 60 KB.';
  return '';
}
