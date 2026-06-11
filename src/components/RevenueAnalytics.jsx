export default function RevenueAnalytics() {
  return (
    <>
      <style>{`
        .crm-analytics-card{
          background:#f7f4f2;
          border-radius:28px;
          padding:24px;
          box-shadow:0 10px 25px rgba(0,0,0,.08);
          display:flex;
          flex-direction:column;
          gap:18px;
        }

        .crm-analytics-card h3{
          margin:0;
          font-size:1.5rem;
          font-weight:700;
          color:#222;
        }

        .crm-analytics-row{
          display:flex;
          justify-content:space-between;
          align-items:center;
          padding:12px 0;
          border-bottom:1px solid #e4dfdb;
        }

        .crm-analytics-row:last-child{
          border-bottom:none;
        }

        .crm-analytics-row span{
          color:#777;
          font-size:15px;
        }

        .crm-analytics-row strong{
          color:#9b6a45;
          font-size:18px;
          font-weight:700;
        }
      `}</style>

      <div className="crm-analytics-card">
        <h3>Revenue Analytics</h3>

        <div className="crm-analytics-row">
          <span>Today</span>
          <strong>Rp 1.250.000</strong>
        </div>

        <div className="crm-analytics-row">
          <span>This Week</span>
          <strong>Rp 8.700.000</strong>
        </div>

        <div className="crm-analytics-row">
          <span>This Month</span>
          <strong>Rp 32.000.000</strong>
        </div>
      </div>
    </>
  );
}