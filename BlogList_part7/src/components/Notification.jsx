import { useNotificationValue } from "../contexts/NotificationContext"

const Notification = (props) => {
  const message = useNotificationValue()

  if (message === "") {
    return null
  }

  // const className = status ? "success" : "error"
  // return <div className={className}>{message}</div>
  return <div>{message}</div>
}

export default Notification
