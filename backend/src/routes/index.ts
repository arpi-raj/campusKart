import express from "express";
import { Router } from "express";
import cors from "cors";
import { createUser, updateUser } from "../database/user";

const Port = 3000;
const app = express();
const router = Router();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});

router.post("/createUser", async (req, res) => {
  const { name, email, phone } = req.body;
  console.log("User data received:", req.body);

  // Validate the request body
  if (!name || !email || !phone || !phone.trim()) {
    res.status(400).send({ message: "All fields are required" });
  }

  try {
    const userId = await createUser({ name, email, phone });
    res.status(200).send({ message: "User created successfully", id: userId });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({ message: "Error creating user" });
  }
});

router.put("/updateUser/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!id) {
    res.status(400).send({ message: "User ID is required" });
  }

  try {
    await updateUser(id, updates);
    res.status(200).send({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send({ message: "Error updating user" });
  }
});
