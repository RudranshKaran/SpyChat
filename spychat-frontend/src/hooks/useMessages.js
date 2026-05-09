import { useChat } from "../context/ChatContext.jsx";

export default function useMessages() {
  return useChat();
}
