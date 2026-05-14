export default function Newsletter() {
  return (
    <section id="newsletter" className="newsletter-section">

      <div className="newsletter-box">

        <p className="section-label">
          NEWSLETTER
        </p>

        <h2 className="newsletter-title">
          Get Promo & Coffee News
        </h2>

        <p className="newsletter-desc">
          Dapatkan promo spesial, menu terbaru,
          dan informasi event dari Lindy Coffee.
        </p>

        <form className="newsletter-form">

          <input
            type="email"
            placeholder="Enter your email..."
          />

          <button type="submit">
            Subscribe
          </button>

        </form>

      </div>

    </section>
  )
}