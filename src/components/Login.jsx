import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../api/Api";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify"; // Import toast

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/activetodo", { replace: true });  // ✅ Redirect to dashboard instead
    }
  }, []);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Email and Password are required.");
      return;
    }

    try {
      const response = await axios.post(Api.LOGIN, formData);
      if (response.status === 200 || response.status === 201) {
        toast.success("Login Successful!"); // Show success message

        const token = response.data.token;
        localStorage.setItem("authToken", token);

        const decodedToken = jwtDecode(token);
        localStorage.setItem("userInfo", JSON.stringify({
          email: decodedToken.email,
          role: decodedToken.role,
        }));

        setTimeout(() => navigate("/activetodo"), 500); // Redirect after short delay
      }
    } catch (err) {
      toast.error("Invalid email or password. Please try again.");
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-blue-200 flex items-center justify-center">
      <div className="w-1/3 bg-white shadow-lg rounded-lg p-6">
        <p className="text-center text-3xl font-bold text-gray-800">Login</p>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col mt-4 space-y-2">
          <label className="text-gray-600 font-medium">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-blue-100 py-2 px-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            placeholder="Enter your email"
            required
          />

          <label className="text-gray-600 font-medium">Password</label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="bg-blue-100 py-2 px-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            placeholder="Enter your password"
            required
          />

          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-lg font-semibold rounded-lg transition-all duration-200 shadow-md"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/")}
              className="text-blue-500 hover:underline text-lg font-medium"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
