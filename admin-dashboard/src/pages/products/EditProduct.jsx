import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from '../../components/products/ProductForm';
import Loader from '../../components/common/Loader';
import { getProductById, updateProduct } from '../../services/productApi';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getProductById(id)
      .then((result) => {
        if (active) setProduct(result);
      })
      .catch((loadError) => {
        if (active) setError(loadError.message);
      });
    return () => {
      active = false;
    };
  }, [id]);

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Edit Product</h1>
      {error && <p role="alert" className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
      {!product && !error ? <Loader /> : product && (
        <ProductForm
          initial={product}
          label="Update Product"
          onSubmit={async (payload) => {
            await updateProduct(id, payload);
            navigate('/products');
          }}
        />
      )}
    </>
  );
}
