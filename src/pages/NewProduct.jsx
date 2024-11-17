import { useNavigate, Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorBlock from "../components/UI/ErrorBlock";
import { createProduct } from "../api/productAPI";
import { fetchCategories } from "../api/categoryAPI";
import { queryClient } from "../api/client";
import ProductForm from "../components/Form/ProductForm";

export default function NewProductPage() {
  const navigate = useNavigate();

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
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/ecommerce");
    },
  });

  const handleSubmit = (productData) => {
    mutate(productData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Add Product</h1>
      {isError && (
        <ErrorBlock
          title="Failed to create product"
          message={error.message || "Please check and try again."}
        />
      )}
      {isPendingCategories && <LoadingIndicator />}
      {isErrorCategories && (
        <ErrorBlock
          title="Failed to load categories"
          message={categoriesError.message || "Please check and try again."}
        />
      )}
      {categories && (
        <ProductForm categories={categories} onSubmit={handleSubmit}>
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
                Add
              </button>
            </div>
          )}
        </ProductForm>
      )}
    </div>
  );
}
