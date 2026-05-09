import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Overview" },
  { to: "/chat", label: "Secure Chat" },
  { to: "/devices", label: "Device Trust" },
  { to: "/alerts", label: "Security Alerts" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar card card-strong">
      <div>
        <div className="sidebar-title">Security Panel</div>
        <div className="sidebar-subtitle">Encrypted core</div>
      </div>
      <div className="sidebar-links">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
      <div className="sidebar-footer">
        <div className="tag">AES-256 Active</div>
        <div className="tag">SHA-256 Verified</div>
      </div>
    </aside>
  );
}
