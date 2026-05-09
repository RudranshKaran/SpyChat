import api from "./api.js";
import { wrapRequest } from "../utils/errorHandler.js";

export const activeSessions = async () => wrapRequest(api.get("/sessions/active"));

export const terminateSession = async (sessionId) =>
  wrapRequest(api.delete(`/sessions/terminate/${sessionId}`));
