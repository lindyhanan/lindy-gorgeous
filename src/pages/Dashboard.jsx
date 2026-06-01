import { useState } from "react";
import Header from "../components/Header";
import CategoryTabs from "../components/CategoryTabs";
import ProductCard from "../components/ProductCard";
import OrderPanel from "../components/OrderPanel";

// Mock Data untuk Riwayat Pesanan (/orders)
const MOCK_ORDERS = [
  { id: "#order2022", time: "14:32", items: "2x Cappuccino, 1x Latte", total: 114000, type: "Delivery", status: "Selesai" },
  { id: "#order2021", time: "13:15", items: "1x Macchiato, 1x Croissant", total: 46000, type: "Dine In", status: "Diproses" },
  { id: "#order2020", time: "11:02", items: "3x Espresso", total: 72000, type: "Pick Up", status: "Selesai" },
  { id: "#order2019", time: "09:45", items: "1x Mocha, 2x Almond Slice", total: 38000, type: "Dine In", status: "Batal" },
];

// Database Menu Kasir Terpusat
const ALL_PRODUCTS = [
  { id: 1, name: "Macchiato", rating: 4.7, reviews: 230, price: 24000, img: "https://images.unsplash.com/photo-1485808191679-5f86510bd9d7?w=300&q=80", category: "Kopi", stock: 45 },
  { id: 2, name: "Mocha", rating: 4.5, reviews: 105, price: 24000, img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&q=80", category: "Kopi", stock: 32 },
  { id: 3, name: "Espresso", rating: 4.8, reviews: 35, price: 24000, img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=300&q=80", category: "Kopi", stock: 80 },
  { id: 4, name: "Latte", rating: 4.6, reviews: 88, price: 24000, img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=300&q=80", category: "Kopi", stock: 15 },
  { id: 5, name: "Cappuccino", rating: 4.9, reviews: 120, price: 44000, img: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&q=80", category: "Kopi", stock: 22 },
  { id: 6, name: "Choco Topping", rating: 4.4, reviews: 90, price: 5000, img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=80", category: "Topping", stock: 120 },
  { id: 7, name: "Almond Slice", rating: 4.6, reviews: 45, price: 7000, img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&q=80", category: "Topping", stock: 60 },
  { id: 8, name: "Arabica Gayo", rating: 4.9, reviews: 75, price: 85000, img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&q=80", category: "Bubuk Kopi", stock: 18 },
  { id: 9, name: "Croissant", rating: 4.7, reviews: 110, price: 22000, img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&q=80", category: "Snack", stock: 25 }
];

export default function Dashboard({ activeTab = "dashboard" }) {
  const [activeCat, setActiveCat] = useState("Kopi");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  
  // State interaktif tambahan untuk halaman Settings
  const [taxRate, setTaxRate] = useState(10);
  const [printerStatus, setPrinterStatus] = useState("Terhubung");

  const handleAdd = (id) => {
    setCartItems((prev) => {
      const exist = prev.find((item) => item.id === id);
      if (exist) {
        return prev.map((item) => item.id === id ? { ...item, qty: item.qty + 1 } : item);
      } else {
        const product = ALL_PRODUCTS.find((p) => p.id === id);
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  const handleRemove = (id) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item)).filter((item) => item.qty > 0)
    );
  };

  const filteredProducts = ALL_PRODUCTS.filter((p) => {
    const matchesCategory = p.category === activeCat;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="dashboard-container">
      <Header query={searchQuery} setQuery={setSearchQuery} />

      {/* ── 1. DASHBOARD UTAMA (KASIR) ── */}
      {activeTab === "dashboard" && (
        <div className="dashboard-content-grid">
          <div className="menu-left-side">
            <CategoryTabs active={activeCat} onChange={setActiveCat} />
            <h2 className="section-title">Menu {activeCat}</h2>
            <div className="products-grid">
              {filteredProducts.map((prod) => {
                const inCart = cartItems.find((c) => c.id === prod.id);
                const currentQty = inCart ? inCart.qty : 0;
                return (
                  <ProductCard
                    key={prod.id}
                    item={{ ...prod, price: "Rp " + prod.price.toLocaleString("id-ID") + ",00" }}
                    qty={currentQty}
                    onAdd={handleAdd}
                    onRemove={handleRemove}
                    onTambah={() => handleAdd(prod.id)}
                  />
                );
              })}
            </div>
          </div>
          <div className="order-right-side">
            <OrderPanel items={cartItems} />
          </div>
        </div>
      )}

      {/* ── 2. MANAJEMEN MENU (/menu) ── */}
      {activeTab === "menu" && (
        <div className="subview-panel">
          <div className="panel-header-inline">
            <h2>📋 Manajemen Stok & Menu</h2>
            <button className="panel-action-btn">+ Tambah Item Baru</button>
          </div>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Gambar</th>
                <th>Nama Produk</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th>Sisa Stok</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {ALL_PRODUCTS.map((prod) => (
                <tr key={prod.id}>
                  <td><img src={prod.img} alt={prod.name} className="table-img-thumb" /></td>
                  <td className="font-bold">{prod.name}</td>
                  <td><span className="badge-category">{prod.category}</span></td>
                  <td>Rp {prod.price.toLocaleString("id-ID")}</td>
                  <td>
                    <span className={`stock-indicator ${prod.stock < 20 ? "low" : "safe"}`}>
                      {prod.stock} pcs
                    </span>
                  </td>
                  <td>
                    <button className="action-icon-btn" onClick={() => alert(`Edit ${prod.name}`)}>✏️</button>
                    <button className="action-icon-btn delete" onClick={() => alert(`Hapus ${prod.name}`)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── 3. RIWAYAT ORDERS (/orders) ── */}
      {activeTab === "orders" && (
        <div className="subview-panel">
          <h2>◷ Riwayat Transaksi Kasir</h2>
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID Order</th>
                <th>Waktu</th>
                <th>Daftar Belanjaan</th>
                <th>Total Bayar</th>
                <th>Tipe</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ORDERS.map((order) => (
                <tr key={order.id}>
                  <td className="font-bold text-terracotta">{order.id}</td>
                  <td>{order.time} WIB</td>
                  <td className="text-muted">{order.items}</td>
                  <td>Rp {order.total.toLocaleString("id-ID")}</td>
                  <td><span className="badge-type">{order.type}</span></td>
                  <td>
                    <span className={`status-pill ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── 4. ANALYTICS VIEW (/analytics) ── */}
      {activeTab === "analytics" && (
        <div className="analytics-grid-layout">
          <div className="stats-cards-wrapper">
            <div className="metric-card">
              <span className="metric-title">Total Pendapatan</span>
              <h3>Rp 12.5M</h3>
              <span className="metric-trend up">+12.4% dari bulan lalu</span>
            </div>
            <div className="metric-card">
              <span className="metric-title">Pesanan Masuk</span>
              <h3>245 Orders</h3>
              <span className="metric-trend up">+8.2% hari ini</span>
            </div>
            <div className="metric-card">
              <span className="metric-title">Pelanggan Baru</span>
              <h3>1.2K Users</h3>
              <span className="metric-trend down">-2.1% minggu ini</span>
            </div>
          </div>

          <div className="chart-placeholder-box">
            <h4>📈 Grafik Grafik Tren Penjualan (Revenue Analytics)</h4>
            <div className="visual-bar-chart">
              <div className="bar" style={{ height: "40%" }} data-month="Jan"></div>
              <div className="bar" style={{ height: "65%" }} data-month="Feb"></div>
              <div className="bar" style={{ height: "85%" }} data-month="Mar"></div>
              <div className="bar" style={{ height: "50%" }} data-month="Apr"></div>
              <div className="bar active" style={{ height: "95%" }} data-month="Mei"></div>
            </div>
          </div>
        </div>
      )}

      {/* ── 5. SETTINGS (/settings) ── */}
      {activeTab === "settings" && (
        <div className="settings-grid-layout">
          <div className="subview-panel">
            <h2>⚙️ Konfigurasi Sistem Kasir</h2>
            <div className="settings-row">
              <label>Besar Pajak (%)</label>
              <input 
                type="number" 
                value={taxRate} 
                onChange={(e) => setTaxRate(e.target.value)} 
                className="settings-input"
              />
            </div>
            <div className="settings-row">
              <label>Status Printer Struk</label>
              <select 
                value={printerStatus} 
                onChange={(e) => setPrinterStatus(e.target.value)}
                className="settings-input"
              >
                <option value="Terhubung">Terhubung (Thermal 80mm)</option>
                <option value="Terputus">Terputus / Offline</option>
              </select>
            </div>
            <button className="panel-action-btn" onClick={() => alert("Pengaturan disimpan!")}>
              Simpan Perubahan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}