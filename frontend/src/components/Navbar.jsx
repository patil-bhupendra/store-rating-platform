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
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        borderBottom: "1px solid gray",
      }}
    >
      <h2>Store Rating Platform</h2>

      <div>
        <span>{user?.role}</span>

        <button
          onClick={logout}
          style={{
            marginLeft: "20px",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
