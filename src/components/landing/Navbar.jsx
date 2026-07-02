import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnchor = (e, id) => {
    e.preventDefault();
    setIsMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: isScrolled ? "10px 24px" : "18px 24px",
    transition: "all 0.4s ease",
    backgroundColor: isScrolled ? "rgba(11, 8, 6, 0.8)" : "transparent",
    backdropFilter: isScrolled ? "blur(16px)" : "none",
    borderBottom: isScrolled ? "1px solid rgba(179, 139, 83, 0.2)" : "1px solid transparent",
    boxSizing: "border-box",
  };

  const linkStyle = {
    color: "rgba(255,255,255,0.8)",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "1.2px",
  };

  const btnBase = {
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "1px",
    padding: "8px 20px",
    borderRadius: "999px",
    textDecoration: "none",
    transition: "all 0.3s ease",
    fontFamily: "'Poppins', sans-serif",
  };

  return (
    <>
      <style>{`
        .guest-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .guest-nav-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .guest-nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }
        .guest-nav-link {
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          position: relative;
          transition: color 0.3s ease;
          cursor: pointer;
        }
        .guest-nav-link:hover {
          color: #b38b53;
        }
        .guest-nav-link::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #b38b53;
          transition: width 0.3s ease;
        }
        .guest-nav-link:hover::after {
          width: 100%;
        }
        .guest-btn-login {
          color: #ffffff;
          border: 1px solid #b38b53;
          background: transparent;
        }
        .guest-btn-login:hover {
          background: #b38b53;
          box-shadow: 0 0 15px rgba(179,139,83,0.4);
        }
        .guest-btn-register {
          color: #ffffff;
          background: #b38b53;
          border: 1px solid #b38b53;
        }
        .guest-btn-register:hover {
          background: #967241;
          box-shadow: 0 0 15px rgba(179,139,83,0.5);
        }
        .guest-mobile-btn {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
          padding: 4px;
        }
        .guest-mobile-menu {
          display: none;
        }
        @media (max-width: 767px) {
          .guest-nav-links {
            display: none;
          }
          .guest-btn-login {
            display: none;
          }
          .guest-mobile-btn {
            display: block;
          }
          .guest-mobile-menu.open {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
            padding: 24px;
            background: rgba(11,8,6,0.95);
            border-bottom: 1px solid rgba(179,139,83,0.2);
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
          }
          .guest-mobile-menu a,
          .guest-mobile-menu .guest-nav-link {
            width: 100%;
            text-align: center;
            padding: 12px;
          }
        }
        @media (min-width: 768px) {
          .guest-mobile-btn {
            display: none !important;
          }
          .guest-mobile-menu {
            display: none !important;
          }
        }
      `}</style>

      <nav style={navStyle}>
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleAnchor(e, "home")}
          style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/924/924514.png"
            alt="Coffee Cup"
            style={{ width: "32px", height: "32px", filter: "brightness(0) invert(1)" }}
          />
          <span style={{ color: "#ffffff", fontSize: "18px", fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", whiteSpace: "nowrap" }}>
            Coffee<span style={{ color: "#b38b53" }}>Shop</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="guest-nav-links">
          <a href="#about" onClick={(e) => handleAnchor(e, "about")} className="guest-nav-link">About</a>
          <a href="#features" onClick={(e) => handleAnchor(e, "features")} className="guest-nav-link">Features</a>
          <a href="#services" onClick={(e) => handleAnchor(e, "services")} className="guest-nav-link">Services</a>
          <a href="#menu" onClick={(e) => handleAnchor(e, "menu")} className="guest-nav-link">Menu</a>
          <a href="#testimonials" onClick={(e) => handleAnchor(e, "testimonials")} className="guest-nav-link">Testimonials</a>
          <a href="#faq" onClick={(e) => handleAnchor(e, "faq")} className="guest-nav-link">FAQ</a>
          <a href="#contact" onClick={(e) => handleAnchor(e, "contact")} className="guest-nav-link">Contact</a>
        </div>

        {/* Right: Auth Buttons + Mobile Toggle */}
        <div className="guest-nav-right">
          {/* Mobile Hamburger */}
          <button
            className="guest-mobile-btn"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? "✕" : "☰"}
          </button>

          {/* Login */}
          <Link
            to="/login"
            className="guest-btn-login"
            style={btnBase}
          >
            Login
          </Link>

          {/* Register */}
          <Link
            to="/register"
            className="guest-btn-register"
            style={btnBase}
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className={`guest-mobile-menu ${isMobileOpen ? "open" : ""}`}>
          <a href="#about" onClick={(e) => handleAnchor(e, "about")} className="guest-nav-link">About</a>
          <a href="#features" onClick={(e) => handleAnchor(e, "features")} className="guest-nav-link">Features</a>
          <a href="#services" onClick={(e) => handleAnchor(e, "services")} className="guest-nav-link">Services</a>
          <a href="#menu" onClick={(e) => handleAnchor(e, "menu")} className="guest-nav-link">Menu</a>
          <a href="#testimonials" onClick={(e) => handleAnchor(e, "testimonials")} className="guest-nav-link">Testimonials</a>
          <a href="#faq" onClick={(e) => handleAnchor(e, "faq")} className="guest-nav-link">FAQ</a>
          <a href="#contact" onClick={(e) => handleAnchor(e, "contact")} className="guest-nav-link">Contact</a>
          <div style={{ width: "100%", height: "1px", background: "rgba(179,139,83,0.2)", margin: "8px 0" }} />
          <Link
            to="/login"
            onClick={() => setIsMobileOpen(false)}
            style={{ ...btnBase, border: "1px solid #b38b53", background: "transparent", color: "#fff", width: "100%", textAlign: "center" }}
          >
            Login
          </Link>
        </div>
      </nav>
    </>
  );
}
