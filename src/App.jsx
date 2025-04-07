import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Activetodo from "./components/Activetodo";
import Completed from "./components/Completed";
import Users from "./components/Users";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  const token = localStorage.getItem("authToken");

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/activetodo" replace /> : <Signup />} />
        <Route path="/login" element={token ? <Navigate to="/activetodo" replace /> : <Login />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/activetodo" element={<ProtectedRoute><Activetodo /></ProtectedRoute>} />
        <Route path="/completed" element={<ProtectedRoute><Completed /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute adminOnly><Users /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
  