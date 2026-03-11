import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createUser, getUserById, updateUser } from "../services/api";

export default function UserForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const isEdit = Boolean(id);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loadUser = async () => {
    if (!isEdit) return;
    const response = await getUserById(id);
    setUser(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      await updateUser(id, user);
    } else {
      await createUser(user);
    }

    navigate("/");
  };

  useEffect(() => {
    loadUser();
  }, [id]);

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <div className="rounded-xl bg-white p-8 shadow">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          {isEdit ? "Edit User" : "Add User"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
            >
              {isEdit ? "Update" : "Save"}
            </button>

            <Link
              to="/"
              className="rounded-lg bg-gray-500 px-5 py-2.5 font-medium text-white transition hover:bg-gray-600"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}