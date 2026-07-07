import express from "express";
import upload from "../config/multer.js";
import {
  createCandidate,
  getAllCandidates,
  getCandidateById,
  submitCandidateForm,
} from "../controllers/candidateController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// HR ONLY
router.post("/", protect, upload.single("resume"), createCandidate);
router.get("/", protect, getAllCandidates);
router.get("/:id", protect, getCandidateById);


router.post("/submit/:token", submitCandidateForm);

export default router;