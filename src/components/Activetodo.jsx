import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Api } from "../api/Api";
import { getLoginInfo } from "../utils/LoginInfo";
import axios from "axios";

const ActiveTodo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState(""); // State for the new todo input
  const userInfo = getLoginInfo();
  const userId = userInfo?.userId;
  const token = localStorage.getItem("authToken");

  // Fetch todos function
  const fetchTodos = async () => {
    try {
      const apiUrl = Api.TODO.FIND_NOT_COMPLETED.replace(":userId", userId);
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTodos(response.data); // Update the todos state
    } catch (error) {
      console.error(
        "Error fetching todos:",
        error.response || error.message || error
      );
    }
  };

  // Fetch todos on component mount
  useEffect(() => {
    if (userId && token) {
      fetchTodos();
    }
  }, [userId, token]);

  // Handle saving a new todo
  const handleSaveTodo = async () => {
    if (!userId || !token || !newTodo.trim()) {
      console.warn("Please enter a todo or check your login status.");
      return;
    }

    try {
      const apiUrl = Api.TODO.SAVE_TODO.replace(":userId", userId);
      const response = await axios.post(
        apiUrl,
        { title: newTodo }, // Send the todo title in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Todo saved successfully:", response.data);

      // Clear the input field
      setNewTodo("");

      // Refetch the todos to update the UI
      fetchTodos(); // Now fetchTodos is defined and accessible
    } catch (error) {
      console.error(
        "Error saving todo:",
        error.response || error.message || error
      );
    }
  };

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

    // console.log("Todo deleted successfully:", response.data);

    // Refetch the todos to update the UI
    fetchTodos();
  } catch (error) {
    console.error("Error deleting todo:", error.response || error.message || error);
  }
};

// Handle marking a todo as completed
const handleMarkCompleted = async (id) => {
  if (!userId || !token) {
    console.warn("No userId or token found. User might not be logged in.");
    return;
  }

  try {
    const apiUrl = Api.TODO.MARK_TODO_COMPLETED.replace(":id", id);
    const response = await axios.patch(
      apiUrl,
      { completed: true }, // Send the updated completed status
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Todo marked as completed successfully:", response.data);

    // Refetch the todos to update the UI
    fetchTodos();
  } catch (error) {
    console.error("Error marking todo as completed:", error.response || error.message || error);
  }
};

  return (
    <div className="bg-blue-100 min-h-screen w-full">
      {/* Top Header */}
      <Header />

      {/* Main Container */}
      <div className="w-1/3 p-6 mx-auto">
        {/* Input Field */}
        <div className="flex flex-col mt-4 space-y-2">
          <label className="text-gray-600 font-medium">Enter Todo:</label>
          <input
            className="bg-white py-2 px-3 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Enter your todo"
            value={newTodo} // Bind the input value to the state
            onChange={(e) => setNewTodo(e.target.value)} // Update the state on change
          />
        </div>

        {/* Save Button */}
        <button
          className="flex items-center mt-4 mx-auto px-10 text-xl py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
          onClick={handleSaveTodo} // Call handleSaveTodo on button click
        >
          Save
        </button>

        {/* Todo List */}
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="bg-white border-red-400 border-2 rounded-lg mt-8 p-4 flex justify-between items-center"
          >
            {/* Left Side: Todo Text */}
            <div className="text-gray-800 font-medium">
              <p>{todo.title}</p>
              <p className="text-sm text-gray-500">{todo.date}</p>
            </div>

            {/* Right Side: Buttons */}
            <div className="flex space-x-3">
              <button onClick={() => handleMarkCompleted(todo.id)}  className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg">
                Mark Completed
              </button>
              <button onClick={() => handleDeleteTodo(todo.id)} className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveTodo;
