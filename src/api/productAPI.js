import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function fetchProducts() {
  try {
    const productsSnapshot = await getDocs(collection(db, "Products"));
    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (e) {
    const error = new Error("Failed to fetch products");
    error.message = e.message;
    throw error;
  }
}

export async function fetchProductById(productId) {
  try {
    const productDoc = await getDocs(collection(db, "Products", productId));
    return productDoc.data();
  } catch (e) {
    const error = new Error("Failed to fetch product");
    error.message = e.message;
    throw error;
  }
}

export async function createProduct(product) {
  try {
    const productRef = await addDoc(collection(db, "Products"), product);
    return productRef.id;
  } catch (e) {
    const error = new Error("Failed to create product");
    error.message = e.message;
    throw error;
  }
}
