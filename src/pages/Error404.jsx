import { Link } from "react-router-dom"
export default function Error404() {
  return (
    <section className="error-page">
      <div className="error-dark"></div>
      <div className="error-container">
        <p className="error-mini">
          ERROR 404
        </p>
        <h1 className="error-title">
          Lost In The Coffee Shop.
        </h1>
        <p className="error-text">
          Halaman yang kamu cari belum tersedia,
          sudah dipindahkan, atau masih dalam proses development.
        </p>
        <div className="error-actions">
          <Link to="/" className="error-primary-btn">
            Back To Home
          </Link>
        </div>
      </div>
    </section>
  )
}