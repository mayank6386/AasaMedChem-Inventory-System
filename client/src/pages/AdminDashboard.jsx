import { Link } from "react-router-dom";

function AdminDashboard() {

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

        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      </nav>

      <div className="max-w-5xl mx-auto p-8">

        <h1 className="text-4xl font-bold mb-8">
          Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          <Link
            to="/products"
            className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl"
          >
            <h2 className="text-xl font-bold">
              Products
            </h2>

            <p className="text-gray-500 mt-2">
              Manage Inventory
            </p>
          </Link>

          <Link
            to="/create-order"
            className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl"
          >
            <h2 className="text-xl font-bold">
              Create Order
            </h2>

            <p className="text-gray-500 mt-2">
              Place New Orders
            </p>
          </Link>

          <Link
            to="/orders"
            className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl"
          >
            <h2 className="text-xl font-bold">
              Orders
            </h2>

            <p className="text-gray-500 mt-2">
              View All Orders
            </p>
          </Link>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;