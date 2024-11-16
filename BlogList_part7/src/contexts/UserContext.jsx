import { createContext, useContext, useEffect, useReducer } from "react"
import { useNotificationDispatch } from "./NotificationContext"
import blogService from "../services/blogs"
import loginService from "../services/login"

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

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, dispatchUser] = useReducer(userReducer, null)
  const dispatchMessage = useNotificationDispatch()

  useEffect(() => {
    const loadUser = () => {
      const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)

        dispatchUser({ type: "SET", payload: user })
        dispatchMessage({ type: "SET", payload: `Welcome back ${user.name}` })
        setTimeout(() => {
          dispatchMessage({ type: "CLEAR" })
        }, 2000)
      }
    }

    loadUser()
  }, [dispatchMessage])

  const handleLogin = async (username, password) => {
    try {
      const loggedUser = await loginService.login({ username, password })
      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(loggedUser)
      )

      dispatchUser({ type: "SET", payload: loggedUser })
      dispatchMessage({
        type: "SET",
        payload: `Welcome ${loggedUser.name}!`,
      })
      setTimeout(() => dispatchMessage({ type: "CLEAR" }), 2000)
    } catch (error) {
      dispatchMessage({ type: "SET", payload: "Wrong username or password" })
      setTimeout(() => dispatchMessage({ type: "CLEAR" }), 5000)
    }
  }

  const handleLogout = () => {
    dispatchMessage({ type: "SET", payload: `${user.name} logged out!` })
    setTimeout(() => dispatchMessage({ type: "CLEAR" }), 2000)
    dispatchUser({ type: "LOGOUT" })
  }

  return (
    <UserContext.Provider
      value={{ user, dispatchUser, handleLogin, handleLogout }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const { user } = useContext(UserContext)
  return user
}

export const useUserDispatch = () => {
  const { dispatchUser } = useContext(UserContext)
  return dispatchUser
}

export const useUserLogin = () => {
  const { handleLogin } = useContext(UserContext)
  return handleLogin
}

export const useUserLogout = () => {
  const { handleLogout } = useContext(UserContext)
  return handleLogout
}

export default UserContext
