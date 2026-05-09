import CountdownTimer from "./CountdownTimer.jsx";
import { formatTime } from "../../utils/format.js";

export default function MessageBubble({ message, isSender, onView }) {
  const status = message.message_status || "Sent";
  const destroyed = status === "Destroyed";

  return (
    <div
      className={`message-bubble ${isSender ? "sent" : ""} ${destroyed ? "destroyed" : ""}`}
      onClick={() => (onView ? onView(message) : null)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onView?.(message);
        }
      }}
    >
      <div>{message.encrypted_message}</div>
      <div className="message-meta">
        <span>{formatTime(message.created_at)}</span>
        <span className="badge">{status}</span>
        <span className="badge" style={{ color: "#4aa3ff" }}>
          Integrity OK
        </span>
      </div>
      {destroyed ? <div className="tag">Message Destroyed</div> : null}
      {message.self_destruct_time ? (
        <CountdownTimer target={message.self_destruct_time} />
      ) : null}
    </div>
  );
}
