import React, { useState } from "react";

function Umur() {
  const [showUmur, setShowUmur] = useState(false);

  return (
    <div className="biodata-item">
      <button className="btn-field" onClick={() => setShowUmur(!showUmur)}>
        {showUmur ? "Sembunyikan Umur" : "Tampilkan Umur"}
      </button>
      {showUmur && <p className="Umur-text">19 Tahun</p>}
    </div>
  );
}

export default Umur;