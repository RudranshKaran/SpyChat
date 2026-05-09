import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";
import Loader from "../components/common/Loader.jsx";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, validating } = useAuth();

  if (validating) {
    return (
      <div className="section">
        <div className="container">
          <Loader label="Validating session" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
