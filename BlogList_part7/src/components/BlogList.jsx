import { useBlogs } from "../hooks"
import Blog from "./Blog"

const BlogList = ({ blogs,likeBlog, deleteBlog }) => {
  // const { blogs, likeBlog, deleteBlog } = useBlogs()

  return (
    <div>
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            onLike={likeBlog}
            onDelete={deleteBlog}
          />
        ))}
      </div>
    </div>
  )
}

export default BlogList
