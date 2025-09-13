import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = localStorage.getItem(form.username);

    if (!user) return setError("User not found");

    const userObj = JSON.parse(user);
    if (userObj.password !== form.password) return setError("Incorrect password");

    // Save role in sessionStorage for later use
    sessionStorage.setItem("role", userObj.role);

    if (userObj.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xs">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Login</h2>

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
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded text-sm"
          />

          {error && <div className="text-red-500 text-center text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-1.5 rounded text-sm hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="mt-3 text-center text-gray-600 text-xs">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
