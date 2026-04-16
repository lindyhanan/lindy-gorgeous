import { useState } from "react";
import InputField from "./Tugas/components/InputField";
import "./Tugas/styles.css";

export default function App() {
  // ✅ STATE
  const [form, setForm] = useState({
    nama: "",
    email: "",
    umur: "",
    gender: "",
    jurusan: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ VALIDASI
  const validate = () => {
    let err = {};

    if (!form.nama) err.nama = "Nama wajib diisi";
    else if (/\d/.test(form.nama)) err.nama = "Tidak boleh angka";

    if (!form.email) err.email = "Email wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      err.email = "Email tidak valid";

    if (!form.umur) err.umur = "Umur wajib diisi";
    else if (!/^\d+$/.test(form.umur))
      err.umur = "Harus angka";

    if (!form.gender) err.gender = "Pilih gender";
    if (!form.jurusan) err.jurusan = "Pilih jurusan";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  // ✅ CONDITIONAL BUTTON
  const isValid =
    form.nama &&
    form.email &&
    form.umur &&
    form.gender &&
    form.jurusan &&
    Object.keys(errors).length === 0;

  return (
    <div className="container">
      {/* ✅ FORM dengan tujuan jelas */}
      <h2>Form Pendaftaran Mahasiswa</h2>

      <form onSubmit={handleSubmit}>
        <InputField
          label="Nama"
          type="text"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          error={errors.nama}
        />

        <InputField
          label="Email"
          type="text"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        <InputField
          label="Umur"
          type="text"
          name="umur"
          value={form.umur}
          onChange={handleChange}
          error={errors.umur}
        />

        {/* ✅ 2 SELECT */}
        <div className="mb-4">
          <label>Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">-- pilih --</option>
            <option>Laki-laki</option>
            <option>Perempuan</option>
          </select>
          {errors.gender && <p className="error">{errors.gender}</p>}
        </div>

        <div className="mb-4">
          <label>Jurusan</label>
          <select
            name="jurusan"
            value={form.jurusan}
            onChange={handleChange}
          >
            <option value="">-- pilih --</option>
            <option>Informatika</option>
            <option>Sistem Informasi</option>
            <option>Manajemen</option>
          </select>
          {errors.jurusan && <p className="error">{errors.jurusan}</p>}
        </div>

        <button type="submit" disabled={!isValid}>
        Submit </button>
      </form>

      {/* ✅ hasil muncul jika submit */}
      {submitted && (
        <div className="result">
          <p>Nama: {form.nama}</p>
          <p>Email: {form.email}</p>
          <p>Umur: {form.umur}</p>
          <p>Gender: {form.gender}</p>
          <p>Jurusan: {form.jurusan}</p>
        </div>
      )}
    </div>
  );
}