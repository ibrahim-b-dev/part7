import { useState } from "react"
import { useUserValue } from "../contexts/UserContext"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { update, remove } from "../services/blogs"

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const queryClient = useQueryClient()
  const likeMutaion = useMutation({
    mutationFn: update,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"])
      if (blogs) {
        queryClient.setQueryData(
          ["blogs"],
          blogs.map((blog) => (blog.id === newBlog.id ? newBlog : blog))
        )
      }
    },
  })

  const deleteMutation = useMutation({
    mutationFn: remove,
    onSuccess: () => queryClient.invalidateQueries(["blogs"]),
  })

  const user = useUserValue()
  const [visible, setVisible] = useState(false)
  const owner = user.id === blog.user.id ? true : false

  const handleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = (id) => {
    likeMutaion.mutate(id)
  }

  const handleDelete = (id) => {
    deleteMutation.mutate(id)
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
          <button data-testid="likeButton" onClick={() => handleLike(blog.id)}>
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
