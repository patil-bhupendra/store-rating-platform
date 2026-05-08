import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";

function StoreList() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStores = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/stores", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStores(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch stores");
    } finally {
      setLoading(false);
    }
  };

  const handleRating = async (storeId, rating) => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/stores/rate",
        {
          store_id: storeId,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Rating submitted");
      fetchStores();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Rating failed");
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  if (loading) {
    return (
      <h2 className="text-center mt-10 text-2xl font-semibold">
        Loading...
      </h2>
    );
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "1200px",
          margin: "40px auto",
          padding: "20px",
          backgroundColor: "#f5f7fb",
          minHeight: "100vh",
        }}
      >
        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          Stores
        </h1>

        {stores.map((store) => (
          <div
            key={store.id}
            className="bg-white shadow-md rounded-2xl p-6 mb-6 border-l-4 border-indigo-500"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              {store.name}
            </h2>

            <p className="text-gray-600 mb-2">
              <strong>Address:</strong> {store.address}
            </p>

            <p className="text-gray-600 mb-2">
              <strong>Overall Rating:</strong>{" "}
              {store.overall_rating || "No ratings"}
            </p>

            <p className="text-gray-600 mb-4">
              <strong>Your Rating:</strong>{" "}
              {store.user_rating || "Not rated"}
            </p>

            <div>
              <strong className="text-gray-700">Rate Store:</strong>

              <div className="mt-3 flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleRating(store.id, num)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default StoreList;