"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createItem = createItem;
exports.updateItem = updateItem;
const database_1 = require("./database");
const firestore_1 = require("firebase/firestore");
const db = (0, firestore_1.getFirestore)(database_1.firebase);
function createItem(item) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Generate a unique ID for the item
            const itemRef = (0, firestore_1.doc)((0, firestore_1.collection)(db, "items")); // Firestore auto-generates ID
            const itemId = itemRef.id;
            yield (0, firestore_1.setDoc)(itemRef, Object.assign({}, item));
            console.log("Item created with ID:", itemId);
            return itemId;
        }
        catch (error) {
            console.error("Error creating item:", error);
        }
    });
}
function updateItem(id, updates) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const itemRef = (0, firestore_1.doc)(db, "items", id);
            // Only update the provided fields
            yield (0, firestore_1.updateDoc)(itemRef, updates);
            console.log("Item updated with ID:", id);
        }
        catch (error) {
            console.error("Error updating item:", error);
        }
    });
}
