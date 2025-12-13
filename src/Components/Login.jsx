import React, { useState } from "react";
import { loginUser } from "../api/authAPI";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Mikasa from "../assets/Mikasa-Ackerman.png";



function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await loginUser(form);
      localStorage.setItem("accessToken", res.data.tokens.accessToken);
      toast.success("Login successful!");
      setLoading(false);
      setTimeout(() => navigate("/dashboard"), 800);
    } catch {
      setLoading(false);
      toast.error("Invalid email or password");
    }
  };

  return (
    <div
      className="min-h-screen flex bg-gray-100"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <ToastContainer position="top-right" autoClose={2500} />

      {/* Left Image Section */}
      <div
        className="hidden md:flex w-1/2 relative bg-cover bg-center"
        style={{
          backgroundImage: `url(${Mikasa})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh"
        }}

      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex flex-col justify-end p-10 text-white">
          <h1 className="text-4xl font-extrabold leading-tight mb-3">
            Explore the World 🌍
          </h1>
          <p className="text-lg font-light max-w-md">
            “Travel is the only thing you buy that makes you richer.”
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-6">
        <form
          onSubmit={submitLogin}
          className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
          <p className="text-center text-gray-500 mb-6">
            Login to continue your journey
          </p>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 active:scale-95 transition flex justify-center items-center mt-3"
          >
            {loading ? (
              <div className="spinner-border spinner-border-sm text-light" />
            ) : (
              "Login"
            )}
          </button>

          <p className="text-center mt-5 text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-green-600 font-semibold "
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
