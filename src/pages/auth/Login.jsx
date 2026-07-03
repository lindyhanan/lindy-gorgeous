import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const emailInputRef = useRef(null);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (profile?.role === "ADMIN") {
        navigate("/");
      } else if (profile?.role === "MEMBER") {
        navigate("/member");
      } else {
        navigate("/guest");
      }
    } catch (err) {
      setError(err.message);
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
          color: #b38b53;
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
          background-color: #967241;
        }

        .auth-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .auth-error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239,68,68,0.3);
          color: #fca5a5;
          padding: 12px;
          border-radius: 10px;
          font-size: 0.85rem;
          margin-bottom: 16px;
        }

        .auth-switch-prompt {
          text-align: center;
          margin-top: 24px;
          color: #a3a3a3;
          font-size: 0.9rem;
        }

        .auth-link {
          color: #b38b53;
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
          <p>☕ Don't you remember your coffee?</p>
        </div>
      </div>

      {/* SISI KANAN: FORM LOGIN */}
      <div className="auth-form-container">
        <div className="auth-card-box">
          <div className="auth-header-zone">
            <h2>Welcome Back</h2>
            <p>Masuk ke akun Dogee Coffee Anda.</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

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
              {loading ? "Memproses..." : "Login to Account"}
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