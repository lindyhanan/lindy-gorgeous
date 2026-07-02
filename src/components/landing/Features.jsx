const FEATURES_DATA = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
      </svg>
    ),
    title: "Easy Ordering",
    description:
      "Kemudahan pemesanan digital melalui sistem kasir terintegrasi. Pesan menu favorit Anda cukup dalam beberapa klik tanpa antre.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
      </svg>
    ),
    title: "Instant Points",
    description:
      "Setiap transaksi menghasilkan poin loyalitas secara otomatis. Kumpulkan dan tukarkan dengan menu gratis atau voucher diskon spesial.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
      </svg>
    ),
    title: "Tier Privileges",
    description:
      "Nikmati diskon dan keistimewaan khusus berdasarkan level keanggotaan Anda. Semakin tinggi tier, semakin eksklusif benefit yang didapat.",
  },
];

export default function Features() {
  return (
    <>
      <style>{`
        .features-section {
          position: relative;
          padding: 100px 24px;
          overflow: hidden;
          background: linear-gradient(to bottom, #0b0806, #0d0a08, #0b0806);
        }
        .features-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: rgba(179, 139, 83, 0.03);
          filter: blur(150px);
          pointer-events: none;
        }
        .features-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
        .features-header {
          text-align: center;
          margin-bottom: 64px;
        }
        .features-label {
          color: #b38b53;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin: 0 0 12px 0;
        }
        .features-title {
          font-size: 30px;
          font-weight: 700;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: -0.5px;
          margin: 0;
        }
        .features-divider {
          width: 64px;
          height: 2px;
          background: #b38b53;
          margin: 20px auto 0;
        }
        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        .feature-card {
          background: rgba(15, 12, 10, 0.6);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(179, 139, 83, 0.1);
          border-radius: 16px;
          padding: 32px;
          transition: all 0.4s ease;
        }
        .feature-card:hover {
          border-color: rgba(179, 139, 83, 0.3);
          background: rgba(26, 20, 16, 0.8);
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }
        .feature-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background: rgba(179, 139, 83, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          margin-bottom: 20px;
          transition: background 0.3s ease;
        }
        .feature-card:hover .feature-icon {
          background: rgba(179, 139, 83, 0.2);
        }
        .feature-name {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 12px 0;
        }
        .feature-desc {
          color: #a1a1aa;
          font-size: 14px;
          line-height: 1.6;
          margin: 0;
        }
        @media (min-width: 768px) {
          .features-section { padding: 128px 64px; }
          .features-title { font-size: 36px; }
          .features-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 32px;
          }
        }
      `}</style>

      <section className="features-section" id="features">
        <div className="features-glow" />

        <div className="features-inner">
          <div className="features-header">
            <p className="features-label">Why Choose Us</p>
            <h2 className="features-title">Keunggulan Ekosistem Kami</h2>
            <div className="features-divider" />
          </div>

          <div className="features-grid">
            {FEATURES_DATA.map((feature, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-name">{feature.title}</h3>
                <p className="feature-desc">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
