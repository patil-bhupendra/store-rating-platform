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
        },
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
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          width: "800px",
          margin: "50px auto",
        }}
      >
        <h1>Stores</h1>

        {stores.map((store) => (
          <div
            key={store.id}
            style={{
              border: "1px solid gray",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <h2>{store.name}</h2>

            <p>
              <strong>Address:</strong> {store.address}
            </p>

            <p>
              <strong>Overall Rating:</strong>{" "}
              {store.overall_rating || "No ratings"}
            </p>

            <p>
              <strong>Your Rating:</strong> {store.user_rating || "Not rated"}
            </p>

            <div>
              <strong>Rate Store:</strong>

              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => handleRating(store.id, num)}
                  style={{
                    margin: "5px",
                  }}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default StoreList;
