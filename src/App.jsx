import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Member from "./pages/Member";

const MenuManagement = () => (
  <div style={{ padding: "40px", color: "#fff" }}>
    <h2>📋 Halaman Manajemen Stok & Menu</h2>
  </div>
);

const OrdersHistory = () => (
  <div style={{ padding: "40px", color: "#fff" }}>
    <h2>◷ Halaman Riwayat Transaksi</h2>
  </div>
);

const SettingsPage = () => (
  <div style={{ padding: "40px", color: "#fff" }}>
    <h2>⚙️ Halaman Pengaturan Sistem</h2>
  </div>
);

function MainApp() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab.toLowerCase().trim()) {
      case "dashboard":
      case "home":
        return <Dashboard />;

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
        .main-app-container {
          display:flex;
          background:#3a3838;
          min-height:100vh;
          width:100vw;
          border-radius:40px;
          overflow:hidden;
        }

        .page-content-render{
          flex-grow:1;
          overflow-y:auto;
        }
      `}</style>

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="page-content-render">{renderContent()}</div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/" element={<MainApp />} />

      {/* Layout khusus auth */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="/member" element={<Member />} />
    </Routes>
  );
}
