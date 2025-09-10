// src/api/referralApi.ts
import api from "./api";

export interface ReferralData {
  title: string;
  company: string;
  description: string;
  status?: "Pending" | "Accepted" | "Closed";
}

// Create new referral
export const createReferral = async (data: ReferralData) => {
  const response = await api.post("/referral", data);
  return response.data;
};

// Get all referrals for current user
export const getUserReferrals = async () => {
  const response = await api.get("/referral/user");
  return response.data;
};

// Update referral by ID
export const updateReferral = async (id: string, data: ReferralData) => {
  const response = await api.put(`/referral/${id}`, data);
  return response.data;
};

// Delete referral by ID
export const deleteReferral = async (id: string) => {
  const response = await api.delete(`/referral/${id}`);
  return response.data;
};

// Get public feed (all referrals)
export const getAllReferrals = async () => {
  const response = await api.get("/referral");
  return response.data;
};
