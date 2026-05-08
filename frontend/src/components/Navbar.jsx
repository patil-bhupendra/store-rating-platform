import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-md bg-white">
      <h1 className="text-2xl font-bold">Store Rating Platform</h1>

      <div className="flex items-center gap-4">
        <span className="font-medium">{user?.role}</span>

        <button
          onClick={logout}
          className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
