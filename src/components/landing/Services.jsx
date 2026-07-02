const SERVICES_DATA = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" /><path d="M3 7v1a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V7" />
        <path d="M7 21V3h10v18" /><path d="M9 7h1" /><path d="M14 7h1" />
      </svg>
    ),
    title: "Catering & Event",
    description: "Layanan coffee catering untuk acara corporate, wedding, dan private gathering dengan barista profesional.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    title: "Workshop & Class",
    description: "Pelatihan brewing teknik dari dasar hingga mahir bersama roaster dan barista berpengalaman.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="M12 11v4" /><path d="M10 13h4" />
      </svg>
    ),
    title: "Subscription Box",
    description: "Langganan kopi bulanan — biji pilihan langsung dikirim ke rumah dengan resep eksklusif setiap bulan.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: "Custom Roasting",
    description: "Layanan roasting custom untuk biji kopi pilihan dengan profil rasa yang dapat disesuaikan.",
  },
];

export default function Services() {
  return (
    <>
      <style>{`
        .services-section {
          position: relative;
          padding: 100px 24px;
          overflow: hidden;
          background: linear-gradient(to bottom, #0b0806, #0d0a08, #0b0806);
        }
        .services-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: rgba(179, 139, 83, 0.04);
          filter: blur(150px);
          pointer-events: none;
        }
        .services-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
        .services-header {
          text-align: center;
          margin-bottom: 56px;
        }
        .services-label {
          color: #b38b53;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin: 0 0 12px 0;
        }
        .services-title {
          font-size: 30px;
          font-weight: 700;
          color: #ffffff;
          text-transform: uppercase;
          margin: 0;
        }
        .services-divider {
          width: 64px;
          height: 2px;
          background: #b38b53;
          margin: 20px auto 0;
        }
        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        .service-card {
          background: rgba(15, 12, 10, 0.6);
          border: 1px solid rgba(179, 139, 83, 0.1);
          border-radius: 16px;
          padding: 32px 28px;
          transition: all 0.4s ease;
          display: flex;
          flex-direction: column;
        }
        .service-card:hover {
          border-color: rgba(179, 139, 83, 0.3);
          background: rgba(26, 20, 16, 0.8);
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .service-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: rgba(179, 139, 83, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #b38b53;
          margin-bottom: 20px;
          transition: background 0.3s ease;
        }
        .service-card:hover .service-icon {
          background: rgba(179, 139, 83, 0.2);
        }
        .service-title {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 12px 0;
        }
        .service-desc {
          font-size: 14px;
          color: #a1a1aa;
          line-height: 1.7;
          margin: 0;
          flex: 1;
        }
        @media (min-width: 768px) {
          .services-section { padding: 128px 64px; }
          .services-title { font-size: 36px; }
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 28px;
          }
        }
        @media (min-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>

      <section className="services-section" id="services">
        <div className="services-glow" />

        <div className="services-inner">
          <div className="services-header">
            <p className="services-label">Our Services</p>
            <h2 className="services-title">Layanan Premium Kami</h2>
            <div className="services-divider" />
          </div>

          <div className="services-grid">
            {SERVICES_DATA.map((svc, idx) => (
              <div key={idx} className="service-card">
                <div className="service-icon">{svc.icon}</div>
                <h3 className="service-title">{svc.title}</h3>
                <p className="service-desc">{svc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
