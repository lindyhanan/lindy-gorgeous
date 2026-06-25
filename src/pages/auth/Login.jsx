import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { notesAPI } from "../../services/notesAPI"; // 💡 Sesuaikan path notesAPI.js kamu

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [loading, setLoading] = useState(false); 
  
  const emailInputRef = useRef(null);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const userList = await notesAPI.getUserByEmail(email);

      if (userList.length === 0) {
        alert("Email tidak terdaftar di database Supabase!");
        return;
      }

      const userTerdaftar = userList[0];

      if (userTerdaftar.password !== password) {
        alert("Password yang Anda masukkan salah!");
        return;
      }
      alert(`Login Berhasil! Selamat datang, ${userTerdaftar.username}`);

      localStorage.setItem("user_name", userTerdaftar.username);
      localStorage.setItem("user_role", userTerdaftar.role);

      if (userTerdaftar.role === "member") {
        navigate("/member");
      } else if (userTerdaftar.role === "admin") {
        navigate("/");
      } else {
        navigate("/guest");
      }

    } catch (err) {
      alert(`Terjadi kesalahan login: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-screen-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

        .auth-screen-wrapper {
          display: flex;
          width: 100vw;
          height: 100vh;
          background-color: #121212;
          font-family: 'Poppins', sans-serif;
          overflow: hidden;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9999;
        }

        /* BANNER VISUAL KIRI */
        .auth-visual-banner {
          flex: 1.1;
          position: relative;
          background-image: url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: flex-end;
          padding: 60px;
        }

        .auth-banner-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, rgba(18, 18, 18, 0.95) 20%, rgba(0, 0, 0, 0.3));
          z-index: 1;
        }

        .auth-banner-content {
          position: relative;
          z-index: 2;
          color: #ffffff;
          max-width: 500px;
        }

        .auth-banner-content h1 {
          font-size: 2.8rem;
          font-weight: 800;
          line-height: 1.2;
          margin: 0 0 16px 0;
        }

        .auth-banner-content h1 span {
          color: #92634e;
        }

        .auth-banner-content p {
          color: #d1d1d1;
          font-size: 1rem;
          line-height: 1.5;
          font-weight: 300;
          margin: 0;
        }

        /* FORM KANAN */
        .auth-form-container {
          flex: 0.9;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #121212;
          padding: 40px;
          border-top-left-radius: 32px;
          border-bottom-left-radius: 32px;
          z-index: 2;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.3);
        }

        .auth-card-box {
          width: 100%;
          max-width: 420px;
        }

        .auth-header-zone {
          margin-bottom: 32px;
        }

        .auth-header-zone h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 8px 0;
        }

        .auth-header-zone p {
          color: #a3a3a3;
          font-size: 0.9rem;
          margin: 0;
        }

        .auth-social-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
        }

        .auth-social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          background-color: #1e1e1e;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: #ffffff;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .auth-social-btn:hover {
          background-color: #2a2a2a;
          border-color: rgba(255, 255, 255, 0.2);
        }

        .auth-social-divider {
          text-align: center;
          margin: 24px 0;
          position: relative;
        }

        .auth-social-divider::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.1);
          z-index: 1;
        }

        .auth-social-divider span {
          background-color: #121212;
          padding: 0 16px;
          color: #666666;
          font-size: 0.8rem;
          font-weight: 600;
          position: relative;
          z-index: 2;
          letter-spacing: 1px;
        }

        .auth-input-group {
          margin-bottom: 24px;
          position: relative;
        }

        .auth-input-control {
          width: 100%;
          padding: 12px 0;
          background: transparent;
          border: none;
          border-bottom: 1px solid #444444;
          color: #ffffff;
          font-size: 0.95rem;
          transition: border-color 0.2s ease;
          box-sizing: border-box;
        }

        .auth-input-control:focus {
          outline: none;
          border-bottom-color: #92634e;
        }

        /* 💡 BARIS TAMBAHAN UNTUK INTEGRASI RESET PASSWORD */
        .auth-utilities-row {
          display: flex;
          justify-content: flex-end;
          margin-top: -12px;
          margin-bottom: 20px;
        }

        .auth-submit-btn {
          width: 100%;
          padding: 14px;
          background-color: #92634e;
          border: none;
          border-radius: 12px;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 16px;
          transition: background-color 0.2s ease;
        }

        .auth-submit-btn:hover {
          background-color: #b07e66;
        }

        .auth-switch-prompt {
          text-align: center;
          margin-top: 24px;
          color: #a3a3a3;
          font-size: 0.9rem;
        }

        .auth-link {
          color: #b07e66;
          text-decoration: none;
          font-weight: 500;
          margin-left: 4px;
        }

        .auth-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 900px) {
          .auth-visual-banner {
            display: none;
          }
          .auth-form-container {
            flex: 1;
            border-radius: 0;
            padding: 24px;
          }
        }
      `}</style>

      {/* SISI KIRI: BANNER BRAND */}
      <div className="auth-visual-banner">
        <div className="auth-banner-overlay"></div>
        <div className="auth-banner-content">
          <h1>Dogee <br /><span>Cafe</span></h1>
          <p>☕ Dont you remember your coffe?</p>
        </div>
      </div>

      {/* SISI KANAN: FORM LOGIN */}
      <div className="auth-form-container">
        <div className="auth-card-box">
          <div className="auth-header-zone">
            <h2>Welcome Back</h2>
            <p>Silakan masuk ke akun admin kasir Anda.</p>
          </div>

          <div className="auth-social-buttons">
            <button type="button" className="auth-social-btn" onClick={() => alert("Google Login")}>
              <span>🔴</span> Google
            </button>
            <button type="button" className="auth-social-btn" onClick={() => alert("FB Login")}>
              <span>📘</span> Facebook
            </button>
          </div>

          <div className="auth-social-divider">
            <span>- OR -</span>
          </div>

          <form onSubmit={handleLoginSubmit}>
            {/* Input Email */}
            <div className="auth-input-group">
              <input 
                ref={emailInputRef}
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required 
                className="auth-input-control" 
              />
            </div>

            {/* Input Password */}
            <div className="auth-input-group">
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required 
                className="auth-input-control" 
              />
            </div>

            {/* 💡 MODIFIKASI: Penempatan link reset password diletakkan pas di bawah input */}
            <div className="auth-utilities-row">
              <Link to="/forgot" className="auth-link" style={{ fontSize: "0.85rem" }}>Lupa Password?</Link>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? "Memvalidasi..." : "Login to Account"}
            </button>
          </form>

          <p className="auth-switch-prompt">
            Don't have an account? <Link to="/register" className="auth-link">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}