import { Router } from "express";
import { createReferral, getAllReferrals, getUserReferrals, updateReferral, deleteReferral } from "../controllers/referralController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
router.post("/", authMiddleware, createReferral);
router.get("/", getAllReferrals); // public feed
router.get("/user", authMiddleware, getUserReferrals);
router.put("/:id", authMiddleware, updateReferral);
router.delete("/:id", authMiddleware, deleteReferral);

export default router;
