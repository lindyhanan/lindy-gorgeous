import { useState } from "react";

export default function Card({ children }) {
  return (
    <>
      <style>{`
        /* ── STYLING KARTU WADAH UTAMA (DARK THEME) ── */
        .crm-custom-card {
          background-color: #212121; /* Abu-abu gelap arang agar serasi dengan UI lainnya */
          border-radius: 30px;       /* Lengkungan tebal sesuai spesifikasi awal lu */
          padding: 24px;             /* Setara dengan p-6 */
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15); /* Shadow lembut agar terlihat melayang */
          color: #ffffff;            /* Warna teks default di dalam kartu menjadi putih */
          box-sizing: border-box;
          width: 100%;
        }
      `}</style>

      <div className="crm-custom-card">
        {children}
      </div>
    </>
  );
}