import { Link } from "react-router-dom"

export default function MemberBenefit() {
  return (
    <section id="benefit" className="crm-section">

      <div className="crm-box">

        <div className="crm-grid">

          <div>

            <h2 className="crm-title">
              Join Our <span>CRM Membership</span>
            </h2>

            <p className="crm-desc">
              Lindy Coffee menggunakan sistem CRM untuk menjaga
              hubungan pelanggan melalui loyalty point,
              promo personal, newsletter, dan customer support.
            </p>

            <div className="hero-buttons">

              <button className="primary-btn">
                Join Membership
              </button>

              <Link
                to="/learn-more"
                className="secondary-btn"
              >
                Learn More
              </Link>

            </div>

          </div>

          <div className="crm-stats">

            <div className="crm-card">
              <h3>12K+</h3>
              <p>Happy Customers</p>
            </div>

            <div className="crm-card">
              <h3>4.9</h3>
              <p>Customer Rating</p>
            </div>

            <div className="crm-card">
              <h3>8K+</h3>
              <p>Loyalty Members</p>
            </div>

            <div className="crm-card">
              <h3>24/7</h3>
              <p>Customer Support</p>
            </div>

          </div>

        </div>

      </div>

    </section>
  )
}