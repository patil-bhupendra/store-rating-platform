// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";

// import API from "../api/axios";

// function AdminDashboard() {
//   const [stats, setStats] = useState({});

//   const [users, setUsers] = useState([]);

//   const [stores, setStores] = useState([]);

//   const token = localStorage.getItem("token");

//   const [userForm, setUserForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     address: "",
//     role: "USER",
//   });

//   const [storeForm, setStoreForm] = useState({
//     name: "",
//     email: "",
//     address: "",
//     owner_id: "",
//   });

//   const handleUserChange = (e) => {
//     setUserForm({
//       ...userForm,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleStoreChange = (e) => {
//     setStoreForm({
//       ...storeForm,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const fetchStats = async () => {
//     try {
//       const response = await API.get("/admin/dashboard", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setStats(response.data);
//     } catch (error) {
//       console.log(error);

//       alert("Failed to fetch stats");
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const response = await API.get("/admin/users", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setUsers(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchStores = async () => {
//     try {
//       const response = await API.get("/admin/stores", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setStores(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const addUser = async (e) => {
//     e.preventDefault();

//     try {
//       await API.post("/admin/add-user", userForm, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       alert("User added successfully");

//       fetchUsers();

//       fetchStats();

//       setUserForm({
//         name: "",
//         email: "",
//         password: "",
//         address: "",
//         role: "USER",
//       });
//     } catch (error) {
//       console.log(error);

//       alert(error.response?.data?.message);
//     }
//   };

//   const addStore = async (e) => {
//     e.preventDefault();

//     try {
//       await API.post("/admin/add-store", storeForm, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       alert("Store added successfully");

//       fetchStores();

//       fetchStats();

//       setStoreForm({
//         name: "",
//         email: "",
//         address: "",
//         owner_id: "",
//       });
//     } catch (error) {
//       console.log(error);

//       alert(error.response?.data?.message);
//     }
//   };

//   <h1>Admin Dashboard</h1>;

//   useEffect(() => {
//     fetchStats();

//     fetchUsers();

//     fetchStores();
//   }, []);

//   return (
//     <>
//       <Navbar />

//       <div
//         style={{
//           width: "1000px",
//           margin: "40px auto",
//         }}
//       >
//         <h1>Admin Dashboard</h1>

//         <div
//           style={{
//             display: "flex",
//             gap: "20px",
//             marginBottom: "40px",
//           }}
//         >
//           <div
//             className="bg-white shadow-md rounded-2xl p-6"
//             style={{
//               border: "1px solid gray",
//               padding: "20px",
//               width: "200px",
//             }}
//           >
//             <h3 className="text-xl font-semibold">Total Users</h3>

//             <p className="text-3xl font-bold mt-4">{stats.totalUsers}</p>
//           </div>

//           <div
//             style={{
//               border: "1px solid gray",
//               padding: "20px",
//               width: "200px",
//             }}
//           >
//             <h3>Total Stores</h3>

//             <p>{stats.totalStores}</p>
//           </div>

//           <div
//             style={{
//               border: "1px solid gray",
//               padding: "20px",
//               width: "200px",
//             }}
//           >
//             <h3>Total Ratings</h3>

//             <p>{stats.totalRatings}</p>
//           </div>
//         </div>

//         <h2>Users</h2>

//         <table border="1" cellPadding="10" width="100%">
//           <thead>
//             <tr>
//               <th className="p-3 border">Name</th>

//               <th className="p-3 border">Email</th>

//               <th className="p-3 border">Address</th>

//               <th className="p-3 border">Role</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id}>
//                 <td className="p-3 border">{user.name}</td>

//                 <td className="p-3 border">{user.email}</td>

//                 <td className="p-3 border">{user.address}</td>

//                 <td className="p-3 border">{user.role}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <br />
//         <br />

//         <h2>Stores</h2>

//         <table
//           border="1"
//           cellPadding="10"
//           width="100%"
//           className="w-full border border-gray-300 mt-4"
//         >
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 border">Name</th>

//               <th className="p-3 border">Email</th>

//               <th className="p-3 border">Address</th>

//               <th className="p-3 border">Rating</th>
//             </tr>
//           </thead>

//           <tbody>
//             {stores.map((store) => (
//               <tr key={store.id}>
//                 <td className="p-3 border">{store.name}</td>

//                 <td className="p-3 border">{store.email}</td>

//                 <td className="p-3 border">{store.address}</td>

//                 <td className="p-3 border">
//                   {store.overall_rating || "No ratings"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

// export default AdminDashboard;

import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import API from "../api/axios";

function AdminDashboard() {
  const [stats, setStats] = useState({});

  const [users, setUsers] = useState([]);

  const [stores, setStores] = useState([]);

  const token = localStorage.getItem("token");

  // USER FORM
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER",
  });

  // STORE FORM
  const [storeForm, setStoreForm] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: "",
  });

  // HANDLE USER FORM
  const handleUserChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE STORE FORM
  const handleStoreChange = (e) => {
    setStoreForm({
      ...storeForm,
      [e.target.name]: e.target.value,
    });
  };

  // FETCH STATS
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

  // FETCH USERS
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

  // FETCH STORES
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

  // ADD USER
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
      console.log(error);

      alert(error.response?.data?.message);
    }
  };

  // ADD STORE
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
      console.log(error);

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
          Admin Dashboard
        </h1>

        {/* ADD USER */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Add User</h2>

          <form
            onSubmit={addUser}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={userForm.name}
              onChange={handleUserChange}
              className="border p-3 rounded-lg"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userForm.email}
              onChange={handleUserChange}
              className="border p-3 rounded-lg"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userForm.password}
              onChange={handleUserChange}
              className="border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={userForm.address}
              onChange={handleUserChange}
              className="border p-3 rounded-lg"
              required
            />

            <select
              name="role"
              value={userForm.role}
              onChange={handleUserChange}
              className="border p-3 rounded-lg"
            >
              <option value="USER">USER</option>

              <option value="ADMIN">ADMIN</option>

              <option value="STORE_OWNER">STORE OWNER</option>
            </select>

            <button
              type="submit"
              className="bg-indigo-600 text-white rounded-lg px-5 py-3 hover:bg-indigo-700"
            >
              Add User
            </button>
          </form>
        </div>

        {/* ADD STORE */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Add Store</h2>

          <form
            onSubmit={addStore}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Store Name"
              value={storeForm.name}
              onChange={handleStoreChange}
              className="border p-3 rounded-lg"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Store Email"
              value={storeForm.email}
              onChange={handleStoreChange}
              className="border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              name="address"
              placeholder="Store Address"
              value={storeForm.address}
              onChange={handleStoreChange}
              className="border p-3 rounded-lg"
              required
            />

            <input
              type="number"
              name="owner_id"
              placeholder="Owner ID"
              value={storeForm.owner_id}
              onChange={handleStoreChange}
              className="border p-3 rounded-lg"
              required
            />

            <button
              type="submit"
              className="bg-indigo-600 text-white rounded-lg px-5 py-3 hover:bg-indigo-700"
            >
              Add Store
            </button>
          </form>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow-md rounded-2xl p-6 border-l-4 border-indigo-500">
            <h3 className="text-gray-500 text-lg">Total Users</h3>

            <p className="text-4xl font-bold mt-4">{stats.totalUsers}</p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 border-l-4 border-cyan-500">
            <h3 className="text-gray-500 text-lg">Total Stores</h3>

            <p className="text-4xl font-bold mt-4">{stats.totalStores}</p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 border-l-4 border-pink-500">
            <h3 className="text-gray-500 text-lg">Total Ratings</h3>

            <p className="text-4xl font-bold mt-4">{stats.totalRatings}</p>
          </div>
        </div>

        {/* USERS TABLE */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-10">
          <h2 className="text-2xl font-bold mb-6">Users</h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-100">
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
          </div>
        </div>

        {/* STORES TABLE */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6">Stores</h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
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

                    <td className="p-3 border">
                      {store.overall_rating || "No ratings"}
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

export default AdminDashboard;
