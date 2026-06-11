import { useState } from "react";
import SearchBar from "../components/SearchBar";
import CategoryTabs from "../components/CategoryTabs";
import StatsCard from "../components/StatsCard";
import ProductCard from "../components/ProductCard";
import OrderPanel from "../components/OrderPanel";
import RevenueChart from "../components/RevenueChart";
import FloatingButton from "../components/FloatingButton";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import Card from "../components/Card";
import RevenueAnalytics from "../components/RevenueAnalytics";
import Modal from "../components/Modal";
import Table from "../components/Table";
import Alert from "../components/Alert";
import Pagination from "../components/Pagination";

export default function Components() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="playground-container">
      <style>{`
        /* ── LAYOUT UTAMA PLAYGROUND ── */
        .playground-container {
          padding: 30px;
          color: #ffffff;
          font-family: 'Poppins', sans-serif;
          display: flex;
          flex-direction: column;
          gap: 25px;
          box-sizing: border-box;
          width: 100%;
          min-height: 100vh;
        }

        .playground-title {
          font-size: 32px;
          font-weight: 800;
          margin: 0;
          letter-spacing: -0.5px;
          background: linear-gradient(45deg, #ffffff, #a3a3a3);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* ── GRID SYSTEM UNTUK PAMERAN KOMPONEN ── */
        .playground-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 25px;
          width: 100%;
          align-items: start;
        }

        /* Memaksa elemen kompleks berukuran besar memakan 2 kolom penuh agar seimbang */
        .span-2 {
          grid-column: span 2;
        }

        @media (max-width: 900px) {
          .span-2 {
            grid-column: span 1;
          }
        }

        /* ── LABEL PREVIEW DI DALAM KARTU ── */
        .component-label {
          font-size: 14px;
          font-weight: 600;
          color: #a3a3a3;
          margin: 0 0 16px 0;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          padding-bottom: 8px;
        }

        /* ── KOTAK FLEX FLEXIBEL UNTUK BUTTON & BADGE ── */
        .flex-row-gap {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
        }
      `}</style>

      {/* Judul Utama Atas */}
      <h1 className="playground-title">Components Playground</h1>

      {/* Grid Dashboard Showcase */}
      <div className="playground-grid">
        
        {/* SearchBar */}
        <Card>
          <h2 className="component-label">SearchBar</h2>
          <SearchBar />
        </Card>

        {/* Badge */}
        <Card>
          <h2 className="component-label">Badge</h2>
          <div className="flex-row-gap">
            <Badge>Kopi</Badge>
            <Badge active>Snack</Badge>
          </div>
        </Card>

        {/* Button */}
        <Card>
          <h2 className="component-label">Button</h2>
          <div className="flex-row-gap">
            <Button>Add Menu</Button>
            <Button type="secondary">Cancel</Button>
          </div>
        </Card>

        {/* Modal */}
        <Card>
          <h2 className="component-label">Modal Popup</h2>
          <Button onClick={() => setOpenModal(true)}>Buka Modal</Button>
          <Modal
            title="Tambah Menu"
            open={openModal}
            onClose={() => setOpenModal(false)}
          >
            <p style={{ margin: "10px 0", color: "#e3e3e3", fontSize: "14px" }}>
              Ini contoh isi jendela modal dinamis bawaan CRM Coffee Shop.
            </p>
          </Modal>
        </Card>

        {/* Avatar */}
        <Card>
          <h2 className="component-label">Avatar Inisial</h2>
          <div className="flex-row-gap">
            <Avatar name="Congo" />
            <Avatar name="Mango" />
          </div>
        </Card>

        {/* Alert */}
        <Card>
          <h2 className="component-label">Alert System</h2>
          <Alert type="success" message="Menu baru berhasil ditambahkan!" />
        </Card>

        {/* Stats Card */}
        <Card>
          <h2 className="component-label">Stats Card Preview</h2>
          <StatsCard title="Total Pendapatan" value="Rp 45.230.000" growth="+12.5%" />
        </Card>

        {/* Category Tabs */}
        <Card>
          <h2 className="component-label">Category Tabs</h2>
          <CategoryTabs />
        </Card>

        {/* Pagination */}
        <Card>
          <h2 className="component-label">Pagination Control</h2>
          <Pagination currentPage={1} totalPages={5} />
        </Card>

        {/* Floating Button */}
        <Card>
          <h2 className="component-label">Floating Button Action</h2>
          <div style={{ position: "relative", minHeight: "60px" }}>
            <FloatingButton />
          </div>
        </Card>

        {/* Product Card */}
        <Card>
          <h2 className="component-label">Product Card Item</h2>
          <ProductCard 
            name="Caramel Latte" 
            price={28000} 
            rating={4.8} 
            reviews={120} 
            image="https://images.unsplash.com/photo-1534778101976-62847782c213?w=300&q=80" 
          />
        </Card>

        {/* Table - Dimatangkan agar memakan 2 kolom penuh */}
        <div className="span-2">
          <Card>
            <h2 className="component-label">Data Table Struk</h2>
            <Table />
          </Card>
        </div>

        {/* Revenue Chart */}
        <div className="span-2">
          <Card>
            <h2 className="component-label">Revenue Bar Chart</h2>
            <RevenueChart />
          </Card>
        </div>

        {/* Revenue Analytics */}
        <div className="span-2">
          <Card>
            <h2 className="component-label">Revenue Analytics Report</h2>
            <RevenueAnalytics />
          </Card>
        </div>

        {/* Order Panel Struk */}
        <div className="span-2">
          <Card>
            <h2 className="component-label">Order Panel (Sidebar Kanan)</h2>
            <OrderPanel 
              items={[
                { id: 1, name: "Caramel Latte", price: 28000, qty: 2, size: "M" },
                { id: 2, name: "Espresso Dolce", price: 24000, qty: 1, size: "L" }
              ]} 
            />
          </Card>
        </div>

      </div>
    </div>
  );
}