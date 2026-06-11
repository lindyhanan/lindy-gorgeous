import { useState } from "react";
import Header from "../components/Header";
import CategoryTabs from "../components/CategoryTabs";
import ProductCard from "../components/ProductCard";
import OrderPanel from "../components/OrderPanel";

const ALL_PRODUCTS = [
  { id: 1, name: "Caramel Latte", rating: 4.8, reviews: 120, price: 28000, img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=300&q=80", category: "Kopi" },
  { id: 2, name: "Espresso Dolce", rating: 4.9, reviews: 85, price: 24000, img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=300&q=80", category: "Kopi" },
  { id: 3, name: "Premium Cappuccino", rating: 4.7, reviews: 140, price: 32000, img: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&q=80", category: "Kopi" },
  { id: 4, name: "Matcha Latte", rating: 4.6, reviews: 95, price: 26000, img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=300&q=80", category: "Kopi" },
  { id: 5, name: "Caramel Latte Ice", rating: 4.8, reviews: 110, price: 28000, img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=300&q=80", category: "Kopi" },
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
    <div style={{ padding: "30px", width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
      
      {/* FIXED: setQuery sekarang mengarah ke fungsi setSearchQuery yang benar */}
      <Header query={searchQuery} setQuery={setSearchQuery} />

      {/* RENDER VIEW DASHBOARD UTAMA */}
      {currentTab === "dashboard" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "30px", marginTop: "25px", alignItems: "start", width: "100%" }}>
          
          {/* SEKTOR KIRI: TABS & GRID PRODUK (AMBIL 3 KOLOM SEJAJAR) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", minWidth: 0 }}>
            <CategoryTabs active={activeCat} onChange={setActiveCat} />
            
            <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#ffffff", margin: "10px 0 0 0" }}>
              Menu {activeCat}
            </h2>
            
            {/* GRID DIKUNCI MATI 3 KOLOM MENYAMPING */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", width: "100%" }}>
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

          {/* SEKTOR KANAN: PANEL STRUK PESANAN */}
          <div style={{ width: "380px" }}>
            <OrderPanel items={cartItems} />
          </div>

        </div>
      )}

      {/* ROUTING CADANGAN TAB EXTRA */}
      {currentTab === "menu" && (
        <div style={{ padding: "40px", backgroundColor: "#ece6dc", color: "#2c2520", borderRadius: "24px", marginTop: "25px" }}>
          <h2>📋 Halaman Manajemen Stok & Menu</h2>
        </div>
      )}
      {currentTab === "orders" && (
        <div style={{ padding: "40px", backgroundColor: "#ece6dc", color: "#2c2520", borderRadius: "24px", marginTop: "25px" }}>
          <h2>◷ Riwayat Transaksi Kasir</h2>
        </div>
      )}
      {currentTab === "analytics" && (
        <div style={{ padding: "40px", backgroundColor: "#ece6dc", color: "#2c2520", borderRadius: "24px", marginTop: "25px" }}>
          <h2>📊 Laporan Grafik Analitik</h2>
        </div>
      )}
      {currentTab === "settings" && (
        <div style={{ padding: "40px", backgroundColor: "#ece6dc", color: "#2c2520", borderRadius: "24px", marginTop: "25px" }}>
          <h2>⚙️ Pengaturan Sistem Aplikasi</h2>
        </div>
      )}

    </div>
  );
}