import { useState, useEffect, useRef } from "react";

const BENEFITS_DATA = [
  { icon: "👥", number: 2500, suffix: "+", label: "Member Aktif", desc: "Komunitas pecinta kopi yang terus bertumbuh" },
  { icon: "☕", number: 15000, suffix: "+", label: "Kopi Tersaji", desc: "Cangkang kopi premium telah kami sajikan" },
  { icon: "⭐", number: 92, suffix: "%", label: "Kepuasan", desc: "Tingkat kepuasan member terhadap layanan" },
  { icon: "🏆", number: 3, suffix: "+", label: "Tahun Melayani", desc: "Konsisten menghadirkan rasa terbaik" },
];

function CountUp({ end, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Benefit() {
  return (
    <>
      <style>{`
        .benefit-section {
          position: relative;
          padding: 100px 24px;
          overflow: hidden;
        }
        .benefit-inner {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
        .benefit-header {
          text-align: center;
          margin-bottom: 56px;
        }
        .benefit-label {
          color: #b38b53;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin: 0 0 12px 0;
        }
        .benefit-title {
          font-size: 30px;
          font-weight: 700;
          color: #ffffff;
          text-transform: uppercase;
          margin: 0;
        }
        .benefit-divider {
          width: 64px;
          height: 2px;
          background: #b38b53;
          margin: 20px auto 0;
        }
        .benefit-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .benefit-card {
          background: rgba(15, 12, 10, 0.5);
          border: 1px solid rgba(179, 139, 83, 0.1);
          border-radius: 20px;
          padding: 32px 24px;
          text-align: center;
          transition: all 0.4s ease;
        }
        .benefit-card:hover {
          border-color: rgba(179, 139, 83, 0.3);
          background: rgba(26, 20, 16, 0.7);
          transform: translateY(-6px);
          box-shadow: 0 16px 32px rgba(0,0,0,0.3);
        }
        .benefit-icon {
          font-size: 36px;
          margin-bottom: 16px;
        }
        .benefit-number {
          font-size: 42px;
          font-weight: 800;
          color: #b38b53;
          line-height: 1;
          margin: 0 0 8px 0;
        }
        .benefit-label-text {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0 0 8px 0;
        }
        .benefit-desc {
          font-size: 13px;
          color: #a1a1aa;
          line-height: 1.5;
          margin: 0;
        }
        @media (min-width: 768px) {
          .benefit-section { padding: 128px 64px; }
          .benefit-title { font-size: 36px; }
          .benefit-grid { grid-template-columns: repeat(4, 1fr); gap: 24px; }
          .benefit-number { font-size: 48px; }
        }
      `}</style>

      <section className="benefit-section">
        <div className="benefit-inner">
          <div className="benefit-header">
            <p className="benefit-label">Our Impact</p>
            <h2 className="benefit-title">Coffee Dalam Angka</h2>
            <div className="benefit-divider" />
          </div>

          <div className="benefit-grid">
            {BENEFITS_DATA.map((item, idx) => (
              <div key={idx} className="benefit-card">
                <div className="benefit-icon">{item.icon}</div>
                <p className="benefit-number">
                  <CountUp end={item.number} suffix={item.suffix} />
                </p>
                <p className="benefit-label-text">{item.label}</p>
                <p className="benefit-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
