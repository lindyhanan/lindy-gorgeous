import React, { useState } from "react";

function Alamat() {
  const [showAlamat, setShowAlamat] = useState(false);

  return (
    <div className="biodata-item">
      <button className="btn-field" onClick={() => setShowAlamat(!showAlamat)}>
        {showAlamat ? "Sembunyikan Alamat" : "Tampilkan Alamat"}
      </button>
      {showAlamat && <p className="alamat-text">Jalan Fajar Ujung</p>}
    </div>
  );
}

export default Alamat;