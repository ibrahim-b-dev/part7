import { useNavigate } from "react-router-dom"
import { useUserLogout, useUserValue } from "../contexts/UserContext"

const State = () => {
  const user = useUserValue()
  const userLogout = useUserLogout()
  const navigate = useNavigate()

  const handleLogout = () => {
    userLogout()
    navigate("/login")
  }

  if (!user) {
    return null
  }

  return (
    <div>
      <span className="mr-2">{user.username} logged in</span>
      <button
        className="btn-default"
        onClick={handleLogout}
      >
        logout
      </button>
    </div>
  )
}

export default State
