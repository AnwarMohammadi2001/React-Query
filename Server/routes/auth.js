import express from "express";
import { register, login } from "../controllers/authController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Register with image upload
router.post("/register", upload.single("image"), register);

// Login
router.post("/login", login);

export default router;
