export default function ProductCard({
  image,
  name,
  price,
}) {
  return (
    <div className="crm-product-card">
      <img
        src={
          image ||
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500"
        }
        alt={name}
        className="crm-product-img"
      />

      <div className="crm-product-name">
        {name}
      </div>

      <div className="crm-product-price">
        Rp {price}
      </div>
    </div>
  );
}