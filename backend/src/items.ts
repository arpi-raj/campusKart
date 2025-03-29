import { firebase } from "./database";
import { getFirestore, collection, doc, setDoc, updateDoc } from "firebase/firestore";

const db = getFirestore(firebase);

// Define the Item interface
export interface Item {
  name: string;
  description: string;
  price: number;
  images: string[]; // Array of image URLs
  category: string; // Category for the item
}

export async function createItem(item: Item): Promise<string | void> {
  try {
    // Generate a unique ID for the item
    const itemRef = doc(collection(db, "items")); // Firestore auto-generates ID
    const itemId = itemRef.id;

    await setDoc(itemRef, { ...item });

    console.log("Item created with ID:", itemId);
    return itemId;
  } catch (error) {
    console.error("Error creating item:", error);
  }
}

export async function updateItem(id: string, updates: Partial<Item>): Promise<void> {
  try {
    const itemRef = doc(db, "items", id);

    // Only update the provided fields
    await updateDoc(itemRef, updates);

    console.log("Item updated with ID:", id);
  } catch (error) {
    console.error("Error updating item:", error);
  }
}
