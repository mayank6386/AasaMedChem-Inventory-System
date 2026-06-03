import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  const searchProducts = async (value) => {
    setSearch(value);

    if (!value.trim()) {
      fetchProducts();
      return;
    }

    const res = await api.get(
      `/products/search/${value}`
    );

    setProducts(res.data);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
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

      <div className="max-w-7xl mx-auto p-6">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) =>
              searchProducts(e.target.value)
            }
            className="border rounded-lg px-4 py-2 w-72"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {products.map((product) => (

            <div
              key={product._id}
              className="bg-white shadow-lg rounded-xl p-5 border hover:shadow-xl transition"
            >
              <h2 className="text-xl font-bold text-blue-600">
                {product.name}
              </h2>

              <p className="mt-2">
                <strong>SKU:</strong>
                {" "}
                {product.sku}
              </p>

              <p>
                <strong>Category:</strong>
                {" "}
                {product.category}
              </p>

              <p>
                <strong>Price:</strong>
                {" "}
                ₹{product.pricePerUnit}
              </p>

              <p>
                <strong>Stock:</strong>
                {" "}
                {product.stock}
              </p>

              <p>
                <strong>Unit:</strong>
                {" "}
                {product.baseUnit}
              </p>
            </div>

          ))}

        </div>

      </div>
    </div>
  );
}

export default Products;