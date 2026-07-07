import express from "express";
import { generateOfferAndNDA } from "../controllers/offerController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("HR"), generateOfferAndNDA);
export default router;