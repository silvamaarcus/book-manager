import axios from "axios";

const api = axios.create({
  baseURL: "https://book-manager-production-637b.up.railway.app",
});

export default api;
