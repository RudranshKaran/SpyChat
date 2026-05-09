import { useEffect, useState } from "react";

import Navbar from "../components/common/Navbar.jsx";
import Sidebar from "../components/common/Sidebar.jsx";
import "../styles/dashboard.css";
import * as deviceService from "../services/deviceService.js";
import { buildDeviceFingerprint } from "../utils/securityHelpers.js";

export default function DeviceVerificationPage() {
  const [devices, setDevices] = useState([]);
  const [form, setForm] = useState({
    device_fingerprint: "",
    browser_name: "",
    operating_system: "",
    screen_resolution: "",
  });

  const refresh = () => {
    deviceService.fetchDevices().then((response) => {
      setDevices(Array.isArray(response.data) ? response.data : []);
    });
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleRemove = async (deviceId) => {
    await deviceService.removeDevice(deviceId);
    refresh();
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    await deviceService.verifyDevice(form);
    setForm({
      device_fingerprint: "",
      browser_name: "",
      operating_system: "",
      screen_resolution: "",
    });
    refresh();
  };

  return (
    <div className="app-shell bg-grid">
      <Navbar />
      <div className="dashboard-grid">
        <Sidebar />
        <main className="dashboard-main">
          <div>
            <h2>Device Verification</h2>
            <p>Manage trusted endpoints and verify new fingerprints.</p>
          </div>
          <div className="card" style={{ padding: "20px" }}>
            <h3>Verify New Device</h3>
            <form onSubmit={handleVerify} style={{ display: "grid", gap: "12px" }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setForm(buildDeviceFingerprint())}
              >
                Use current device
              </button>
              <input
                className="input"
                placeholder="Device fingerprint"
                value={form.device_fingerprint}
                onChange={(event) =>
                  setForm({ ...form, device_fingerprint: event.target.value })
                }
                required
              />
              <input
                className="input"
                placeholder="Browser"
                value={form.browser_name}
                onChange={(event) => setForm({ ...form, browser_name: event.target.value })}
                required
              />
              <input
                className="input"
                placeholder="Operating system"
                value={form.operating_system}
                onChange={(event) =>
                  setForm({ ...form, operating_system: event.target.value })
                }
                required
              />
              <input
                className="input"
                placeholder="Screen resolution"
                value={form.screen_resolution}
                onChange={(event) =>
                  setForm({ ...form, screen_resolution: event.target.value })
                }
                required
              />
              <button className="btn btn-primary" type="submit">
                Verify device
              </button>
            </form>
          </div>
          <div className="card" style={{ padding: "20px" }}>
            <h3>Trusted Devices</h3>
            <div className="device-panel">
              {devices.length ? (
                devices.map((device) => (
                  <div className="device-card" key={device.id}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <strong>{device.browser_name}</strong>
                      <span className="badge">{device.device_status}</span>
                    </div>
                    <div className="message-meta">{device.operating_system}</div>
                    <div className="message-meta">{device.screen_resolution}</div>
                    <div className="message-meta">Fingerprint: {device.device_fingerprint}</div>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleRemove(device.id)}
                    >
                      Remove device
                    </button>
                  </div>
                ))
              ) : (
                <p>No devices registered yet.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
