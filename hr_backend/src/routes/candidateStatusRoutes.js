import express from "express";
import { markAsHired, markAsRejected } from "../controllers/candidateStatusController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/hire", protect, authorizeRoles("HR"), markAsHired);
router.post("/reject", protect, authorizeRoles("HR"), markAsRejected);
export default router;