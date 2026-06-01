import { Link } from "react-router-dom"

export default function Forgot() {
  return (
    <div className="auth-form-wrap">
      <h2 className="auth-title">
        Forgot Password
      </h2>
      <p className="auth-subtitle">
        Masukkan email untuk reset password
      </p>
      <form className="auth-form">
        <input
          type="email"
          placeholder="Email"
        />
        <button type="submit">
          Send Reset Link
        </button>
      </form>
      <div className="auth-links">
        <Link to="/login">
          Back to Login
        </Link>
      </div>
    </div>
  )
}