import { useState, useEffect, useCallback } from "react";

const TESTIMONIALS = [
  {
    name: "Sarah Wijaya",
    role: "Member Premium — 2 Tahun",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=b38b53",
    quote: "Program loyalitas di CoffeeShop benar-benar beda. Setiap ngopi jadi poin yang bisa ditukar gratis. Udah 3 kali saya redeem kopi gratis!",
    rating: 5,
  },
  {
    name: "Dimas Pratama",
    role: "Member VIP — 1 Tahun",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dimas&backgroundColor=b38b53",
    quote: "Kopinya premium banget, apalagi varian Signature Cream Latte. Saya suka sistem tier-nya, makin tinggi tier makin besar diskonnya.",
    rating: 5,
  },
  {
    name: "Rina Amanda",
    role: "Member Regular — 6 Bulan",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rina&backgroundColor=b38b53",
    quote: "Pemesanan lewat digital system-nya gampang banget. Tinggal order, udah siap tinggal ambil. Cocok buat saya yang pagi-pagi buru ke kantor.",
    rating: 4,
  },
  {
    name: "Andi Firmansyah",
    role: "Member Premium — 8 Bulan",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andi&backgroundColor=b38b53",
    quote: "Workshop brewing-nya recommended banget! Saya jadi ngerti cara bikin kopi yang enak di rumah. Baristanya sabar ngajarin dari dasar.",
    rating: 5,
  },
  {
    name: "Maya Sari",
    role: "Member VIP — 1,5 Tahun",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya&backgroundColor=b38b53",
    quote: "Coffee subscription box-nya game changer! Setiap bulan dapet biji kopi berbeda dari berbagai daerah. Rasanya selalu fresh dan aromanya wow!",
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, next]);

  const t = TESTIMONIALS[current];

  return (
    <>
      <style>{`
        .testi-section {
          position: relative;
          padding: 100px 24px;
          overflow: hidden;
          background: linear-gradient(to bottom, #0b0806, #0d0a08, #0b0806);
        }
        .testi-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: rgba(179, 139, 83, 0.04);
          filter: blur(120px);
          pointer-events: none;
        }
        .testi-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
        }
        .testi-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .testi-label {
          color: #b38b53;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin: 0 0 12px 0;
        }
        .testi-title {
          font-size: 30px;
          font-weight: 700;
          color: #ffffff;
          text-transform: uppercase;
          margin: 0;
        }
        .testi-divider {
          width: 64px;
          height: 2px;
          background: #b38b53;
          margin: 20px auto 0;
        }
        .testi-card-wrap {
          width: 100%;
        }
        .testi-card {
          background: rgba(15, 12, 10, 0.6);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(179, 139, 83, 0.12);
          border-radius: 24px;
          padding: 40px 32px;
          text-align: center;
          transition: all 0.4s ease;
        }
        .testi-stars {
          display: flex;
          justify-content: center;
          gap: 4px;
          margin-bottom: 24px;
        }
        .testi-star {
          font-size: 20px;
          line-height: 1;
        }
        .testi-star.filled {
          color: #b38b53;
        }
        .testi-star.empty {
          color: rgba(179, 139, 83, 0.2);
        }
        .testi-quote {
          font-size: 16px;
          font-weight: 400;
          color: #d4d4d8;
          line-height: 1.8;
          font-style: italic;
          margin: 0 0 32px 0;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .testi-quote::before {
          content: '\u201c';
          color: #b38b53;
          font-size: 28px;
          font-weight: 700;
          line-height: 0;
          vertical-align: -6px;
          margin-right: 4px;
        }
        .testi-quote::after {
          content: '\u201d';
          color: #b38b53;
          font-size: 28px;
          font-weight: 700;
          line-height: 0;
          vertical-align: -6px;
          margin-left: 4px;
        }
        .testi-author {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }
        .testi-avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 2px solid rgba(179, 139, 83, 0.3);
        }
        .testi-name {
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 4px 0;
          text-align: left;
        }
        .testi-role {
          font-size: 12px;
          color: #b38b53;
          margin: 0;
          text-align: left;
        }
        .testi-nav {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 24px;
          margin-top: 32px;
        }
        .testi-arrow {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(179, 139, 83, 0.08);
          border: 1px solid rgba(179, 139, 83, 0.15);
          color: #a1a1aa;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Poppins', sans-serif;
        }
        .testi-arrow:hover {
          background: rgba(179, 139, 83, 0.2);
          color: #b38b53;
          border-color: rgba(179, 139, 83, 0.3);
        }
        .testi-dots {
          display: flex;
          gap: 8px;
        }
        .testi-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(179, 139, 83, 0.2);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }
        .testi-dot.active {
          background: #b38b53;
          width: 28px;
          border-radius: 4px;
        }
        @media (min-width: 768px) {
          .testi-section { padding: 128px 64px; }
          .testi-title { font-size: 36px; }
          .testi-card { padding: 48px 40px; }
          .testi-quote { font-size: 17px; }
        }
      `}</style>

      <section className="testi-section" id="testimonials">
        <div className="testi-glow" />

        <div className="testi-inner">
          <div className="testi-header">
            <p className="testi-label">Testimonials</p>
            <h2 className="testi-title">Apa Kata Mereka</h2>
            <div className="testi-divider" />
          </div>

          <div
            className="testi-card-wrap"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="testi-card">
              <div className="testi-stars">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className={`testi-star ${s <= t.rating ? "filled" : "empty"}`}>★</span>
                ))}
              </div>

              <p className="testi-quote">{t.quote}</p>

              <div className="testi-author">
                <img src={t.avatar} alt={t.name} className="testi-avatar" />
                <div>
                  <p className="testi-name">{t.name}</p>
                  <p className="testi-role">{t.role}</p>
                </div>
              </div>
            </div>

            <div className="testi-nav">
              <button className="testi-arrow" onClick={prev} aria-label="Previous">‹</button>
              <div className="testi-dots">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    className={`testi-dot ${idx === current ? "active" : ""}`}
                    onClick={() => { setCurrent(idx); setIsAutoPlaying(false); }}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
              <button className="testi-arrow" onClick={next} aria-label="Next">›</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
