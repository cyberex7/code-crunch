import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 shadow">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold text-white">
          CRUD App
        </Link>

        <Link
          to="/add"
          className="rounded-lg bg-white px-4 py-2 font-medium text-blue-600 transition hover:bg-blue-50"
        >
          Add User
        </Link>
      </div>
    </nav>
  );
}