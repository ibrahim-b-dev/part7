import useField from "./useField"

const App2 = () => {
  const name = useField("text")
  const date = useField("date")
  const height = useField("number")

  return (
    <div>
      <form>
        name:
        <input {...name} />
        <br />
        birthdate:
        <input {...date} />
        <br />
        height:
        <input {...height} />
      </form>
      <div>
        {name.value} {date.value} {height.value}
      </div>
    </div>
  )
}

export default App2
