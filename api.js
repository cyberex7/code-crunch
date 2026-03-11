import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

export const getUsers = () => API.get("/users");
export const getUserById = (id) => API.get(`/user/${id}`);
export const createUser = (user) => API.post("/user", user);
export const updateUser = (id, user) => API.put(`/user/${id}`, user);
export const deleteUserById = (id) => API.delete(`/user/${id}`);