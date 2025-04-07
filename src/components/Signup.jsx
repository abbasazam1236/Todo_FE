import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Api } from "../api/Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Ensure this points to your correct API file

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // console.log(formData);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    toast.error("Passwords do not match!");
    return;
  }

  setLoading(true);
  setError("");

  try {
    await axios.post(Api.USER.SIGN_UP, {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    });

    toast.success("Signup successful!");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  } catch (error) {
    // Check if the error response contains "Email already exists"
    if (error.response?.status === 409) {
      toast.error("Email ID already exists"); // Display toast message
    } else {
      toast.error(error.response?.data?.message || "Signup failed. Try again.");
    }
  } finally {
    setLoading(false);
  }
};

  

  return (
    <div className="w-full min-h-screen bg-blue-200 flex items-center justify-center px-4">
      <ToastContainer />
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row gap-8">
        {/* Left Side: Image */}
        <div className="hidden md:flex justify-center items-center">
          <img className="size-80" src="/vite.svg" alt="Signup Illustration" />
        </div>

        {/* Right Side: Form */}
        <div className="w-full flex flex-col">
          <p className="text-3xl text-gray-800 text-center font-bold mb-4">
            Create an Account!
          </p>

          {/* Show Error Message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col w-full">
                <label className="text-lg font-semibold text-gray-600">
                  First Name
                </label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="bg-blue-100 py-2 px-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                  type="text"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-lg font-semibold text-gray-600">
                  Last Name
                </label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="bg-blue-100 py-2 px-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                  type="text"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-semibold text-gray-600">
                Email
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-blue-100 py-2 px-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col w-full">
                <label className="text-lg font-semibold text-gray-600">
                  Password
                </label>
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-blue-100 py-2 px-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                  type="password"
                  placeholder="********"
                  required
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-lg font-semibold text-gray-600">
                  Confirm Password
                </label>
                <input
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-blue-100 py-2 px-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                  type="password"
                  placeholder="********"
                  required
                />
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 text-lg font-semibold rounded-lg transition-all duration-200 shadow-md cursor-pointer"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Register Account"}
            </button>
          </form>

          {/* Navigate to Login */}
          <button
            onClick={() => navigate("/login")}
            className="flex justify-center mt-4 text-blue-500 hover:underline text-lg font-medium cursor-pointer"
          >
            Already have an Account? Login!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
