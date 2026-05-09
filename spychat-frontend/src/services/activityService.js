import api from "./api.js";
import { wrapRequest } from "../utils/errorHandler.js";

export const listActivity = async () => wrapRequest(api.get("/activity/logs"));
