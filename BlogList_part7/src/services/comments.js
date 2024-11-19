import axios from "axios"

export const addComment = async (blogObject) => {
  const { id, comment } = blogObject
  const response = await axios.post(`/api/blogs/${id}/comments`, {
    comment,
  })
  return response.data
}
