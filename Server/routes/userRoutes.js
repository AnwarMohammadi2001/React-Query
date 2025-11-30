import express from "express";
import { getCurrentUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// GET /api/users/me
router.get("/me", verifyToken, getCurrentUser);

export default router;
