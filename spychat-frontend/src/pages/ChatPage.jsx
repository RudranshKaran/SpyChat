import Navbar from "../components/common/Navbar.jsx";
import ChatSidebar from "../components/chat/ChatSidebar.jsx";
import ChatWindow from "../components/chat/ChatWindow.jsx";
import "../styles/chat.css";

export default function ChatPage() {
  return (
    <div className="app-shell bg-grid">
      <Navbar />
      <div className="chat-layout">
        <ChatSidebar />
        <ChatWindow />
        <aside className="chat-security">
          <div className="security-panel">
            <div className="card">
              <h3>Security Status</h3>
              <p>Encryption pulse active. Integrity verified.</p>
              <div className="badge animate-secure">Secure Session</div>
            </div>
            <div className="card">
              <h3>Transmission</h3>
              <p>Next hop: encrypted relay</p>
              <div className="signal-line" />
            </div>
            <div className="card">
              <h3>Threat Monitor</h3>
              <p>0 anomalies detected</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
