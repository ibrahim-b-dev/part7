import { Link, useParams } from "react-router-dom"

export const Anecdote = ({ anecdote }) => {
  // const id = useParams().id
  // const anecdote = anecdotes.find((a) => a.id === Number(id))

  console.log(anecdote)

  return (
    <div>
      <h1>
        {anecdote.content} by {anecdote.author}
      </h1>
      <p>has {anecdote.votes} votes</p>
      <p>
        for more info see
        <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => {
  const padding = {
    paddingRight: 5,
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => {
          const id = anecdote.id
          const url = `/anecdotes/${id}`

          return (
            <Link key={id} style={padding} to={url}>
              <li>{anecdote.content}</li>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}

export default AnecdoteList
