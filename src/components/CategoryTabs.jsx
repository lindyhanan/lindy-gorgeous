import { useState } from "react";

export default function CategoryTabs({ active, onChange }) {
  // Daftar kategori default sesuai dengan menu yang ada pada gambar
  const categories = [
    { id: "Topping", name: "Topping", icon: "🍫" },
    { id: "Kopi", name: "Kopi", icon: "☕" },
    { id: "Bubuk Kopi", name: "Bubuk Kopi", icon: "🫙" },
    { id: "Snack", name: "Snack", icon: "🍿" },
  ];

  return (
    <div className="categories-tab-container">
      <style>{`
        /* ── CONTAINER UTAMA TABS KATEGORI ── */
        .categories-tab-container {
          display: flex;
          align-items: center;
          gap: 16px; /* Jarak antar tombol kapsul */
          margin-top: 10px;
          width: 100%;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        /* ── STYLING TOMBOL KAPSUL (DEFAULT / MATI) ── */
        .category-tab-btn {
          display: flex;
          align-items: center;
          gap: 10px; /* Jarak antara emoji dan teks di dalam tombol */
          background-color: #ffffff; /* Warna dasar putih susu */
          color: #2c2520; /* Warna teks gelap */
          border: none;
          padding: 12px 24px;
          border-radius: 16px; /* Sudut melengkung halus sesuai gambar */
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        /* Efek hover saat mouse mendekati tombol yang tidak aktif */
        .category-tab-btn:hover {
          background-color: #f5f0e8;
          transform: translateY(-1px);
        }

        /* ── STYLING TOMBOL KAPSUL (AKTIF / DIKLIK) ── */
        .category-tab-btn.active {
          background-color: #92634e; /* Warna cokelat khas Doge Caffe */
          color: #ffffff; /* Mengubah teks menjadi putih saat aktif */
          transform: translateY(0);
          box-shadow: 0 6px 15px rgba(146, 99, 78, 0.3);
        }

        /* Menjaga ukuran emoji agar tetap proporsional */
        .category-tab-icon {
          font-size: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      {/* Looping data kategori menjadi deretan tombol kapsul */}
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`category-tab-btn ${active === cat.id ? "active" : ""}`}
          onClick={() => onChange && onChange(cat.id)}
        >
          <span className="category-tab-icon">{cat.icon}</span>
          <span className="category-tab-name">{cat.name}</span>
        </button>
      ))}
    </div>
  );
}