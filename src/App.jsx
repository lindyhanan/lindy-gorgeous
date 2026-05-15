import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Error404 from "./pages/Error404";

// 💡 IMPORT HALAMAN AUTH (Pastikan path foldernya benar sesuai struktur src/pages/auth/)
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Logout from "./pages/auth/Logout";

export default function App() {
  return (
    <Routes>
      {/* 1. RUTE DASHBOARD UTAMA (Menggunakan MainLayout yang ada Sidebar + Header) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard activeTab="dashboard" />} />
        <Route path="/menu" element={<Dashboard activeTab="menu" />} />
        <Route path="/orders" element={<Dashboard activeTab="orders" />} />
        <Route path="/analytics" element={<Dashboard activeTab="analytics" />} />
        <Route path="/settings" element={<Dashboard activeTab="settings" />} />
      </Route>

      {/* 2. RUTE UTK HALAMAN AUTH (Biasanya TIDAK pakai MainLayout / tanpa sidebar kasir) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/logout" element={<Logout />} />

      {/* 3. FALLBACK JIKA URL TIDAK DIKENALI */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}