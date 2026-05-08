import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import StoreList from "./pages/StoreList";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />

      <Route path="/stores" element={<StoreList />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
