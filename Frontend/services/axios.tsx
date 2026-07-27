import axios from "axios";

export default axios.create({
  baseURL:  "http://localhost:3000",
  withCredentials: true, // <--- enables sending cookies
  timeout: Number( 60000)
});