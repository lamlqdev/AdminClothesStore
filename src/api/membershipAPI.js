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

export async function fetchMemberships() {
  try {
    const querySnapshot = await getDocs(collection(db, "Membership"));
    const memberships = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return memberships;
  } catch (e) {
    const error = new Error("Failed to fetch memberships");
    error.message = e.message;
    throw error;
  }
}

export async function fetchMembership({ id }) {
  try {
    const docRef = doc(db, "Membership", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Membership not found");
    }
  } catch (e) {
    const error = new Error("Failed to fetch membership");
    error.message = e.message;
    throw error;
  }
}

export async function createMembership({ newMembership }) {
  try {
    const docRef = await addDoc(collection(db, "Membership"), newMembership);
    return {
      id: docRef.id,
      ...newMembership,
    };
  } catch (e) {
    const error = new Error("Failed to create membership");
    error.message = e.message;
    throw error;
  }
}

export async function updateMembership({ id, data }) {
  try {
    const docRef = doc(db, "Membership", id);
    await updateDoc(docRef, data);
    return {
      id,
      ...data,
    };
  } catch (e) {
    const error = new Error("Failed to update membership");
    error.message = e.message;
    throw error;
  }
}

export async function deleteMembership({ id }) {
  try {
    const docRef = doc(db, "Membership", id);
    await deleteDoc(docRef);
  } catch (e) {
    const error = new Error("Failed to delete membership");
    error.message = e.message;
    throw error;
  }
}
