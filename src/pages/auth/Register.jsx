import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    alert("Registrasi Akun Baru Berhasil!");
    navigate("/login"); // Lempar ke halaman login biar user bisa masuk
  };

  return (
    <div className="auth-screen-wrapper">
      <div className="auth-card-box">
        <div className="auth-brand-logo">YourForm</div>

        {/* Tab Penunjuk Aktif */}
        <div className="auth-nav-tabs">
          <Link to="/login" className="auth-tab-link">Login</Link>
          <Link to="/register" className="auth-tab-link active">Register</Link>
        </div>

        <form onSubmit={handleRegisterSubmit}>
          {/* Username input */}
          <div className="auth-input-group">
            <span className="auth-field-icon">👤</span>
            <input 
              type="text" 
              placeholder="Username" 
              className="auth-input-control" 
              required 
            />
          </div>

          {/* Email input */}
          <div className="auth-input-group">
            <span className="auth-field-icon">✉️</span>
            <input 
              type="email" 
              placeholder="Email Address" 
              className="auth-input-control" 
              required 
            />
          </div>

          {/* Password input */}
          <div className="auth-input-group">
            <span className="auth-field-icon">🔒</span>
            <input 
              type="password" 
              placeholder="Password" 
              className="auth-input-control" 
              required 
            />
          </div>

          {/* Spacer penyelarasan tombol layout agar setinggi form login */}
          <div style={{ height: "20px" }}></div>

          <button type="submit" className="auth-submit-btn">Register</button>
        </form>

        {/* Akses Cepat Sosial Media */}
        <div className="auth-social-divider">Or register with</div>
        <div className="auth-social-buttons">
          <button className="auth-social-icon-btn" title="Facebook" onClick={() => alert("FB Register")}>📘</button>
          <button className="auth-social-icon-btn" title="Google" onClick={() => alert("Google Register")}>🔴</button>
          <button className="auth-social-icon-btn" title="Twitter" onClick={() => alert("Twitter Register")}>🌐</button>
        </div>
      </div>
    </div>
  );
}