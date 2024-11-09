import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Breadcrumb from "../components/Breadcrump";
import CategoryTable from "../components/Table/CategoryTable";
import { useLoaderData } from "react-router-dom";

export default function CategoryPage() {
  const categories = useLoaderData();
  return (
    <>
      <Breadcrumb pageName="Category" />
      <CategoryTable categories={categories} />
    </>
  );
}

export async function loader() {
  const querySnapshot = await getDocs(collection(db, "Categories"));

  const categories = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log(categories);
  return categories;
}
