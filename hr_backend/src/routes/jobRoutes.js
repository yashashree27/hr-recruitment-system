import express from "express";
import { createJob, getJobs } from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();


router.post("/", protect, authorizeRoles("HR"), createJob);
router.get("/", protect, authorizeRoles("HR"), getJobs);

export default router;