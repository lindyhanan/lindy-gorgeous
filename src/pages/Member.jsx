import { useState } from "react";
import { Link } from "react-router-dom";
import caramelLatte from "../assets/caramellatte.jpg";
import matchaLatte from "../assets/machalatte.jpg";
import croissantButter from "../assets/croissant butter.jpg";

export default function Member() {
  // State Pencarian (Header) & Dropdown Profile
  const [query, setQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // State Poin Dinamis Pelanggan
  const [points, setPoints] = useState(1250);

  // State untuk memisahkan TABS Penukaran Poin (Menu vs Voucher)
  const [exchangeTab, setExchangeTab] = useState("menu");

  // Data Menu Khusus Klaim Poin (Item Penukaran)
  const redeemMenuData = [
    {
      id: 1,
      name: "Caramel Latte (Gratis)",
      icon: "☕",
      image: caramelLatte,
      pointsCost: 500,
    },
    {
      id: 2,
      name: "Matcha Latte (Gratis)",
      icon: "🍵",
      image: matchaLatte,
      pointsCost: 450,
    },
    {
      id: 3,
      name: "Croissant Butter (Gratis)",
      icon: "🥐",
      image: croissantButter,
      pointsCost: 300,
    },
  ];

  // Data Voucher Khusus Klaim Poin (Item Penukaran)
  const redeemVoucherData = [
    {
      id: 1,
      title: "Potongan Rp 10k",
      desc: "Minimal transaksi Rp 30.000,00",
      code: "DOGE10K",
      pointsCost: 150,
    },
    {
      id: 2,
      title: "Diskon Akhir Pekan 25%",
      desc: "Khusus sabtu & minggu",
      code: "WEEKEND25",
      pointsCost: 300,
    },
    {
      id: 3,
      title: "Free Upgrade Size",
      desc: "Ubah ukuran Regular ke Large gratis",
      code: "UPSIZE",
      pointsCost: 100,
    },
  ];

  // Data Menu Bestseller (Katalog Display dengan Harga Normal)
  const bestsellerData = [
    {
      id: 1,
      name: "Caramel Latte",
      icon: "☕",
      image: caramelLatte,
      desc: "Perpaduan espresso berkualitas dan caramel yang lembut serta creamy.",
      price: "Rp 28.000,00",
    },
    {
      id: 2,
      name: "Matcha Latte",
      icon: "🍵",
      image: matchaLatte,
      desc: "Matcha premium dengan tekstur creamy dan rasa khas yang menyegarkan.",
      price: "Rp 26.000,00",
    },
    {
      id: 3,
      name: "Croissant Butter",
      icon: "🥐",
      image: croissantButter,
      desc: "Pendamping kopi paling populer dengan tekstur renyah di luar.",
      price: "Rp 18.000,00",
    },
  ];

  // Fungsi Penukaran Poin
  const handleRedeem = (itemCost, itemName) => {
    if (points >= itemCost) {
      setPoints(points - itemCost);
      alert(
        `🎉 Sukses! Anda berhasil menukarkan ${itemCost} Pts dengan: ${itemName}`,
      );
    } else {
      alert(
        "❌ Maaf, poin Anda tidak mencukupi untuk melakukan penukaran ini.",
      );
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f0e8",
        color: "#2c2520",
        minHeight: "100vh",
        padding: "40px 60px",
        fontFamily: "'Poppins', sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* ── STYLE SCOPE UNTUK HEADER & VOUCHER KUPON TIKET ── */}
      <style>{`
        .top-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 10px 0 25px 0;
          box-sizing: border-box;
          background: transparent;
          margin-bottom: 25px;
          border-bottom: 2px solid rgba(146, 99, 78, 0.1);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .brand-logo-text {
          font-size: 24px;
          font-weight: 800;
          color: #2c2520;
          letter-spacing: -0.5px;
          margin: 0;
        }

        .brand-logo-text span {
          color: #92634e;
        }

        .header-divider {
          width: 2px;
          height: 30px;
          background-color: rgba(44, 37, 32, 0.15);
        }

        .brand-title {
          font-size: 16px;
          font-weight: 500;
          color: #7d7771;
          margin: 0;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 24px; 
        }

        .search-box {
          display: flex;
          align-items: center;
          background-color: #ffffff; 
          border-radius: 30px;
          padding: 10px 20px;
          width: 320px;
          box-sizing: border-box;
          box-shadow: 0 4px 12px rgba(44, 37, 32, 0.03);
          border: 1px solid rgba(146, 99, 78, 0.1);
          transition: all 0.2s;
        }
        
        .search-box:focus-within {
          border-color: #92634e;
          box-shadow: 0 4px 16px rgba(146, 99, 78, 0.08);
        }

        .search-icon {
          font-size: 14px;
          margin-right: 12px;
          color: #92634e;
        }

        .search-input {
          background: transparent;
          border: none;
          outline: none;
          color: #2c2520;
          font-size: 13px;
          width: 100%;
          font-family: 'Poppins', sans-serif;
        }

        .search-input::placeholder {
          color: #a19a93;
        }

        .notif-btn {
          background-color: #ffffff;
          border: 1px solid rgba(146, 99, 78, 0.1);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          font-size: 16px;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(44, 37, 32, 0.03);
        }

        .notif-btn:hover {
          background-color: #f5f0e8;
          transform: translateY(-1px);
        }

        .notif-badge {
          position: absolute;
          top: 0;
          right: 0;
          background-color: #92634e; 
          color: #ffffff;
          font-size: 9px;
          font-weight: 700;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #ffffff;
        }

        .user-avatar-wrapper {
          position: relative; 
        }

        .user-avatar {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          user-select: none;
        }

        .user-avatar img {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #92634e;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .user-role {
          font-size: 10px;
          color: #92634e;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .user-name {
          font-size: 14px;
          font-weight: 700;
          color: #2c2520;
        }

        .auth-dropdown {
          position: absolute;
          top: 55px;
          right: 0;
          background-color: #ffffff;
          border: 1px solid rgba(146, 99, 78, 0.1);
          border-radius: 14px;
          width: 165px;
          box-shadow: 0 10px 30px rgba(44, 37, 32, 0.08);
          z-index: 999;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: dropDownFade 0.15s ease-out;
        }

        .dropdown-item {
          padding: 12px 16px;
          font-size: 13px;
          color: #2c2520;
          text-decoration: none;
          font-family: 'Poppins', sans-serif;
          transition: background 0.2s;
        }

        .dropdown-item:hover {
          background-color: #f5f0e8;
        }

        .dropdown-divider {
          height: 1px;
          background-color: rgba(0, 0, 0, 0.05);
          margin: 4px 0;
        }

        .logout-item {
          color: #c0392b;
        }

        .logout-item:hover {
          background-color: #fdf2f2;
        }

        /* ── PREMIUM TICKET DESIGN ── */
        .ticket-card {
          background: #ffffff;
          border: 1px solid rgba(146, 99, 78, 0.15);
          border-radius: 16px;
          position: relative;
          display: flex;
          align-items: center;
          padding: 20px 28px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(44, 37, 32, 0.02);
        }

        /* Setengah Lingkaran Robek Kiri & Kanan */
        .ticket-card::before, .ticket-card::after {
          content: '';
          position: absolute;
          width: 16px;
          height: 16px;
          background-color: #f5f0e8; /* Ikut warna bg utama luar */
          border-radius: 50%;
        }
        .ticket-card::before {
          left: -8px;
          top: calc(50% - 8px);
        }
        .ticket-card::after {
          right: -8px;
          top: calc(50% - 8px);
        }

        /* Garis Putus-putus Pemisah Potongan Tiket */
        .ticket-divider {
          border-left: 2px dashed rgba(146, 99, 78, 0.25);
          height: 50px;
          margin: 0 24px;
        }

        .exchange-nav-btn {
          padding: 10px 24px;
          font-size: 13px;
          font-weight: 600;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Poppins', sans-serif;
        }

        @keyframes dropDownFade {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ width: "100%", maxWidth: "1400px", margin: "0 auto" }}>
        {/* ========================================================
            SECTION 1: HEADER (MEMBER VERSION, NO ADD MENU)
           ======================================================== */}
        <header className="top-header">
          <div className="header-left">
            <h1 className="brand-logo-text">
              Doge<span>Coffee.</span>
            </h1>
            <div className="header-divider"></div>
            <h2 className="brand-title">Always give the best service</h2>
          </div>

          <div className="header-right">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                className="search-input"
                type="text"
                placeholder="Cari voucher atau menu..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <button className="notif-btn">
              🔔
              <span className="notif-badge">3</span>
            </button>

            <div className="user-avatar-wrapper">
              {/* Diubah dari Admin ke Gold Member biasa */}
              <div
                className="user-avatar"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <img src="https://i.imgur.com/yXOvdOS.jpeg" alt="User Avatar" />
                <div className="user-info">
                  <span className="user-role">Customer</span>
                  <span className="user-name">Congo ▾</span>
                </div>
              </div>

              {isDropdownOpen && (
                <div className="auth-dropdown">
                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    👤 Akun Saya
                  </Link>
                  <Link
                    to="/riwayat"
                    className="dropdown-item"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    📜 Riwayat Poin
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link
                    to="/logout"
                    className="dropdown-item logout-item"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    🚪 Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ========================================================
            SECTION 2: BANNER UTAMA (MEMBER INFO & POINTS)
           ======================================================== */}
        <section
          style={{
            backgroundColor: "#ece6dc",
            borderRadius: "28px",
            padding: "40px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
            marginBottom: "40px",
            border: "1px solid rgba(0, 0, 0, 0.02)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "30px",
            }}
          >
            <h1
              style={{
                fontSize: "2.2rem",
                fontWeight: "700",
                margin: 0,
                color: "#2c2520",
                letterSpacing: "-0.5px",
              }}
            >
              ☕ Doge Coffee Membership
            </h1>

            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "8px 20px",
                borderRadius: "14px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
              }}
            >
              <span
                style={{
                  color: "#2c2520",
                  fontWeight: "700",
                  fontSize: "14px",
                }}
              >
                🥈 Gold Member
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifycontent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "30px",
            }}
          >
            <p
              style={{
                color: "#7d7771",
                fontSize: "15px",
                lineHeight: "1.7",
                margin: 0,
                flex: "1 1 500px",
              }}
            >
              Kumpulkan terus keuntungan transaksi kamu! Setiap pembelanjaan
              senilai <b>Rp 1.000</b> otomatis menghasilkan <b>1 Poin</b>. Pilih
              metode klaim di bawah ini untuk menukarkan poinmu menjadi voucher
              diskon belanja atau menu kopi gratis.
            </p>

            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "16px 28px",
                borderRadius: "20px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.02)",
                minWidth: "200px",
                textAlign: "right",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  color: "#a19a93",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Total Poin Anda
              </span>
              <h2
                style={{
                  color: "#92634e",
                  fontSize: "2.4rem",
                  fontWeight: "800",
                  margin: "2px 0 0 0",
                }}
              >
                {points.toLocaleString("id-ID")}{" "}
                <span
                  style={{
                    fontSize: "1rem",
                    color: "#7d7771",
                    fontWeight: "500",
                  }}
                >
                  Pts
                </span>
              </h2>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 3: PENUKARAN VOUCHER & MENU (PAKAI POINT)
           ======================================================== */}
        <section
          style={{
            marginBottom: "40px",
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "24px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
              marginBottom: "25px",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  margin: 0,
                  color: "#2c2520",
                }}
              >
                🎁 Penukaran Point Member
              </h2>
              <p
                style={{
                  color: "#7d7771",
                  fontSize: "13px",
                  margin: "4px 0 0 0",
                }}
              >
                Silahkan tentukan item rewards pilihan Anda hari ini
              </p>
            </div>

            {/* Navigasi Tab Penukaran */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                backgroundColor: "#f5f0e8",
                padding: "6px",
                borderRadius: "14px",
              }}
            >
              <button
                className="exchange-nav-btn"
                onClick={() => setExchangeTab("menu")}
                style={{
                  backgroundColor:
                    exchangeTab === "menu" ? "#92634e" : "transparent",
                  color: exchangeTab === "menu" ? "#ffffff" : "#7d7771",
                }}
              >
                ☕ Menu Gratis
              </button>
              <button
                className="exchange-nav-btn"
                onClick={() => setExchangeTab("voucher")}
                style={{
                  backgroundColor:
                    exchangeTab === "voucher" ? "#92634e" : "transparent",
                  color: exchangeTab === "voucher" ? "#ffffff" : "#7d7771",
                }}
              >
                🎟️ Voucher Belanja
              </button>
            </div>
          </div>

          {/* Konten Berdasarkan Pilihan Tab */}
          {exchangeTab === "menu" ? (
            /* MENU GRATIS CARD GRID */
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
              }}
            >
              {redeemMenuData.map((menu) => (
                <div
                  key={menu.id}
                  style={{
                    backgroundColor: "#f5f0e8",
                    borderRadius: "18px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    border: "1px solid rgba(146,99,78,0.08)",
                  }}
                >
                  <img
                    src={menu.image}
                    alt={menu.name}
                    style={{
                      width: "100%",
                      height: "160px",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      padding: "18px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                          color: "#2c2520",
                          display: "block",
                        }}
                      >
                        {menu.icon} {menu.name}
                      </span>
                      <span
                        style={{
                          fontSize: "13px",
                          color: "#92634e",
                          fontWeight: "700",
                          display: "block",
                          marginTop: "2px",
                        }}
                      >
                        {menu.pointsCost} Pts
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        handleRedeem(menu.pointsCost, `Klaim Menu ${menu.name}`)
                      }
                      style={{
                        backgroundColor: "#92634e",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "10px",
                        padding: "8px 14px",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: "pointer",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      Tukar Menu
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* PENUKARAN VOUCHER (DESAIN TIKET ROBEK PREMIUM) */
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                gap: "20px",
              }}
            >
              {redeemVoucherData.map((voucher) => (
                <div key={voucher.id} className="ticket-card">
                  <div style={{ flexGrow: 1 }}>
                    <span
                      style={{
                        backgroundColor: "rgba(146, 99, 78, 0.1)",
                        color: "#92634e",
                        fontSize: "10px",
                        fontWeight: "700",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        display: "inline-block",
                        marginBottom: "6px",
                      }}
                    >
                      🎟️ REWARD VOUCHER
                    </span>
                    <h3
                      style={{
                        fontSize: "1.15rem",
                        fontWeight: "700",
                        margin: "0 0 4px 0",
                        color: "#2c2520",
                      }}
                    >
                      {voucher.title}
                    </h3>
                    <p
                      style={{
                        color: "#7d7771",
                        fontSize: "12px",
                        margin: 0,
                        lineHeight: "1.4",
                      }}
                    >
                      {voucher.desc}
                    </p>
                  </div>

                  <div className="ticket-divider"></div>

                  <div style={{ textAlign: "center", minWidth: "90px" }}>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "800",
                        color: "#92634e",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      {voucher.pointsCost} Pts
                    </span>
                    <button
                      onClick={() =>
                        handleRedeem(voucher.pointsCost, voucher.title)
                      }
                      style={{
                        backgroundColor: "#2c2520",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "8px",
                        padding: "6px 12px",
                        fontSize: "11px",
                        fontWeight: "600",
                        cursor: "pointer",
                        width: "100%",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      Tukar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ========================================================
            SECTION 4: PROMO YANG TERSEDIA BULAN INI (KEMBALI KE PREMIUM CARDS)
           ======================================================== */}
        <section style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              marginBottom: "20px",
              color: "#2c2520",
            }}
          >
            📅 Promo Yang Tersedia Bulan Ini
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "20px",
            }}
          >
            {[
              {
                title: "Buy 1 Get 1 Monday",
                desc: "Berlaku setiap hari Senin khusus untuk seluruh produk kopi kopi susu menggunakan member.",
                icon: "☕",
              },
              {
                title: "Birthday Sweet Discount",
                desc: "Nikmati potongan harga spesial sebesar 20% pada bulan ulang tahun Anda yang terdaftar resmi.",
                icon: "🎂",
              },
              {
                title: "Gratis Topping Jelly",
                desc: "Tambahkan topping boba / jelly premium gratis untuk semua minuman varian matcha series.",
                icon: "🍵",
              },
            ].map((promo, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#ffffff",
                  padding: "24px",
                  borderRadius: "18px",
                  boxShadow: "0 4px 15px rgba(44, 37, 32, 0.02)",
                  border: "1px solid rgba(146,99,78,0.1)",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    fontSize: "24px",
                    padding: "10px",
                    backgroundColor: "#f5f0e8",
                    borderRadius: "14px",
                  }}
                >
                  {promo.icon}
                </span>
                <div>
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "700",
                      margin: "0 0 6px 0",
                      color: "#92634e",
                    }}
                  >
                    {promo.title}
                  </h3>
                  <p
                    style={{
                      color: "#7d7771",
                      fontSize: "13px",
                      margin: 0,
                      lineHeight: "1.6",
                    }}
                  >
                    {promo.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 5: VOUCHER YANG TERSEDIA (DESAIN TIKET ROBEK ROW)
           ======================================================== */}
        <section style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              marginBottom: "20px",
              color: "#2c2520",
            }}
          >
            🎟️ Voucher Milik Anda
          </h2>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {[
              {
                title: "Diskon Member Baru",
                code: "WELCOMECOFFEE",
                expired: "31 Des 2026",
                benefit: "Potongan Rp 5.000",
              },
              {
                title: "Free Ongkir Drive-Thru",
                code: "DRIVETHRUFAST",
                expired: "30 Nov 2026",
                benefit: "Minimal Beli 2 Cup",
              },
            ].map((v, i) => (
              <div
                key={i}
                className="ticket-card"
                style={{ padding: "20px 35px" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "24px",
                    flexGrow: 1,
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#ffffff",
                      backgroundColor: "#92634e",
                      padding: "6px 14px",
                      borderRadius: "20px",
                      fontWeight: "600",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {v.benefit}
                  </span>
                  <div>
                    <h3
                      style={{
                        fontSize: "1.15rem",
                        fontWeight: "700",
                        margin: "0 0 2px 0",
                        color: "#2c2520",
                      }}
                    >
                      {v.title}
                    </h3>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#a19a93",
                        display: "block",
                      }}
                    >
                      ⏱️ Berlaku sampai: {v.expired}
                    </span>
                  </div>
                </div>

                <div
                  className="ticket-divider"
                  style={{ height: "45px" }}
                ></div>

                <div style={{ textAlign: "right", minWidth: "150px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#7d7771",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    KODE KUPON
                  </span>
                  <code
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#2c2520",
                      backgroundColor: "#f5f0e8",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      border: "1px dashed rgba(146,99,78,0.3)",
                      display: "inline-block",
                    }}
                  >
                    {v.code}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 6: MENU BEST SELLER DI COFFEE SHOP INI (DISPLAY)
           ======================================================== */}
        <section style={{ marginBottom: "25px" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              marginBottom: "24px",
              color: "#2c2520",
            }}
          >
            ⭐ Menu Best Seller di Coffee Shop Ini
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "30px",
            }}
          >
            {bestsellerData.map((menu) => (
              <div
                key={menu.id}
                style={{
                  backgroundColor: "#ece6dc",
                  borderRadius: "28px",
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  border: "1px solid rgba(0, 0, 0, 0.01)",
                }}
              >
                <img
                  src={menu.image}
                  alt={menu.name}
                  style={{ width: "100%", height: "220px", objectFit: "cover" }}
                />

                <div
                  style={{
                    padding: "24px",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "700",
                        marginBottom: "8px",
                        color: "#2c2520",
                      }}
                    >
                      {menu.icon} {menu.name}
                    </h3>
                    <p
                      style={{
                        color: "#7d7771",
                        fontSize: "13px",
                        lineHeight: "1.6",
                        marginBottom: "15px",
                        marginTop: 0,
                      }}
                    >
                      {menu.desc}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderTop: "1px solid rgba(0,0,0,0.05)",
                      paddingTop: "14px",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#a19a93",
                          display: "block",
                        }}
                      >
                        Harga
                      </span>
                      <span
                        style={{
                          color: "#2c2520",
                          fontSize: "1.1rem",
                          fontWeight: "700",
                        }}
                      >
                        {menu.price}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        alert(`Pesanan ${menu.name} ditambahkan ke kasir!`)
                      }
                      style={{
                        backgroundColor: "#2c2520",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "12px",
                        padding: "10px 18px",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: "pointer",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      Pesan Sekarang
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
