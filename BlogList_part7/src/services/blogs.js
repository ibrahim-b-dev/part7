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

export const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

export const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.post(baseUrl, newBlog, config)
  return request.data
}

export const update = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const url = `${baseUrl}/${id}`

  const request = await axios.put(url, id, config)
  return request.data
}


export const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const url = `${baseUrl}/${id}`

  const request = await axios.delete(url, config)
  return request.data
}

export default { setToken, get, getAll, create, update, remove }
