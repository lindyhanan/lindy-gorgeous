import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <>
      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 100px 24px 60px;
          overflow: hidden;
        }
        .hero-glow-1 {
          position: absolute;
          top: 25%;
          right: 0;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: rgba(179, 139, 83, 0.05);
          filter: blur(120px);
          pointer-events: none;
        }
        .hero-glow-2 {
          position: absolute;
          bottom: 25%;
          left: 0;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: rgba(179, 139, 83, 0.03);
          filter: blur(100px);
          pointer-events: none;
        }
        .hero-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 48px;
          flex-direction: column;
        }
        .hero-text {
          flex: 1;
          max-width: 600px;
        }
        .hero-label {
          color: #b38b53;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin: 0 0 16px 0;
        }
        .hero-title {
          font-size: 48px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.1;
          letter-spacing: -1px;
          text-transform: uppercase;
          margin: 0 0 24px 0;
        }
        .hero-title span {
          color: #b38b53;
        }
        .hero-desc {
          color: #d1d1d6;
          font-size: 16px;
          line-height: 1.7;
          max-width: 520px;
          margin: 0 0 32px 0;
        }
        .hero-btn {
          display: inline-block;
          background: #b38b53;
          color: #ffffff;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 16px 40px;
          border-radius: 999px;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .hero-btn:hover {
          background: #967241;
          box-shadow: 0 10px 25px rgba(179, 139, 83, 0.5);
          transform: scale(1.03);
        }
        .hero-image-wrap {
          flex: 1;
          display: flex;
          justify-content: center;
        }
        .hero-img {
          width: 100%;
          max-width: 400px;
          filter: drop-shadow(0 25px 35px rgba(0,0,0,0.75));
          animation: heroFloat 6s ease-in-out infinite;
        }
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @media (min-width: 768px) {
          .hero-inner { flex-direction: row; }
          .hero-title { font-size: 64px; }
          .hero-img { max-width: 480px; }
          .hero-section { padding: 100px 64px 60px; }
        }
        @media (min-width: 1024px) {
          .hero-title { font-size: 80px; }
        }
      `}</style>

      <section className="hero-section" id="home">
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />

        <div className="hero-inner">
          <div className="hero-text">
            <p className="hero-label">Dogee Coffee Premium</p>
            <h1 className="hero-title">
              Fresh Coffee<br /><span>In The Morning</span>
            </h1>
            <p className="hero-desc">
              Nikmati mahakarya seduhan biji kopi Nusantara organik pilihan yang
              dipanggang secara presisi. Gabung ekosistem reward loyalitas digital
              kami untuk klaim traktiran kopi gratis harian.
            </p>
            <Link to="/register" className="hero-btn">
              Order Now
            </Link>
          </div>

          <div className="hero-image-wrap">
            <img
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80"
              alt="Premium Coffee Cup"
              className="hero-img"
            />
          </div>
        </div>
      </section>
    </>
  );
}
