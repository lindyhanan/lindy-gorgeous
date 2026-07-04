import { NavLink } from "react-router-dom";

const navItems = [
  { icon: "🏠", label: "Dashboard", to: "/" },
  { icon: "📊", label: "Analytics", to: "/analytics" },
  { icon: "📋", label: "Menu", to: "/table" },
  { icon: "📄", label: "Components", to: "/components" },
  { icon: "⏰", label: "Orders", to: "/orders" },
  { icon: "⚙️", label: "Settings", to: "/settings" },
];

export default function Sidebar() {
  return (
    <>
<style>{`
  /* ── CONTAINER UTAMA SIDEBAR VERTIKAL ── */
  .sidebar {
    width: 95px;
    height: calc(100vh - 40px);
    background-color: rgba(100, 93, 93, 0.55);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 30px 0;
    box-sizing: border-box;
    
    /* MODIFIKASI DISINI: Mengunci posisi agar tidak bergerak saat scroll */
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 100;
  }

  /* ── LOGO BRAND ATAS ── */
  .sidebar-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
  }

  .logo-icon {
    width: 56px;
    height: 56px;
    border-radius: 20px;
    background-color: #92634e; /* Cokelat khas SudutRasa */
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    box-shadow: 0 8px 16px rgba(146, 99, 78, 0.25);
  }

  /* ── DAFTAR NAVIGASI TENGAH ── */
  .sidebar-nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px; /* Jarak antar ikon menu diperlebar agar seimbang */
    flex: 1;
    justify-content: center;
    width: 100%;
  }

  /* ── STYLING TOMBOL NAVIGASI (DEFAULT) ── */
  .nav-btn {
    width: 56px;
    height: 56px;
    border: none;
    border-radius: 20px;
    background: transparent;
    color: rgba(255, 255, 255, 0.4); /* Kontras warna pasif yang pas di latar gelap */
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-size: 22px;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }

  /* Efek hover halus */
  .nav-btn:hover {
    background-color: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.9);
    transform: scale(1.05);
  }

  /* ── KONDISI MENYALA AKTIF ── */
  .nav-btn.active {
    background-color: #92634e; 
    color: #ffffff;
    box-shadow: 0 8px 20px rgba(146, 99, 78, 0.4);
  }

  /* ── BAGIAN BAWAH (LOGOUT) ── */
  .sidebar-bottom {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: auto;
  }

  .logout-btn {
    width: 56px;
    height: 56px;
    border: none;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .logout-btn:hover {
    background-color: rgba(239, 83, 80, 0.2); /* Merah lembut transparan */
    color: #ef5350; /* Warna teks/ikon merah tegas */
    transform: scale(1.05);
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