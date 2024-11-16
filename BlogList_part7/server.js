import jsonServer from "json-server"
import { v4 as uuidv4 } from "uuid"

const server = jsonServer.create()
const router = jsonServer.router("db.json")
const middlewares = jsonServer.defaults()

const routes = {
  "/api/blogs": "/blogs",
  "/api/users": "/users",
}

server.use(jsonServer.rewriter(routes))
server.use(middlewares)
server.post("/api/login", (req, res) => {
  const fakeToken = uuidv4()

  res.json({ token: fakeToken })
})

server.use(router)

const PORT = 3001
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`)
})
