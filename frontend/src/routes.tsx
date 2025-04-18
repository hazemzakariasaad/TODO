import { Routes, Route } from "react-router-dom";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import Dashboard from "./pages/Dashboard";
import TaskDetails from "./pages/EditTask";
import ProtectedRoute from "./auth/ProtectedRoute";
import TaskForm from "./pages/TaskForm"; 

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
      />
      <Route
        path="/tasks/:id"
        element={<ProtectedRoute><TaskDetails /></ProtectedRoute>}
      />
        <Route
            path="/tasks/new"
            element={<ProtectedRoute><TaskForm /></ProtectedRoute>}
        />
    </Routes>
  );
}
