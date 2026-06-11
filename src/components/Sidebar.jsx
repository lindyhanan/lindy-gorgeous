import { NavLink } from "react-router-dom";

const navItems = [
  { icon: "🏠", label: "Dashboard", to: "/" },
  { icon: "📋", label: "Menu", to: "/menu" },
  { icon: "📄", label: "Components", to: "/components" },
  { icon: "⏰", label: "Orders", to: "/orders" },
  { icon: "📊", label: "Analytics", to: "/analytics" },
  { icon: "⚙️", label: "Settings", to: "/settings" },
];

export default function Sidebar() {
  return (
    <>
      <style>{`
        /* ── CONTAINER UTAMA SIDEBAR VERTIKAL ── */
        .sidebar {
          width: 95px;
          height: calc(100vh - 40px); /* Dikurangi margin agar melayang manis */
          background-color: #ababab; /* Abu-abu arang gelap sesuai dashboard luar */
          border-radius: 28px; /* Lengkungan tebal estetik */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 30px 0;
          box-sizing: border-box;
          position: sticky;
          top: 20px;
          margin: 20px 0 20px 20px;
        }

        /* ── LOGO BRAND ATAS ── */
        .sidebar-logo {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
        }

        .logo-icon {
          width: 55px;
          height: 55px;
          border-radius: 18px;
          background-color: #92634e; /* Cokelat serasi Doge Caffe */
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 24px;
          box-shadow: 0 4px 12px rgba(146, 99, 78, 0.3);
        }

        /* ── DAFTAR NAVIGASI TENGAH ── */
        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex: 1;
          justify-content: center;
        }

        /* ── STYLING TOMBOL NAVIGASI (DEFAULT) ── */
        .nav-btn {
          width: 52px;
          height: 52px;
          border: none;
          border-radius: 16px;
          background: transparent;
          color: #8a8a8a; /* Warna redup untuk menu pasif */
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          font-size: 20px;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        /* Efek sorot tipis */
        .nav-btn:hover {
          background-color: rgba(255, 255, 255, 0.05);
          color: #ffffff;
        }

        /* ── KONDISI MENYALA AKTIF (MATCH GAMBAR) ── */
        .nav-btn.active {
          background-color: #92634e; /* Cokelat solid utama */
          color: #ffffff;
          box-shadow: 0 6px 16px rgba(146, 99, 78, 0.35);
        }

        /* ── BAGIAN BAWAH (LOGOUT) ── */
        .sidebar-bottom {
          margin-top: auto;
        }

        .logout-btn {
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: #a7a7a7;
        }

        .logout-btn:hover {
          background-color: rgba(255, 82, 82, 0.15);
          color: #ff5252;
          border-color: transparent;
        }
      `}</style>

      <aside className="sidebar">
        {/* Logo Atas */}
        <div className="sidebar-logo">
          <div className="logo-icon">☕</div>
        </div>

        {/* Menu Tengah */}
        <nav className="sidebar-nav">
          {navItems.map((nav) => (
            <NavLink
              key={nav.to}
              to={nav.to}
              end={nav.to === "/"}
              className={({ isActive }) =>
                `nav-btn${isActive ? " active" : ""}`
              }
              title={nav.label}
            >
              {nav.icon}
            </NavLink>
          ))}
        </nav>

        {/* Tombol Logout Bawah */}
        <div className="sidebar-bottom">
          <button
            className="nav-btn logout-btn"
            title="Logout"
            onClick={() => alert("Keluar dari sistem kasir")}
          >
            🚪
          </button>
        </div>
      </aside>
    </>
  );
}