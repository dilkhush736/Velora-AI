import { apiClient } from "./apiClient";

export const signupRequest = async (payload) => {
  const response = await apiClient.post("/auth/signup", payload);
  return response.data;
};

export const loginRequest = async (payload) => {
  const response = await apiClient.post("/auth/login", payload);
  return response.data;
};

export const logoutRequest = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};

export const getCurrentUserRequest = async () => {
  const response = await apiClient.get("/auth/me");
  return response.data;
};

