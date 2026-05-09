import api from "./api.js";
import { wrapRequest } from "../utils/errorHandler.js";

export const sendMessage = async (payload) => {
  const body = {
    receiver_id: payload.receiver_id,
    message: payload.message || payload.encrypted_message,
    self_destruct_time: payload.self_destruct_time || payload.expiry_time || null,
  };
  return wrapRequest(api.post("/messages/send", body));
};

export const fetchMessages = async () => wrapRequest(api.get("/messages/inbox"));

export const viewMessage = async (messageId) =>
  wrapRequest(api.get(`/messages/view/${messageId}`));

export const destroyMessage = async (messageId) =>
  wrapRequest(api.delete(`/messages/delete/${messageId}`));

export const getConversations = async () => wrapRequest(api.get("/messages/conversations"));
