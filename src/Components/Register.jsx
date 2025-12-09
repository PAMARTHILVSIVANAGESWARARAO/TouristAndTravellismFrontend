import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Background from "../assets/Background.jpg";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState({ type: "", text: "" });

  const validate = () => {
    let temp = {};

    if (!form.name.trim()) temp.name = "Name is required";
    else if (form.name.length < 3) temp.name = "Name must be at least 3 characters";

    if (!form.email.trim()) temp.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      temp.email = "Enter a valid email";

    if (!form.password.trim()) temp.password = "Password is required";
    else if (form.password.length < 6)
      temp.password = "Password must be at least 6 characters";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    if (!validate()) return;

    try {
      const res = await axios.post(
        "https://touristandtravelism.onrender.com/api/auth/register",
        form,
        { headers: { "Content-Type": "application/json" } }
      );

      setMsg({ type: "success", text: "Registration Successful!" });

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      let message = "Registration Failed";

      if (err.response?.data?.message) {
        message = err.response.data.message;
      }

      setMsg({ type: "error", text: message });
    }
  };

  return (
    <div className="w-full h-screen flex">
      {/* Left Image */}
      <div className="w-1/2 h-full hidden md:block">
        <img src={Background} alt="bg" className="w-full h-full object-cover" />
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-xl p-8 w-11/12 md:w-3/4 lg:w-2/3"
        >
          <h2 className="text-3xl font-bold mb-6 text-green-600 text-center">
            Create Account
          </h2>

          {/* Success / Error Messages */}
          {msg.text && (
            <div
              className={`mb-4 text-center py-2 rounded-lg ${
                msg.type === "success"
                  ? "bg-green-100 text-green-700 border border-green-400"
                  : "bg-red-100 text-red-700 border border-red-400"
              }`}
            >
              {msg.text}
            </div>
          )}

          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Name</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 bg-gray-50">
              <i className="bi bi-person-fill text-green-600 text-xl mr-2"></i>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full bg-transparent py-2 outline-none"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 bg-gray-50">
              <i className="bi bi-envelope-fill text-green-600 text-xl mr-2"></i>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-transparent py-2 outline-none"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 bg-gray-50">
              <i className="bi bi-lock-fill text-green-600 text-xl mr-2"></i>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full bg-transparent py-2 outline-none"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2 rounded-lg text-lg"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
