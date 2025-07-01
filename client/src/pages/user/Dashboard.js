import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";

const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("auth");
    setAuth({ user: null, token: "" });
    toast.success("Sign Out successfully!");
    navigate("/");
  };

  if (!auth.user) {
    return (
      <Layout>
        <div className="error-container">
          <p className="error-message">❌ Enter a valid email or password</p>
          <button onClick={() => navigate("/account")} className="login-button">
            Go to Login
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={"User Dashboard E-KhariDari"}>
      <div className="dashboard-container">
        {/* User Info Card */}
        <div className="card-wrapper">
          <h1 className="welcome-text">Welcome To E-KhariDari 🎉</h1>
          <div className="user-card">
            <h2 className="user-name">{auth.user.name}</h2>
            <p className="user-email">{auth.user.email}</p>
          </div>
          <button onClick={handleSignOut} className="sign-out-button">
            Sign Out
          </button>
        </div>

        <div className="customer-card">
          <h2 className="admin-heading">User Panel</h2>
          <nav className="admin-nav">
            <NavLink
              to="/dashboard/user/profile"
              className={({ isActive }) =>
                isActive ? "admin-link active-link" : "admin-link"
              }
            >
              Profile
            </NavLink>
            <NavLink
              to="/dashboard/user/user-order"
              className={({ isActive }) =>
                isActive ? "admin-link active-link" : "admin-link"
              }
            >
              Orders
            </NavLink>
          </nav>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
