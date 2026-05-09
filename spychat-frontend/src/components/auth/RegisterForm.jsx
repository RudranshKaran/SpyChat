import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";

const strengthScore = (value) => {
  let score = 0;
  if (value.length >= 8) score += 1;
  if (/[A-Z]/.test(value)) score += 1;
  if (/[0-9]/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;
  return score / 4;
};

export default function RegisterForm() {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const score = useMemo(() => strengthScore(form.password), [form.password]);
  const passwordsMatch = form.password && form.password === form.confirm;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!passwordsMatch) return;
    const response = await register({
      username: form.username,
      email: form.email,
      password: form.password,
    });
    if (response.success) {
      navigate("/login");
    }
  };

  return (
    <form className="auth-panel card" onSubmit={handleSubmit}>
      <div>
        <h2 className="auth-title">Create Secure Identity</h2>
        <p className="auth-subtitle">Register to unlock encrypted channels.</p>
      </div>
      <div className="input-group">
        <label htmlFor="register-username">Username</label>
        <input
          id="register-username"
          className="input"
          value={form.username}
          onChange={(event) => setForm({ ...form, username: event.target.value })}
          placeholder="agent.syx"
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          className="input"
          type="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          placeholder="secure@spychat.io"
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          className="input"
          type="password"
          value={form.password}
          onChange={(event) => setForm({ ...form, password: event.target.value })}
          placeholder="Strong encryption passphrase"
          required
        />
        <div className="password-meter">
          <span style={{ width: `${score * 100}%` }} />
        </div>
      </div>
      <div className="input-group">
        <label htmlFor="register-confirm">Confirm Password</label>
        <input
          id="register-confirm"
          className={`input ${passwordsMatch ? "success" : "error"}`}
          type="password"
          value={form.confirm}
          onChange={(event) => setForm({ ...form, confirm: event.target.value })}
          placeholder="Repeat password"
          required
        />
      </div>
      {!passwordsMatch && form.confirm ? (
        <div className="auth-error">Passwords do not match.</div>
      ) : null}
      {error ? <div className="auth-error">{error}</div> : null}
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Encrypting..." : "Register"}
      </button>
    </form>
  );
}
