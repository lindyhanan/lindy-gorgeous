import { useState } from "react";

const FAQ_DATA = [
  {
    q: "Bagaimana cara mendaftar menjadi member?",
    a: "Cukup klik tombol 'Register' di pojok kanan atas, isi data diri Anda, dan konfirmasi email. Setelah itu Anda langsung terdaftar sebagai Member Regular dan bisa mulai mengumpulkan poin.",
  },
  {
    q: "Bagaimana sistem poin dan reward bekerja?",
    a: "Setiap transaksi Rp 10.000 menghasilkan 1 poin. Poin dapat ditukarkan dengan menu gratis atau voucher diskon melalui aplikasi. Poin tidak memiliki masa berlaku selama Anda tetap aktif bertransaksi minimal 1x dalam 6 bulan.",
  },
  {
    q: "Apa perbedaan tiap tier keanggotaan?",
    a: "Terdapat 3 tier: Regular (0-499 poin), Premium (500-1499 poin), dan VIP (1500+ poin). Semakin tinggi tier, semakin besar diskon, dan semakin eksklusif benefit yang didapatkan — termasuk akses menu limited edition.",
  },
  {
    q: "Apakah bisa order secara online?",
    a: "Tentu! Anda bisa memesan melalui sistem digital kami dan mengambil pesanan di outlet terdekat tanpa perlu mengantre. Fitur ini tersedia untuk semua member setelah login.",
  },
  {
    q: "Bagaimana cara mengikuti workshop brewing?",
    a: "Workshop diadakan setiap akhir pekan. Anda bisa mendaftar melalui halaman Services atau langsung datang ke outlet. Khusus member Premium & VIP mendapatkan prioritas seat dan diskon 20%.",
  },
  {
    q: "Apakah ada layanan catering untuk acara?",
    a: "Ya, kami menyediakan coffee catering untuk berbagai acara — corporate meeting, wedding, gathering, hingga private event. Hubungi tim kami melalui form Contact atau WhatsApp untuk konsultasi gratis.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <>
      <style>{`
        .faq-section {
          position: relative;
          padding: 100px 24px;
          overflow: hidden;
        }
        .faq-inner {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
        }
        .faq-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .faq-label {
          color: #b38b53;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin: 0 0 12px 0;
        }
        .faq-title {
          font-size: 30px;
          font-weight: 700;
          color: #ffffff;
          text-transform: uppercase;
          margin: 0;
        }
        .faq-divider {
          width: 64px;
          height: 2px;
          background: #b38b53;
          margin: 20px auto 0;
        }
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .faq-item {
          background: rgba(15, 12, 10, 0.5);
          border: 1px solid rgba(179, 139, 83, 0.08);
          border-radius: 14px;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .faq-item:hover {
          border-color: rgba(179, 139, 83, 0.2);
        }
        .faq-item.open {
          border-color: rgba(179, 139, 83, 0.3);
          background: rgba(20, 16, 14, 0.7);
        }
        .faq-question {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          cursor: pointer;
          gap: 16px;
          user-select: none;
        }
        .faq-q-text {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
          line-height: 1.4;
        }
        .faq-icon {
          font-size: 18px;
          color: #b38b53;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }
        .faq-item.open .faq-icon {
          transform: rotate(45deg);
        }
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, padding 0.4s ease;
        }
        .faq-item.open .faq-answer {
          max-height: 300px;
        }
        .faq-a-text {
          font-size: 13px;
          color: #a1a1aa;
          line-height: 1.7;
          margin: 0;
          padding: 0 24px 20px;
        }
        @media (min-width: 768px) {
          .faq-section { padding: 128px 64px; }
          .faq-title { font-size: 36px; }
          .faq-q-text { font-size: 15px; }
          .faq-question { padding: 24px 28px; }
          .faq-a-text { padding: 0 28px 24px; font-size: 14px; }
        }
      `}</style>

      <section className="faq-section" id="faq">
        <div className="faq-inner">
          <div className="faq-header">
            <p className="faq-label">FAQ</p>
            <h2 className="faq-title">Pertanyaan Umum</h2>
            <div className="faq-divider" />
          </div>

          <div className="faq-list">
            {FAQ_DATA.map((item, idx) => (
              <div
                key={idx}
                className={`faq-item ${openIdx === idx ? "open" : ""}`}
              >
                <div className="faq-question" onClick={() => toggle(idx)}>
                  <p className="faq-q-text">{item.q}</p>
                  <span className="faq-icon">+</span>
                </div>
                <div className="faq-answer">
                  <p className="faq-a-text">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
