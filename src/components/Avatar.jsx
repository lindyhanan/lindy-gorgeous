export default function Avatar({
  name = "A",
}) {
  return (
    <div className="crm-avatar">
      {name.charAt(0)}
    </div>
  );
}