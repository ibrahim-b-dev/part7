import { useNavigate } from "react-router-dom"
import { useNotificationDispatch } from "../NotificationContext"
import { useField } from "../hooks"

const CreateNewForm = (props) => {
  const content = useField("text")
  const author = useField("text")
  const info = useField("text")

  const showNotification = useNotificationDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
    navigate("/")
    showNotification(`a new anecdote ${content.value} created!`)
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
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
