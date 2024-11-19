import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { getAll } from "../services/user"

const Users = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAll,
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading blog</div>
  if (!users) return <div>Users not found</div>

  return (
    <div>
      <h2 className="text-xl">Users</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>
              <strong>blogs created</strong>
            </td>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4">
                <Link className="hover:underline text-blue-400" to={`/users/${user.id}`} state={user}>
                  {user.username}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
