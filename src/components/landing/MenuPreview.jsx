import { useState } from "react";

const MENU_CATEGORIES = ["All", "Signature", "Classic", "Non-Coffee"];

const MENU_ITEMS = [
  // Signature
  { category: "Signature", name: "Caramel Signature Latte", price: "Rp 38.000", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&q=80" },
  { category: "Signature", name: "Hazelnut Affogato", price: "Rp 42.000", image: "https://images.unsplash.com/photo-1578645635737-6a88f706a5e3?w=300&q=80" },
  { category: "Signature", name: "Gula Aren Cream Latte", price: "Rp 35.000", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&q=80" },
  // Classic
  { category: "Classic", name: "Cappuccino", price: "Rp 28.000", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&q=80" },
  { category: "Classic", name: "Caffe Latte", price: "Rp 25.000", image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=300&q=80" },
  { category: "Classic", name: "Espresso Doppio", price: "Rp 22.000", image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=300&q=80" },
  { category: "Classic", name: "Mocha", price: "Rp 30.000", image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=300&q=80" },
  // Non-Coffee
  { category: "Non-Coffee", name: "Matcha Latte", price: "Rp 32.000", image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=300&q=80" },
  { category: "Non-Coffee", name: "Chocolate Frappe", price: "Rp 35.000", image: "https://images.unsplash.com/photo-1558857563-b371033873b8?w=300&q=80" },
  { category: "Non-Coffee", name: "Thai Milk Tea", price: "Rp 30.000", image: "https://images.unsplash.com/photo-1558857563-b371033873b8?w=300&q=80" },
];

export default function MenuPreview() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <>
      <style>{`
        .menu-section {
          position: relative;
          padding: 100px 24px;
          overflow: hidden;
        }
        .menu-inner {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
        .menu-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .menu-label {
          color: #b38b53;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin: 0 0 12px 0;
        }
        .menu-title {
          font-size: 30px;
          font-weight: 700;
          color: #ffffff;
          text-transform: uppercase;
          margin: 0;
        }
        .menu-divider {
          width: 64px;
          height: 2px;
          background: #b38b53;
          margin: 20px auto 0;
        }
        .menu-tabs {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }
        .menu-tab {
          background: transparent;
          border: 1px solid rgba(179, 139, 83, 0.2);
          color: #a1a1aa;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 10px 22px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
        }
        .menu-tab:hover {
          border-color: rgba(179, 139, 83, 0.5);
          color: #ffffff;
        }
        .menu-tab.active {
          background: rgba(179, 139, 83, 0.15);
          border-color: #b38b53;
          color: #b38b53;
        }
        .menu-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .menu-item {
          background: rgba(15, 12, 10, 0.5);
          border: 1px solid rgba(179, 139, 83, 0.08);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.4s ease;
        }
        .menu-item:hover {
          border-color: rgba(179, 139, 83, 0.25);
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.3);
        }
        .menu-item-img-wrap {
          width: 100%;
          height: 160px;
          overflow: hidden;
        }
        .menu-item-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .menu-item:hover .menu-item-img {
          transform: scale(1.08);
        }
        .menu-item-info {
          padding: 16px;
        }
        .menu-item-name {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 6px 0;
        }
        .menu-item-price {
          font-size: 14px;
          font-weight: 600;
          color: #b38b53;
          margin: 0;
        }
        .menu-item-cat {
          font-size: 10px;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0 0 6px 0;
        }
        @media (min-width: 768px) {
          .menu-section { padding: 128px 64px; }
          .menu-title { font-size: 36px; }
          .menu-grid { grid-template-columns: repeat(3, 1fr); gap: 24px; }
          .menu-item-img-wrap { height: 200px; }
          .menu-item-name { font-size: 15px; }
        }
        @media (min-width: 1024px) {
          .menu-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>

      <section className="menu-section" id="menu">
        <div className="menu-inner">
          <div className="menu-header">
            <p className="menu-label">Our Menu</p>
            <h2 className="menu-title">Menu Preview</h2>
            <div className="menu-divider" />
          </div>

          <div className="menu-tabs">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`menu-tab ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="menu-grid">
            {filteredItems.map((item, idx) => (
              <div key={idx} className="menu-item">
                <div className="menu-item-img-wrap">
                  <img src={item.image} alt={item.name} className="menu-item-img" loading="lazy" />
                </div>
                <div className="menu-item-info">
                  <p className="menu-item-cat">{item.category}</p>
                  <h4 className="menu-item-name">{item.name}</h4>
                  <p className="menu-item-price">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
