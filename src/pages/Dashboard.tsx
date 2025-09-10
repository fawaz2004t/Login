import React from "react";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Welcome to your Dashboard 🎉</h2>
        <p>You are now signed in!</p>
        <Link to="/signin" className="submit-btn" style={{ display: "block", textAlign: "center", marginTop: "20px" }}>
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
