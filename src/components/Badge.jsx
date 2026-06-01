export default function Badge({
  children,
  active = false,
}) {
  return (
    <span
      className={`crm-badge ${
        active ? "active" : ""
      }`}
    >
      {children}
    </span>
  );
}