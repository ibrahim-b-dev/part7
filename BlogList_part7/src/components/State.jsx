import { useUserLogout, useUserValue } from "../contexts/UserContext"

const State = () => {
  const user = useUserValue()
  const handleLogout = useUserLogout()

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default State
