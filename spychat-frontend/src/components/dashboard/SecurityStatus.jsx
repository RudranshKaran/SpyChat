const items = [
  { label: "AES-256", value: "Active", color: "#48f2a9" },
  { label: "SHA-256", value: "Verified", color: "#39e0ff" },
  { label: "Trusted Device", value: "Enabled", color: "#2bd67b" },
  { label: "Session Secure", value: "Locked", color: "#4aa3ff" },
];

export default function SecurityStatus() {
  return (
    <div className="security-cards">
      {items.map((item) => (
        <div className="security-card animate-glow" key={item.label}>
          <div style={{ color: item.color, fontWeight: 600 }}>{item.label}</div>
          <div>{item.value}</div>
        </div>
      ))}
    </div>
  );
}
