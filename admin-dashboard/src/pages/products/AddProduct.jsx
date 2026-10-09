import { useNavigate } from "react-router-dom";

import ProductForm from "../../components/products/ProductForm";
import { createProduct } from "../../services/productApi";

// Add product page
export default function AddProduct() {
  const n = useNavigate();

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">
        Add Product
      </h1>

      <ProductForm
        onSubmit={(p) =>
          createProduct(p).then(() =>
            n("/products")
          )
        }
      />
    </>
  );
}