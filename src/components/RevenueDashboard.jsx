import { useState, memo } from "react";
// Import komponen grafik dari Recharts
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, 
  PieChart, Pie, Cell, Legend 
} from "recharts";

function RevenueDashboard() {
  // 1. Data Grafik Batang (Harian)
  const barData = [
    { name: "Sen", Pendapatan: 4.0 },
    { name: "Sel", Pendapatan: 6.5 },
    { name: "Rab", Pendapatan: 5.0 },
    { name: "Kam", Pendapatan: 8.5 },
    { name: "Jum", Pendapatan: 7.0 },
    { name: "Sab", Pendapatan: 9.5 },
    { name: "Min", Pendapatan: 6.0 },
  ];

  // 2. Data Pie Chart (Kategori)
  const pieData = [
    { name: "Kopi", value: 55 },
    { name: "Non-Kopi", value: 30 },
    { name: "Makanan", value: 15 },
  ];

  // Warna kustom agar serasi dengan tema kasir/cafe Anda
  const COLORS = ["#92634e", "#b07e66", "#cdc5b9"];

  return (
    <div className="crm-dashboard-wrapper">
      <style>{`
        .crm-dashboard-wrapper {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
          font-family: 'Poppins', sans-serif;
          color: #ffffff;
        }
        .crm-grid-layout {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 24px;
          width: 100%;
        }
        .crm-card {
          background-color: #212121;
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .crm-card-title {
          font-size: 16px;
          font-weight: 700;
          margin: 0;
        }
        .crm-card-subtitle {
          font-size: 11px;
          color: #a3a3a3;
          font-weight: 400;
          display: block;
          margin-top: 2px;
        }
        .crm-analytics-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .crm-analytics-row strong {
          color: #b07e66;
          font-size: 16px;
        }
      `}</style>

      {/* GRID ATAS */}
      <div className="crm-grid-layout">
        
        {/* KARTU 1: REVENUE ANALYTICS */}
        <div className="crm-card">
          <div className="crm-card-title">
            <span>Revenue Analytics</span>
            <span className="crm-card-subtitle">Performa Finansial</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
            <div className="crm-analytics-row"><span>Today</span><strong>Rp 1.250.000</strong></div>
            <div className="crm-analytics-row"><span>This Week</span><strong>Rp 8.700.000</strong></div>
            <div className="crm-analytics-row"><span>This Month</span><strong>Rp 32.000.000</strong></div>
          </div>
        </div>

        {/* KARTU 2: RECHARTS BAR CHART */}
        
      </div>

      {/* GRID BAWAH */}
      <div className="crm-grid-layout">
        <div className="crm-card">
          <div className="crm-card-title">
            <span>Grafik Pendapatan</span>
            <span className="crm-card-subtitle">7 Hari Terakhir (Dalam Juta)</span>
          </div>
          <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#8a8a8a" fontSize={12} tickLine={false} />
                <YAxis stroke="#8a8a8a" fontSize={12} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#2c2520", borderRadius: "8px", border: "none" }}
                  labelStyle={{ color: "#fff", fontWeight: "bold" }}
                />
                <Bar dataKey="Pendapatan" fill="#92634e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>


        {/* KARTU 3: RECHARTS PIE CHART */}
        <div className="crm-card">
          <div className="crm-card-title">
            <span>Kategori Terlaris</span>
            <span className="crm-card-subtitle">Proporsi Menu</span>
          </div>
          <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

export default memo(RevenueDashboard);