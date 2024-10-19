import Breadcrumb from "../components/Breadcrump";
import CategoryTable from "../components/Table/CategoryTable";
export default function CategoryPage() {
  return (
    <>
      <Breadcrumb pageName="Category" />
      <CategoryTable />
    </>
  );
}
