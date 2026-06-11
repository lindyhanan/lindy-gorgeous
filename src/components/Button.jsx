import { useState } from "react";

export default function Button({ children, type = "primary" }) {
  return (
    <>
      <style>{`
        /* ── STYLING BASE TOMBOL UTAMA ── */
        .crm-button {
          padding: 12px 24px;
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          font-weight: 600;
          border-radius: 14px; /* Lengkungan sudut yang modern */
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          user-select: none;
        }

        .crm-button:active {
          transform: scale(0.98); /* Efek membal pas diklik */
        }

        /* ── TIPE PRIMARY: COKELAT KHAS KAFE ── */
        .crm-button.primary {
          background-color: #92634e;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(146, 99, 78, 0.2);
        }

        .crm-button.primary:hover {
          background-color: #7a513f;
        }

        /* ── TIPE SECONDARY: ABU-ABU GELAP METALIK ── */
        .crm-button.secondary {
          background-color: #383838;
          color: #e3e3e3;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .crm-button.secondary:hover {
          background-color: #4a4a4a;
          color: #ffffff;
        }
      `}</style>

      <button className={`crm-button ${type === "secondary" ? "secondary" : "primary"}`}>
        {children}
      </button>
    </>
  );
}