import React from "react";

// ✅ Reusable Component (sesuai materi: pakai props label, type, placeholder)
export default function InputField({
  label,
  type,
  name,
  value,
  onChange,
  error,
}) {
  return (
    <div className="mb-4">
      <label>{label}</label>

      <input type={type} name={name} value={value} onChange={onChange}
      />

      {/* ✅ Error di bawah input */}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

