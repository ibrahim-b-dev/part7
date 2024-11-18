import { createContext, useContext, useReducer } from "react"
import notificationReducer from "../reducers/notificationReducer"

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
