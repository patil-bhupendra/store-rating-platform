import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import StoreList from "./pages/StoreList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />

      <Route path="/stores" element={<StoreList />} />
    </Routes>
  );
}

export default App;
