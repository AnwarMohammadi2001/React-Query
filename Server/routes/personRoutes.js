import express from "express";
import {
  createPerson,
  getPerson,
  getAllPersons,
} from "../controllers/personController.js";

const router = express.Router();

router.post("/", createPerson);
router.get("/:id", getPerson);
router.get("/", getAllPersons);

export default router;
