import React, { useState } from "react";

function Nama() {
  const [showNama, setShowNama] = useState(false);

  return (
    <div className="biodata-item">
      {/* tombol */}
      <button className="btn-field" onClick={() => setShowNama(!showNama)}>
        {showNama ? "Sembunyikan Nama" : "Tampilkan Nama"}
      </button>

      {/* tampilkan nama jika showNama true */}
      {showNama && <p className="nama-text">Lindy Hanantyas Suci</p>}
    </div>
  );
}

export default Nama;