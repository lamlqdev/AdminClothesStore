import {
  getDocs,
  getDoc,
  doc,
  collection,
  addDoc,
  updateDoc,
} from "firebase/firestore";
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

export async function fetchProduct({ id }) {
  try {
    const docRef = doc(db, "Products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      throw new Error("Product not found");
    }
  } catch (e) {
    const error = new Error("Failed to fetch category");
    error.message = e.message;
    throw error;
  }
}

export async function createProduct(newProduct) {
  try {
    const productRef = await addDoc(collection(db, "Products"), newProduct);
    return productRef.id;
  } catch (e) {
    const error = new Error("Failed to create product");
    error.message = e.message;
    throw error;
  }
}

export async function updateProduct({ id, data }) {
  try {
    const docRef = doc(db, "Products", id);
    await updateDoc(docRef, data);
    return {
      id,
      ...data,
    };
  } catch (e) {
    const error = new Error("Failed to update product");
    error.message = e.message;
    throw error;
  }
}
