import React from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import { getLoginInfo } from "../utils/LoginInfo"; // Import getLoginInfo

const Header = () => {
  const navigate = useNavigate();

  // Retrieve user info from localStorage
  const userInfo = getLoginInfo();
  const email = userInfo?.email;
  const role = userInfo?.role;

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";  // ✅ Forces a proper redirect
  };

  return (
    <div className="bg-purple-400 py-4 px-8 flex items-center justify-between">
      {/* Left Side: Logo & Title */}
      <div className="flex items-center space-x-6">
        <img src="/vite.svg" alt="Logo" className="h-6 w-6" />
        <h1 className="text-white text-lg font-bold">Todo App</h1>

        <div className="flex item-center space-x-6">
          <Link to="/activetodo" className="text-white font-semibold hover:underline">
            Active Todos
          </Link>
          <Link to="/completed" className="text-white font-semibold hover:underline">
            Completed
          </Link>
          {/* Conditionally render the Users tab */}
          {role === "ADMIN" && (
            <Link to="/users" className="text-white font-semibold hover:underline">
              Users
            </Link>
          )}
        </div>
      </div>

      {/* Right Side: Email & Logout Button */}
      <div className="flex items-center space-x-4">
        {email && <span className="text-white font-semibold">{email}</span>}
        <button
          onClick={handleLogout}
          className="text-white font-semibold hover:underline cursor-pointer"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Header;
