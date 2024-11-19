import { Navigate, Route, Routes } from "react-router-dom"

import Home from "./views/Home"
import Users from "./views/Users"
import User from "./views/User"

import Notification from "./components/Notification"
import LoginForm from "./forms/LoginForm"
import Blog from "./components/Blog"

import { useUserValue } from "./contexts/UserContext"
import Nav from "./components/Nav"

const App = () => {
  const user = useUserValue()

  return (
    <div className="container mx-auto px-4 max-w-screen-xl">
      <Nav  user={user} />
      {/* {user && <Nav user={user} />} */}

      <h2 className="text-2xl my-4">Blog App</h2>
      <Notification />

      <Routes>
        <Route
          path="/users/:id"
          element={user ? <User /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate replace to="/login" />}
        />
        <Route path="/blogs/:id" element={<Blog />} />

        {!user && <Route path="/login" element={<LoginForm />} />}

        <Route path="/" element={<Home />} />
      </Routes>

      <footer className="absolute bottom-0 w-full  p-4 text-center my-4 text-center">Blogs App &copy;</footer>
    </div>
  )
}

export default App
