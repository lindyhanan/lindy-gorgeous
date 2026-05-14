const menu = [
  {
    name: "Caramel Latte",
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1200",
    price: "Rp 28.000",
    rating: "4.9",
  },
  {
    name: "Espresso",
    image:
      "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=1200",
    price: "Rp 18.000",
    rating: "4.8",
  },
  {
    name: "Mocha Coffee",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200",
    price: "Rp 32.000",
    rating: "4.7",
  },
]

export default function Dashboard() {
  return (
    <div>

      {/* HERO */}
      <section className="min-h-screen flex items-center px-10 lg:px-24">

        <div className="max-w-2xl">

          <p className="text-[#c89b63] tracking-[4px] uppercase mb-5">
            Premium Coffee Experience
          </p>

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
            Enjoy Your
            <span className="text-[#c89b63]"> Coffee </span>
            Before Your Activity
          </h1>

          <p className="text-gray-300 text-lg leading-8 mb-10">
            Lindy Coffee menghadirkan kopi premium dengan cita rasa
            autentik untuk menemani setiap aktivitas harimu.
          </p>

          <div className="flex gap-5 flex-wrap">

            <button className="bg-[#c89b63] hover:bg-[#ddb17b] transition px-8 py-4 rounded-full font-semibold">
              Order Now
            </button>

            <button className="border border-[#c89b63] text-[#c89b63] hover:bg-[#c89b63] hover:text-white transition px-8 py-4 rounded-full font-semibold">
              View Menu
            </button>

          </div>

        </div>

      </section>

      {/* BEST MENU */}
      <section className="px-10 lg:px-24 py-24">

        <div className="flex justify-between items-center mb-14 flex-wrap gap-4">

          <div>
            <p className="text-[#c89b63] uppercase tracking-[3px] mb-3">
              Best Seller
            </p>

            <h2 className="text-4xl font-bold">
              Popular Menu
            </h2>
          </div>

          <button className="text-[#c89b63] border border-[#c89b63] px-5 py-3 rounded-full hover:bg-[#c89b63] hover:text-white transition">
            See All Menu
          </button>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {menu.map((item, index) => (
            <div
              key={index}
              className="bg-[#1b1511] rounded-[28px] overflow-hidden border border-[#2b2119] hover:-translate-y-2 transition duration-300"
            >

              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[260px] object-cover"
              />

              <div className="p-7">

                <div className="flex justify-between items-center mb-3">

                  <h3 className="text-2xl font-semibold">
                    {item.name}
                  </h3>

                  <span className="text-[#c89b63] font-bold">
                    ⭐ {item.rating}
                  </span>

                </div>

                <p className="text-gray-400 leading-7 mb-6">
                  Fresh premium coffee with high quality beans
                  and aesthetic serving style.
                </p>

                <div className="flex justify-between items-center">

                  <span className="text-2xl font-bold text-[#c89b63]">
                    {item.price}
                  </span>

                  <button className="bg-[#c89b63] hover:bg-[#ddb17b] transition px-5 py-3 rounded-full font-semibold">
                    Buy
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </section>

      {/* CRM SECTION */}
      <section className="px-10 lg:px-24 py-24">

        <div className="bg-[#1a1410] rounded-[40px] p-10 lg:p-16 border border-[#2b2119]">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <div>

              <p className="text-[#c89b63] uppercase tracking-[3px] mb-4">
                Coffee CRM
              </p>

              <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Join Membership &
                Get Special Rewards
              </h2>

              <p className="text-gray-400 leading-8 mb-8">
                Dapatkan promo eksklusif, loyalty point,
                cashback, dan penawaran spesial setiap minggu.
              </p>

              <div className="flex gap-5 flex-wrap">

                <button className="bg-[#c89b63] hover:bg-[#ddb17b] transition px-8 py-4 rounded-full font-semibold">
                  Join Member
                </button>

                <a
                  href="https://wa.me/628123456789"
                  target="_blank"
                  className="border border-[#c89b63] text-[#c89b63]
                  hover:bg-[#c89b63] hover:text-white
                  transition px-8 py-4 rounded-full font-semibold"
                >
                  WhatsApp Us
                </a>

              </div>

            </div>

            <div className="grid grid-cols-2 gap-5">

              <div className="bg-[#241c16] rounded-3xl p-7">
                <h3 className="text-5xl font-bold text-[#c89b63] mb-3">
                  12K+
                </h3>
                <p className="text-gray-400">
                  Loyal Customers
                </p>
              </div>

              <div className="bg-[#241c16] rounded-3xl p-7">
                <h3 className="text-5xl font-bold text-[#c89b63] mb-3">
                  4.9
                </h3>
                <p className="text-gray-400">
                  Google Rating
                </p>
              </div>

              <div className="bg-[#241c16] rounded-3xl p-7">
                <h3 className="text-5xl font-bold text-[#c89b63] mb-3">
                  50+
                </h3>
                <p className="text-gray-400">
                  Premium Menu
                </p>
              </div>

              <div className="bg-[#241c16] rounded-3xl p-7">
                <h3 className="text-5xl font-bold text-[#c89b63] mb-3">
                  24/7
                </h3>
                <p className="text-gray-400">
                  Customer Service
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  )
}