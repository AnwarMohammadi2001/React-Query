import express from "express";
import { getAllUsers, getCurrentUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware/auth.js";



const router = express.Router();

router.get("/me", verifyToken, getCurrentUser);
router.get("/", verifyToken, getAllUsers);


export default router;
