import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Api } from "../api/Api";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLoginInfo } from "../utils/LoginInfo"; // Import getLoginInfo

const Users = () => {
  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState(null); // Store user info (including role)
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Decode the token to get the user's role
        const userInfo = getLoginInfo();
        console.log("Decoded user info:", userInfo);

        if (!userInfo || !userInfo.role) {
          toast.error("Could not retrieve user role.");
          setLoading(false);
          return;
        }

        setUserInfo(userInfo); // Store user info in state

        // Fetch users regardless of role
        const token = localStorage.getItem("authToken");
        const usersResponse = await axios.get(Api.USER.FIND_ALL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Users fetched:", usersResponse.data);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch user data.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserData();
  }, []);

  // Handle deleting a user
  const handleDeleteUser = async (id, userRole) => {
    if (userRole === "ADMIN") {
      toast.error("You cannot delete another ADMIN user.");
      return;
    }
  
    try {
      const token = localStorage.getItem("authToken");
  
      // Replace ":id" in DELETE_USER URL with actual user ID
      const deleteUrl = Api.USER.DELETE_USER.replace(":id", id);
      console.log("Formatted Delete API URL:", deleteUrl);
  
      const response = await axios.delete(deleteUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        toast.success("User deleted successfully.");
      } else {
        toast.error("Failed to delete user. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(error.response?.data?.error || "Failed to delete user.");
    }
  };
  
  
  return (
    <div className="bg-blue-100 min-h-screen w-full">
      <Header />
      <ToastContainer />

      {loading ? (
        <p className="text-center mt-10">Loading...</p>
      ) : userInfo?.role === "ADMIN" ? (
        <div className="w-1/2 mx-auto mt-10">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
            Users
          </h2>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr className="text-left">
                  <th className="py-3 px-4">First Name</th>
                  <th className="py-3 px-4">Last Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="py-3 px-4">{user.firstName}</td>
                      <td className="py-3 px-4">{user.lastName}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">
                        {/* Hide the Delete button for ADMIN users */}
                        {user.role !== "ADMIN" && (
                          <button
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                          onClick={() => handleDeleteUser(user.id, user.role)} // Pass user.role
                        >
                          Delete
                        </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-3 px-4">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-center text-red-500 mt-10">
          You are not authorized to view this page.
        </p>
      )}
    </div>
  );
};

export default Users;
