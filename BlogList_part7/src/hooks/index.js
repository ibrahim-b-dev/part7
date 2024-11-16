import { useEffect, useState } from "react"
import { useNotificationDispatch } from "../contexts/NotificationContext"
import blogService from "../services/blogs"

export const useField = (type) => {
  const [value, setValue] = useState("")

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue("")
  }

  return {
    type,
    value,
    onChange,
    reset,
  }
}

export const useBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const dispatchMessage = useNotificationDispatch()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await blogService.getAll()
        const sortedBlogs = fetchedBlogs.sort((a, b) => b.likes - a.likes)
        setBlogs(sortedBlogs)
      } catch (error) {
        console.error("Failed to fetch blogs:", error)
      }
    }
    fetchBlogs()
  }, [])

  const createBlog = async (blogObject) => {
    try {
      const created = await blogService.create(blogObject)
      const createdBlog = await blogService.get(created.id)

      setBlogs((prevBlogs) => {
        const updatedBlogs = [...prevBlogs, createdBlog]
        return updatedBlogs
      })

      dispatchMessage({
        type: "SET",
        payload: `A new blog "${createdBlog.title}" by ${createdBlog.author} added`,
      })
      setTimeout(() => {
        dispatchMessage({ type: "CLEAR" })
      }, 2000)
    } catch (error) {
      console.error(
        "Error creating blog:",
        error.response?.data?.error || error.message
      )
      dispatchMessage({
        type: "SET",
        payload: error.response.data.error,
      })
      setTimeout(() => {
        dispatchMessage({ type: "CLEAR" })
      }, 2000)
    }
  }

  const likeBlog = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update({
        ...blogObject,
        likes: blogObject.likes + 1,
      })

      setBlogs((prevBlogs) =>
        prevBlogs
          .map((blog) => {
            const { user, ...rest } = blog
            return blog.id === updatedBlog.id ? { ...updatedBlog, user } : blog
          })
          .sort((a, b) => b.likes - a.likes)
      )
    } catch (error) {
      console.log(
        "Error updating blog likes:",
        error.response?.data?.error || error.message
      )
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id))

      dispatchMessage({
        type: "SET",
        payload: "blog deleted",
      })
      setTimeout(() => {
        dispatchMessage({ type: "CLEAR" })
      }, 2000)
    } catch (error) {
      dispatchMessage({
        type: "SET",
        payload: error.response.data.error,
      })
      setTimeout(() => {
        dispatchMessage({ type: "CLEAR" })
      }, 2000)
    }
  }

  return { blogs, setBlogs, createBlog, likeBlog, deleteBlog }
}
