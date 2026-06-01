import React, { useState } from "react";

function Hobi() {
  const [showHobi, setShowHobi] = useState(false);

  return (
    <div className="biodata-item">
      <button className="btn-field" onClick={() => setShowHobi(!showHobi)}>
        {showHobi ? "Sembunyikan Hobi" : "Tampilkan Hobi"}
      </button>
      {showHobi && <p className="hobi-text">Dengerin Lagu</p>}
    </div>
  );
}

export default Hobi;