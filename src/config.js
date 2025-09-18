import axios from "axios";

const API = axios.create({
  baseURL: "https://wings-backend-gsej.onrender.com", // your backend port
});

export default API;
