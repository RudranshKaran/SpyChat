import api from "./api.js";
import { wrapRequest } from "../utils/errorHandler.js";

export const register = async (payload) => wrapRequest(api.post("/auth/register", payload));

export const login = async (payload) => wrapRequest(api.post("/auth/login", payload));

export const logout = async (token) =>
  wrapRequest(
    api.post(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  );

export const refresh = async (payload) => wrapRequest(api.post("/auth/refresh", payload));

export const getCurrentUser = async () => wrapRequest(api.get("/users/profile"));

export const validateSession = async () => wrapRequest(api.get("/sessions/active"));
