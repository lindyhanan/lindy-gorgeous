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
                    <span className="size-tag">M</span>
                    <span className="size-tag">Ice</span>
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

      <button className="process-btn">Proses</button>
    </aside>
  );
}