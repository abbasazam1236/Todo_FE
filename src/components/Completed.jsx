import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Api } from "../api/Api";
import { getLoginInfo } from "../utils/LoginInfo";
import axios from "axios";

const Completed = () => {
  const [completedTodos, setCompletedTodos] = useState([]); // State to store completed todos
  const userInfo = getLoginInfo();
  const userId = userInfo?.userId;
  const token = localStorage.getItem("authToken");

  // Fetch completed todos
  useEffect(() => {
    const fetchCompletedTodos = async () => {
      try {
        const apiUrl = Api.TODO.FIND_COMPLETED.replace(":userId", userId);
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Completed Todos:", response.data);
        setCompletedTodos(response.data); // Update the state with the fetched todos
      } catch (error) {
        console.error("Error fetching completed todos:", error.response || error.message || error);
      }
    };

    if (userId && token) {
      fetchCompletedTodos();
    }
  }, [userId, token]);

  // Handle deleting a todo
  const handleDeleteTodo = async (id) => {
    if (!userId || !token) {
      console.warn("No userId or token found. User might not be logged in.");
      return;
    }

    try {
      const apiUrl = Api.TODO.DELETE_TODO.replace(":id", id);
      const response = await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Todo deleted successfully:", response.data);

      // Refetch the completed todos to update the UI
      const updatedTodos = completedTodos.filter((todo) => todo.id !== id);
      setCompletedTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error.response || error.message || error);
    }
  };

  return (
    <div className="bg-blue-100 min-h-screen w-full">
      <Header />

      {/* Page Title */}
      <h2 className="text-center text-3xl font-bold text-gray-900 mt-10">
        Completed Todos
      </h2>

      {/* Completed Todo List */}
      <div className="w-1/3 mx-auto mt-8">
        {completedTodos.map((todo) => (
          <div
            key={todo.id}
            className="bg-white border-red-400 border-2 rounded-lg p-6 flex justify-between items-center shadow-md mb-4"
          >
            {/* Left Side: Todo Text */}
            <div className="text-gray-800 font-medium">
              <p>{todo.title}</p>
              <p className="text-sm text-gray-500">{todo.date}</p>
            </div>

            {/* Right Side: Delete Button */}
            <button
              className="bg-red-400 hover:bg-red-500 text-white text-sm px-4 py-2 rounded-lg transition"
              onClick={() => handleDeleteTodo(todo.id)} // Call handleDeleteTodo on button click
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Completed;