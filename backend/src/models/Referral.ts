import { Schema, model, Document, Types } from "mongoose";

export interface IReferral extends Document {
  userId: Types.ObjectId;
  title: string;
  company: string;
  description: string;
  status: "Pending" | "Accepted" | "Closed";
}

const referralSchema = new Schema<IReferral>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Accepted", "Closed"], default: "Pending" },
}, { timestamps: true });

export const Referral = model<IReferral>("Referral", referralSchema);
