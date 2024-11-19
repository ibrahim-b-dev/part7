import React from "react"
import { useQuery } from "@tanstack/react-query"

import Togglable from "../components/Togglable"
import BlogForm from "../forms/BlogForm"
import BlogList from "../components/BlogList"

import { getAll } from "../services/blog"
import { useUserValue } from "../contexts/UserContext"

const Home = () => {
  const user = useUserValue()
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: getAll,
  })

  const blogs = result.data
    ? [...result.data].sort((a, b) => b.likes - a.likes)
    : []

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  return (
    <div>
      {user && (
        <Togglable buttonLabel="new blog">
          <BlogForm />
        </Togglable>
      )}

      <BlogList blogs={blogs} />
    </div>
  )
}

export default Home
