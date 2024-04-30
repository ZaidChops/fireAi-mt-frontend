import axios from "axios";

const API_URL = "https://fireai-mt-backend.onrender.com/api/todo";
// const API_URL = "http://localhost:3000/api/todo";

const getTodos = async (token) => {
  const option = {
    header: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/`, option);
  localStorage.setItem("todos", JSON.stringify(response.data));
  return response.data;
};

const addTodo = async (data, token) => {
  const option = {
    header: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}/${data.userId}`, data, option);

  return response.data;
};

const editTodo = async (data, token) => {
  const option = {
    header: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}/${data._id}`, data, option);
  localStorage.setItem("todos", JSON.stringify(response.data));
  return response.data;
};

const deleteTodo = async (deleteId, token) => {
  const option = {
    header: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${deleteId}`, option);
  localStorage.setItem("todos", JSON.stringify(response.data));
  return response.data;
};

const todoService = {
  getTodos,
  addTodo,
  deleteTodo,
  editTodo,
};

export default todoService;
