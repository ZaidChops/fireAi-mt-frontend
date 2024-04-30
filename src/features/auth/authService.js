import axios from "axios";

const API_URL = "https://fireai-mt-backend.onrender.com/api/user";
// const API_URL = "http://localhost:3000/api/user";

const signup = async (data) => {
  const response = await axios.post(API_URL, data);
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

const login = async (data) => {
  const response = await axios.post(API_URL + "/login", data);
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

const authService = {
  signup,
  login,
};

export default authService;
