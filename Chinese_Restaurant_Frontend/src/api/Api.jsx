import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getMenuItems = async () => {
  const response = await API.get("/menu");
  return response.data.map(item => ({
    ...item,
    id: item._id 
  }));
};

export default API;
