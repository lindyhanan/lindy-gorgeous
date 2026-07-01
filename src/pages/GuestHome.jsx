import { useState } from "react";
import { Link } from "react-router-dom";
import GuestNavbar from "../components/GuestNavbar";

const FEATURED_MENUS = [
  { id: 1, name: "Caramel Latte Ice", price: 28000, img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&q=80", tag: "👑 Best Seller" },
  { id: 2, name: "Espresso Dolce", price: 24000, img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500&q=80", tag: "✨ Signature" },
  { id: 3, name: "Premium Cappuccino", price: 32000, img: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=500&q=80", tag: "☕ Hot Coffee" },
];

const PREMIUM_PRODUCTS = [
  { id: 1, name: "Toraja Arabica Beans 250g", price: 95000, img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&q=80", desc: "Whole beans dengan notes dark chocolate & spicy fruity." },
  { id: 2, name: "Gayo Honey Process 250g", price: 110000, img: "https://images.unsplash.com/photo-1606791405792-1004f1718d4c?w=500&q=80", desc: "Kopi premium pasca-panen madu, rasa manis eksotis alami." },
  { id: 3, name: "Signature Matte Tumbler", price: 185000, img: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=500&q=80", desc: "Double-wall stainless steel, tahan suhu dingin/panas hingga 12 jam." },
];

const REVIEWS = [
  { id: 1, name: "Adrian S.", role: "Coffee Enthusiast", text: "Vibe dark-nya dapet banget pas masuk web, pas ke outlet kopinya emang se-premium itu. Caramel Latte-nya gak terlalu manis, pas!", rating: "⭐⭐⭐⭐⭐" },
  { id: 2, name: "Nadia Putri", role: "Digital Nomad", text: "Sistem klaim poinnya gampang banget lewat web ini. Baristanya juga ramah pas nuker reward kopi gratisan kemarin.", rating: "⭐⭐⭐⭐⭐" },
  { id: 3, name: "Rian H.", role: "Culinary Blogger", text: "Biji kopi Toraja-nya fresh banget pas dibeli online. Roasting datenya baru seminggu yang lalu. Sangat profesional!", rating: "⭐⭐⭐⭐★" },
];

const BLOGS = [
  { id: 1, title: "Rahasia Roasting Biji Kopi Level Dunia", date: "28 Juni 2026", img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80", snippet: "Bagaimana suhu dan durasi memengaruhi munculnya notes eksotis pada biji kopi arabika premium..." },
  { id: 2, title: "Panduan Manual Brew di Rumah ala Barista", date: "15 Juni 2026", img: "https://images.unsplash.com/photo-1545665277-5937489579f2?w=500&q=80", snippet: "Ketahui rasio air dan gramasi yang tepat untuk teknik V60 agar tidak terlalu bitter atau sour..." },
];

export default function GuestHome() {
  const [isCsOpen, setIsCsOpen] = useState(false);
  const [isWaOpen, setIsWaOpen] = useState(true);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [coffeeCount, setCoffeeCount] = useState(4);

  const pointsEarned = coffeeCount * 15;
  const formatRupiah = (num) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);

  return (
    <div className="guest-container">
      <GuestNavbar />

      <style>{`
        /* ── GLOBAL RESET FIX PUTIH ── */
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          background-color: #0b0806 !important;
          width: 100%;
          overflow-x: hidden;
          scroll-behavior: smooth;
        }

        /* ── BACKDROP SETUP ── */
        .guest-container {
          background: linear-gradient(rgba(11, 8, 6, 0.92), rgba(15, 11, 9, 0.97)), 
                      url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1600&q=80');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          color: #f5f5f4;
          min-height: 100vh;
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
          position: relative;
          padding-top: 100px;
          width: 100%;
        }

        /* ── REUSABLE STRUCTURAL LAYOUT ── */
        .guest-section {
          padding: 100px 40px;
          max-width: 1200px;
          margin: 0 auto;
          box-sizing: border-box;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .section-header h2 {
          font-size: 42px;
          font-weight: 800;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: -0.5px;
        }
        .section-header p {
          color: #b38b53;
          font-size: 15px;
          margin-top: 10px;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        /* ── HERO SECTION ── */
        .guest-hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          min-height: calc(85vh - 100px);
        }
        .hero-text { flex: 1.1; display: flex; flex-direction: column; gap: 20px; text-shadow: 0 4px 12px rgba(0,0,0,0.6); }
        .hero-title { font-size: 64px; font-weight: 800; line-height: 1.1; margin: 0; color: #ffffff; letter-spacing: -1px; text-transform: uppercase; }
        .hero-desc { color: #d1d1d6; font-size: 16px; line-height: 1.7; margin: 0; max-width: 520px; }
        .btn-order-now {
          background-color: #b38b53; color: #ffffff; padding: 18px 44px; border-radius: 50px; font-weight: 700;
          text-decoration: none; transition: all 0.3s ease; width: fit-content; text-transform: uppercase;
          letter-spacing: 1px; font-size: 14px; box-shadow: 0 10px 25px rgba(179, 139, 83, 0.3); border: none; margin-top: 15px;
        }
        .btn-order-now:hover { background-color: #967241; transform: scale(1.03); box-shadow: 0 14px 30px rgba(179, 139, 83, 0.5); }
        .hero-image-area { flex: 0.9; display: flex; justify-content: center; position: relative; }
        .hero-img-cup { width: 100%; max-width: 420px; filter: drop-shadow(0 25px 35px rgba(0,0,0,0.75)); animation: floatEffect 6s ease-in-out infinite; }
        @keyframes floatEffect { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }

        /* ── VALUE PERKS ── */
        .perks-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-bottom: 40px; }
        .perk-item { background: rgba(20, 15, 12, 0.65); backdrop-filter: blur(16px); padding: 30px; border-radius: 20px; border: 1px solid rgba(179, 139, 83, 0.15); box-shadow: 0 15px 35px rgba(0,0,0,0.3); }
        .perk-item h4 { margin: 0 0 10px 0; font-size: 17px; color: #b38b53; font-weight: 600; }
        .perk-item p { margin: 0; font-size: 13.5px; color: #c7c7cc; line-height: 1.6; }

        /* ── ABOUT SECTION ── */
        .about-layout { display: flex; align-items: center; gap: 60px; }
        .about-img-frame { flex: 1; position: relative; }
        .about-img { width: 100%; height: 420px; object-fit: cover; border-radius: 24px; border: 1px solid rgba(179, 139, 83, 0.2); box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
        .about-content { flex: 1.2; display: flex; flex-direction: column; gap: 20px; }
        .about-content h3 { font-size: 32px; font-weight: 700; margin: 0; color: #ffffff; text-transform: uppercase; }
        .about-content p { color: #c7c7cc; line-height: 1.8; font-size: 15px; margin: 0; }

        /* ── GRID CARDS (MENU & PRODUCTS) ── */
        .card-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 35px; }
        .premium-card {
          background: rgba(22, 17, 14, 0.7); backdrop-filter: blur(12px); border-radius: 24px; padding: 16px; 
          border: 1px solid rgba(255, 255, 255, 0.04); display: flex; flex-direction: column; gap: 16px; 
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .premium-card:hover { transform: translateY(-10px); border-color: rgba(179, 139, 83, 0.35); box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6); background: rgba(31, 23, 19, 0.85); }
        .card-img-wrapper { position: relative; height: 250px; border-radius: 18px; overflow: hidden; }
        .card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
        .premium-card:hover .card-img { transform: scale(1.06); }
        .card-badge { position: absolute; top: 14px; left: 14px; background: rgba(11, 8, 6, 0.85); backdrop-filter: blur(8px); color: #b38b53; font-size: 11px; font-weight: 600; padding: 6px 14px; border-radius: 50px; border: 1px solid rgba(179, 139, 83, 0.25); }
        .card-meta { display: flex; justify-content: space-between; align-items: flex-start; padding: 4px; }
        .card-title-group { display: flex; flex-direction: column; gap: 4px; }
        .card-name { font-size: 18px; font-weight: 600; margin: 0; color: #ffffff; }
        .card-desc { font-size: 12.5px; color: #a1a1aa; margin: 0; line-height: 1.4; max-width: 190px; }
        .card-price { color: #b38b53; font-weight: 700; font-size: 18px; margin: 0; whitespace: nowrap; }

        /* ── REVIEWS SECTION ── */
        .review-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; }
        .review-card { background: rgba(17, 14, 12, 0.6); border: 1px solid rgba(179, 139, 83, 0.1); p-8: 30px; padding: 30px; border-radius: 20px; display: flex; flex-direction: column; gap: 14px; }
        .review-stars { color: #b38b53; font-size: 14px; letter-spacing: 2px; }
        .review-text { font-size: 14px; color: #d1d1d6; line-height: 1.6; font-style: italic; margin: 0; }
        .review-user { display: flex; flex-direction: column; gap: 2px; margin-top: auto; }
        .review-user-name { font-weight: 600; font-size: 15px; color: #ffffff; }
        .review-user-role { font-size: 12px; color: #a1a1aa; }

        /* ── BLOGS SECTION ── */
        .blog-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 35px; }
        .blog-card { background: rgba(22, 17, 14, 0.5); border-radius: 20px; overflow: hidden; border: 1px solid rgba(255,255,255,0.03); display: flex; flex-direction: column; transition: all 0.3s; }
        .blog-card:hover { border-color: rgba(179, 139, 83, 0.2); background: rgba(22, 17, 14, 0.8); }
        .blog-img-box { height: 220px; width: 100%; overflow: hidden; }
        .blog-img { width: 100%; height: 100%; object-fit: cover; }
        .blog-content { padding: 25px; display: flex; flex-direction: column; gap: 10px; }
        .blog-date { font-size: 11px; color: #b38b53; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        .blog-h3 { font-size: 20px; font-weight: 700; margin: 0; color: #ffffff; }
        .blog-snippet { font-size: 13.5px; color: #a1a1aa; line-height: 1.6; margin: 0; }

        /* ── CONTACTS SECTION ── */
        .contact-layout { display: grid; grid-template-columns: 1fr 1.2fr; gap: 50px; }
        .contact-info { display: flex; flex-direction: column; gap: 30px; }
        .contact-node { display: flex; gap: 16px; align-items: flex-start; }
        .contact-icon { font-size: 24px; color: #b38b53; }
        .contact-node h5 { margin: 0 0 4px 0; font-size: 16px; color: #ffffff; font-weight: 600; }
        .contact-node p { margin: 0; font-size: 14px; color: #a1a1aa; line-height: 1.5; }
        
        .contact-form { background: rgba(20, 15, 12, 0.6); padding: 40px; border-radius: 24px; border: 1px solid rgba(179, 139, 83, 0.15); display: flex; flex-direction: column; gap: 18px; }
        .form-input, .form-textarea {
          width: 100%; background: #0c0907; border: 1px solid rgba(255,255,255,0.08); padding: 14px 18px;
          border-radius: 12px; color: #ffffff; font-family: 'Poppins', sans-serif; font-size: 13.5px; box-sizing: border-box; outline: none; transition: border 0.3s;
        }
        .form-input:focus, .form-textarea:focus { border-color: #b38b53; }
        .form-textarea { height: 110px; resize: none; }
        .btn-submit { background-color: #b38b53; color: #ffffff; border: none; padding: 14px; border-radius: 12px; font-weight: 700; text-transform: uppercase; cursor: pointer; transition: background 0.2s; font-size: 13px; letter-spacing: 0.5px; }
        .btn-submit:hover { background-color: #967241; }

        /* ── CRM CALCULATOR BOX ── */
        .crm-calculator-box { background: linear-gradient(135deg, rgba(25, 19, 16, 0.8) 0%, rgba(15, 11, 9, 0.95) 100%); backdrop-filter: blur(20px); border-radius: 28px; padding: 45px; border: 1px solid rgba(179, 139, 83, 0.2); display: flex; align-items: center; justify-content: space-between; gap: 50px; box-shadow: 0 30px 60px rgba(0,0,0,0.5); }
        .calc-left { flex: 1.3; }
        .calc-right { background-color: #0b0806; padding: 35px; border-radius: 24px; text-align: center; min-width: 280px; border: 1px solid rgba(179, 139, 83, 0.15); box-shadow: inset 0 4px 15px rgba(0,0,0,0.8); }
        .range-slider { -webkit-appearance: none; width: 100%; height: 6px; background: #2b2018; border-radius: 10px; margin: 24px 0; outline: none; }
        .range-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 24px; height: 24px; border-radius: 50%; background: #b38b53; cursor: pointer; box-shadow: 0 0 14px rgba(179, 139, 83, 0.7); transition: transform 0.1s; }
        .range-slider::-webkit-slider-thumb:hover { transform: scale(1.25); }

        /* ── CS SYSTEM SIDEBAR ── */
        /* ── CS SYSTEM FLOATING SIDEBAR (FIXED Z-INDEX) ── */
        .cs-floating-btn {
          position: fixed;
          bottom: 35px;
          right: 35px;
          width: 68px;
          height: 68px;
          border-radius: 20px;
          background-color: #b38b53;
          color: #ffffff;
          border: none;
          cursor: pointer;
          box-shadow: 0 12px 30px rgba(179, 139, 83, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3000; /* Kita naikkan ke 3000 supaya DI ATAS panel chat (2001) */
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cs-floating-btn:hover { 
          transform: scale(1.06) translateY(-4px); 
          background-color: #967241; 
        }
        .cs-floating-btn svg { width: 32px; height: 32px; fill: currentColor; }

        .cs-chat-panel {
          position: fixed;
          top: 0;
          right: 0;
          width: 420px;
          height: 100vh;
          background-color: #0e0b09;
          color: #f5f5f4;
          box-shadow: -15px 0 40px rgba(0,0,0,0.7);
          z-index: 2001; /* Panel di lapisan 2001, di bawah tombol bulat */
          display: flex;
          flex-direction: column;
          border-left: 1px solid rgba(179, 139, 83, 0.2);
          animation: slideFromRight 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slideFromRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .cs-header { padding: 30px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); background-color: #130f0c; }
        .cs-header h3 { margin: 0; font-size: 19px; font-weight: 700; color: #ffffff; }
        .cs-close-btn { background: none; border: none; font-size: 20px; cursor: pointer; color: #a1a1aa; }
        .cs-body { padding: 24px; display: flex; flex-direction: column; gap: 16px; flex: 1; overflow-y: auto; }
        .cs-notice { color: #a1a1aa; font-size: 13.5px; line-height: 1.5; margin: 0 0 10px 0; }
        .accordion-item { background: #15110e; border-radius: 13px; border: 1px solid rgba(179, 139, 83, 0.1); overflow: hidden; }
        .accordion-trigger { width: 100%; padding: 18px 22px; display: flex; justify-content: space-between; align-items: center; background: none; border: none; font-weight: 600; text-align: left; cursor: pointer; color: #ffffff; font-size: 14.5px; }
        .accordion-trigger:hover { background: rgba(179, 139, 83, 0.04); }
        .accordion-content { padding: 0 22px 22px 22px; display: flex; flex-direction: column; gap: 12px; }
        .cs-btn-wa-node { background-color: #22c55e; color: #ffffff; border: none; padding: 14px 18px; border-radius: 12px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%; text-decoration: none; font-size: 13.5px; transition: background 0.2s; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2); }
        .cs-btn-wa-node:hover { background-color: #16a34a; }
        .cs-email-box { padding: 4px 0; font-size: 13.5px; color: #d1d1d6; line-height: 1.6; }
      `}</style>

      {/* ── 1. HERO SECTION ── */}
      <section className="guest-section guest-hero" id="home">
        <div className="hero-text">
          <h1 className="hero-title">Fresh Coffee<br />In The Morning</h1>
          <p className="hero-desc">
            Nikmati mahakarya seduhan biji kopi Nusantara organik pilihan yang dipanggang secara presisi. Gabung ekosistem reward loyalitas digital kami untuk klaim traktiran kopi gratis harian.
          </p>
          <Link to="/register" className="btn-order-now">Order Now</Link>
        </div>
        <div className="hero-image-area">
          <img src="https://i.ibb.co/vYm0F6x/coffee-cup-png.png" onError={(e)=>{e.target.src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80"}} alt="Premium Coffee Cup" className="hero-img-cup" />
        </div>
      </section>

      {/* Perks Grid */}
      <div className="guest-section" style={{ paddingTop: 0, paddingBottom: "50px" }}>
        <div className="perks-grid">
          <div className="perk-item">
            <h4>Biji Kopi Eksotis</h4>
            <p>100% menggunakan biji pilihan Single Origin terbaik nusantara dengan roasting profile optimal.</p>
          </div>
          <div className="perk-item">
            <h4>Multiplier Poin</h4>
            <p>Dapatkan skema akselerasi akumulasi poin loyalitas otomatis di setiap status penikmat kopi.</p>
          </div>
          <div className="perk-item">
            <h4>Reward Instan</h4>
            <p>Klaim keuntungan point voucher langsung di hadapan meja kasir tanpa proses administrasi rumit.</p>
          </div>
        </div>
      </div>

      {/* ── 2. ABOUT SECTION ── */}
      <section className="guest-section" id="about">
        <div className="about-layout">
          <div className="about-img-frame">
            <img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80" alt="Brewing Process" className="about-img" />
          </div>
          <div className="about-content">
            <h3 style={{color: '#b38b53', fontSize: '14px', letterSpacing: '2px'}}>Our Journey</h3>
            <h3>Kisah Di Balik Rasa Premium</h3>
            <p>
              Berdiri sejak tahun 2021, kami percaya bahwa secangkir kopi yang sempurna bermula dari integritas proses. Kami bekerja sama langsung dengan para petani lokal dari lereng Gayo hingga pegunungan Toraja demi memastikan keadilan ekosistem dan kualitas ceri kopi terbaik.
            </p>
            <p>
              Setiap batch biji kopi dipanggang menggunakan mesin berteknologi mutakhir terkontrol, melahirkan konsistensi aroma signature yang tidak akan Anda temukan di tempat lain.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. MENU PREVIEW SECTION ── */}
      <section className="guest-section" id="menu-preview">
        <div className="section-header">
          <h2>Menu Populer Pekan Ini</h2>
          <p>Esensial Espresso Terlaris Pilihan Komunitas Member</p>
        </div>
        <div className="card-grid">
          {FEATURED_MENUS.map((item) => (
            <div key={item.id} className="premium-card">
              <div className="card-img-wrapper">
                <img src={item.img} alt={item.name} className="card-img" />
                <div className="card-badge">{item.tag}</div>
              </div>
              <div className="card-meta">
                <div className="brand-title-group">
                  <h3 className="card-name">{item.name}</h3>
                  <p className="card-desc">Barista crafted espresso base blend.</p>
                </div>
                <p className="card-price">{formatRupiah(item.price)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. PRODUCTS SECTION ── */}
      <section className="guest-section" id="products">
        <div className="section-header">
          <h2>Merchandise & Coffee Pack</h2>
          <p>Bawa Pulang Pengalaman Kopi Eksklusif Ke Rumah Anda</p>
        </div>
        <div className="card-grid">
          {PREMIUM_PRODUCTS.map((prod) => (
            <div key={prod.id} className="premium-card">
              <div className="card-img-wrapper">
                <img src={prod.img} alt={prod.name} className="card-img" />
                <div className="card-badge">📦 Premium Store</div>
              </div>
              <div className="card-meta">
                <div className="brand-title-group">
                  <h3 className="card-name">{prod.name}</h3>
                  <p className="card-desc">{prod.desc}</p>
                </div>
                <p className="card-price">{formatRupiah(prod.price)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SIMULASI CRM INTEGRATED */}
      <section className="guest-section">
        <div className="crm-calculator-box">
          <div className="calc-left">
            <h4 style={{ margin: "0 0 12px 0", fontSize: "18px", color: "#ffffff", fontWeight: "500" }}>Konsumsi kopi mingguan Anda:</h4>
            <span style={{ fontSize: "34px", fontWeight: "800", color: "#b38b53" }}>{coffeeCount} Cangkir / Minggu</span>
            <input type="range" min="1" max="15" value={coffeeCount} onChange={(e) => setCoffeeCount(Number(e.target.value))} className="range-slider" />
            <p style={{ color: "#a1a1aa", fontSize: "13px", margin: "0" }}>*Kalkulasi berdasarkan base tier: 1 Transaksi Cangkir setara 15 Poin Keanggotaan.</p>
          </div>
          <div className="calc-right">
            <p style={{ fontSize: "11px", color: "#a1a1aa", margin: "0", letterSpacing: "1px", fontWeight: "600" }}>ESTIMASI POIN BULANAN</p>
            <h3 style={{ fontSize: "48px", fontWeight: "800", color: "#ffffff", margin: "6px 0" }}>{pointsEarned * 4}</h3>
            <div style={{ backgroundColor: "rgba(179, 139, 83, 0.12)", padding: "12px 14px", border: "1px solid rgba(179, 139, 83, 0.25)", borderRadius: "12px", fontSize: "12.5px", color: "#b38b53", fontWeight: "700" }}>
              {pointsEarned * 4 >= 150 ? "🎁 REWARD: 2 KOPI GRATIS!" : "🎁 REWARD: 1 KOPI GRATIS!"}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. REVIEW SECTION ── */}
      <section className="guest-section" id="review">
        <div className="section-header">
          <h2>Ulasan Anggota Kehormatan</h2>
          <p>Kisah Jujur Dari Mereka Yang Menemukan Arti Secangkir Kopi Sejati</p>
        </div>
        <div className="review-grid">
          {REVIEWS.map((rev) => (
            <div key={rev.id} className="review-card">
              <div className="review-stars">{rev.rating}</div>
              <p className="review-text">"{rev.text}"</p>
              <div className="review-user">
                <span className="review-user-name">{rev.name}</span>
                <span className="review-user-role">{rev.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. BLOGS SECTION ── */}
      <section className="guest-section" id="blogs">
        <div className="section-header">
          <h2>Wawasan & Artikel Kopi</h2>
          <p>Eksplorasi Edukasi Kultur Kopi Dari Seluruh Belahan Dunia</p>
        </div>
        <div className="blog-grid">
          {BLOGS.map((post) => (
            <div key={post.id} className="blog-card">
              <div className="blog-img-box">
                <img src={post.img} alt={post.title} className="blog-img" />
              </div>
              <div className="blog-content">
                <span className="blog-date">{post.date}</span>
                <h3 className="blog-h3">{post.title}</h3>
                <p className="blog-snippet">{post.snippet}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. CONTACTS SECTION ── */}
      <section className="guest-section" id="contacts">
        <div className="section-header">
          <h2>Hubungi Ruang Seduh Kami</h2>
          <p>Kritik, Saran Kemitraan, Atau Pertanyaan Operasional Terbuka 24/7</p>
        </div>
        <div className="contact-layout">
          <div className="contact-info">
            <div className="contact-node">
              <div className="contact-icon">📍</div>
              <div>
                <h5>Titik Lokasi Hub</h5>
                <p>Jl. Senopati Raya No. 42B, Selong, Kebayoran Baru, Jakarta Selatan</p>
              </div>
            </div>
            <div className="contact-node">
              <div className="contact-icon">📞</div>
              <div>
                <h5>Hotline Call Center</h5>
                <p>+62 (21) 555-9831 / +62 812-3456-789</p>
              </div>
            </div>
            <div className="contact-node">
              <div className="contact-icon">🕒</div>
              <div>
                <h5>Jam Operasional</h5>
                <p>Setiap Hari: 07.00 AM - 11.00 PM WIB</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={(e)=>e.preventDefault()}>
            <input type="text" placeholder="Nama Lengkap" className="form-input" required />
            <input type="email" placeholder="Alamat Email Aktif" className="form-input" required />
            <textarea placeholder="Tuliskan pesan atau konsultasi kemitraan Anda di sini..." className="form-textarea" required></textarea>
            <button type="submit" className="btn-submit">Kirim Pesan</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "30px 40px", textAlign: "center", fontSize: "13px", color: "#666" }}>
        © 2026 CoffeeShop Privilege CRM System. All Rights Reserved. Developed with Cinematic Luxury Design.
      </footer>

      {/* ── FLOATING WIDGET CUSTOMER SERVICE ── */}
      <button className="cs-floating-btn" onClick={() => setIsCsOpen(!isCsOpen)} aria-label="Open Support Hub">
        {isCsOpen ? (
          <span style={{ fontSize: "28px", fontWeight: "300" }}>✕</span>
        ) : (
          <svg viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
          </svg>
        )}
      </button>

      {isCsOpen && (
        <div className="cs-chat-panel">
          <div className="cs-header">
            <button className="cs-close-btn" onClick={() => setIsCsOpen(false)}>✕</button>
          </div>
          <div className="cs-body">
            <div className="accordion-item">
              <button className="accordion-trigger" onClick={() => setIsWaOpen(!isWaOpen)}>
                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>💬 Whatsapp Concierge</span>
                <span>{isWaOpen ? "▲" : "▼"}</span>
              </button>
              {isWaOpen && (
                <div className="accordion-content">
                  <p className="cs-notice">💁 Menghadapi kendala registrasi membership atau aktivasi poin? Silakan hubungi pusat bantuan agen resmi kami:</p>
                  <a href="https://wa.me/628123456789" target="_blank" rel="noreferrer" className="cs-btn-wa-node">🟢 Hubungi Admin 1</a>
                  <a href="https://wa.me/628123456789" target="_blank" rel="noreferrer" className="cs-btn-wa-node">🟢 Hubungi Admin 2</a>
                  <a href="https://wa.me/628123456789" target="_blank" rel="noreferrer" className="cs-btn-wa-node">🟢 Hubungi Admin 3</a>
                </div>
              )}
            </div>

            <div className="accordion-item">
              <button className="accordion-trigger" onClick={() => setIsEmailOpen(!isEmailOpen)}>
                <span>✉️ Official Email Support</span>
                <span>{isEmailOpen ? "▲" : "▼"}</span>
              </button>
              {isEmailOpen && (
                <div className="accordion-content">
                  <div className="cs-email-box">
                    Untuk urusan kemitraan bisnis (B2B), kendala sistem transaksi, atau kritik saran formal operasional kafe:<br />
                    <strong style={{ color: "#b38b53", display: "block", marginTop: "6px", fontSize: "15px" }}>support@dogecoffee.com</strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}