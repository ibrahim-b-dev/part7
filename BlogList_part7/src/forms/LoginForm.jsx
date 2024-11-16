import { useUserLogin } from "../contexts/UserContext"
import { useField } from "../hooks"

const LoginForm = (props) => {
  const { reset: resetTitle, ...username } = useField("text")
  const { reset: resetAuthor, ...password } = useField("text")
  const handleLogin = useUserLogin()

  const login = (event) => {
    event.preventDefault()

    handleLogin(username.value, password.value)
    resetTitle()
    resetAuthor()
  }

  return (
    <div>
      <h3>log in to application</h3>
      <form onSubmit={login} method="POST">
        <div>
          username
          <input data-testid="username" name="username" {...username} />
          password
          <input data-testid="password" name="password" {...password} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
