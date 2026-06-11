import { useState } from "react";

export default function Badge({ children, active = false }) {
  return (
    <>
      <style>{`
        /* ── STYLING BADGE STATUS UTAMA ── */
        .crm-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 14px;
          font-family: 'Poppins', sans-serif;
          font-size: 12px;
          font-weight: 600;
          border-radius: 8px; /* Sudut kotak melengkung halus */
          transition: all 0.2s ease;
          user-select: none;
          
          /* Kondisi Default / Pasif (Abu-abu transparan mewah) */
          background-color: rgba(255, 255, 255, 0.06);
          color: #a3a3a3;
          border: 1px solid rgba(255, 255, 255, 0.03);
        }

        /* ── KONDISI AKTIF / NYALA (MENYATU DENGAN THEME KAFE) ── */
        .crm-badge.active {
          background-color: #92634e; /* Warna cokelat utama */
          color: #ffffff;            /* Teks putih bersih */
          box-shadow: 0 4px 12px rgba(146, 99, 78, 0.25); /* Efek glow tipis */
          border: 1px solid transparent;
        }
      `}</style>

      <span className={`crm-badge ${active ? "active" : ""}`}>
        {children}
      </span>
    </>
  );
}