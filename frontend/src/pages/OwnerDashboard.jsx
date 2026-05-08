import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import API from "../api/axios";

function OwnerDashboard() {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchDashboard = async () => {
    try {
      const response = await API.get("/owner/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data);
    } catch (error) {
      console.log(error);

      alert("Failed to fetch dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!data) {
    return <h2>No data found</h2>;
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          width: "900px",
          margin: "40px auto",
        }}
      >
        <h1>Store Owner Dashboard</h1>

        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            marginBottom: "30px",
          }}
        >
          <h2>{data.store.name}</h2>

          <p>
            <strong>Address:</strong> {data.store.address}
          </p>

          <p>
            <strong>Average Rating:</strong>{" "}
            {data.average_rating || "No ratings yet"}
          </p>
        </div>

        <h2>Users Who Rated Your Store</h2>

        <table border="1" cellPadding="10" width="100%">
          <thead>
            <tr>
              <th>Name</th>

              <th>Email</th>

              <th>Rating</th>
            </tr>
          </thead>

          <tbody>
            {data.rated_users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>{user.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default OwnerDashboard;
