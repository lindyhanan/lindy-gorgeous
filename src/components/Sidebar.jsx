import { NavLink } from "react-router-dom";

const navItems = [
  { icon: "⊞", label: "Dashboard", to: "/" },
  { icon: "≡", label: "Menu",      to: "/menu" },
  { icon: "◷", label: "Orders",    to: "/orders" },
  { icon: "↗", label: "Analytics", to: "/analytics" },
  { icon: "⚙", label: "Settings",  to: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">☕</div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((nav) => (
          <NavLink
            key={nav.to}
            to={nav.to}
            end={nav.to === "/"} 
            className={({ isActive }) => `nav-btn${isActive ? " active" : ""}`}
            title={nav.label}
          >
            {nav.icon}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button className="nav-btn logout" title="Logout" onClick={() => alert("Keluar aplikasi")}>→</button>
      </div>
    </aside>
  );
}