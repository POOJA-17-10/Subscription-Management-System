import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // default role
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localStorage.getItem(form.username)) {
      setError("User already exists");
      return;
    }

    localStorage.setItem(form.username, JSON.stringify(form));
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xs">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Signup</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded text-sm"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded text-sm"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded text-sm"
          />

          {/* Role Selection */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-2 border rounded text-sm"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {error && <div className="text-red-500 text-center text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-1.5 rounded text-sm hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-3 text-center text-gray-600 text-xs">
          Already a member?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
