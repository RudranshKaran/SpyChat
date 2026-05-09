export default function DevicePanel({ devices }) {
  return (
    <div className="device-panel">
      {devices.map((device) => (
        <div className="device-card" key={device.id}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{device.browser_name}</strong>
            <span className="badge">{device.device_status}</span>
          </div>
          <div className="message-meta">{device.operating_system}</div>
          <div className="message-meta">{device.screen_resolution}</div>
          <div className="message-meta">Fingerprint: {device.device_fingerprint}</div>
        </div>
      ))}
    </div>
  );
}
