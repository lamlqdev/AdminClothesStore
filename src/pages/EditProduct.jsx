import { useNavigate, useParams } from "react-router-dom";
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
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
          >
            Edit Product
          </button>
        )}
      </ProductForm>
    </div>
  );
}
