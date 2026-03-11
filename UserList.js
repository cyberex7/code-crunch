import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteUserById, getUsers } from "../services/api";

export default function UserList() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const response = await getUsers();
    setUsers(response.data);
  };

  const handleDelete = async (id) => {
    await deleteUserById(id);
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="overflow-hidden rounded-xl bg-white shadow">
        <div className="border-b px-6 py-4">
          <h2 className="text-2xl font-semibold text-gray-800">Users</h2>
          <p className="mt-1 text-sm text-gray-500">Basic CRUD user management</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Username</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.username}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link
                          to={`/edit/${user.id}`}
                          className="rounded-md bg-yellow-500 px-3 py-1.5 text-white transition hover:bg-yellow-600"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(user.id)}
                          className="rounded-md bg-red-500 px-3 py-1.5 text-white transition hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}