import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="app-layout">
      {/* Sisi Kiri: Sidebar */}
      <Sidebar />

      {/* Sisi Kanan: Area Konten Utama */}
      <div className="main-wrapper">
        <Outlet />
      </div>
    </div>
  );
}