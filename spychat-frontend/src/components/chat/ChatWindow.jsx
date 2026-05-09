import { useChat } from "../../context/ChatContext.jsx";
import MessageBubble from "./MessageBubble.jsx";
import MessageInput from "./MessageInput.jsx";

export default function ChatWindow() {
  const { messages, activeConversation, markViewed } = useChat();

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div>
          <h3>{activeConversation?.partner || "Secure Channel"}</h3>
          <span className="badge animate-secure">Encryption Active</span>
        </div>
        <div className="tag">Session: Verified</div>
      </div>
      <div className="message-list">
        {messages.map((message) => {
          const isSender = message.sender_id === "me" || message.sender_id === 1;
          return (
            <MessageBubble
              key={message.id}
              message={message}
              isSender={isSender}
              onView={(msg) => (!isSender ? markViewed(msg.id) : null)}
            />
          );
        })}
      </div>
      <MessageInput />
    </div>
  );
}
