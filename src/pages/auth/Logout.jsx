import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      await supabase.auth.signOut();
      
      setTimeout(() => {
        alert("Anda telah berhasil logout!");
        navigate("/login");
      }, 1500);
    };
    
    doLogout();
  }, [navigate]);

  return (
    <div className="auth-screen-wrapper logout-center">
      {/* INTEGRASI STYLING KONSISTEN */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        .auth-screen-wrapper.logout-center {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100vw;
          height: 100vh;
          background-color: #121212;
          font-family: 'Poppins', sans-serif;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9999;
          color: #ffffff;
          text-align: center;
        }

        .logout-card {
          background-color: #1e1e1e;
          padding: 40px;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          max-width: 400px;
          width: 90%;
        }

        .logout-card h2 {
          font-size: 1.6rem;
          font-weight: 600;
          margin: 0 0 8px 0;
          color: #ffffff;
        }

        /* Menggunakan tag <small> kustom sesuai kebutuhan teks ukuran kecil */
        .logout-card small {
          display: block;
          font-size: 0.85rem;
          color: #a3a3a3;
          font-weight: 300;
          line-height: 1.5;
        }

        /* ANIMASI LOADING COFFEE SPINNER */
        .coffee-loader {
          width: 48px;
          height: 48px;
          border: 3px solid rgba(179, 139, 83, 0.2);
          border-radius: 50%;
          display: inline-block;
          position: relative;
          box-sizing: border-box;
          animation: rotation 1s linear infinite;
          margin-bottom: 24px;
        }
        .coffee-loader::after {
          content: '';
          box-sizing: border-box;
          position: absolute;
          left: 0;
          top: 0;
          background: #b38b53;
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        @keyframes rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div className="logout-card">
        {/* Spinner Animasi Berwarna Cokelat Khas Café */}
        <span className="coffee-loader"></span>
        <h2>Logging Out</h2>
        <small>Mohon tunggu sebentar, sistem sedang mengamankan dan membersihkan sesi kasir Anda.</small>
      </div>
    </div>
  );
}