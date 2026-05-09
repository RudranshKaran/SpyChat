import api from "./api.js";
import { wrapRequest } from "../utils/errorHandler.js";

export const verifyDevice = async (payload) =>
  wrapRequest(api.post("/devices/verify", payload));

export const fetchDevices = async () => wrapRequest(api.get("/devices/list"));

export const trustDevice = async (payload) =>
  wrapRequest(api.post("/devices/verify", payload));

export const removeDevice = async (deviceId) =>
  wrapRequest(api.delete(`/devices/remove/${deviceId}`));
