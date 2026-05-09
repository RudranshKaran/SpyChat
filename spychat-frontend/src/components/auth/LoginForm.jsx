import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";

export default function LoginForm() {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    trustDevice: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await login({
      username: form.username,
      password: form.password,
      trustDevice: form.trustDevice,
    });
    if (response.success) {
      navigate("/dashboard");
    }
  };

  return (
    <form className="auth-panel card" onSubmit={handleSubmit}>
      <div>
        <h2 className="auth-title">Secure Access</h2>
        <p className="auth-subtitle">Authenticate to open your encrypted channel.</p>
      </div>
      <div className="input-group">
        <label htmlFor="login-username">Username or Email</label>
        <input
          id="login-username"
          className="input"
          value={form.username}
          onChange={(event) => setForm({ ...form, username: event.target.value })}
          placeholder="agent.syx"
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="login-password">Password</label>
        <div className="input-row">
          <input
            id="login-password"
            className="input"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowPassword((value) => !value)}
            aria-label="Toggle password visibility"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>
      <label className="input-row">
        <input
          type="checkbox"
          checked={form.trustDevice}
          onChange={(event) => setForm({ ...form, trustDevice: event.target.checked })}
        />
        Trust this device for secure sessions
      </label>
      {error ? <div className="auth-error">{error}</div> : null}
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Securing..." : "Login"}
      </button>
    </form>
  );
}
