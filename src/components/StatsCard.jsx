import { useState } from "react";

export default function StatsCard({ title, value, growth }) {
  // Mengecek apakah trennya positif atau negatif dari karakter pertamanya
  const isPositive = String(growth).trim().startsWith("+");

  return (
    <div className="crm-stats-card">
      <style>{`
        /* ── CONTAINER UTAMA KARTU STATISTIK ── */
        .crm-stats-card {
          background-color: #212121; /* Warna abu gelap arang serasi dengan sidebar */
          border-radius: 20px; /* Sudut melengkung halus */
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease;
        }

        .crm-stats-card:hover {
          transform: translateY(-2px);
        }

        /* ── JUDUL / LABEL UTAMA ── */
        .crm-stats-title {
          font-size: 14px;
          color: #a3a3a3; /* Warna abu-abu redup pudar */
          font-weight: 500;
          margin: 0;
        }

        /* ── NOMINAL / VALUE UTAMA ── */
        .crm-stats-value {
          font-size: 28px;
          font-weight: 700;
          color: #ffffff; /* Putih mencolok terang */
          margin: 0;
          line-height: 1;
        }

        /* ── INDIKATOR GROWTH (KAPSUL) ── */
        .crm-stats-growth-wrapper {
          display: flex;
          align-items: center;
        }

        .crm-stats-growth {
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 50px; /* Membuat bentuk kapsul bulat penuh */
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        /* Kondisi dinamis: Hijau jika naik, Merah jika turun */
        .crm-stats-growth.up {
          background-color: rgba(74, 222, 128, 0.12); /* Hijau transparan mewah */
          color: #4ade80;
        }

        .crm-stats-growth.down {
          background-color: rgba(248, 113, 113, 0.12); /* Merah transparan mewah */
          color: #f87171;
        }
      `}</style>

      {/* Bagian Atas: Label Judul */}
      <div className="crm-stats-title">{title}</div>

      {/* Bagian Tengah: Angka Statistik */}
      <div className="crm-stats-value">{value}</div>

      {/* Bagian Bawah: Kapsul Tren Naik/Turun */}
      <div className="crm-stats-growth-wrapper">
        <div className={`crm-stats-growth ${isPositive ? "up" : "down"}`}>
          {isPositive ? "📈" : "📉"} {growth}
        </div>
      </div>
    </div>
  );
}