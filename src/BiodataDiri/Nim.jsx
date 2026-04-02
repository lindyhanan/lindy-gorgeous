import React, { useState } from "react";

function Nim() {
  const [showNim, setShowNim] = useState(false);

  return (
    <div className="biodata-item">
      <button className="btn-field" onClick={() => setShowNim(!showNim)}>
        {showNim ? "Sembunyikan NIM" : "Tampilkan NIM"}
      </button>
      {showNim && <p className="nim-text">2457301074</p>}
    </div>
  );
}

export default Nim;