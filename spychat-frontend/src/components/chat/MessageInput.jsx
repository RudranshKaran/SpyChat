import { useState } from "react";

import { useChat } from "../../context/ChatContext.jsx";

export default function MessageInput() {
  const { sendMessage, activeConversation } = useChat();
  const [text, setText] = useState("");
  const [selfDestruct, setSelfDestruct] = useState(30);

  const handleSend = async (event) => {
    event.preventDefault();
    if (!text.trim() || !activeConversation) return;
    await sendMessage({
      receiver_id: activeConversation.id,
      message: text,
      self_destruct_time: new Date(Date.now() + selfDestruct * 1000).toISOString(),
    });
    setText("");
  };

  return (
    <form className="message-input" onSubmit={handleSend}>
      <textarea
        className="input"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Compose encrypted payload..."
      />
      <div style={{ display: "grid", gap: "8px" }}>
        <label className="tag">
          Self-destruct
          <select
            value={selfDestruct}
            onChange={(event) => setSelfDestruct(Number(event.target.value))}
          >
            <option value={10}>10s</option>
            <option value={30}>30s</option>
            <option value={60}>60s</option>
          </select>
        </label>
        <button type="submit" className="btn btn-primary">
          <span className="send-sweep" aria-hidden="true" />
          Send Securely
        </button>
      </div>
    </form>
  );
}
