import { useState } from "react";

export default function OrderPanel({ items = [] }) {
  const [activeDelivery, setActiveDelivery] = useState("Delivery");
  const [activePayment,  setActivePayment]  = useState("Cash");

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const tax      = Math.round(subtotal * 0.1);
  const total    = subtotal + tax;
  const fmt      = (n) => "Rp " + n.toLocaleString("id-ID") + ",00";

  return (
    <aside className="order-panel">
      <style>{`
        /* ── CONTAINER UTAMA PANEL PESANAN ── */
        .order-panel {
          background-color: #ece6dc; /* Warna krem/putih susu sesuai gambar */
          color: #2c2520; /* Warna teks gelap */
          border-radius: 28px;
          padding: 24px;
          font-family: 'Poppins', sans-serif;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          box-sizing: border-box;
        }

        /* ── HEADER PANEL ── */
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

        /* ── DELIVERY TABS (Dine In, Delivery, dll) ── */
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

        /* Kapsul aktif berwarna putih dengan teks gelap */
        .delivery-tab.active {
          background-color: #ffffff;
          color: #2c2520;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        }

        /* ── DAFTAR ITEM BELANJAAN ── */
        .order-items {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-height: 260px;
          overflow-y: auto;
          padding-right: 4px;
        }

        /* Scrollbar kustom tipis agar estetik */
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

        /* ── DIVIDER / GARIS PEMBATAS ── */
        .order-divider {
          height: 1px;
          background-color: rgba(0, 0, 0, 0.06);
          border: none;
          margin: 4px 0;
        }

        /* ── RINGKASAN PERHITUNGAN (SUMMARY) ── */
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
          color: #92634e; /* Menonjolkan nominal total bayar dengan warna cokelat */
          font-size: 18px;
          font-weight: 800;
        }

        /* ── SEKSI PEMBAYARAN ── */
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
          background-color: #cdc5b9; /* Abu krem default tombol payment seperti gambarmu */
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

        /* Tombol bayar aktif beralih ke warna abu gelap metalik */
        .pay-btn.active {
          background-color: #6e6a64;
          color: #ffffff;
        }

        /* ── TOMBOL EKSEKUSI PROSES AKHIR ── */
        .process-btn {
          background-color: #92634e; /* Cokelat solid khas Doge Caffe */
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

        .process-btn:hover {
          background-color: #7a513f;
        }

        .process-btn:active {
          transform: translateY(1px);
        }
      `}</style>

      {/* Header */}
      <div className="order-header">
        <h2 className="order-title">Pesanan</h2>
        <span className="order-id">#order2022</span>
      </div>

      {/* Delivery Tabs */}
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

      {/* Items */}
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

      {/* Summary */}
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

      {/* Payment */}
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

      <button className="process-btn" onClick={() => alert("Pesanan diproses!")}>Proses</button>
    </aside>
  );
}