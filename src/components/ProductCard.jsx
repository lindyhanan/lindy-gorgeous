import { useState } from "react";
import Header from "../components/Header";
import CategoryTabs from "../components/CategoryTabs";
import ProductCard from "../components/ProductCard";
import OrderPanel from "../components/OrderPanel";

const ALL_PRODUCTS = [
  { id: 1, name: "Caramel Latte", rating: 4.8, reviews: 120, price: 28000, img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=300&q=80", category: "Kopi" },
  { id: 2, name: "Caramel Latte", rating: 4.8, reviews: 120, price: 28000, img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=300&q=80", category: "Kopi" },
  { id: 3, name: "Caramel Latte", rating: 4.8, reviews: 120, price: 28000, img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=300&q=80", category: "Kopi" },
  { id: 4, name: "Caramel Latte", rating: 4.8, reviews: 120, price: 28000, img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=300&q=80", category: "Kopi" },
  { id: 5, name: "Caramel Latte", rating: 4.8, reviews: 120, price: 28000, img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=300&q=80", category: "Kopi" },
];

export default function Dashboard({ activeTab = "dashboard" }) {
  const [activeCat, setActiveCat] = useState("Kopi");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const currentTab = activeTab.toLowerCase().trim();

  const filteredProducts = ALL_PRODUCTS.filter((p) => 
    p.category === activeCat && p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = (product) => {
    setCartItems((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) {
        return prev.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  return (
    <div className="kasir-view-root">
      
      {/* SCOPED CSS KHUSUS YANG DIISOLASI AGAR TIDAK DIGANGGU STYLESHEET LUAR */}
      <style>{`
        .kasir-view-root {
          padding: 30px;
          width: 100%;
          min-height: 100vh;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          background-color: transparent;
        }

        /* Pembungkus utama kasir membagi area Kiri dan Kanan */
        .kasir-master-grid {
          display: grid !important;
          grid-template-columns: 1fr 380px !important; /* Kiri sisa layar, kanan pas panel order */
          gap: 30px !important;
          margin-top: 25px !important;
          align-items: start !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }

        /* Bagian kiri yang menampung tabs dan katalog kopi */
        .kasir-left-panel {
          display: flex !important;
          flex-direction: column !important;
          gap: 20px !important;
          width: 100% !important;
          min-width: 0 !important; /* Mencegah flexbox mencekik lebar grid di dalamnya */
        }

        .kasir-title {
          font-size: 28px;
          font-weight: 700;
          color: #ffffff;
          margin: 10px 0 0 0;
        }

        /* ── GRID PRODUK SAKTI (DIPAKSA MEJAJAR KE SAMPING) ── */
        .kasir-products-grid-layout {
          display: grid !important;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)) !important; /* Otomatis membagi kolom rata kanan-kiri minimal lebar kartu 250px */
          gap: 25px !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }

        /* Bagian kanan pembungkus struk orderan */
        .kasir-right-panel {
          width: 380px !important;
          box-sizing: border-box !important;
        }

        /* Tampilan halaman cadangan */
        .kasir-subpage-card {
          padding: 40px; 
          background-color: #ece6dc; 
          color: #2c2520; 
          border-radius: 24px; 
          margin-top: 25px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }
      `}</style>

      {/* Tampilkan bagian pencarian di atas */}
      <Header query={searchQuery} setQuery={setSearchQuery} />

      {/* ── JIKA AKTIF DI HALAMAN UTAMA KASIR ── */}
      {currentTab === "dashboard" && (
        <div className="kasir-master-grid">
          
          {/* SEKTOR KIRI: Kategori, Judul Menu, dan Katalog Card */}
          <div className="kasir-left-panel">
            <CategoryTabs active={activeCat} onChange={setActiveCat} />
            
            <h2 className="kasir-title">Menu {activeCat}</h2>
            
            {/* Menggunakan nama class baru khusus terisolasi */}
            <div className="kasir-products-grid-layout">
              {filteredProducts.map((prod, idx) => (
                <ProductCard
                  key={idx}
                  image={prod.img}
                  name={prod.name}
                  price={prod.price}
                  rating={prod.rating}
                  reviews={prod.reviews}
                  onAdd={() => handleAddProduct(prod)}
                />
              ))}
            </div>
          </div>

          {/* SEKTOR KANAN: Order Panel */}
          <div className="kasir-right-panel">
            <OrderPanel items={cartItems} />
          </div>

        </div>
      )}

      {/* ── RUTE LAINNYA ── */}
      {currentTab === "menu" && (
        <div className="kasir-subpage-card">
          <h2>📋 Halaman Manajemen Stok & Menu</h2>
          <p style={{ marginTop: "10px", color: "#555" }}>Kelola database menu kafe kamu di sini.</p>
        </div>
      )}
      {currentTab === "orders" && (
        <div className="kasir-subpage-card">
          <h2>◷ Riwayat Transaksi Kasir</h2>
          <p style={{ marginTop: "10px", color: "#555" }}>Daftar semua struk pesanan lama.</p>
        </div>
      )}
      {currentTab === "analytics" && (
        <div className="kasir-subpage-card">
          <h2>📊 Laporan Grafik Analitik</h2>
          <p style={{ marginTop: "10px", color: "#555" }}>Statistik penjualan harian kafe.</p>
        </div>
      )}
      {currentTab === "settings" && (
        <div className="kasir-subpage-card">
          <h2>⚙️ Pengaturan Sistem Aplikasi</h2>
          <p style={{ marginTop: "10px", color: "#555" }}>Konfigurasi bluetooth printer, pajak toko, dsb.</p>
        </div>
      )}
    </div>
  );
}