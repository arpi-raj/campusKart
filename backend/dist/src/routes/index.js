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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const cors_1 = __importDefault(require("cors"));
const user_1 = require("../database/user");
const Port = 3000;
const app = (0, express_1.default)();
const router = (0, express_2.Router)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", router);
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});
router.post("/createUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone } = req.body;
    console.log("User data received:", req.body);
    // Validate the request body
    if (!name || !email || !phone || !phone.trim()) {
        res.status(400).send({ message: "All fields are required" });
    }
    try {
        const userId = yield (0, user_1.createUser)({ name, email, phone });
        res.status(200).send({ message: "User created successfully", id: userId });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send({ message: "Error creating user" });
    }
}));
router.put("/updateUser/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updates = req.body;
    if (!id) {
        res.status(400).send({ message: "User ID is required" });
    }
    try {
        yield (0, user_1.updateUser)(id, updates);
        res.status(200).send({ message: "User updated successfully" });
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send({ message: "Error updating user" });
    }
}));
