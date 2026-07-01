import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function GuestNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Efek transisi saat halaman di scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`guest-nav-cinematic ${isScrolled ? "active-blur" : ""}`}>
      <style>{`
        .guest-nav-cinematic {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 25px 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 2000;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        /* Efek Blur Glassmorphism saat Scroll */
        .guest-nav-cinematic.active-blur {
          padding: 15px 60px;
          background: rgba(11, 8, 6, 0.8);
          backdrop-filter: blur(15px);
          border-bottom: 1px solid rgba(179, 139, 83, 0.15);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        /* ── LOGO BRANDING ── */
        .brand-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .brand-logo-img {
          width: 40px;
          filter: brightness(0) invert(1); /* Membuat logo putih */
        }

        .brand-name {
          color: #ffffff;
          font-size: 20px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin: 0;
        }

        /* ── CENTRAL MENU (CAPITALIZED) ── */
        .nav-menu-list {
          display: flex;
          list-style: none;
          gap: 25px;
          margin: 0;
          padding: 0;
        }

        .nav-item-link {
          text-decoration: none;
          color: #ffffff;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          transition: color 0.3s ease;
          position: relative;
        }

        .nav-item-link:hover {
          color: #b38b53;
        }

        /* Garis bawah tipis saat hover */
        .nav-item-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -5px;
          left: 0;
          background-color: #b38b53;
          transition: width 0.3s ease;
        }

        .nav-item-link:hover::after {
          width: 100%;
        }

        /* ── RIGHT ICONS & ACTIONS ── */
        .nav-right-side {
          display: flex;
          align-items: center;
          gap: 25px;
        }

        .nav-icon {
          color: #ffffff;
          font-size: 18px;
          cursor: pointer;
          transition: transform 0.2s, color 0.3s;
          background: none;
          border: none;
          padding: 0;
        }

        .nav-icon:hover {
          color: #b38b53;
          transform: scale(1.1);
        }

        .cart-wrapper {
          position: relative;
        }

        .cart-badge {
          position: absolute;
          top: -8px;
          right: -10px;
          background-color: #b38b53;
          color: #ffffff;
          font-size: 10px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        .btn-auth-pill {
          text-decoration: none;
          background: transparent;
          color: #ffffff;
          border: 1px solid #b38b53;
          padding: 8px 22px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          transition: all 0.3s;
        }

        .btn-auth-pill:hover {
          background: #b38b53;
          color: #ffffff;
          box-shadow: 0 0 15px rgba(179, 139, 83, 0.4);
        }

        @media (max-width: 1024px) {
          .nav-menu-list { display: none; } /* Sembunyikan menu di tablet/mobile agar rapi */
        }
      `}</style>

      {/* Bagian Kiri: Logo (Mirip Referensi) */}
      <Link to="/" className="brand-wrapper">
        <img src="https://cdn-icons-png.flaticon.com/512/924/924514.png" alt="Cup Logo" className="brand-logo-img" />
        <h1 className="brand-name">Coffee<span>Shop</span></h1>
      </Link>

      {/* Bagian Tengah: Menu Navigasi Lengkap (Mirip Referensi) */}
      <ul className="nav-menu-list">
        <li><Link to="/guest" className="nav-item-link">Home</Link></li>
        <li><a href="#about" className="nav-item-link">About</a></li>
        <li><a href="#menu-preview" className="nav-item-link">Menu</a></li>
        <li><a href="#products" className="nav-item-link">Products</a></li>
        <li><a href="#review" className="nav-item-link">Review</a></li>
        <li><a href="#contacts" className="nav-item-link">Contacts</a></li>
        <li><a href="#blogs" className="nav-item-link">Blogs</a></li>
      </ul>

      {/* Bagian Kanan: Search, Cart, & Auth (Mirip Referensi) */}
      <div className="nav-right-side">
        {/* Ikon Search */}
        <button className="nav-icon" title="Search">
          🔍
        </button>

        {/* Ikon Cart dengan Badge */}
        <div className="cart-wrapper">
          <button className="nav-icon" title="Cart">
            🛒
          </button>
          <span className="cart-badge">0</span>
        </div>

        {/* Tombol Login/Member */}
        <Link to="/login" className="btn-auth-pill">
          Login
        </Link>
      </div>
    </nav>
  );
}