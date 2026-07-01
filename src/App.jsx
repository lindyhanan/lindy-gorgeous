import React, { lazy, Suspense, useState, useEffect } from "react"; // 💡 PERBAIKAN: Menambahkan lazy, Suspense, useState, dan useEffect
import { Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Loading from "./components/Loading";

// Lazy loading komponen halaman
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Table = lazy(() => import("./components/Table"));
const RevenueDashboard = lazy(() => import("./components/RevenueDashboard"));
const Member = lazy(() => import("./pages/Member"));
const Components = lazy(() => import("./pages/Components"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Logout = lazy(() => import("./pages/auth/Logout"));
const Forgot = lazy(() => import("./pages/auth/Forgot")); // 💡 Tambahkan halaman Forgot.jsx
const Guest = lazy(() => import("./pages/GuestHome")); // 💡 Tambahkan halaman Guest.jsx

// ── LAYOUT UTAMA UNTUK HALAMAN YANG MEMAKAI SIDEBAR ──
function DashboardLayout() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  // 💡 State Global untuk sinkronisasi data transaksi kasir ke grafik/tabel
  const [transactions, setTransactions] = useState(() => {
    const savedData = localStorage.getItem("crm_transactions");
    return savedData ? JSON.parse(savedData) : [
      { id: "TX-001", item: "Kopi Susu", category: "Kopi", type: "Dine In", amount: 25000, date: "Sen" },
      { id: "TX-002", item: "Croissant", category: "Makanan", type: "Pick Up", amount: 30000, date: "Sen" },
    ];
  });

  // 💡 Auto-save data transaksi ke LocalStorage browser
  useEffect(() => {
    localStorage.setItem("crm_transactions", JSON.stringify(transactions));
  }, [transactions]);

  // 💡 Fungsi penambah transaksi saat kasir menekan tombol pesan
  const handleNewOrder = (newOrderItems, orderType) => {
    const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    const today = days[new Date().getDay()];
    
    const newTransactions = newOrderItems.map((item, index) => ({
      id: `TX-${Date.now()}-${index}`,
      item: item.name,
      category: item.category || "Kopi",
      type: orderType,
      amount: item.price * item.quantity,
      date: today
    }));

    setTransactions((prev) => [...newTransactions, ...prev]);
  };

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* ── BUNDEL 1: HALAMAN INTERNAL (MEMAKAI SIDEBAR) ── */}
        <Route element={<DashboardLayout />}>
          {/* 💡 Oper fungsi handleNewOrder ke Dashboard */}
          <Route path="/" element={<Dashboard onPlaceOrder={handleNewOrder} />} />
          {/* 💡 Kirim state data ke Table dan Analytics */}
          <Route path="/table" element={<Table transactions={transactions} />} />
          <Route path="/analytics" element={<RevenueDashboard transactions={transactions} />} />
          
          <Route path="/components" element={<Components />} />
          <Route path="/orders" element={<div style={{ color: '#fff' }}>Orders</div>} />
          <Route path="/settings" element={<div style={{ color: '#fff' }}>Settings</div>} />
        </Route>

        {/* ── BUNDEL 2: HALAMAN AUTH & OUT (LEPAS DARI SIDEBAR) ── */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/member" element={<Member />} />
        <Route path="/guest" element={<Guest />} />
        <Route path="*" element={<div style={{ color: '#fff' }}>404 Not Found</div>} />
      </Routes>
    </Suspense>
  );
}

export default App;