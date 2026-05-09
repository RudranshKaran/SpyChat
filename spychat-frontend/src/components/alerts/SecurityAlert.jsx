export default function SecurityAlert({ title, detail, onPrimary, onSecondary }) {
  return (
    <div className="alert-overlay">
      <div className="alert-modal card animate-alert">
        <div className="alert-header">
          <span className="badge" style={{ color: "#ff4d5a" }}>
            Critical Alert
          </span>
          <h3>{title}</h3>
        </div>
        <p>{detail}</p>
        <div className="alert-actions">
          <button className="btn btn-primary" onClick={onPrimary}>
            Terminate Session
          </button>
          <button className="btn btn-secondary" onClick={onSecondary}>
            Trust Device
          </button>
        </div>
      </div>
    </div>
  );
}
