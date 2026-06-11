import { useState } from "react";

export default function Avatar({ name = "A" }) {
  return (
    <>
      <style>{`
        /* ── STYLING AVATAR BULAT KHAS KASIR UTAMA ── */
        .crm-avatar {
          width: 45px;          /* Ukuran proporsional sesuai gambar dashboard */
          height: 45px;
          background-color: #92634e; /* Warna cokelat utama khas kafe lu */
          color: #ffffff;       /* Huruf teks putih bersih */
          border-radius: 50%;   /* Bentuk bulat sempurna */
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Poppins', sans-serif;
          font-size: 16px;
          font-weight: 700;     /* Huruf inisial tebal */
          box-shadow: 0 4px 10px rgba(146, 99, 78, 0.3); /* Efek bayangan lembut */
          border: 2px solid rgba(255, 255, 255, 0.1); /* Border tipis pemanis */
          user-select: none;
        }
      `}</style>

      <div className="crm-avatar">
        {name.charAt(0).toUpperCase()}
      </div>
    </>
  );
}