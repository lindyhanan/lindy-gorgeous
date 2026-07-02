import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <style>{`
        .footer {
          position: relative;
          padding: 48px 24px;
          border-top: 1px solid rgba(179, 139, 83, 0.1);
          overflow: hidden;
        }
        .footer-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .footer-logo {
          width: 32px;
          height: 32px;
          filter: brightness(0) invert(1);
        }
        .footer-brand-name {
          color: #ffffff;
          font-size: 18px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        .footer-brand-name span {
          color: #b38b53;
        }
        .footer-desc {
          color: #a1a1aa;
          font-size: 13px;
          line-height: 1.6;
          max-width: 280px;
          margin: 0;
        }
        .footer-heading {
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0 0 20px 0;
        }
        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-link {
          color: #a1a1aa;
          font-size: 13px;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .footer-link:hover {
          color: #b38b53;
        }
        .footer-contact-item {
          color: #a1a1aa;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .footer-social {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }
        .footer-social a {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .footer-social a:hover {
          background: rgba(179, 139, 83, 0.2);
          border-color: rgba(179, 139, 83, 0.3);
        }
        .footer-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(179, 139, 83, 0.2), transparent);
          margin-bottom: 24px;
        }
        .footer-copyright {
          color: #666;
          font-size: 12px;
          text-align: center;
          margin: 0;
        }
        @media (min-width: 768px) {
          .footer { padding: 48px 64px; }
          .footer-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 48px;
          }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            {/* Brand */}
            <div>
              <div className="footer-brand">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/924/924514.png"
                  alt="Coffee Cup"
                  className="footer-logo"
                />
                <span className="footer-brand-name">
                  Coffee<span>Shop</span>
                </span>
              </div>
              <p className="footer-desc">
                Premium coffee experience with digital loyalty ecosystem.
                Nikmati setiap tegukan bersama kami.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#home" className="footer-link">Home</a></li>
                <li><a href="#about" className="footer-link">About</a></li>
                <li><a href="#features" className="footer-link">Features</a></li>
                <li><a href="#services" className="footer-link">Services</a></li>
                <li><a href="#menu" className="footer-link">Menu</a></li>
                <li><a href="#faq" className="footer-link">FAQ</a></li>
                <li><a href="#contact" className="footer-link">Contact</a></li>
                <li><Link to="/login" className="footer-link">Login</Link></li>
                <li><Link to="/register" className="footer-link">Register</Link></li>
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h4 className="footer-heading">Contact</h4>
              <ul className="footer-links">
                <li className="footer-contact-item"><span>📍</span> Jl. Senopati Raya No. 42B, Jakarta Selatan</li>
                <li className="footer-contact-item"><span>📞</span> +62 812-3456-7890</li>
                <li className="footer-contact-item"><span>✉️</span> support@dogecoffee.com</li>
              </ul>
              <div className="footer-social">
                <a href="#" title="Instagram">📸</a>
                <a href="#" title="Twitter">🐦</a>
                <a href="#" title="Facebook">📘</a>
                <a href="#" title="TikTok">🎵</a>
              </div>
            </div>
          </div>

          <div className="footer-divider" />
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} CoffeeShop Privilege CRM System. All
            Rights Reserved. Designed with Cinematic Luxury.
          </p>
        </div>
      </footer>
    </>
  );
}
