import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import BlogList from "./components/BlogList"
import BlogForm from "./forms/BlogForm"
import LoginForm from "./forms/LoginForm"
import State from "./components/State"

import { useUserValue } from "./contexts/UserContext"
import { useBlogs } from "./hooks"

const App = () => {
  const user = useUserValue()
  const { blogs, createBlog, likeBlog, deleteBlog } = useBlogs()

  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      {!user && <LoginForm />}

      {user && (
        <div>
          <State />

          <Togglable buttonLabel="new blog">
            <BlogForm createBlog={createBlog} likeBlog={likeBlog} />
          </Togglable>

          <BlogList blogs={blogs} likeBlog={likeBlog} deleteBlog={deleteBlog} />
        </div>
      )}
    </div>
  )
}

export default App
