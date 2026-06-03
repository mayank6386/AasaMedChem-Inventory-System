import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <nav className="bg-blue-600 text-white p-4 flex justify-between">
        <h1 className="font-bold text-xl">
          AasaMedChem
        </h1>

        <div className="space-x-4">
          <Link to="/products">Products</Link>
          <Link to="/create-order">Create Order</Link>
          <Link to="/orders">Orders</Link>

          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          Orders
        </h1>

        <div className="bg-white shadow-lg rounded-xl overflow-hidden">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>
                <th className="p-4 text-left">
                  Product
                </th>

                <th className="p-4 text-left">
                  Ordered Qty
                </th>

                <th className="p-4 text-left">
                  Converted Qty
                </th>

                <th className="p-4 text-left">
                  Total Price
                </th>

                <th className="p-4 text-left">
                  Status
                </th>
              </tr>

            </thead>

            <tbody>

              {orders.map((order) => (

                <tr
                  key={order._id}
                  className="border-b"
                >

                  <td className="p-4">
                    {order.product?.name}
                  </td>

                  <td className="p-4">
                    {order.enteredQuantity}
                    {" "}
                    {order.enteredUnit}
                  </td>

                  <td className="p-4">
                    {order.convertedQuantity}
                  </td>

                  <td className="p-4">
                    ₹{order.totalPrice}
                  </td>

                  <td className="p-4">

                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                      {order.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

export default Orders;