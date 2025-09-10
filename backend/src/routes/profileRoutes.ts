import { Router } from "express";
import { createOrUpdateProfile, getProfile } from "../controllers/profileController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
router.post("/", authMiddleware, createOrUpdateProfile);
router.get("/", authMiddleware, getProfile);

export default router;
