import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { Referral } from "../models/Referral";

// --- Create Referral ---
export const createReferral = async (req: AuthRequest, res: Response): Promise<void> => {
  const { title, company, description, status } = req.body;

  if (!title || !company || !description) {
    res.status(400).json({ message: "Title, company, and description are required" });
    return;
  }

  try {
    const referral = new Referral({
      userId: req.userId,
      title,
      company,
      description,
      status: status || "Pending",
    });

    await referral.save();
    res.status(201).json(referral);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// --- Get All Referrals (Public) ---
export const getAllReferrals = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const referrals = await Referral.find().populate("userId", "name email");
    res.json(referrals);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// --- Get Referrals of Logged-in User ---
export const getUserReferrals = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const referrals = await Referral.find({ userId: req.userId });
    res.json(referrals);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// --- Update Referral ---
export const updateReferral = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, company, description, status } = req.body;

  try {
    const referral = await Referral.findById(id);
    if (!referral) {
      res.status(404).json({ message: "Referral not found" });
      return;
    }

    if (referral.userId.toString() !== req.userId) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    referral.title = title || referral.title;
    referral.company = company || referral.company;
    referral.description = description || referral.description;
    referral.status = status || referral.status;

    await referral.save();
    res.json(referral);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// --- Delete Referral ---
export const deleteReferral = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const referral = await Referral.findById(id);
    if (!referral) {
      res.status(404).json({ message: "Referral not found" });
      return;
    }

    if (referral.userId.toString() !== req.userId) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    await referral.deleteOne();
    res.json({ message: "Referral deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
