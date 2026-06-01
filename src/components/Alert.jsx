export default function Alert({
  message,
  type = "success",
}) {
  return (
    <div className={`crm-alert ${type}`}>
      {message}
    </div>
  );
}