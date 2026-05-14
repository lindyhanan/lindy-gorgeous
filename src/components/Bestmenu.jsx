const menus = [
  {
    id: 1,
    name: "Cappuccino",
    price: "Rp 28K",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 2,
    name: "Latte",
    price: "Rp 25K",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 3,
    name: "Espresso",
    price: "Rp 20K",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
  },
]

export default function BestMenu() {
  return (
    <section id="menu" className="menu-wrapper">

      <div className="section-top">

        <div>
          <p className="section-label">
            OUR MENU
          </p>

          <h2 className="section-title">
            Best Coffee Menu
          </h2>
        </div>

      </div>

      <div className="menu-grid">

        {menus.map((item) => (
          <div key={item.id} className="menu-card">

            <img src={item.image} alt={item.name} />

            <div className="menu-content">

              <div className="menu-head">

                <h3>{item.name}</h3>

                <span className="menu-rating">
                  ⭐ {item.rating}
                </span>

              </div>

              <p className="menu-desc">
                Premium coffee dengan kualitas biji kopi terbaik
                dan cita rasa khas coffee shop modern.
              </p>

              <div className="menu-bottom">

                <span className="menu-price">
                  {item.price}
                </span>

                <button className="primary-btn">
                  Order
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </section>
  )
}