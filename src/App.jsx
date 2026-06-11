import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard"; // Ini halaman kasir utama lu

// Komponen halaman lain yang terpisah (Silakan sesuaikan importnya jika filenya sudah ada)
const MenuManagement = () => <div style={{ padding: "40px", color: "#fff" }}><h2>📋 Halaman Manajemen Stok & Menu</h2></div>;
const OrdersHistory = () => <div style={{ padding: "40px", color: "#fff" }}><h2>◷ Halaman Riwayat Transaksi</h2></div>;
const SettingsPage = () => <div style={{ padding: "40px", color: "#fff" }}><h2>⚙️ Halaman Pengaturan Sistem</h2></div>;

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard"); // default ke kasir utama

  // Fungsi untuk merender halaman secara utuh terpisah
  const renderContent = () => {
    switch (activeTab.toLowerCase().trim()) {
      case "dashboard":
      case "home":
        return <Dashboard />; // Mengembalikan kasir utama (ProductCard, OrderPanel, dll)
      case "menu":
        return <MenuManagement />;
      case "orders":
        return <OrdersHistory />;
      case "settings":
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="main-app-container">
      <style>{`
        /* BINGKAI LUAR UTAMA: Membuat seluruh pojokan layar aplikasi rounded sesuai kemauan awal */
        .main-app-container {
          display: flex;
          background-color: #3a3838;
          min-height: 100vh;
          width: 100vw;
          box-sizing: border-box;
          border-radius: 40px; /* Lengkungan estetik luar app */
          overflow: hidden;
          margin: 0;
          padding: 0;
        }

        /* Memaksa sidebar nempel presisi mengikuti lengkungan luar di sisi kiri */
        .main-app-container > aside,
        .main-app-container .sidebar-container {
          border-top-left-radius: 40px !important;
          border-bottom-left-radius: 40px !important;
          height: 100vh;
        }

        /* Area penampung halaman aktif di sebelah kanan sidebar */
        .page-content-render {
          flex-grow: 1;
          height: 100vh;
          overflow-y: auto;
          box-sizing: border-box;
        }
      `}</style>

      {/* Sidebar utama mengontrol state activeTab global */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Konten halaman yang dirender secara dinamis */}
      <div className="page-content-render">
        {renderContent()}
      </div>
    </div>
  );
}