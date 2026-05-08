import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", formData);

      const { token, user } = response.data;

      // save token + user
      localStorage.setItem("token", token);

      localStorage.setItem("user", JSON.stringify(user));

      alert("Login successful");

      // role-based redirect
      if (user.role === "ADMIN") {
        navigate("/admin");
      } else if (user.role === "STORE_OWNER") {
        navigate("/owner");
      } else {
        navigate("/stores");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        width: "300px",
        margin: "100px auto",
      }}
    >
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
