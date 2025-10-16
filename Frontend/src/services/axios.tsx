import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:5000/api",
  withCredentials: true, // <--- enables sending cookies
  timeout: Number(import.meta.env.VITE_TIMEOUT ?? 60000),
});
