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
    return (
      <h2 className="text-center mt-10 text-2xl font-semibold">
        Loading...
      </h2>
    );
  }

  if (!data) {
    return (
      <h2 className="text-center mt-10 text-2xl font-semibold">
        No data found
      </h2>
    );
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "1100px",
          margin: "40px auto",
          padding: "20px",
          backgroundColor: "#f5f7fb",
          minHeight: "100vh",
        }}
      >
        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          Store Owner Dashboard
        </h1>

        {/* STORE INFO CARD */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-10 border-l-4 border-indigo-500">
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {data.store.name}
          </h2>

          <p className="text-lg text-gray-600 mb-3">
            <strong>Address:</strong> {data.store.address}
          </p>

          <p className="text-lg text-gray-600">
            <strong>Average Rating:</strong>{" "}
            {data.average_rating || "No ratings yet"}
          </p>
        </div>

        {/* USERS TABLE */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Users Who Rated Your Store
          </h2>

          <div className="overflow-x-auto">
            
            <table className="w-full border border-gray-300">
              
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border">
                    Name
                  </th>

                  <th className="p-3 border">
                    Email
                  </th>

                  <th className="p-3 border">
                    Rating
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.rated_users.map((user) => (
                  <tr key={user.id}>
                    
                    <td className="p-3 border">
                      {user.name}
                    </td>

                    <td className="p-3 border">
                      {user.email}
                    </td>

                    <td className="p-3 border font-semibold text-indigo-600">
                      {user.rating}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        </div>
      </div>
    </>
  );
}

export default OwnerDashboard;