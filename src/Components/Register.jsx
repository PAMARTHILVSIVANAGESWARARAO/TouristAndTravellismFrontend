import React, { useState } from "react";
import { registerUser } from "../api/authAPI";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitRegister = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setMsg("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await registerUser(form);

      setMsg("Registration successful! Redirecting...");
      setLoading(false);

      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      setLoading(false);
      setMsg("Email already exists or invalid data");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <form
        onSubmit={submitRegister}
        className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {msg && (
          <p className="text-center text-red-600 font-semibold mb-3">{msg}</p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full border rounded px-3 py-2 mb-3"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border rounded px-3 py-2 mb-3"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border rounded px-3 py-2 mb-3"
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-3 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
