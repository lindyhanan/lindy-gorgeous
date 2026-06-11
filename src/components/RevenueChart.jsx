import { useState } from "react";

export default function RevenueChart() {
  // Data tiruan untuk grafik pendapatan per hari
  const chartData = [
    { day: "Sen", value: 40, label: "4.0M" },
    { day: "Sel", value: 65, label: "6.5M" },
    { day: "Rab", value: 50, label: "5.0M" },
    { day: "Kam", value: 85, label: "8.5M" }, // Hari puncak tertinggi
    { day: "Jum", value: 70, label: "7.0M" },
    { day: "Sab", value: 95, label: "9.5M" },
    { day: "Min", value: 60, label: "6.0M" },
  ];

  return (
    <div className="crm-chart-card">
      <style>{`
        /* ── CONTAINER UTAMA KARTU GRAFIK ── */
        .crm-chart-card {
          background-color: #212121; /* Abu gelap arang serasi dengan StatsCard */
          border-radius: 24px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        /* ── JUDUL GRAFIK ── */
        .crm-section-title {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff; /* Putih terang mencolok */
          margin: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .crm-section-subtitle {
          font-size: 12px;
          color: #a3a3a3;
          font-weight: 400;
        }

        /* ── AREA UTAMA GRAFIK BAR CHALENGE ── */
        .crm-chart-placeholder {
          display: flex;
          justify-content: space-between;
          align-items: flex-end; /* Memaksa batang grafik mulai dari bawah */
          height: 220px;
          padding: 10px 10px 0 10px;
          box-sizing: border-box;
          background-color: rgba(0, 0, 0, 0.15); /* Background area grafik agak amblas ke dalam */
          border-radius: 16px;
          gap: 12px;
        }

        /* ── STYLING PER BATANG / BAR ── */
        .chart-bar-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          height: 100%;
          justify-content: flex-end;
          gap: 8px;
        }

        .chart-bar-container {
          width: 100%;
          background-color: rgba(255, 255, 255, 0.03); /* Track kosong di belakang */
          height: 80%; /* Batas maksimum tinggi batang */
          display: flex;
          align-items: flex-end;
          border-radius: 8px;
          overflow: hidden;
        }

        .chart-bar-fill {
          width: 100%;
          background-color: #92634e; /* Warna cokelat utama khas kasir kamu */
          border-radius: 8px 8px 0 0;
          transition: height 0.5s ease-in-out;
          cursor: pointer;
          position: relative;
        }

        /* Efek sorot ketika mouse mendekati batang grafik */
        .chart-bar-fill:hover {
          background-color: #b07e66;
        }

        /* Tooltip angka keluar pas di-hover */
        .chart-bar-fill:hover::before {
          content: attr(data-label);
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #2c2520;
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          padding: 4px 6px;
          border-radius: 4px;
          white-space: nowrap;
          z-index: 10;
        }

        /* ── TEKS HARI DI BAWAH GRAFIK ── */
        .chart-day-label {
          font-size: 11px;
          color: #8a8a8a;
          font-weight: 600;
        }
      `}</style>

      {/* Bagian Header Atas */}
      <div className="crm-section-title">
        <span>Grafik Pendapatan</span>
        <span className="crm-section-subtitle">7 Hari Terakhir</span>
      </div>

      {/* Area Visualisasi Grafik Batang Murni CSS */}
      <div className="crm-chart-placeholder">
        {chartData.map((item, index) => (
          <div key={index} className="chart-bar-wrapper">
            
            {/* Wadah Batang */}
            <div className="chart-bar-container">
              <div 
                className="chart-bar-fill" 
                style={{ height: `${item.value}%` }} 
                data-label={item.label}
              />
            </div>

            {/* Label Hari */}
            <span className="chart-day-label">{item.day}</span>
            
          </div>
        ))}
      </div>
    </div>
  );
}