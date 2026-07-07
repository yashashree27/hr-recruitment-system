import express from "express";
import { scheduleInterview, completeInterview, getAllInterviews, getInterviewById} from "../controllers/interviewController.js";
import { protect} from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// schedule interview
router.post("/", protect, authorizeRoles("HR"), scheduleInterview);
//mark complete
router.post("/complete", protect, authorizeRoles("HR"), completeInterview);
router.get("/", protect, getAllInterviews);
router.get("/:id", getInterviewById);



export default router;