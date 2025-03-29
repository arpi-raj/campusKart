import { firebase } from "./database";
import { getFirestore, DocumentReference, doc, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid"; // Import UUID for generating unique IDs

const db = getFirestore(firebase);

export interface User {
  name: string;
  email: string;
  phone?: string;
  profile?: string; // URL to the profile picture
  itemsUploaded?: DocumentReference[]; // Array of document references to items uploaded by the user
  itemsPurchased?: DocumentReference[]; // Array of document references to items purchased by the user
}

export async function createUser(user: User): Promise<string | void> {
  try {
    const userId = uuidv4(); // Generate a unique ID
    const userRef = doc(db, "users", userId);

    await setDoc(userRef, { ...user, id: userId }); // Store user with generated ID

    console.log("User created with ID:", userId);
    return userId;
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

export async function updateUser(
  id: string,
  updates: Partial<{
    name: string;
    email: string;
    phone: string;
    profile: string;
    itemsUploaded: DocumentReference[]; // Array of uploaded item references
    itemsPurchased: DocumentReference[]; // Array of purchased item references
  }>
): Promise<void> {
  try {
    if (Object.keys(updates).length === 0) {
      console.log("No fields provided for update.");
      return;
    }

    const userRef = doc(db, "users", id);
    await updateDoc(userRef, updates);

    console.log("User updated with ID:", id);
  } catch (error) {
    console.error("Error updating user:", error);
  }
}
