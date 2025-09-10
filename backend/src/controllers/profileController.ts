import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { User } from "../models/User";

export const createOrUpdateProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { name, phone, education, employment } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.education = education || user.education;
    user.employment = employment || user.employment;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
