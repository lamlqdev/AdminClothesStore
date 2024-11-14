import {
  doc,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";

import { db } from "../firebase";

export async function fetchCategories() {
  try {
    const querySnapshot = await getDocs(collection(db, "Categories"));
    const categories = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return categories;
  } catch (e) {
    const error = new Error("Failed to fetch categories");
    error.message = e.message;
    throw error;
  }
}

export async function fetchCategory({ id }) {
  try {
    const docRef = doc(db, "Categories", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      throw new Error("Category not found");
    }
  } catch (e) {
    const error = new Error("Failed to fetch category");
    error.message = e.message;
    throw error;
  }
}

export async function createCategory({ newCategory }) {
  try {
    const docRef = await addDoc(collection(db, "Categories"), newCategory);
    return {
      id: docRef.id,
      ...newCategory,
    };
  } catch (e) {
    const error = new Error("Failed to create category");
    error.message = e.message;
    throw error;
  }
}

export async function updateCategory({ id, data }) {
  try {
    const docRef = doc(db, "Categories", id);
    await updateDoc(docRef, data);
    return {
      id,
      ...data,
    };
  } catch (e) {
    const error = new Error("Failed to update category");
    error.message = e.message;
    throw error;
  }
}

export async function updateCategoryVisibility({ id, isVisible }) {
  console.log(id);
  try {
    const docRef = doc(db, "Categories", id);
    await updateDoc(docRef, { isVisible });
  } catch (error) {
    throw new Error("Failed to update category visibility");
  }
}
