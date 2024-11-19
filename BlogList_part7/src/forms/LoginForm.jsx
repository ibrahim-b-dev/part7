import { useNavigate } from "react-router-dom"
import { useUserLogin } from "../contexts/UserContext"
import { useField } from "../hooks"

const LoginForm = (props) => {
  const { reset: resetTitle, ...username } = useField("text")
  const { reset: resetAuthor, ...password } = useField("text")
  const handleLogin = useUserLogin()
  const navigate = useNavigate()

  const login = (event) => {
    event.preventDefault()
    handleLogin(username.value, password.value)
    navigate("/")
    resetTitle()
    resetAuthor()
  }

  return (
    <div>
      <h3 className="text-lg my-2">log in to application</h3>
      <form className="flex flex-col" onSubmit={login} method="POST">
        {/* <div> */}
        <input
          className="input"
          placeholder="username..."
          data-testid="username"
          name="username"
          {...username}
        />
        <input
          className="input"
          placeholder="password..."
          data-testid="password"
          name="password"
          {...password}
        />
        {/* </div> */}
        <button className="btn-default w-20" type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
