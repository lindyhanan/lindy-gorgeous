import { Outlet } from "react-router-dom"

export default function AuthLayout() {

  return (

    <div className="auth-page">

      {/* Overlay */}
      <div className="auth-overlay"></div>

      {/* CARD */}
      <div className="auth-card">

        {/* RIGHT */}
        <div className="auth-right">

          <Outlet />

        </div>

      </div>

    </div>

  )
}