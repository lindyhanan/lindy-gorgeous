import { useState } from "react";

export default function Modal({ title, children, open, onClose }) {
  if (!open) return null;

  return (
    <>
      <style>{`
        /* ── OVERLAY: BACKGROUND BELAKANG MODAL ── */
        .crm-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.6); /* Warna gelap transparan */
          backdrop-filter: blur(5px);           /* Efek blur kaca mewah */
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;                        /* Memastikan modal selalu di paling depan */
          animation: fadeIn 0.2s ease-out;
        }

        /* ── KOTAK MODAL UTAMA (DARK THEME) ── */
        .crm-modal {
          background-color: #212121;            /* Abu-abu gelap arang serasi dengan UI lu */
          border-radius: 24px;
          padding: 24px;
          width: 90%;
          max-width: 500px;                     /* Lebar maksimal modal standar */
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          color: #ffffff;
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
          animation: scaleUp 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* ── HEADER MODAL ── */
        .crm-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 12px;
        }

        .crm-modal-title {
          font-size: 18px;
          font-weight: 700;
          margin: 0;
          color: #ffffff;
        }

        /* ── TOMBOL CLOSE (✕) ── */
        .crm-modal-close {
          background: transparent;
          border: none;
          color: #a3a3a3;
          font-size: 16px;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.15s;
        }

        .crm-modal-close:hover {
          color: #ffffff;
        }

        /* ── ANIMASI MASUK ── */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div className="crm-modal-overlay" onClick={onClose}>
        <div className="crm-modal" onClick={(e) => e.stopPropagation()}>
          <div className="crm-modal-header">
            <h2 className="crm-modal-title">{title}</h2>
            <button className="crm-modal-close" onClick={onClose}>
              ✕
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}