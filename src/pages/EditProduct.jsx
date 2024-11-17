import { useNavigate, useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorBlock from "../components/UI/ErrorBlock";
import { fetchCategories } from "../api/categoryAPI";
import { fetchProduct, updateProduct } from "../api/productAPI";
import { queryClient } from "../api/client";
import ProductForm from "../components/Form/ProductForm";

export default function EditProductPage() {
  const navigate = useNavigate();
  const params = useParams();

  const {
    data: product,
    isPending: isPendingProduct,
    isError: isErrorProduct,
    error: productError,
  } = useQuery({
    queryKey: ["products", { id: params.productId }],
    queryFn: () => fetchProduct({ id: params.productId }),
  });

  const {
    data: categories,
    isPending: isPendingCategories,
    isError: isErrorCategories,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/ecommerce");
    },
  });

  const handleSubmit = (productData) => {
    mutate({
      id: params.productId,
      data: productData,
    });
  };

  if (isPendingProduct) {
    return <LoadingIndicator />;
  }

  if (isPendingCategories) {
    return <LoadingIndicator />;
  }

  if (isErrorCategories) {
    return (
      <ErrorBlock
        title="An error occured!"
        message={categoriesError.message || "Could not fetch categories"}
      />
    );
  }

  if (isErrorProduct) {
    return (
      <ErrorBlock
        title="An error occured!"
        message={productError.message || "Could not fetch product"}
      />
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Edit Product</h1>
      {isError && (
        <ErrorBlock
          title="Failed to update product"
          message={error.message || "Please check and try again."}
        />
      )}
      <ProductForm
        product={product}
        categories={categories}
        onSubmit={handleSubmit}
      >
        {isPending && <LoadingIndicator />}
        {!isPending && (
          <div className="flex justify-between w-full">
            <Link
              to="/ecommerce"
              className="mr-2 w-full inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-4 text-md font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-4 text-md font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        )}
      </ProductForm>
    </div>
  );
}
