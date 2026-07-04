import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const NAV_ITEMS = [
  { id: "dashboard", icon: "📊", label: "Dashboard", to: "#dashboard" },
  { id: "redeem", icon: "🎁", label: "Rewards", to: "#redeem" },
  { id: "vouchers", icon: "🎟️", label: "Vouchers", to: "#vouchers" },
  { id: "promos", icon: "📅", label: "Promos", to: "#promos" },
  { id: "bestseller", icon: "⭐", label: "Bestseller", to: "#bestseller" },
];

export default function MemberNavbar({ query, setQuery, onSearch }) {
  const { profile, isLoading, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const navigate = useNavigate();

  const tierInfo = {
    SILVER: { label: "Silver Member", color: "#c0c0c0", icon: "🥈" },
    GOLD: { label: "Gold Member", color: "#ffd700", icon: "🥇" },
    PLATINUM: { label: "Platinum Member", color: "#e5e4e2", icon: "💎" },
  };

  const currentTier = tierInfo[profile?.tier] || tierInfo.SILVER;

  const handleNavClick = (id) => {
    setActiveSection(id);
    setIsMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <>
      <style>{`
        .member-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(11, 8, 6, 0.92);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(179, 139, 83, 0.12);
          padding: 0 32px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: 'Poppins', sans-serif;
        }

        .member-nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .member-nav-logo {
          width: 34px;
          height: 34px;
          filter: brightness(0) invert(1);
        }

        .member-nav-brand-text {
          color: #ffffff;
          font-size: 18px;
          font-weight: 800;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }

        .member-nav-brand-text span {
          color: #b38b53;
        }

        .member-nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .member-nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 10px;
          text-decoration: none;
          color: rgba(255,255,255,0.6);
          font-size: 13px;
          font-weight: 500;
          transition: all 0.25s ease;
          cursor: pointer;
          border: none;
          background: none;
          font-family: 'Poppins', sans-serif;
          white-space: nowrap;
        }

        .member-nav-link:hover {
          color: #ffffff;
          background: rgba(179, 139, 83, 0.1);
        }

        .member-nav-link.active {
          color: #b38b53;
          background: rgba(179, 139, 83, 0.12);
          font-weight: 600;
        }

        .member-nav-right {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-shrink: 0;
        }

        .member-nav-search {
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(179, 139, 83, 0.12);
          border-radius: 24px;
          padding: 6px 16px;
          width: 220px;
          transition: all 0.3s ease;
        }

        .member-nav-search:focus-within {
          border-color: #b38b53;
          background: rgba(255,255,255,0.08);
          width: 260px;
        }

        .member-nav-search-icon {
          font-size: 13px;
          margin-right: 8px;
          color: rgba(255,255,255,0.3);
        }

        .member-nav-search-input {
          background: none;
          border: none;
          outline: none;
          color: #ffffff;
          font-size: 12px;
          width: 100%;
          font-family: 'Poppins', sans-serif;
        }

        .member-nav-search-input::placeholder {
          color: rgba(255,255,255,0.25);
        }

        .member-nav-user {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          padding: 4px 12px 4px 4px;
          border-radius: 999px;
          background: rgba(179, 139, 83, 0.06);
          border: 1px solid rgba(179, 139, 83, 0.1);
          transition: all 0.25s ease;
          position: relative;
        }

        .member-nav-user:hover {
          background: rgba(179, 139, 83, 0.12);
          border-color: rgba(179, 139, 83, 0.2);
        }

        .member-nav-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #b38b53, #967241);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
          color: #0b0806;
          flex-shrink: 0;
        }

        .member-nav-user-info {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .member-nav-user-name {
          font-size: 12px;
          font-weight: 600;
          color: #ffffff;
          max-width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .member-nav-user-tier {
          font-size: 9px;
          font-weight: 700;
          color: ${currentTier.color};
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .member-nav-points {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          background: rgba(179, 139, 83, 0.1);
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          color: #b38b53;
        }

        .member-nav-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: rgba(20, 16, 14, 0.98);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(179, 139, 83, 0.12);
          border-radius: 14px;
          min-width: 180px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: navDropIn 0.15s ease-out;
        }

        .member-nav-dropdown-item {
          padding: 12px 16px;
          font-size: 13px;
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          transition: all 0.15s;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          border: none;
          background: none;
          font-family: 'Poppins', sans-serif;
          text-align: left;
        }

        .member-nav-dropdown-item:hover {
          background: rgba(179, 139, 83, 0.1);
          color: #ffffff;
        }

        .member-nav-dropdown-divider {
          height: 1px;
          background: rgba(179, 139, 83, 0.1);
          margin: 4px 0;
        }

        .member-nav-dropdown-logout {
          color: #f87171;
        }

        .member-nav-dropdown-logout:hover {
          background: rgba(248, 113, 113, 0.08);
        }

        .member-nav-hamburger {
          display: none;
          background: none;
          border: none;
          color: #ffffff;
          font-size: 20px;
          cursor: pointer;
          padding: 4px;
        }

        @keyframes navDropIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .member-nav { padding: 0 16px; }
          .member-nav-links { display: none; }
          .member-nav-search { width: 160px; }
          .member-nav-search:focus-within { width: 180px; }
          .member-nav-hamburger { display: block; }
          .member-nav-points { display: none; }
        }

        .member-mobile-menu {
          display: none;
        }

        @media (max-width: 900px) {
          .member-nav-hamburger { display: block; }
        }

        .member-mobile-menu.open {
          position: fixed;
          top: 68px;
          left: 0;
          right: 0;
          background: rgba(11, 8, 6, 0.98);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(179, 139, 83, 0.12);
          display: flex;
          flex-direction: column;
          padding: 16px;
          gap: 4px;
          z-index: 999;
          animation: navDropIn 0.15s ease-out;
        }

        .member-mobile-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          color: rgba(255,255,255,0.7);
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s;
          cursor: pointer;
          border: none;
          background: none;
          font-family: 'Poppins', sans-serif;
        }

        .member-mobile-link:hover {
          background: rgba(179, 139, 83, 0.1);
          color: #ffffff;
        }

        .member-mobile-link.active {
          color: #b38b53;
          background: rgba(179, 139, 83, 0.12);
        }
      `}</style>

      <nav className="member-nav">
        {/* Brand */}
        <Link to="/member" className="member-nav-brand">
          <img
            src="https://cdn-icons-png.flaticon.com/512/924/924514.png"
            alt="Coffee Cup"
            className="member-nav-logo"
          />
          <span className="member-nav-brand-text">
            Sudut<span>Rasa</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="member-nav-links">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`member-nav-link ${activeSection === item.id ? "active" : ""}`}
              onClick={() => handleNavClick(item.id)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Right Section */}
        <div className="member-nav-right">
          {/* Search */}
          <div className="member-nav-search">
            <span className="member-nav-search-icon">🔍</span>
            <input
              className="member-nav-search-input"
              type="text"
              placeholder="Cari rewards atau menu..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (onSearch) onSearch(e.target.value);
              }}
            />
          </div>

          {/* Points Badge */}
          <div className="member-nav-points">
            <span>⭐</span>
            <span>{(profile?.total_points || 0).toLocaleString()} pts</span>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="member-nav-hamburger"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? "✕" : "☰"}
          </button>

          {/* User Avatar */}
          <div className="member-nav-user" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <div className="member-nav-avatar">
              {profile?.full_name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="member-nav-user-info" style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
              <span className="member-nav-user-name">
                {profile?.full_name || "User"}
              </span>
              <span className="member-nav-user-tier">
                {currentTier.icon} {currentTier.label}
              </span>
            </div>

            {isDropdownOpen && (
              <div className="member-nav-dropdown">
                <button className="member-nav-dropdown-item" onClick={() => { setIsDropdownOpen(false); handleNavClick("dashboard"); }}>
                  👤 Profil Saya
                </button>
                <button className="member-nav-dropdown-item" onClick={() => { setIsDropdownOpen(false); handleNavClick("redeem"); }}>
                  📜 Riwayat Poin
                </button>
                <div className="member-nav-dropdown-divider" />
                <button className="member-nav-dropdown-item member-nav-dropdown-logout" onClick={handleLogout}>
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`member-mobile-menu ${isMobileOpen ? "open" : ""}`}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`member-mobile-link ${activeSection === item.id ? "active" : ""}`}
            onClick={() => handleNavClick(item.id)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
        <div className="member-nav-dropdown-divider" />
        <button className="member-mobile-link" onClick={handleLogout} style={{ color: "#f87171" }}>
          🚪 Logout
        </button>
      </div>
    </>
  );
}
