import { useBlogs, useField } from "../hooks"

const BlogForm = ({ createBlog, likeBlog }) => {
  // const { createBlog, likeBlog } = useBlogs()
  const { reset: resetTitle, ...title } = useField("text")
  const { reset: resetAuthor, ...author } = useField("text")
  const { reset: resetUrl, ...url } = useField("text")

  const handleSubmit = (event) => {
    event.preventDefault()

    createBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    })

    resetTitle()
    resetAuthor()
    resetUrl()
  }

  return (
    <div>
      {/* <button data-testid="likeButton" onClick={() => likeBlog()}>
        like
      </button> */}
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input {...title} data-testid="title" name="title" />
        </div>
        <div>
          author
          <input {...author} data-testid="author" name="author" />
        </div>
        <div>
          url
          <input {...url} data-testid="url" name="url" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
