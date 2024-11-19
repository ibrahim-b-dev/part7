import axios from "axios"
const baseUrl = "/api/users"

export const getUer = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data
}

export const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

export default { getUer, getAll }
