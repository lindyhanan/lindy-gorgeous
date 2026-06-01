import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    alert("Login Berhasil!");
    navigate("/"); // Redirect balik ke dashboard kasir setelah sukses
  };

  return (
    <div className="auth-screen-wrapper">
      <div className="auth-card-box">
        <div className="auth-brand-logo">YourForm</div>

        {/* Tab Penunjuk Aktif */}
        <div className="auth-nav-tabs">
          <Link to="/login" className="auth-tab-link active">Login</Link>
          <Link to="/register" className="auth-tab-link">Register</Link>
        </div>

        <form onSubmit={handleLoginSubmit}>
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

          {/* Opsi Ingat Saya & Lupa Sandi */}
          <div className="auth-options-row">
            <label className="auth-checkbox-label">
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgot" className="auth-forgot-link">Forgot password?</Link>
          </div>

          <button type="submit" className="auth-submit-btn">Login</button>
        </form>

        {/* Akses Cepat Sosial Media */}
        <div className="auth-social-divider">Or login with</div>
        <div className="auth-social-buttons">
          <button className="auth-social-icon-btn" title="Facebook" onClick={() => alert("FB Login")}>📘</button>
          <button className="auth-social-icon-btn" title="Google" onClick={() => alert("Google Login")}>🔴</button>
          <button className="auth-social-icon-btn" title="Twitter" onClick={() => alert("Twitter Login")}>🌐</button>
        </div>
      </div>
    </div>
  );
}