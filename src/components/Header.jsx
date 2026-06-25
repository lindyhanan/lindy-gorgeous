import { useState, useEffect } from "react"; // 💡 Tambahkan useEffect di sini
import { Link, useNavigate } from "react-router-dom"; // Tambahkan useNavigate jika ingin redirect setelah logout

export default function Header({ query, setQuery }) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [username, setUsername] = useState("Guest");
  const [role, setRole] = useState("guest");

  useEffect(() => {
    // 💡 Ambil data nama dan role dari localStorage yang diset saat login berhasil
    const savedName = localStorage.getItem("user_name");
    const savedRole = localStorage.getItem("user_role");

    if (savedName) setUsername(savedName);
    if (savedRole) setRole(savedRole);
  }, []);

  // Fungsi toggle dropdown saat avatar diklik
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Fungsi untuk membersihkan data login saat klik logout
  const handleLogout = () => {
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_role");
    setUsername("Guest");
    setRole("guest");
    setIsDropdownOpen(false);
    alert("Anda telah logout.");
    navigate("/login"); // arahkan ke halaman login
  };

  return (
    <header className="top-header">
      <style>{`
        /* ── COMPONENT: TOP HEADER CONTAINER ── */
        .top-header {
          display: flex;
          justify-content: space-between;
          align-items: center; /* 💡 Perbaikan typo censter -> center */
          width: 100%;
          padding-bottom: 15px;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
          background-color: transparent;
        }

        /* ── KIRI: TEKS SELAMAT DATANG ── */
        .header-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .brand-sub {
          font-size: 14px;
          color: #a3a3a3;
          font-weight: 400;
        }

        .brand-title {
          font-size: 28px;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.5px;
        }

        /* ── KANAN: WIDGET CONTROL NAVIGATION ── */
        .header-right {
          display: flex;
          align-items: center;
          gap: 20px; 
        }

        /* ⚙️ SEARCH BOX (Kapsul Gelap Bulat) */
        .search-box {
          display: flex;
          align-items: center;
          background-color: #2a2929; 
          border-radius: 50px;
          padding: 10px 20px;
          width: 260px;
          box-sizing: border-box;
        }

        .search-icon {
          font-size: 16px;
          margin-right: 10px;
          color: #a3a3a3;
        }

        .search-input {
          background: transparent;
          border: none;
          border-bottom: none; /* pastikan tidak mewarisi border bottom global */
          outline: none;
          color: #ffffff;
          font-size: 14px;
          width: 100%;
          font-family: 'Poppins', sans-serif;
        }

        .search-input::placeholder {
          color: #757575;
        }

        /* ⚙️ NOTIFICATION BUTTON */
        .notif-btn {
          background-color: #2a2929;
          border: none;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          font-size: 18px;
          transition: background 0.2s;
        }

        .notif-btn:hover {
          background-color: #3a3939;
        }

        .notif-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          background-color: #d87d56; 
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #2a2929;
        }

        /* ⚙️ USER AVATAR & INFO WRAPPER */
        .user-avatar-wrapper {
          position: relative; 
        }

        .user-avatar {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 12px;
          transition: background 0.2s;
          user-select: none;
        }

        .user-avatar:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }

        .user-avatar img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .user-info {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .user-role {
          font-size: 11px;
          color: #a3a3a3;
          text-transform: lowercase;
        }

        .user-name {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
        }

        /* ── DROPDOWN MENU AUTH (LOGIN/REGISTER/LOGOUT) ── */
        .auth-dropdown {
          position: absolute;
          top: 55px;
          right: 0;
          background-color: #212121; 
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          width: 160px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
          z-index: 999;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: dropDownFade 0.15s ease-out;
        }

        .dropdown-item {
          padding: 12px 16px;
          font-size: 13px;
          color: #ffffff;
          text-decoration: none;
          font-family: 'Poppins', sans-serif;
          transition: background 0.2s;
        }

        .dropdown-item:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }

        .dropdown-divider {
          height: 1px;
          background-color: rgba(255, 255, 255, 0.06);
          margin: 4px 0;
        }

        .logout-item {
          color: #f87171; 
        }

        .logout-item:hover {
          background-color: rgba(248, 113, 113, 0.08);
        }

        /* ⚙️ BUTTON: + ADD MENU */
        .add-btn {
          background-color: #ffffff;
          color: #2c2520;
          border: none;
          border-radius: 50px;
          padding: 12px 24px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.1s, background-color 0.2s;
        }

        .add-btn:hover {
          background-color: #f0f0f0;
          transform: translateY(-1px);
        }

        .add-btn:active {
          transform: translateY(0);
        }

        @keyframes dropDownFade {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

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

        {/* AREA AVATAR DENGAN CHANGER TOGGLE DROPDOWN */}
        <div className="user-avatar-wrapper">
          <div className="user-avatar" onClick={toggleDropdown}>
            <img src="https://i.imgur.com/yXOvdOS.jpeg" alt="User Avatar" />
            <div className="user-info">
              <span className="user-role">{role}</span>
              <span className="user-name">{username} ▾</span>
            </div>
          </div>

          {/* MENU DROPDOWN AUTH */}
          {isDropdownOpen && (
            <div className="auth-dropdown">
              <Link to="/login" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                🔑 Login
              </Link>
              <Link to="/register" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                📝 Register
              </Link>
              <Link to="/member" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                👤 Member
              </Link>
              <div className="dropdown-divider"></div>
              {/* 💡 Menggunakan tombol div/button/link yang memicu fungsi logout */}
              <div className="dropdown-item logout-item" style={{ cursor: 'pointer' }} onClick={handleLogout}>
                🚪 Logout
              </div>
            </div>
          )}
        </div>

        <button className="add-btn" onClick={() => alert("Tambah menu baru")}>+ Add menu</button>
      </div>
    </header>
  );
}