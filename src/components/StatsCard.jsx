export default function StatsCard({
  title,
  value,
  growth,
}) {
  return (
    <div className="crm-stats-card">
      <div className="crm-stats-title">
        {title}
      </div>

      <div className="crm-stats-value">
        {value}
      </div>

      <div className="crm-stats-growth">
        {growth}
      </div>
    </div>
  );
}