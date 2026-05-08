import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import API from "../api/axios";

function AdminDashboard() {
  const [stats, setStats] = useState({});

  const [users, setUsers] = useState([]);

  const [stores, setStores] = useState([]);

  const token = localStorage.getItem("token");

  const [userFilter, setUserFilter] = useState("");
  const [storeFilter, setStoreFilter] = useState("");

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER",
  });

  const [storeForm, setStoreForm] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: "",
  });

  const handleUserChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleStoreChange = (e) => {
    setStoreForm({
      ...storeForm,
      [e.target.name]: e.target.value,
    });
  };

  const fetchStats = async () => {
    try {
      const response = await API.get("/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await API.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStores = async () => {
    try {
      const response = await API.get("/admin/stores", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStores(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addUser = async (e) => {
    e.preventDefault();

    try {
      await API.post("/admin/add-user", userForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("User added successfully");

      fetchUsers();
      fetchStats();

      setUserForm({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "USER",
      });
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const addStore = async (e) => {
    e.preventDefault();

    try {
      await API.post("/admin/add-store", storeForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Store added successfully");

      fetchStores();
      fetchStats();

      setStoreForm({
        name: "",
        email: "",
        address: "",
        owner_id: "",
      });
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchStores();
  }, []);

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3>Total Users</h3>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3>Total Stores</h3>
            <p className="text-3xl font-bold">{stats.totalStores}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3>Total Ratings</h3>
            <p className="text-3xl font-bold">{stats.totalRatings}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-2xl font-bold mb-4">Add User</h2>

          <form onSubmit={addUser} className="grid md:grid-cols-2 gap-4">
            <input
              name="name"
              value={userForm.name}
              onChange={handleUserChange}
              placeholder="Name"
              className="border p-2 rounded"
            />

            <input
              name="email"
              value={userForm.email}
              onChange={handleUserChange}
              placeholder="Email"
              className="border p-2 rounded"
            />

            <input
              name="password"
              value={userForm.password}
              onChange={handleUserChange}
              placeholder="Password"
              className="border p-2 rounded"
            />

            <input
              name="address"
              value={userForm.address}
              onChange={handleUserChange}
              placeholder="Address"
              className="border p-2 rounded"
            />

            <select
              name="role"
              value={userForm.role}
              onChange={handleUserChange}
              className="border p-2 rounded"
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
              <option value="STORE_OWNER">STORE_OWNER</option>
            </select>

            <button className="bg-blue-600 text-white p-2 rounded">
              Add User
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-2xl font-bold mb-4">Add Store</h2>

          <form onSubmit={addStore} className="grid md:grid-cols-2 gap-4">
            <input
              name="name"
              value={storeForm.name}
              onChange={handleStoreChange}
              placeholder="Store Name"
              className="border p-2 rounded"
            />

            <input
              name="email"
              value={storeForm.email}
              onChange={handleStoreChange}
              placeholder="Email"
              className="border p-2 rounded"
            />

            <input
              name="address"
              value={storeForm.address}
              onChange={handleStoreChange}
              placeholder="Address"
              className="border p-2 rounded"
            />

            <input
              name="owner_id"
              value={storeForm.owner_id}
              onChange={handleStoreChange}
              placeholder="Owner ID"
              className="border p-2 rounded"
            />

            <button className="bg-green-600 text-white p-2 rounded">
              Add Store
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-xl font-bold mb-4">Users</h2>

          <input
            placeholder="Search users..."
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="border p-2 w-full mb-4"
          />

          <table className="w-full border">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Role</th>
              </tr>
            </thead>

            <tbody>
              {users
                .filter(
                  (u) =>
                    u.name.toLowerCase().includes(userFilter.toLowerCase()) ||
                    u.email.toLowerCase().includes(userFilter.toLowerCase()),
                )
                .map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Stores</h2>

          <input
            placeholder="Search stores..."
            value={storeFilter}
            onChange={(e) => setStoreFilter(e.target.value)}
            className="border p-2 w-full mb-4"
          />

          <table className="w-full border">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Rating</th>
              </tr>
            </thead>

            <tbody>
              {stores
                .filter((s) =>
                  s.name.toLowerCase().includes(storeFilter.toLowerCase()),
                )
                .map((store) => (
                  <tr key={store.id}>
                    <td>{store.name}</td>
                    <td>{store.email}</td>
                    <td>{store.address}</td>
                    <td>{store.overall_rating || "No ratings"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
