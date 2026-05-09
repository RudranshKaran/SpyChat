import { Link, NavLink } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";

const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `tag ${isActive ? "animate-secure" : ""}`
    }
  >
    {label}
  </NavLink>
);

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Link className="nav-brand" to="/">
          <span className="nav-brand-accent">Spy</span>Chat
        </Link>
        <div className="nav-links">
          {isAuthenticated ? (
            <>
              <NavItem to="/dashboard" label="Dashboard" />
              <NavItem to="/chat" label="Secure Chat" />
              <NavItem to="/devices" label="Devices" />
              <NavItem to="/alerts" label="Alerts" />
              <button className="btn btn-secondary" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavItem to="/login" label="Login" />
              <NavItem to="/register" label="Register" />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
