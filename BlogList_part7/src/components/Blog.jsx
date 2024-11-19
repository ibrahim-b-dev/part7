import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useUserValue } from "../contexts/UserContext"
import { update, remove, getBlog } from "../services/blog"
import { useField } from "../hooks"
import { addComment } from "../services/comments"

const Comments = ({ comments, blogId }) => {
  const { reset: resetComment, ...comment } = useField("text")
  const queryClient = useQueryClient()

  const addCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(["blog", blogId], updatedBlog)
    },
  })

  const handleAddComment = (event) => {
    event.preventDefault()
    addCommentMutation.mutate({ id: blogId, comment: comment.value })
    resetComment()
  }

  return (
    <div>
      <div>
        <h3 className="text-xl my-2">comments</h3>
        <div>
          <form onSubmit={handleAddComment}>
            <input
              className="mx-2 my-2 w-72 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700"
              placeholder="comment..."
              name="comment"
              {...comment}
            />
            <button className="btn-default" type="submit">
              add comment
            </button>
          </form>
        </div>

        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const Blog = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = useUserValue()

  const {
    data: blog,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlog(id),
  })

  const owner = blog?.user && user?.id === blog.user.id ? true : false
  const queryClient = useQueryClient()

  const likeMutaion = useMutation({
    mutationFn: update,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries(["blogs"])

      // queryClient.setQueryData(["blogs"], (oldBlogs) =>
      //   oldBlogs.map((blog) => (blog.id === newBlog.id ? newBlog : blog))
      // )

      // const blogs = queryClient.getQueryData(["blogs"])
      // if (blogs) {
      //   console.log("inside like", newBlog)
      //   queryClient.setQueryData(
      //     ["blogs"],
      //     blogs.map((blog) => (blog.id === newBlog.id ? newBlog : blog))
      //   )
      // }
    },
  })

  const deleteMutation = useMutation({
    mutationFn: remove,
    onSuccess: () => queryClient.invalidateQueries(["blogs"]),
  })

  const handleLike = (id) => {
    if (user) {
      likeMutaion.mutate(id)
    } else {
      navigate("/login")
    }
  }

  const handleDelete = (id) => {
    deleteMutation.mutate(id)
    navigate("/")
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading blog</div>
  if (!blog) return <div>Blog not found</div>

  return (
    <>
      <div>
        <h1 className="text-3xl my-2">{blog.title}</h1>
        <a
          className="hover:underline text-blue-400"
          target="_blank"
          rel="noopener noreferrer"
          href={`${blog.url}`}
        >
          {blog.url}
        </a>
        <div>
          <span className="mx-2">{blog.likes} likes</span>
          <button className="btn-default" onClick={() => handleLike(blog.id)}>
            like
          </button>
        </div>
        <p className="my-2">Wrriten by {blog.author}.</p>
        <p className="my-2">Added by {blog.user.username}.</p>
        {owner && (
          <button className="btn-default" onClick={() => handleDelete(blog.id)}>
            delete
          </button>
        )}
      </div>

      <Comments comments={blog.comments} blogId={blog.id} />
    </>
  )
}

export default Blog
