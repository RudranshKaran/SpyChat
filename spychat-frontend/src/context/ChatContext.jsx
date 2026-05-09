import { createContext, useContext, useEffect, useMemo, useState } from "react";

import * as messageService from "../services/messageService.js";

const ChatContext = createContext(null);

const demoConversations = [
  { id: 1, partner: "Astra", status: "Secure", unread: 2, last: "Encrypted handshake" },
  { id: 2, partner: "Nyx", status: "Secure", unread: 0, last: "Session verified" },
  { id: 3, partner: "Orion", status: "Warning", unread: 1, last: "Unknown device" },
];

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState(demoConversations);
  const [activeConversation, setActiveConversation] = useState(demoConversations[0]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [securityStatus, setSecurityStatus] = useState("Secure");

  const fetchMessages = async () => {
    setLoading(true);
    const response = await messageService.fetchMessages();
    if (response.success) {
      setMessages(response.data || []);
    } else {
      setMessages([]);
    }
    setLoading(false);
  };

  const fetchConversations = async () => {
    const response = await messageService.getConversations();
    if (response.success && Array.isArray(response.data?.conversations)) {
      setConversations(response.data.conversations);
    }
  };

  const sendMessage = async (payload) => {
    const optimistic = {
      id: Date.now(),
      sender_id: "me",
      receiver_id: payload.receiver_id,
      encrypted_message: payload.message,
      created_at: new Date().toISOString(),
      viewed_status: false,
      message_status: "Sent",
      self_destruct_time: payload.self_destruct_time || null,
    };
    setMessages((prev) => [optimistic, ...prev]);
    const response = await messageService.sendMessage(payload);
    if (!response.success) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === optimistic.id ? { ...msg, message_status: "Failed" } : msg
        )
      );
      setSecurityStatus("Warning");
    }
    return response;
  };

  const markViewed = async (messageId) => {
    const response = await messageService.viewMessage(messageId);
    if (response.success) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? { ...msg, encrypted_message: response.data.message, message_status: "Viewed" }
            : msg
        )
      );
      setTimeout(() => {
        setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
      }, 1200);
    }
    return response;
  };

  const destroyMessage = async (messageId) => {
    const response = await messageService.destroyMessage(messageId);
    if (response.success) {
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    }
    return response;
  };

  const value = useMemo(
    () => ({
      conversations,
      activeConversation,
      setActiveConversation,
      messages,
      loading,
      typing,
      securityStatus,
      setTyping,
      setSecurityStatus,
      fetchMessages,
      fetchConversations,
      sendMessage,
      markViewed,
      destroyMessage,
      setConversations,
    }),
    [
      conversations,
      activeConversation,
      messages,
      loading,
      typing,
      securityStatus,
    ]
  );

  useEffect(() => {
    fetchMessages();
    fetchConversations();
  }, []);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within ChatProvider");
  }
  return context;
};
