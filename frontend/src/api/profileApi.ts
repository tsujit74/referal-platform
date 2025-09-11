import api from "./api";

export interface ProfileData {
  name: string;
  phone?: string;
  education?: { degree: string; university: string }[];
  employment?: { company: string; role: string; experience: number }[];
}

export const saveProfile = async (data: ProfileData) => {
  const response = await api.post("/profile", data);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/profile");
  return response.data;
};
