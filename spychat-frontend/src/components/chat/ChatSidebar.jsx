import { useChat } from "../../context/ChatContext.jsx";

export default function ChatSidebar() {
  const { conversations, activeConversation, setActiveConversation } = useChat();

  return (
    <div className="chat-sidebar">
      <h3>Secure Conversations</h3>
      <div style={{ display: "grid", gap: "12px", marginTop: "16px" }}>
        {conversations.map((chat) => (
          <button
            key={chat.id}
            className={`chat-conversation ${
              activeConversation?.id === chat.id ? "active" : ""
            }`}
            onClick={() => setActiveConversation(chat)}
          >
            <strong>{chat.partner || `Agent ${chat.partner_id}`}</strong>
            <span className="message-meta">{chat.last || "Secure channel"}</span>
            <span className="badge">Unread {chat.unread_count ?? chat.unread ?? 0}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
