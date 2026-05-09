import Navbar from "../components/common/Navbar.jsx";
import LoginForm from "../components/auth/LoginForm.jsx";
import "../styles/auth.css";

export default function LoginPage() {
  return (
    <div className="app-shell bg-grid">
      <Navbar />
      <div className="auth-layout">
        <LoginForm />
      </div>
    </div>
  );
}
