import { useState } from "react";
import "./ProductCard.css";

export default function ProductCard({
  image,
  name,
  price,
  rating,
  reviews,
  onAdd,
}) {
  const [selectedSize, setSelectedSize] = useState("M");

  return (
    <div className="product-card">
      <div className="product-top">
        <img src={image} alt={name} className="product-img" />

        <div className="product-info">
          <h3>{name}</h3>
          <p>
            ⭐ {rating} ({reviews} ulasan)
          </p>
        </div>
      </div>

      <div className="product-stats">
        <div className="stat">
          <span>Harga</span>
          <strong>Rp {price.toLocaleString("id-ID")}</strong>
        </div>
      </div>

      <div className="divider"></div>

      <div className="size-section">
        <span>Ukuran</span>

        <div className="size-list">
          {["S", "M", "L"].map((size) => (
            <button
              key={size}
              className={`size-btn ${
                selectedSize === size ? "active" : ""
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <button className="add-btn" onClick={onAdd}>
        + Tambah Pesanan
      </button>
    </div>
  );
}