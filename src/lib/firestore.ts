import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { MenuItem } from "./types";

const COLLECTION = "menuItems";

export async function getMenuItems(): Promise<MenuItem[]> {
  const snap = await getDocs(collection(db, COLLECTION));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as MenuItem));
}

export async function addMenuItem(item: Omit<MenuItem, "id">): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...item,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateMenuItem(id: string, item: Partial<MenuItem>): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), { ...item, updatedAt: serverTimestamp() });
}

export async function deleteMenuItem(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}
