import { useEffect, useState } from "react";

import API from "../api/axios";

function AdminDashboard() {
  const [stats, setStats] = useState({});

  const [users, setUsers] = useState([]);

  const [stores, setStores] = useState([]);

  const token = localStorage.getItem("token");

  // fetch dashboard stats
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

  // fetch users
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

  // fetch stores
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
    <div
      style={{
        width: "1000px",
        margin: "40px auto",
      }}
    >
      <h1>Admin Dashboard</h1>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            width: "200px",
          }}
        >
          <h3>Total Users</h3>

          <p>{stats.totalUsers}</p>
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

      {/* Users Table */}
      <h2>Users</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Name</th>

            <th>Email</th>

            <th>Address</th>

            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>{user.address}</td>

              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <br />

      {/* Stores Table */}
      <h2>Stores</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Name</th>

            <th>Email</th>

            <th>Address</th>

            <th>Rating</th>
          </tr>
        </thead>

        <tbody>
          {stores.map((store) => (
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
  );
}

export default AdminDashboard;
