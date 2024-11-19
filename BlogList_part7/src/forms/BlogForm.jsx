import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useField } from "../hooks"
import { create } from "../services/blog"

const BlogForm = (props) => {
  const { reset: resetTitle, ...title } = useField("text")
  const { reset: resetAuthor, ...author } = useField("text")
  const { reset: resetUrl, ...url } = useField("text")

  const queryClient = useQueryClient()

  const blogMutation = useMutation({
    mutationFn: create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"])
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog))
    },
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    blogMutation.mutate({
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
      <h2 className="text-lg">create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            {...title}
            className="input"
            placeholder="title..."
            data-testid="title"
            name="title"
          />
        </div>
        <div>
          <input
            {...author}
            className="input"
            placeholder="author..."
            data-testid="author"
            name="author"
          />
        </div>
        <div>
          <input
            {...url}
            className="input"
            placeholder="url..."
            data-testid="url"
            name="url"
          />
        </div>
        <button className="btn-default" type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
