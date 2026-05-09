import { useEffect, useState } from "react";

import Navbar from "../components/common/Navbar.jsx";
import Sidebar from "../components/common/Sidebar.jsx";
import SecurityStatus from "../components/dashboard/SecurityStatus.jsx";
import ActivityFeed from "../components/dashboard/ActivityFeed.jsx";
import DevicePanel from "../components/dashboard/DevicePanel.jsx";
import "../styles/dashboard.css";
import * as deviceService from "../services/deviceService.js";
import * as activityService from "../services/activityService.js";

export default function DashboardPage() {
  const [devices, setDevices] = useState([]);
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    deviceService.fetchDevices().then((response) => {
      setDevices(Array.isArray(response.data) ? response.data : []);
    });
    activityService.listActivity().then((response) => {
      setActivity(Array.isArray(response.data) ? response.data : []);
    });
  }, []);

  return (
    <div className="app-shell bg-grid">
      <Navbar />
      <div className="dashboard-grid">
        <Sidebar />
        <main className="dashboard-main">
          <div>
            <h2>Security Overview</h2>
            <p>Encrypted operations, device trust, and session integrity.</p>
          </div>
          <SecurityStatus />
          <div className="card" style={{ padding: "20px" }}>
            <h3>Recent Activity</h3>
            <ActivityFeed items={activity.length ? activity : undefined} />
          </div>
          <div className="card" style={{ padding: "20px" }}>
            <h3>Trusted Devices</h3>
            <DevicePanel
              devices={
                devices.length
                  ? devices
                  : [
                      {
                        id: 1,
                        browser_name: "Secure Agent",
                        operating_system: "Hardened OS",
                        screen_resolution: "1440x900",
                        device_fingerprint: "N/A",
                        device_status: "Trusted",
                      },
                    ]
              }
            />
          </div>
        </main>
      </div>
    </div>
  );
}
