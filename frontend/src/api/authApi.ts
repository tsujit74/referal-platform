import api from "./api";

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

export const signup = async (data: SignupData): Promise<AuthResponse> => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
