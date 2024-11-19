import { useLocation } from "react-router-dom"

const User = () => {
  const { username, blogs } = useLocation().state

  return (
    <div>
      <div>
        <h2 className="text-2xl">{username}</h2>
        <p className="mb-4">added blogs</p>
        <ul>
          {blogs.map(({ id, title }) => (
            <li key={id} className="text-blue-400">{title}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default User
