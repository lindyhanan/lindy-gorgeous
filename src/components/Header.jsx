import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [openProfile, setOpenProfile] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <header className="topbar">
      {/* LOGO */}
      <div className="sidebar-logo">
        <div className="logo-icon">☕</div>

        <h1 className="logo-text">Coffe Shop</h1>
      </div>

      {/* NAVIGATION */}
      <nav className="sidebar-nav">
        <a href="#home" className="nav-btn">
          Home
        </a>

        <a href="#menu" className="nav-btn">
          Best Menu
        </a>

        <a href="#benefit" className="nav-btn">
          Member Benefit
        </a>

        <a href="#newsletter" className="nav-btn">
          Newsletter
        </a>
      </nav>

      {/* RIGHT */}
      <div className="topbar-right">
        {/* PROFILE */}
        <div className="relative">
          <button
            onClick={() => setOpenProfile(!openProfile)}
            className="profile-btn"
          >
            <img
              src="/assets/profile.png"
              alt="Profile"
              className="profile-img"
            />
          </button>

          {openProfile && (
            <div className="profile-dropdown">
              <Link to="/login" className="dropdown-item">
                Login
              </Link>

              <Link to="/register" className="dropdown-item">
                Register
              </Link>

              <button
                onClick={handleLogout}
                className="dropdown-item logout-btn"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
