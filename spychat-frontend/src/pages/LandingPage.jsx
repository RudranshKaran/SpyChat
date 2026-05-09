import { Link } from "react-router-dom";

import Navbar from "../components/common/Navbar.jsx";

export default function LandingPage() {
  return (
    <div className="app-shell bg-grid">
      <Navbar />
      <section className="section landing-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="badge animate-secure">Intelligence Grade Security</span>
            <h1>SpyChat secure messaging, engineered for zero trust.</h1>
            <p>
              End-to-end encrypted delivery, integrity verification, trusted devices,
              and self-destructing messages built for high-sensitivity operations.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/login">
                Login Securely
              </Link>
              <Link className="btn btn-secondary" to="/register">
                Create Account
              </Link>
            </div>
          </div>
          <div className="hero-panel card">
            <div className="hero-panel-header">
              <span className="tag">AES-256 Active</span>
              <span className="tag">SHA-256 Verified</span>
            </div>
            <div className="hero-signal">
              <div className="signal-line" />
              <div className="signal-line delay" />
              <div className="signal-core animate-glow" />
            </div>
            <div className="hero-features">
              <div className="feature">
                <h4>Secure Sessions</h4>
                <p>JWT-based ephemeral session control with device binding.</p>
              </div>
              <div className="feature">
                <h4>Self-Destruct Protocols</h4>
                <p>Messages dissolve after a single secure view or timeout.</p>
              </div>
              <div className="feature">
                <h4>Threat Monitoring</h4>
                <p>Live anomaly alerts for compromised or unknown devices.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container feature-grid">
          <div className="feature-card card">
            <h3>Encrypted Delivery</h3>
            <p>AES-256 and SHA-256 integrity pipelines on every packet.</p>
          </div>
          <div className="feature-card card">
            <h3>Device Trust</h3>
            <p>Verify fingerprints, manage trusted endpoints, revoke instantly.</p>
          </div>
          <div className="feature-card card">
            <h3>Operational Focus</h3>
            <p>Minimal UI, high clarity, optimized for high-risk messaging.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
