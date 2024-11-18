import { useQuery } from "@tanstack/react-query"

import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import BlogList from "./components/BlogList"
import BlogForm from "./forms/BlogForm"
import LoginForm from "./forms/LoginForm"
import State from "./components/State"

import { useUserValue } from "./contexts/UserContext"
import { getAll } from "./services/blogs"

const App = () => {
  const user = useUserValue()

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: getAll,
  })

  const blogs = result.data
    ? [...result.data].sort((a, b) => b.likes - a.likes)
    : []

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      {!user && <LoginForm />}

      {user && (
        <div>
          <State />

          <Togglable buttonLabel="new blog">
            <BlogForm />
          </Togglable>

          <BlogList blogs={blogs} />
        </div>
      )}
    </div>
  )
}

export default App
