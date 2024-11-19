import { Link } from "react-router-dom"

const BlogList = ({ blogs }) => {
  return (
    <div>
      {blogs.map((blog) => {
        const { id } = blog
        const url = `/blogs/${id}`

        return (
          <div
            key={id}
            data-testid="parent-div"
            className="p-2 my-2 border hover:bg-slate-100"
          >
            <Link to={url}>
              <span>{blog.title}</span>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default BlogList
