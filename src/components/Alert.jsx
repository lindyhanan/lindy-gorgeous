import { useState } from "react";

export default function Alert({ message, type = "success" }) {
  // Menentukan ikon otomatis berdasarkan tipe alert
  const getIcon = () => {
    switch (type) {
      case "success": return "✅";
      case "error": return "❌";
      case "warning": return "⚠️";
      case "info": return "ℹ️";
      default: return "🔔";
    }
  };

  return (
    <div className={`crm-alert-box ${type}`}>
      <style>{`
        /* ── CONTAINER UTAMA ALERT CONTAINER ── */
        .crm-alert-box {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          border-radius: 16px;
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          font-weight: 500;
          width: 100%;
          box-sizing: border-box;
          margin-bottom: 15px;
          border: 1px solid transparent;
          backdrop-filter: blur(8px); /* Efek blur kaca blur mewah */
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          animation: slideInDown 0.3s ease-out;
        }

        .crm-alert-icon {
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .crm-alert-text {
          flex: 1;
          line-height: 1.4;
        }

        /* ── VARIASI WARNA BERDASARKAN TIPE (DARK MODE FRIENDLY) ── */
        
        /* 1. Success - Hijau Lembut */
        .crm-alert-box.success {
          background-color: rgba(74, 222, 128, 0.1);
          border-color: rgba(74, 222, 128, 0.2);
          color: #4ade80;
        }

        /* 2. Error - Merah Lembut */
        .crm-alert-box.error {
          background-color: rgba(248, 113, 113, 0.1);
          border-color: rgba(248, 113, 113, 0.2);
          color: #f87171;
        }

        /* 3. Warning - Kuning / Oranye Lembut */
        .crm-alert-box.warning {
          background-color: rgba(251, 191, 36, 0.1);
          border-color: rgba(251, 191, 36, 0.2);
          color: #fbbf24;
        }

        /* 4. Info - Biru Lembut */
        .crm-alert-box.info {
          background-color: rgba(56, 189, 248, 0.1);
          border-color: rgba(56, 189, 248, 0.2);
          color: #38bdf8;
        }

        /* ── ANIMASI MUNCUL ── */
        @keyframes slideInDown {
          from {
            transform: translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>

      {/* Bagian Ikon */}
      <div className="crm-alert-icon">
        {getIcon()}
      </div>

      {/* Bagian Isi Pesan */}
      <div className="crm-alert-text">
        {message}
      </div>
    </div>
  );
}