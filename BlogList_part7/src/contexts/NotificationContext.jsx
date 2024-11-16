import { createContext, useContext, useReducer } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload
    case "CLEAR":
      return ""
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [message, dispatchMessage] = useReducer(notificationReducer, "")

  return (
    <NotificationContext.Provider value={{ message, dispatchMessage }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const { message } = useContext(NotificationContext)
  return message
}

export const useNotificationDispatch = () => {
  const { dispatchMessage } = useContext(NotificationContext)
  return dispatchMessage
}

export default NotificationContext
