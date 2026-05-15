import { useState } from "react";
import { Link } from "react-router-dom"; // 💡 Import Link untuk navigasi halaman auth

export default function Header({ query, setQuery }) {
  // State untuk mengontrol buka/tutup dropdown menu auth
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fungsi toggle dropdown saat avatar diklik
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="top-header">
      <div className="header-left">
        <span className="brand-sub">Selamat datang di Doge Caffe Dashboard!</span>
        <h1 className="brand-title">Always give the best service</h1>
      </div>

      <div className="header-right">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            type="text"
            placeholder="cari menu"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <button className="notif-btn">
          🔔
          <span className="notif-badge">3</span>
        </button>

        {/* 💡 AREA AVATAR: Ditambahkan event onClick dan class wrapper relatif */}
        <div className="user-avatar-wrapper">
          <div className="user-avatar" onClick={toggleDropdown}>
            <img src="https://i.imgur.com/yXOvdOS.jpeg" alt="User Avatar" />
            <div className="user-info">
              <span className="user-role">admin</span>
              <span className="user-name">Congo ▾</span> {/* Menambahkan panah kecil indikator */}
            </div>
          </div>

          {/* 💡 MENU DROPDOWN: Hanya muncul jika state isDropdownOpen bernilai true */}
          {isDropdownOpen && (
            <div className="auth-dropdown">
              <Link to="/login" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                🔑 Login
              </Link>
              <Link to="/register" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                📝 Register
              </Link>
              <div className="dropdown-divider"></div>
              <Link to="/logout" className="dropdown-item logout-item" onClick={() => setIsDropdownOpen(false)}>
                🚪 Logout
              </Link>
            </div>
          )}
        </div>

        <button className="add-btn" onClick={() => alert("Tambah menu baru")}>+ Add menu</button>
      </div>
    </header>
  );
}