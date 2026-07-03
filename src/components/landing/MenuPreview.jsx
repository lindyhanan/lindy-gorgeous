import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

const MENU_CATEGORIES = ["All", "Signature", "Classic", "Non-Coffee"];

function formatPrice(num) {
  return "Rp " + Number(num).toLocaleString("id-ID");
}

export default function MenuPreview() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function fetchMenus() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("id");
        if (error) throw error;
        if (data && data.length > 0) {
          setMenus(data);
        }
      } catch (err) {
        console.error("Gagal fetch menu:", err.message);
        // Fallback: if table doesn't exist yet, error silently
      } finally {
        setLoading(false);
      }
    }
    fetchMenus();
  }, []);

  const displayMenus = menus.length > 0 ? menus : [];

  const filteredItems =
    activeCategory === "All"
      ? displayMenus
      : displayMenus.filter((item) => item.category === activeCategory);

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

          {loading ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#666" }}>
              Loading menu...
            </div>
          ) : filteredItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#666" }}>
              Menu tidak tersedia untuk kategori ini.
            </div>
          ) : (
            <div className="menu-grid">
              {filteredItems.map((item, idx) => (
                <div key={item.id || idx} className="menu-item">
                  <div className="menu-item-img-wrap">
                    <img src={item.image_url} alt={item.name} className="menu-item-img" loading="lazy" />
                  </div>
                  <div className="menu-item-info">
                    <p className="menu-item-cat">{item.category}</p>
                    <h4 className="menu-item-name">{item.name}</h4>
                    <p className="menu-item-price">{formatPrice(item.price_base)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
