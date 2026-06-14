import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <style>{`
        *{
          box-sizing:border-box;
          margin:0;
          padding:0;
          font-family:'Poppins',sans-serif;
        }

        .auth-page{
          min-height:100vh;
          width:100%;
          display:flex;
          justify-content:center;
          align-items:center;
          padding:40px;
          background:
            linear-gradient(
              135deg,
              #1f1f1f 0%,
              #2a2929 40%,
              #3c312a 100%
            );
          overflow:hidden;
          position:relative;
        }

        /* efek blur background */
        .auth-overlay{
          position:absolute;
          inset:0;
          backdrop-filter:blur(12px);
        }

        /* card utama */
        .auth-card{
          position:relative;
          z-index:10;

          width:100%;
          max-width:520px;

          background:rgba(40,40,40,.8);
          border:1px solid rgba(255,255,255,.08);

          border-radius:35px;

          padding:50px;

          box-shadow:
            0 15px 50px rgba(0,0,0,.4);

          backdrop-filter:blur(20px);

          transition:.3s;
        }

        .auth-card:hover{
          transform:translateY(-2px);
        }

        .auth-right {
  background: transparent;
}

        /* isi login/register */
        .auth-card-box{
          display:flex;
          flex-direction:column;
          gap:20px;
        }

        .auth-brand-logo{
          font-size:40px;
          font-weight:700;
          color:white;
          text-align:center;
          margin-bottom:10px;
        }

        .auth-nav-tabs{
          display:flex;
          gap:12px;
        }

        .auth-tab-link{
          flex:1;
          text-decoration:none;
          text-align:center;
          padding:15px;

          background:#333;

          color:#aaa;

          border-radius:18px;

          transition:.25s;
        }

        .auth-tab-link.active{
          background:#9d673f;
          color:white;
          font-weight:600;
        }

        .auth-input-group{
          background:#323232;
          border-radius:18px;

          padding:0 18px;

          display:flex;
          align-items:center;

          transition:.25s;
        }

        .auth-input-group:focus-within{
          background:#3b3b3b;
          border:1px solid rgba(255,255,255,.08);
        }

        .auth-field-icon{
          color:#999;
          margin-right:12px;
        }

        .auth-input-control{
          width:100%;
          border:none;
          background:none;
          outline:none;

          color:white;

          padding:20px 0;

          font-size:15px;
        }

        .auth-input-control::placeholder{
          color:#777;
        }

        .auth-options-row{
          display:flex;
          justify-content:space-between;
          align-items:center;

          color:#999;

          font-size:14px;
        }

        .auth-forgot-link{
          color:#c99c78;
          text-decoration:none;
        }

        .auth-submit-btn{
          width:100%;

          border:none;

          background:#9d673f;

          color:white;

          padding:18px;

          border-radius:20px;

          font-size:16px;

          font-weight:700;

          cursor:pointer;

          transition:.25s;
        }

        .auth-submit-btn:hover{
          background:#b57a4f;
        }

        .auth-social-divider{
          text-align:center;
          color:#999;
          margin-top:15px;
        }

        .auth-social-buttons{
          display:flex;
          justify-content:center;
          gap:15px;
        }

        .auth-social-icon-btn{
          width:52px;
          height:52px;

          border:none;

          border-radius:50%;

          background:#353535;

          cursor:pointer;

          font-size:20px;

          transition:.2s;
        }

        .auth-social-icon-btn:hover{
          transform:translateY(-3px);
        }

        /* laptop kecil */
        @media (max-width:768px){

          .auth-page{
            padding:20px;
          }

          .auth-card{
            padding:35px;
            border-radius:28px;
          }

          .auth-brand-logo{
            font-size:32px;
          }
            

        }
      `}</style>

      <div className="auth-page">
        <div className="auth-overlay"></div>

        <div className="auth-card">
          <div className="auth-right">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
