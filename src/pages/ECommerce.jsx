import { useQuery } from "@tanstack/react-query";

import Breadcrumb from "../components/Breadcrump";
import ProductTable from "../components/Table/ProductTable";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorBlock from "../components/UI/ErrorBlock";
import { fetchProducts } from "../api/productAPI";
import { fetchCategories } from "../api/categoryAPI";

export default function ECommercePage() {
  const {
    data: products,
    isPending: isPendingProducts,
    isError: isErrorProducts,
    error: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
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

  let content;

  if (isPendingProducts || isPendingCategories) {
    content = <LoadingIndicator />;
  }

  if (isErrorProducts || isErrorCategories) {
    content = (
      <ErrorBlock
        title="An error occured!"
        message={
          productsError.message ||
          categoriesError.message ||
          "Could not fetch products"
        }
      />
    );
  }

  if (products && categories) {
    content = <ProductTable products={products} categories={categories} />;
  }

  return (
    <>
      <Breadcrumb pageName="E-Commerce" />
      {content}
    </>
  );
}
