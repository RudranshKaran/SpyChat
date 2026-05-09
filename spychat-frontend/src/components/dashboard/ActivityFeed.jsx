import { formatTime } from "../../utils/format.js";

const demoActivity = [
  { id: 1, activity_description: "Login verified", timestamp: new Date().toISOString(), risk_level: "Low" },
  { id: 2, activity_description: "Encrypted message sent", timestamp: new Date().toISOString(), risk_level: "Low" },
  { id: 3, activity_description: "New device detected", timestamp: new Date().toISOString(), risk_level: "High" },
];

export default function ActivityFeed({ items = demoActivity }) {
  return (
    <div className="activity-feed">
      {items.map((item) => (
        <div className="activity-item" key={item.id}>
          <div>
            <strong>{item.activity_description || item.label}</strong>
            <div className="message-meta">{formatTime(item.timestamp || item.time)}</div>
          </div>
          <span className="badge">{item.risk_level || item.severity}</span>
        </div>
      ))}
    </div>
  );
}
