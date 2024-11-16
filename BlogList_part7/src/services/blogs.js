import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const get = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.post(baseUrl, newBlog, config)  
  return request.data
}

const update = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const url = `${baseUrl}/${updatedBlog.id}`

  const request = await axios.put(url, updatedBlog, config)
  return request.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const url = `${baseUrl}/${id}`

  const request = await axios.delete(url, config)
  return request.data
}

export default { setToken, get, getAll, create, update, remove }
