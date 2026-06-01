export default function Button({
  children,
  type = "primary",
}) {
  return (
    <button
      className={`crm-button ${
        type === "secondary"
          ? "secondary"
          : ""
      }`}
    >
      {children}
    </button>
  );
}