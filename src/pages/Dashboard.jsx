import { useState, memo, useCallback } from "react";
import Header from "../components/Header";
import CategoryTabs from "../components/CategoryTabs";
import { supabase } from "../lib/supabase";

const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Caramel Latte",
    rating: 4.8,
    reviews: 120,
    price: 28000,
    img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=300&q=80",
    category: "Kopi",
  },
  {
    id: 2,
    name: "Espresso Dolce",
    rating: 4.9,
    reviews: 85,
    price: 24000,
    img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=300&q=80",
    category: "Kopi",
  },
  {
    id: 3,
    name: "Premium Cappuccino",
    rating: 4.7,
    reviews: 140,
    price: 32000,
    img: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&q=80",
    category: "Kopi",
  },
  {
    id: 4,
    name: "Matcha Latte",
    rating: 4.6,
    reviews: 95,
    price: 26000,
    img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=300&q=80",
    category: "Kopi",
  },
  {
    id: 5,
    name: "Caramel Latte Ice",
    rating: 4.8,
    reviews: 110,
    price: 28000,
    img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=300&q=80",
    category: "Kopi",
  },
];
const DASHBOARD_STYLES = `
  /* ── 1. GLOBAL & BODY RESET ── */
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden; /* MATIKAN SCROLL HORIZONTAL DI SINI */
    box-sizing: border-box;
    background-color: #2a2a2a;
    font-family: 'Poppins', sans-serif;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  /* ── 2. DASHBOARD CONTAINER ── */
  .dashboard-container {
    display: flex;
    width: 100%;
    min-height: 100vh;
    background-color: #2a2a2a;
    position: relative;
    overflow-x: hidden; /* MEMOTONG ELEMEN LENGKUNGAN YANG BOCOR KELUAR LAYAR */
  }

  /* ── 3. MAIN CONTENT AREA ── */
  .dashboard-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 30px;
    padding-left: 145px; /* 95px (lebar sidebar) + 20px (margin left) + 30px (jarak aman) */
    gap: 25px;
    min-width: 0;
  }

  /* ── 4. CONTENT GRID WRAPPER ── */
  .dashboard-content {
    display: grid;
    /* Kolom kiri fleksibel (1fr), kolom kanan (Order Panel) tetap di 420px */
    grid-template-columns: 1fr 420px; 
    gap: 30px;
    width: 100%;
  }

  /* RESPONSIVE BREAKPOINT UNTUK LAYAR KECIL/LAPTOP STANDAR */
  @media (max-width: 1200px) {
    .dashboard-content {
      grid-template-columns: 1fr; /* Panel pesanan pindah ke bawah jika layar sempit */
    }
  }

  /* ── 5. PRODUCTS SECTION ── */
  .products-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-width: 0;
  }

  .menu-title {
    font-size: 28px;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
  }

  .products-grid {
    display: grid;
    /* Mengembalikan grid statis 2 kolom sesuai desain awal Anda */
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    width: 100%;
  }

  @media (max-width: 768px) {
    .products-grid {
      grid-template-columns: 1fr; /* Menjadi 1 kolom di mobile */
    }
  }

  /* ── 6. PRODUCT CARD ── */
  .product-card {
    width: 100%;
    background: #f5f2f0;
    border-radius: 30px; 
    padding: 24px;
    transition: all 0.3s ease;
  }

  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }

  .product-top {
    display: flex;
    gap: 16px;
  }

  .product-img {
    width: 92px;
    height: 92px;
    object-fit: cover;
    border-radius: 18px;
  }

  .product-info h3 {
    margin: 0;
    color: #2c2520;
    font-size: 1.6rem;
    font-weight: 700;
  }

  .product-info p {
    margin-top: 8px;
    color: #666;
    line-height: 1.4;
    font-size: 0.95rem;
  }

  .product-stats {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }

  .stat {
    display: flex;
    flex-direction: column;
  }

  .stat span {
    color: #777;
    font-size: 13px;
  }

  .stat strong {
    margin-top: 6px;
    color: #b17457;
    font-size: 1.3rem;
    font-weight: 700;
  }

  .divider {
    height: 1px;
    background: #ddd;
    margin: 18px 0;
    border: none;
  }

  .size-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .size-section > span {
    color: #777;
    font-weight: 600;
    font-size: 13px;
  }

  .size-list {
    display: flex;
    gap: 10px;
  }

  .size-btn {
    width: 46px;
    height: 36px;
    border: none;
    border-radius: 10px;
    background: #ddd8d2;
    cursor: pointer;
    font-weight: 600;
    color: #2c2520;
    transition: all 0.2s ease;
    font-family: 'Poppins', sans-serif;
  }

  .size-btn:hover {
    background: #cdc5b9;
  }

  .size-btn.active {
    background: #7c8186;
    color: white;
  }

  .add-btn {
    width: 100%;
    margin-top: 18px;
    border: none;
    background: #9d673f;
    color: white;
    font-weight: 700;
    font-size: 1rem;
    padding: 14px;
    border-radius: 18px;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    transition: all 0.2s ease;
  }

  .add-btn:hover {
    background: #8a5a34;
    transform: translateY(-2px);
  }

  /* ── 7. ORDER PANEL ── */
  .order-panel {
    background-color: #ece6dc;
    color: #2c2520;
    border-radius: 28px;
    padding: 24px;
    font-family: 'Poppins', sans-serif;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 420px;
    position: sticky;
    top: 30px;
    height: fit-content;
  }

  @media (max-width: 1200px) {
    .order-panel {
      width: 100%;
      position: static;
    }
  }

  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .order-title {
    font-size: 22px;
    font-weight: 700;
    margin: 0;
    color: #2c2520;
  }

  .order-id {
    font-size: 13px;
    color: #a19a93;
    font-weight: 500;
  }

  .delivery-tabs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    background-color: rgba(0, 0, 0, 0.04);
    padding: 4px;
    border-radius: 14px;
  }

  .delivery-tab {
    background: transparent;
    border: none;
    padding: 10px;
    font-size: 12px;
    font-weight: 600;
    color: #7d7771;
    cursor: pointer;
    border-radius: 10px;
    transition: all 0.2s;
    font-family: 'Poppins', sans-serif;
  }

  .delivery-tab.active {
    background-color: #ffffff;
    color: #2c2520;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }

  .order-items {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: 260px;
    overflow-y: auto;
    padding-right: 4px;
  }

  .order-items::-webkit-scrollbar {
    width: 4px;
  }

  .order-items::-webkit-scrollbar-thumb {
    background-color: #cdc5b9;
    border-radius: 10px;
  }

  .order-empty {
    text-align: center;
    padding: 30px 0;
    color: #a19a93;
  }

  .order-empty span {
    font-size: 32px;
    display: block;
    margin-bottom: 8px;
  }

  .order-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }

  .order-item-left {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
  }

  .order-item-thumb {
    width: 45px;
    height: 45px;
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
  }

  .order-item-name {
    font-size: 14px;
    font-weight: 600;
    color: #2c2520;
    display: block;
  }

  .order-item-options {
    display: flex;
    gap: 8px;
    margin-top: 2px;
  }

  .size-tag {
    font-size: 11px;
    color: #a19a93;
    background-color: rgba(0, 0, 0, 0.04);
    padding: 1px 6px;
    border-radius: 4px;
  }

  .qty-tag {
    font-size: 11px;
    font-weight: 700;
    color: #92634e;
  }

  .order-item-right {
    text-align: right;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }

  .order-item-label {
    font-size: 11px;
    color: #a19a93;
  }

  .order-item-price {
    font-size: 13px;
    font-weight: 700;
    color: #2c2520;
  }

  .order-divider {
    height: 1px;
    background-color: rgba(0, 0, 0, 0.06);
    border: none;
    margin: 4px 0;
  }

  .order-summary {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #7d7771;
  }

  .summary-row.total {
    font-size: 16px;
    font-weight: 700;
    color: #2c2520;
    margin-top: 4px;
  }

  .summary-row.total span:last-child {
    color: #92634e;
    font-size: 18px;
    font-weight: 800;
  }

  .payment-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .payment-label {
    font-size: 13px;
    font-weight: 600;
    color: #a19a93;
  }

  .payment-methods {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .pay-btn {
    background-color: #cdc5b9;
    color: #5c564f;
    border: none;
    padding: 10px 4px;
    font-size: 12px;
    font-weight: 700;
    border-radius: 10px;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    transition: all 0.15s ease;
  }

  .pay-btn:hover {
    background-color: #c0b7ab;
  }

  .pay-btn.active {
    background-color: #6e6a64;
    color: #ffffff;
  }

  .process-btn {
    background-color: #92634e;
    color: #ffffff;
    border: none;
    border-radius: 14px;
    padding: 14px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    font-family: 'Poppins', sans-serif;
    transition: background-color 0.2s, transform 0.1s;
    margin-top: 5px;
    box-shadow: 0 4px 12px rgba(146, 99, 78, 0.2);
  }
`;

