import { useState } from "react"
import { useUserValue } from "../contexts/UserContext"

const Blog = ({ blog, onLike, onDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const user = useUserValue()
  const [visible, setVisible] = useState(false)
  const owner = user.id === blog.user.id ? true : false

  const handleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    onLike({
      ...blog,
    })
  }

  const handleDelete = (id) => {
    onDelete(id)
  }

  return (
    <div data-testid="parent-div" className="blog" style={blogStyle}>
      <div className="visibleContent">
        <span>{blog.title}</span>
        <button onClick={handleVisibility}>view</button>
      </div>

      <div className="hiddenContent" style={{ display: visible ? "" : "none" }}>
        <a href="${blog.url}">{blog.url}</a>
        <div>
          <span data-testid="likes">{blog.likes}</span>
          <button data-testid="likeButton" onClick={handleLike}>
            like
          </button>
        </div>
        <div>{blog.author}</div>
        {owner && <button onClick={() => handleDelete(blog.id)}>remove</button>}
      </div>
    </div>
  )
}

export default Blog
