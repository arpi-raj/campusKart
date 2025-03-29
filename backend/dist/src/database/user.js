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
exports.createUser = createUser;
exports.updateUser = updateUser;
const database_1 = require("./database");
const firestore_1 = require("firebase/firestore");
const uuid_1 = require("uuid"); // Import UUID for generating unique IDs
const db = (0, firestore_1.getFirestore)(database_1.firebase);
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = (0, uuid_1.v4)(); // Generate a unique ID
            const userRef = (0, firestore_1.doc)(db, "users", userId);
            yield (0, firestore_1.setDoc)(userRef, Object.assign(Object.assign({}, user), { id: userId })); // Store user with generated ID
            console.log("User created with ID:", userId);
            return userId;
        }
        catch (error) {
            console.error("Error creating user:", error);
        }
    });
}
function updateUser(id, updates) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (Object.keys(updates).length === 0) {
                console.log("No fields provided for update.");
                return;
            }
            const userRef = (0, firestore_1.doc)(db, "users", id);
            yield (0, firestore_1.updateDoc)(userRef, updates);
            console.log("User updated with ID:", id);
        }
        catch (error) {
            console.error("Error updating user:", error);
        }
    });
}
