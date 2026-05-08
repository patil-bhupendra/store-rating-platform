import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import StoreList from "./pages/StoreList";
import AdminDashboard from "./pages/AdminDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* USER */}
      <Route
        path="/stores"
        element={
          <ProtectedRoute allowedRoles={["USER"]}>
            <StoreList />
          </ProtectedRoute>
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* STORE OWNER */}
      <Route
        path="/owner"
        element={
          <ProtectedRoute allowedRoles={["STORE_OWNER"]}>
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
