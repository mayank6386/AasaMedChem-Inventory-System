import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function CreateOrder() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");

  const [convertedQty, setConvertedQty] =
    useState(0);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    let converted = Number(quantity);

    if (unit === "kg")
      converted = quantity * 1000;

    if (unit === "L")
      converted = quantity * 1000;

    setConvertedQty(converted);
  }, [quantity, unit]);

  const placeOrder = async () => {
    try {
      await api.post("/orders", {
        productId,
        quantity,
        unit,
      });

      alert("Order Placed Successfully");

      setQuantity("");
    } catch (error) {
      alert("Failed to place order");
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
          <Link to="/products">
            Products
          </Link>

          <Link to="/create-order">
            Create Order
          </Link>

          <Link to="/orders">
            Orders
          </Link>

          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold mb-6">
          Create Order
        </h1>

        <select
          value={productId}
          onChange={(e) =>
            setProductId(e.target.value)
          }
          className="w-full border rounded-lg p-3 mb-4"
        >
          <option value="">
            Select Product
          </option>

          {products.map((p) => (
            <option
              key={p._id}
              value={p._id}
            >
              {p.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Enter Quantity"
          value={quantity}
          onChange={(e) =>
            setQuantity(e.target.value)
          }
          className="w-full border rounded-lg p-3 mb-4"
        />

        <select
          value={unit}
          onChange={(e) =>
            setUnit(e.target.value)
          }
          className="w-full border rounded-lg p-3 mb-4"
        >
          <option value="kg">kg</option>
          <option value="g">g</option>
          <option value="L">L</option>
          <option value="mL">mL</option>
          <option value="item">item</option>
        </select>

        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h3 className="font-semibold">
            Converted Quantity:
          </h3>

          <p className="text-xl text-blue-600">
            {convertedQty}
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
        >
          Place Order
        </button>

      </div>
    </div>
  );
}

export default CreateOrder;