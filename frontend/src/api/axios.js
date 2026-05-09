import axios from "axios";

const API = axios.create({
  baseURL: "https://store-rating-platform-z88r.onrender.com/api",
});

export default API;
