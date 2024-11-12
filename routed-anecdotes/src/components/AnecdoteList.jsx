import { Link } from "react-router-dom"

export const Anecdote = ({ anecdote }) => {
  const { content, author, votes, info } = anecdote

  return (
    <article>
      <header>
        <h1>
          {content} by {author}
        </h1>
      </header>
      <p>Votes: {votes}</p>
      <p>
        More information:{" "}
        <a href={info} target="_blank" rel="noopener noreferrer">
          {info}
        </a>
      </p>
    </article>
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
        {anecdotes.map(({ id, content }) => {
          const url = `/anecdotes/${id}`

          return (
            <Link key={id} style={padding} to={url}>
              <li>{content}</li>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}

export default AnecdoteList
