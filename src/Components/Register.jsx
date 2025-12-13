import React, { useState } from "react";
import { registerUser } from "../api/authAPI";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Eren from "../assets/Eren-Yeager.png";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitRegister = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await registerUser(form);

      toast.success("Registration successful!");
      setLoading(false);

      setTimeout(() => navigate("/login"), 900);
    } catch {
      setLoading(false);
      toast.error("Email already exists or invalid data");
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
          backgroundImage: `url(${Eren})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh"
        }}

      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col justify-end p-10 text-white">
          <h1 className="text-4xl font-extrabold mb-3">
            Start Your Journey 🚀
          </h1>
          <p className="text-lg font-light max-w-md">
            “The journey of a thousand miles begins with a single step.”
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-6">
        <form
          onSubmit={submitRegister}
          className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>
          <p className="text-center text-gray-500 mb-6">
            Join us and explore more
          </p>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />

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
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-10 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold
                       hover:bg-green-700 active:scale-95 transition
                       flex justify-center items-center shadow-md hover:shadow-lg mt-3"
          >
            {loading ? (
              <div className="spinner-border spinner-border-sm text-light" />
            ) : (
              "Register"
            )}
          </button>

          <p className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="relative font-semibold text-green-600
                         after:content-[''] after:absolute after:left-0 after:-bottom-1
                         after:w-0 after:h-[2px] after:bg-green-600"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
