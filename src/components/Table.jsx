import { useState } from "react";

export default function Table() {
  return (
    <>
      <style>{`
        /* ── WADAH UTAMA TABEL (SCROLLABLE & RESPONSIF) ── */
        .crm-table-wrapper {
          width: 100%;
          overflow-x: auto;
          background-color: #212121; /* Abu-abu gelap arang serasi dengan UI lu */
          border-radius: 20px;       /* Sudut luar melengkung halus */
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          box-sizing: border-box;
        }

        /* ── STRUCTURING TABEL MURNI ── */
        .crm-table {
          width: 100%;
          border-collapse: collapse; /* Menghilangkan celah antar border */
          font-family: 'Poppins', sans-serif;
          text-align: left;
        }

        /* ── BAGIAN KAPALA TABEL (THEAD) ── */
        .crm-table thead tr {
          background-color: rgba(255, 255, 255, 0.03); /* Sedikit kontras dari base background */
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .crm-table th {
          padding: 16px 20px;
          font-size: 13px;
          font-weight: 600;
          color: #a3a3a3; /* Warna judul kolom abu-abu pudar proporsional */
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* ── BAGIAN BADAN DATA TABEL (TBODY) ── */
        .crm-table tbody tr {
          border-bottom: 1px solid rgba(255, 255, 255, 0.04); /* Garis sekat super tipis */
          transition: background-color 0.15s ease;
        }

        /* Efek sorot baris yang interaktif */
        .crm-table tbody tr:hover {
          background-color: rgba(255, 255, 255, 0.02);
        }

        /* Baris terakhir tidak butuh garis bawah */
        .crm-table tbody tr:last-child {
          border-bottom: none;
        }

        .crm-table td {
          padding: 16px 20px;
          font-size: 14px;
          color: #ffffff; /* Data utama berwarna putih bersih */
          font-weight: 500;
        }

        /* Mempercantik kolom harga agar menonjol (opsional) */
        .crm-table td:nth-child(2) {
          color: #e3e3e3;
          font-family: monospace; /* Font angka serasi untuk nominal harga */
          font-size: 15px;
        }

        /* Memposisikan teks Qty agar berada di tengah agar seimbang */
        .crm-table th:last-child,
        .crm-table td:last-child {
          text-align: center;
        }
      `}</style>

      <div className="crm-table-wrapper">
        <table className="crm-table">
          <thead>
            <tr>
              <th>Produk</th>
              <th>Harga</th>
              <th>Qty</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Latte</td>
              <td>Rp 24.000</td>
              <td>2</td>
            </tr>

            <tr>
              <td>Americano</td>
              <td>Rp 18.000</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}