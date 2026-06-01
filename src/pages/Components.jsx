import SearchBar from "../components/SearchBar";
import CategoryTabs from "../components/CategoryTabs";
import StatsCard from "../components/StatsCard";
import ProductCard from "../components/ProductCard";
import OrderPanel from "../components/OrderPanel";
import RevenueChart from "../components/RevenueChart";
import FloatingButton from "../components/FloatingButton";
import { useState } from "react";
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
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Components Playground</h1>

      {/* SearchBar */}
      <Card>
        <h2 className="font-bold mb-3">SearchBar</h2>
        <SearchBar />
      </Card>

      {/* Badge */}
      <Card>
        <h2 className="font-bold mb-3">Badge</h2>
        <br />
        <div className="flex gap-3">
          <Badge>Kopi</Badge>
          <Badge active>Snack</Badge>
        </div>
      </Card>

      <br />
      {/* Button */}
      <Card>
        <h2 className="font-bold mb-3">Button</h2>

        <div className="flex gap-3">
          <Button>Add Menu</Button>
          <Button type="secondary">Cancel</Button>
        </div>
      </Card>

      <Card>
        <h2 className="font-bold mb-3">Modal</h2>

        <Button onClick={() => setOpenModal(true)}>Buka Modal</Button>

        <Modal
          title="Tambah Menu"
          open={openModal}
          onClose={() => setOpenModal(false)}
        >
          <p>Ini contoh modal CRM Coffee Shop.</p>
        </Modal>
      </Card>

      {/* Avatar */}
      <Card>
        <h2 className="font-bold mb-3">Avatar</h2>

        <Avatar image="https://i.pravatar.cc/100" name="Congo" />
        <Avatar image="https://i.pravatar.cc/100" name="Mango" />
      </Card>

      {/* Alert */}
      <Card>
        <h2 className="font-bold mb-3">Alert</h2>

        <Alert type="success" message="Menu berhasil ditambahkan" />
      </Card>

      {/* Stats Card */}
      <Card>
        <h2 className="font-bold mb-3">Stats Card</h2>

        <StatsCard />
      </Card>

      {/* Product Card */}
      <Card>
        <h2 className="font-bold mb-3">Product Card</h2>

        <ProductCard />
      </Card>

      {/* Category Tabs */}
      <Card>
        <h2 className="font-bold mb-3">Category Tabs</h2>

        <CategoryTabs />
      </Card>

      {/* Revenue Chart */}
      <Card>
        <h2 className="font-bold mb-3">Revenue Chart</h2>

        <RevenueChart />
      </Card>

      <Card>
        <h2 className="font-bold mb-3">Revenue Analytics</h2>

        <RevenueAnalytics />
      </Card>

      {/* Order Panel */}
      <Card>
        <h2 className="font-bold mb-3">Order Panel</h2>

        <OrderPanel />
      </Card>

      {/* Table */}
      <Card>
        <h2 className="font-bold mb-3">Table</h2>

        <Table headers={["Produk", "Harga", "Qty"]}>
          <tr>
            <td className="p-3">Latte</td>
            <td className="p-3">24.000</td>
            <td className="p-3">2</td>
          </tr>
        </Table>
      </Card>

      {/* Pagination */}
      <Card>
        <h2 className="font-bold mb-3">Pagination</h2>

        <Pagination currentPage={1} totalPages={5} />
      </Card>

      {/* Floating Button */}
      <Card>
        <h2 className="font-bold mb-3">Floating Button</h2>

        <FloatingButton />
      </Card>
    </div>
  );
}
