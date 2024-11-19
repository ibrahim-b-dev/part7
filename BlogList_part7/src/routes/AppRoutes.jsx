import { Routes, Route, Navigate } from "react-router-dom"
import User from "../views/User"
import Users from "../views/Users"
import Blog from "../components/Blog"
import LoginForm from "../forms/LoginForm"
import Home from "../views/Home"

const ProtectedRoute = ({ user, children }) => {
  return user ? children : <Navigate replace to="/login" />
}

export const AppRoutes = ({ user }) => {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route
        path="/users/:id"
        element={
          <ProtectedRoute user={user}>
            <User />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute user={user}>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/blogs/:id"
        element={
          <ProtectedRoute user={user}>
            <Blog />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute user={user}>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Public Routes */}
      <Route path="/login" element={<LoginForm />} />

      {/* Catch-All Route */}
      <Route
        path="*"
        element={<Navigate replace to={user ? "/" : "/login"} />}
      />
    </Routes>
  )
}
