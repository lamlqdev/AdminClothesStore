import {
  getDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

export async function fetchUsers({ searchTerm }) {
  console.log(searchTerm);
  try {
    const usersCollection = collection(db, "users");
    const querySnapshot = await getDocs(usersCollection);
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (searchTerm) {
      const normalizedSearchTerm = searchTerm.trim().toLowerCase();
      return users.filter((user) =>
        user.name.toLowerCase().includes(normalizedSearchTerm)
      );
    }

    return users;
  } catch (e) {
    const error = new Error("Failed to fetch users");
    error.message = e.message;
    throw error;
  }
}

export async function fetchUserProfile({ userId }) {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (!userDoc.exists()) {
      throw new Error("User not found");
    }
    const user = { id: userDoc.id, ...userDoc.data() };

    const ordersQuery = query(
      collection(db, "Orders"),
      where("userId", "==", userId)
    );
    const ordersSnapshot = await getDocs(ordersQuery);
    const orders = ordersSnapshot.docs.map((doc) => ({
      orderId: doc.id,
      ...doc.data(),
    }));

    return { user, orders };
  } catch (e) {
    const error = new Error("Failed to fetch user profile");
    error.message = e.message;
    throw error;
  }
}
