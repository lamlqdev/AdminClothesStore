import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Breadcrumb from "../components/Breadcrump";
import ProductTable from "../components/Table/ProductTable";
import { useLoaderData } from "react-router-dom";

export default function ECommercePage() {
  const { products, categories } = useLoaderData();
  return (
    <>
      <Breadcrumb pageName="E-Commerce" />
      <ProductTable products={products} categories={categories} />
    </>
  );
}

export async function loader() {
  const productsSnapshot = await getDocs(collection(db, "Products"));
  const products = productsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const categoriesSnapshot = await getDocs(collection(db, "Categories"));
  const categories = categoriesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return { products, categories };
}
