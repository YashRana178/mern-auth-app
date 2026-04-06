import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

export default function Home() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="home-container">

 {/* Main Page Content */}
      <div className="content">
        <h1>Welcome to Admin Dashboard</h1>
        <p>Select options from the menu</p>
      </div>

      {/* Navbar Toggle Button */}
      <button className="menu-btn" onClick={() => setOpen(!open)}>
        ☰ Menu
      </button>

      {/* Sidebar Navigation */}
      <div className={`sidebar ${open ? "active" : ""}`}>
        <h2>Admin Panel</h2>

        <ul>
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/user")}>Users</li>
          <li onClick={() => navigate("/settings")}>Settings</li>
          <li onClick={() => navigate("/login")}>Logout</li>
        </ul>
      </div>
    </div>
  );
}