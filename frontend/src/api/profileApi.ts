// src/api/profileApi.ts
import api from "./api";

export interface ProfileData {
  name: string;
  phone?: string;
  education?: { degree: string; university: string }[];
  employment?: { company: string; role: string; experience: number }[];
}

// Create or update profile
export const saveProfile = async (data: ProfileData) => {
  const response = await api.post("/profile", data);
  return response.data;
};

// Get current user profile
export const getProfile = async () => {
  const response = await api.get("/profile");
  return response.data;
};
