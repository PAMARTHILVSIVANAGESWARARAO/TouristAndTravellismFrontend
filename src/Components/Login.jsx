import React, { useState } from "react";
import { loginUser } from "../api/authAPI";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setMsg("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await loginUser(form);

      localStorage.setItem("accessToken", res.data.tokens.accessToken);

      setMsg("Login successful!");
      setLoading(false);

      setTimeout(() => navigate("/dashboard"), 800);
    } catch (err) {
      setLoading(false);
      setMsg("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <form
        onSubmit={submitLogin}
        className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {msg && (
          <p className="text-center text-red-600 font-semibold mb-3">{msg}</p>
        )}

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
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-3 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
