import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import React from "react";

import { firestore } from "../firebase.config";

// Saving new Item
export const saveItem = async (data) => {
  await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
};

// getall food items
export const getAllFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"), orderBy("id", "desc")),
  );

  return items.docs.map((doc) => doc.data());
};

export const saveOrder = async (orderData) => {
  await addDoc(collection(firestore, "orders"), {
    ...orderData,
    createdAt: serverTimestamp(),
  });
};

export const getUserOrders = async (userId) => {
  const snap = await getDocs(
    query(collection(firestore, "orders"), where("userId", "==", userId)),
  );
  return snap.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .sort((a, b) => {
      const aMs = a.createdAt?.toMillis?.() || 0;
      const bMs = b.createdAt?.toMillis?.() || 0;
      return bMs - aMs;
    });
};
