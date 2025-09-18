import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NotFound = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you’re looking for does not exist.</p>

      {isAuthenticated ? (
        <button onClick={() => navigate("/dashboard")} className="back-btn">
          Back to Dashboard
        </button>
      ) : (
        <button onClick={() => navigate("/login")} className="back-btn">
          Back to Login
        </button>
      )}
    </div>
  );
};

export default NotFound;
