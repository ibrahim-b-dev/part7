import { useNavigate } from "react-router-dom"
import { useNotificationDispatch } from "../NotificationContext"
import { useField } from "../hooks"

const CreateNewForm = (props) => {
  const { reset: contentReset, ...contentProps } = useField("text")
  const { reset: authorReset, ...authorProps } = useField("text")
  const { reset: infoReset, ...infoProps } = useField("text")

  const showNotification = useNotificationDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: contentProps.value,
      author: authorProps.value,
      info: infoProps.value,
      votes: 0,
    })
    navigate("/")
    showNotification(`a new anecdote ${contentProps.value} created!`)
  }

  const handleReset = () => {
    contentReset()
    authorReset()
    infoReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentProps} />
        </div>
        <div>
          author
          <input {...authorProps} />
        </div>
        <div>
          url for more info
          <input {...infoProps} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  )
}

export default CreateNewForm
