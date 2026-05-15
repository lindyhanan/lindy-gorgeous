export default function ProductCard({ item, qty = 0, onAdd, onRemove, onTambah }) {
  if (!item) return null;

  return (
    <div className="menu-card">
      {/* Tombol Aksi Pojok Kanan Atas */}
      <div className="card-actions">
        <button className="card-action-btn" title="Edit">✏️</button>
        <button className="card-action-btn" title="Hapus">🗑️</button>
      </div>

      {/* Baris Atas: Gambar, Judul, Keterangan */}
      <div className="card-main-info">
        <div className="card-img-wrap">
          <img src={item.img} alt={item.name} className="card-img" />
        </div>
        <div className="card-details">
          <h3 className="card-name">{item.name}</h3>
          <p className="card-desc">Caffe {item.name.toLowerCase()} pilihan dengan cita rasa terbaik.</p>
        </div>
      </div>

      {/* Baris Tengah: Rating, Reviews, Harga */}
      <div className="card-meta">
        <div>
          <span className="meta-label">Rating</span>
          <span className="card-rating">⭐ {item.rating}</span>
        </div>
        <div>
          <span className="meta-label">Review</span>
          <span className="card-reviews">({item.reviews})</span>
        </div>
        <div>
          <span className="meta-label">Harga</span>
          <span className="card-price">{item.price}</span>
        </div>
      </div>

      <div className="card-divider" />

      {/* Pilihan Size */}
      <div className="size-section">
        <span className="meta-label">Size</span>
        <div className="size-buttons">
          <button className="size-btn">S</button>
          <button className="size-btn active">M</button>
          <button className="size-btn">L</button>
        </div>
      </div>

      {/* Baris Bawah: Tombol Tambah ke Pesanan & Qty Control */}
      <div className="card-footer-controls">
        {qty > 0 ? (
          <div className="qty-control">
            <button className="qty-btn" onClick={() => onRemove && onRemove(item.id)}>−</button>
            <span className="qty-val">{qty}</span>
            <button className="qty-btn plus" onClick={() => onAdd && onAdd(item.id)}>+</button>
          </div>
        ) : (
          <button className="tambah-btn" onClick={() => onTambah && onTambah(item)}>
            Tambahkan ke pesanan
          </button>
        )}
      </div>
    </div>
  );
}