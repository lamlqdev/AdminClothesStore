import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

import Breadcrumb from "../components/Breadcrump";
import CategoryTable from "../components/Table/CategoryTable";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorBlock from "../components/UI/ErrorBlock";
import { fetchCategories } from "../api/categoryAPI";

export default function CategoryPage() {
  const {
    data: categories,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    refetchOnWindowFocus: true,
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occured!"
        message={error.message || "Could not fetch categories"}
      />
    );
  }

  if (categories) {
    content = <CategoryTable categories={categories} />;
  }

  return (
    <>
      <Outlet />
      <Breadcrumb pageName="Category" />
      {content}
    </>
  );
}
