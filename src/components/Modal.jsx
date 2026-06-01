export default function Modal({
  title,
  children,
  open,
  onClose,
}) {
  if (!open) return null;

  return (
    <div
      className="crm-modal-overlay"
      onClick={onClose}
    >
      <div
        className="crm-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="crm-modal-header">
          <h2 className="crm-modal-title">
            {title}
          </h2>

          <button
            className="crm-modal-close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}