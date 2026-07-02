import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <>
      <style>{`
        .cta-section {
          position: relative;
          padding: 80px 24px;
          overflow: hidden;
          background: linear-gradient(to bottom, #0b0806, #0e0a08, #0b0806);
        }
        .cta-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 300px;
          border-radius: 50%;
          background: rgba(179, 139, 83, 0.08);
          filter: blur(100px);
          pointer-events: none;
        }
        .cta-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }
        .cta-label {
          color: #b38b53;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin: 0 0 16px 0;
        }
        .cta-title {
          font-size: 30px;
          font-weight: 800;
          color: #ffffff;
          text-transform: uppercase;
          line-height: 1.2;
          margin: 0 0 24px 0;
        }
        .cta-title span {
          color: #b38b53;
        }
        .cta-desc {
          color: #a1a1aa;
          font-size: 15px;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto 40px;
        }
        .cta-btn {
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
        .cta-btn:hover {
          background: #967241;
          box-shadow: 0 10px 30px rgba(179, 139, 83, 0.5);
          transform: scale(1.03);
        }
        @media (min-width: 768px) {
          .cta-section { padding: 112px 64px; }
          .cta-title { font-size: 48px; }
          .cta-desc { font-size: 16px; }
        }
      `}</style>

      <section className="cta-section">
        <div className="cta-glow" />

        <div className="cta-inner">
          <p className="cta-label">Join Our Community</p>
          <h2 className="cta-title">
            Siap Menikmati <span>Kopi Premium</span> Bersama Kami?
          </h2>
          <p className="cta-desc">
            Daftar sekarang dan dapatkan akses penuh ke ekosistem loyalitas
            digital kami. Nikmati kemudahan pemesanan, akumulasi poin, dan
            berbagai keistimewaan eksklusif lainnya.
          </p>
          <Link to="/register" className="cta-btn">
            Join Member Now
          </Link>
        </div>
      </section>
    </>
  );
}