// Inject styles
if (typeof document !== 'undefined' && !document.getElementById('dashboard-styles')) {
  const styleEl = document.createElement('style');
  styleEl.id = 'dashboard-styles';
  styleEl.textContent = DASHBOARD_STYLES;
  document.head.appendChild(styleEl);
}

function ProductCard({ product, onAdd }) {
  const [selectedSize, setSelectedSize] = useState("M");

  return (
    <div className="product-card">
      <div className="product-top">
        <img src={product.img} alt={product.name} className="product-img" />
        <div className="product-info">
          <h3>{product.name}</h3>
          <p>⭐ {product.rating} ({product.reviews} ulasan)</p>
        </div>
      </div>

      <div className="product-stats">
        <div className="stat">
          <span>Harga</span>
          <strong>Rp {product.price.toLocaleString("id-ID")}</strong>
        </div>
      </div>

      <div className="divider"></div>

      <div className="size-section">
        <span>Ukuran</span>
        <div className="size-list">
          {["S", "M", "L"].map((size) => (
            <button
              key={size}
              className={`size-btn ${selectedSize === size ? "active" : ""}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* MODIFIKASI DISINI: Kirim objek baru yang menyertakan properti size */}
      <button className="add-btn" onClick={() => onAdd({ ...product, size: selectedSize })}>
        + Tambah Pesanan
      </button>
    </div>
  );
}

function OrderPanel({ items = [], onPlaceOrder, onClearCart }) {
  const [activeDelivery, setActiveDelivery] = useState("Dine in");
  const [activePayment, setActivePayment] = useState("Cash");

  // Member lookup by phone
  const [phoneInput, setPhoneInput] = useState("");
  const [memberFound, setMemberFound] = useState(null);
  const [searchingMember, setSearchingMember] = useState(false);
  const [processing, setProcessing] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;
  const fmt = (n) => "Rp " + n.toLocaleString("id-ID");

  // Lookup member by phone number
  const handleLookupMember = async () => {
    if (!phoneInput.trim()) return;
    try {
      setSearchingMember(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("phone_number", phoneInput.trim())
        .single();

      if (error) {
        setMemberFound(null);
        alert("❌ Member tidak ditemukan dengan nomor HP tersebut.");
        return;
      }
      setMemberFound(data);
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setSearchingMember(false);
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;

    try {
      setProcessing(true);

      // Calculate points earned (1 point per Rp 1,000)
      const pointsEarned = Math.floor(subtotal / 1000);

      // If member found, update their points in DB
      if (memberFound) {
        const newPoints = (memberFound.total_points || 0) + pointsEarned;
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ total_points: newPoints })
          .eq("id", memberFound.id);

        if (updateError) throw updateError;
      }

      // Call onPlaceOrder to add to transactions & analytics
      if (onPlaceOrder) {
        onPlaceOrder(items, activeDelivery);
      }

      // Clear cart after successful checkout
      if (onClearCart) onClearCart();

      alert(
        `✅ Pesanan berhasil!\n\n` +
        `${activeDelivery}\n` +
        `${items.reduce((s, i) => s + i.qty, 0)} items\n` +
        `${activePayment}\n` +
        `Total: ${fmt(total)}\n` +
        (memberFound
          ? `\n🎉 ${memberFound.full_name} mendapat ${pointsEarned} pts!`
          : `\n💡 Daftarkan nomor HP member untuk akumulasi poin.`)
      );
    } catch (err) {
      alert(`Gagal: ${err.message}`);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <aside className="order-panel">
      <div className="order-header">
        <h2 className="order-title">Pesanan</h2>
        <span className="order-id">#order2022</span>
      </div>

      <div className="delivery-tabs">
        {["Dine in", "Delivery", "Pick up"].map((tab) => (
          <button
            key={tab}
            className={`delivery-tab${activeDelivery === tab ? " active" : ""}`}
            onClick={() => setActiveDelivery(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="order-items">
        {items.length === 0 ? (
          <div className="order-empty">
            <span>☕</span>
            <p>Belum ada pesanan</p>
          </div>
        ) : (
          items.map((item, i) => (
            <div key={i} className="order-item">
              <div className="order-item-left">
                <div className="order-item-thumb">☕</div>
                <div>
                  <span className="order-item-name">{item.name}</span>
                  <div className="order-item-options">
                    <span className="size-tag">{item.size || "M"}</span>
                    <span className="qty-tag">×{item.qty}</span>
                  </div>
                </div>
              </div>
              <div className="order-item-right">
                <span className="order-item-label">Harga</span>
                <span className="order-item-price">{fmt(item.price * item.qty)}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="order-divider" />

      {/* ── MEMBER PHONE INPUT ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#7d7771" }}>
          📞 Cari Member (via No. HP)
        </span>
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            placeholder="08xxxxxxx"
            value={phoneInput}
            onChange={(e) => { setPhoneInput(e.target.value); setMemberFound(null); }}
            style={{
              flex: 1, padding: "8px 12px", borderRadius: "10px",
              border: "1px solid rgba(0,0,0,0.1)",
              background: "#ffffff", color: "#2c2520",
              fontSize: 12, outline: "none",
              fontFamily: "'Poppins', sans-serif",
            }}
          />
          <button onClick={handleLookupMember} disabled={searchingMember}
            style={{
              padding: "8px 14px", borderRadius: "10px", border: "none",
              background: "#92634e", color: "#ffffff", fontWeight: 600,
              fontSize: 11, cursor: "pointer", whiteSpace: "nowrap",
              fontFamily: "'Poppins', sans-serif",
              opacity: searchingMember ? 0.6 : 1,
            }}>
            {searchingMember ? "..." : "Cari"}
          </button>
        </div>
        {memberFound && (
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "8px 12px", background: "rgba(146,99,78,0.08)",
            borderRadius: "10px", fontSize: 12,
          }}>
            <span>👤</span>
            <div style={{ flex: 1 }}>
              <strong style={{ color: "#2c2520" }}>{memberFound.full_name}</strong>
              <span style={{ color: "#92634e", marginLeft: 8 }}>
                {memberFound.total_points || 0} pts
              </span>
            </div>
            <button onClick={() => { setMemberFound(null); setPhoneInput(""); }}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "#a19a93", fontSize: 14, padding: 0,
              }}>
              ✕
            </button>
          </div>
        )}
      </div>

      <div className="order-divider" />

      <div className="order-summary">
        <div className="summary-row">
          <span>Jumlah item</span>
          <span>{items.reduce((s, i) => s + i.qty, 0)}</span>
        </div>
        <div className="summary-row">
          <span>Pajak (10%)</span>
          <span>{fmt(tax)}</span>
        </div>
        <div className="summary-row total">
          <span>Total bayar</span>
          <span>{fmt(total)}</span>
        </div>
      </div>

      <div className="order-divider" />

      <div className="payment-section">
        <span className="payment-label">Pembayaran</span>
        <div className="payment-methods">
          {["Cash", "Debit", "E-Wallet"].map((m) => (
            <button
              key={m}
              className={`pay-btn${activePayment === m ? " active" : ""}`}
              onClick={() => setActivePayment(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <button className="process-btn" onClick={handleCheckout} disabled={items.length === 0 || processing}>
        {processing ? "Memproses..." : "Proses"}
      </button>
    </aside>
  );
}
function Dashboard({ activeTab = "dashboard", onPlaceOrder }) {
  const [activeCat, setActiveCat] = useState("Kopi");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const currentTab = activeTab.toLowerCase().trim();

  const filteredProducts = ALL_PRODUCTS.filter((p) => {
    const matchesCategory = p.category === activeCat;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddProduct = useCallback((productWithSize) => {
    setCartItems((prevItems) => {
      // Periksa kecocokan ID sekaligus Ukuran (size)
      const existingItem = prevItems.find(
        (item) => item.id === productWithSize.id && item.size === productWithSize.size
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === productWithSize.id && item.size === productWithSize.size
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      
      // Jika ukuran berbeda atau item belum ada, masukkan sebagai baris baru
      return [...prevItems, { ...productWithSize, qty: 1 }];
    });
  }, []);

  /* ── PERBAIKAN: Langsung render tanpa duplikasi .dashboard-container & .dashboard-main ── */
  return (
    <>
      {/* ── HEADER ── */}
      <Header query={searchQuery} setQuery={setSearchQuery} />

      {/* ── CONTENT ── */}
      {currentTab === "dashboard" && (
        <div className="dashboard-content">
          {/* ── PRODUCTS SECTION ── */}
          <div className="products-section">
            <CategoryTabs active={activeCat} onChange={setActiveCat} />

            <h2 className="menu-title">Menu {activeCat}</h2>

            <div className="products-grid">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} onAdd={handleAddProduct} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <p style={{ color: "#a3a3a3", textAlign: "center", marginTop: "20px" }}>
                ❌ Menu tidak ditemukan.
              </p>
            )}
          </div>

          {/* ── ORDER PANEL ── */}
          <OrderPanel items={cartItems} onPlaceOrder={onPlaceOrder} onClearCart={() => setCartItems([])} />
        </div>
      )}
    </>
  );
}

export default memo(Dashboard);