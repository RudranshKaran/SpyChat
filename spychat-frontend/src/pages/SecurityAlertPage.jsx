import { useEffect } from "react";

import Navbar from "../components/common/Navbar.jsx";
import SecurityAlert from "../components/alerts/SecurityAlert.jsx";
import useSecurity from "../hooks/useSecurity.js";
import * as alertService from "../services/alertService.js";

export default function SecurityAlertPage() {
  const { alerts, addAlert, removeAlert, clearAlerts } = useSecurity();
  const activeAlert = alerts[0];

  useEffect(() => {
    if (alerts.length) return;
    alertService.listAlerts().then((response) => {
      if (!response.success || !Array.isArray(response.data)) return;
      response.data
        .filter((item) => item.risk_level && item.risk_level !== "Low")
        .slice(0, 3)
        .forEach((item) =>
          addAlert({
            title: item.activity_type || "Security event",
            detail: item.activity_description,
            type: item.risk_level,
          })
        );
    });
  }, [alerts.length, addAlert]);

  return (
    <div className="app-shell bg-grid">
      <Navbar />
      <div className="section">
        <div className="container">
          <h2>Security Alerts</h2>
          <p>Critical notifications triggered by integrity or device anomalies.</p>
          {activeAlert ? (
            <SecurityAlert
              title={activeAlert.title}
              detail={activeAlert.detail}
              onPrimary={() => removeAlert(activeAlert.id)}
              onSecondary={() => removeAlert(activeAlert.id)}
            />
          ) : (
            <div className="card" style={{ padding: "24px" }}>
              <h3>No active alerts</h3>
              <p>All sessions are stable and verified.</p>
            </div>
          )}
          {alerts.length > 1 ? (
            <button className="btn btn-secondary" onClick={clearAlerts}>
              Clear all alerts
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
