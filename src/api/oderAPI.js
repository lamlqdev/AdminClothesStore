import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";

import { db } from "../firebase";

export async function fetchOrders() {
  try {
    const querySnapshot = await getDocs(collection(db, "Orders"));
    const orders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return orders;
  } catch (e) {
    const error = new Error("Failed to fetch orders");
    error.message = e.message;
    throw error;
  }
}
