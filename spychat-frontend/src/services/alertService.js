import api from "./api.js";
import { wrapRequest } from "../utils/errorHandler.js";

export const listAlerts = async () => wrapRequest(api.get("/activity/logs"));
