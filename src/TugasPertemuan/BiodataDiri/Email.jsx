import React, { useState } from "react";

function Email() {
  const [showEmail, setShowEmail] = useState(false);

  return (
    <div className="biodata-item">
      <button className="btn-field" onClick={() => setShowEmail(!showEmail)}>
        {showEmail ? "Sembunyikan Email" : "Tampilkan Email"}
      </button>
      {showEmail && <p className="email-text">lindy24si@mahasiswa.pcr.ac.id</p>}
    </div>
  );
}

export default Email;