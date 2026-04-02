import React from "react";
import Nama from "./BiodataDiri/Nama";
import Umur from "./BiodataDiri/Umur";
import Nim from "./BiodataDiri/Nim";
import Alamat from "./BiodataDiri/Alamat";
import Hobi from "./BiodataDiri/Hobi";
import Email from "./BiodataDiri/Email";
import Foto from "./BiodataDiri/Foto";
import "./BiodataDiri/custom.css";

function BiodataDiri() {
  return (
    <div className="container">
    <div className="card">
      <h1>Portofolio Saya</h1>
      <Foto />
      <Nama />
      <Nim />
      <Umur />
      <Alamat />
      <Email />
      <Hobi />
    </div>
    </div>
  );
}

export default BiodataDiri;