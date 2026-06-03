import { Link } from "react-router-dom";

function Navbar() {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav>
      <Link to="/products">Products</Link>{" | "}
      <Link to="/create-order">Create Order</Link>{" | "}
      <Link to="/orders">Orders</Link>{" | "}
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default Navbar;