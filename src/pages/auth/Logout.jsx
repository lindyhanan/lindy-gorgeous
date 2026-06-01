import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Tempat menaruh logika hapus token / session jika nanti ada auth beneran
    // localStorage.removeItem("token");
    
    alert("Anda telah berhasil logout!");

    // 2. Tendang user kembali ke halaman utama atau halaman login setelah logout
    navigate("/");
  }, [navigate]);

  // Sembari proses useEffect berjalan cepat, tampilkan teks loading sebentar
  return (
    <div className="placeholder-view" style={{ margin: "100px auto" }}>
      <h2>🚪 Memproses Logout...</h2>
      <p>Mohon tunggu sebentar, sedang membersihkan sesi Anda.</p>
    </div>
  );
}