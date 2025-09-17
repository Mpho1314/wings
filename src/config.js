import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001", // your backend port
});

export default API;
