export default function Table() {
  return (
    <div className="crm-table-wrapper">
      <table className="crm-table">
        <thead>
          <tr>
            <th>Produk</th>
            <th>Harga</th>
            <th>Qty</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Latte</td>
            <td>24.000</td>
            <td>2</td>
          </tr>

          <tr>
            <td>Americano</td>
            <td>18.000</td>
            <td>3</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}