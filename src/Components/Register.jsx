import React, { useState } from "react";
import { registerUser } from "../api/authAPI";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await registerUser(form);

      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);

    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Create Account
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        {success && (
          <p className="text-green-600 text-sm mb-3 text-center">{success}</p>
        )}

        <form onSubmit={handleRegister} className="space-y-5">

          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
              placeholder="Enter name"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition"
          >
            {loading ? "Creating..." : "Register"}
          </button>

        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 font-semibold">
            Login
          </a>
        </p>

      </div>
    </div>
  );
}

export default Register;
