import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import API from "../api/axios";

function AdminDashboard() {
  const [stats, setStats] = useState({});

  const [users, setUsers] = useState([]);

  const [stores, setStores] = useState([]);

  const token = localStorage.getItem("token");

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

      alert("Failed to fetch stats");
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

  useEffect(() => {
    fetchStats();

    fetchUsers();

    fetchStores();
  }, []);

  return (
    <>
      <Navbar />

      <div
        style={{
          width: "1000px",
          margin: "40px auto",
        }}
      >
        <h1>Admin Dashboard</h1>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div className="bg-white shadow-md rounded-2xl p-6"
            style={{
              border: "1px solid gray",
              padding: "20px",
              width: "200px",
            }}
          >
            <h3 className="text-xl font-semibold">Total Users</h3>

            <p className="text-3xl font-bold mt-4">{stats.totalUsers}</p>
          </div>

          <div
            style={{
              border: "1px solid gray",
              padding: "20px",
              width: "200px",
            }}
          >
            <h3>Total Stores</h3>

            <p>{stats.totalStores}</p>
          </div>

          <div
            style={{
              border: "1px solid gray",
              padding: "20px",
              width: "200px",
            }}
          >
            <h3>Total Ratings</h3>

            <p>{stats.totalRatings}</p>
          </div>
        </div>

        <h2>Users</h2>

        <table border="1" cellPadding="10" width="100%">
          <thead>
            <tr>
              <th className="p-3 border">Name</th>

              <th className="p-3 border">Email</th>

              <th className="p-3 border">Address</th>

              <th className="p-3 border">Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="p-3 border">{user.name}</td>

                <td className="p-3 border">{user.email}</td>

                <td className="p-3 border">{user.address}</td>

                <td className="p-3 border">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <br />
        <br />

        <h2>Stores</h2>

        <table border="1" cellPadding="10" width="100%" className="w-full border border-gray-300 mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Name</th>

              <th className="p-3 border">Email</th>

              <th className="p-3 border">Address</th>

              <th className="p-3 border">Rating</th>
            </tr>
          </thead>

          <tbody>
            {stores.map((store) => (
              <tr key={store.id}>
                <td className="p-3 border">{store.name}</td>

                <td className="p-3 border">{store.email}</td>

                <td className="p-3 border">{store.address}</td>

                <td className="p-3 border">{store.overall_rating || "No ratings"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminDashboard;
