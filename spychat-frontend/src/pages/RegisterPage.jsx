import Navbar from "../components/common/Navbar.jsx";
import RegisterForm from "../components/auth/RegisterForm.jsx";
import "../styles/auth.css";

export default function RegisterPage() {
  return (
    <div className="app-shell bg-grid">
      <Navbar />
      <div className="auth-layout">
        <RegisterForm />
      </div>
    </div>
  );
}
