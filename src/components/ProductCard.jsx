export default function ProductCard({
  image,
  name = "Caramel Latte",
  price = "28.000",
  rating = 4.8,
  reviews = 120,
}) {
  return (
    <div className="crm-product-card">

      {/* Action Buttons */}
      <div className="card-actions">
        <button className="card-action-btn">✏️</button>
        <button className="card-action-btn">🗑️</button>
      </div>

      {/* Header */}
      <div className="card-main-info">
        <div className="card-img-wrap">
          <img
            src={
              image ||
              "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500"
            }
            alt={name}
            className="crm-product-img"
          />
        </div>

        <div className="card-details">
          <h3 className="crm-product-name">
            {name}
          </h3>

          <p className="card-desc">
            Premium coffee dengan cita rasa terbaik.
          </p>
        </div>
      </div>

      {/* Meta */}
      <div className="card-meta">
        <div>
          <span className="meta-label">
            Rating
          </span>

          <div className="card-rating">
            ⭐ {rating}
          </div>
        </div>

        <div>
          <span className="meta-label">
            Reviews
          </span>

          <div className="card-reviews">
            ({reviews})
          </div>
        </div>

        <div>
          <span className="meta-label">
            Harga
          </span>

          <div className="crm-product-price">
            Rp {price}
          </div>
        </div>
      </div>

      <div className="card-divider" />

      {/* Size */}
      <div className="size-section">
        <span className="meta-label">
          Size
        </span>

        <div className="size-buttons">
          <button className="size-btn">
            S
          </button>

          <button className="size-btn active">
            M
          </button>

          <button className="size-btn">
            L
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="card-footer-controls">
        <button className="tambah-btn">
          Tambahkan ke Pesanan
        </button>
      </div>
    </div>
  );
}