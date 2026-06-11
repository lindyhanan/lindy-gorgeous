export default function Pagination() {
  return (
    <>
      <style>{`
        .crm-pagination{
          display:flex;
          gap:12px;
          margin-top:30px;
          justify-content:center;
          align-items:center;
        }

        .crm-pagination button{
          width:45px;
          height:45px;
          border:none;
          border-radius:14px;
          background:#ece7e2;
          color:#555;
          font-size:15px;
          font-weight:600;
          cursor:pointer;
          transition:.3s;
        }

        .crm-pagination button:hover{
          transform:translateY(-2px);
        }

        .crm-pagination button.active{
          background:#9b6a45;
          color:white;
          box-shadow:0 8px 20px rgba(155,106,69,.25);
        }
      `}</style>

      <div className="crm-pagination">
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
      </div>
    </>
  );
}