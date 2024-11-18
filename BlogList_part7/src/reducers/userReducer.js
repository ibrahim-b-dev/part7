import blogService from "../services/blogs"

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      const { token, ...user } = action.payload
      blogService.setToken(token)
      return user

    case "LOGOUT":
      blogService.setToken(null)
      window.localStorage.removeItem("loggedBlogappUser")
      return null

    default:
      return state
  }
}

export default userReducer
