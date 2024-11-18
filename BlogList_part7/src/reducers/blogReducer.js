import { createSlice, current } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const initialState = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 0,
    user: {
      username: "ibrahim",
      name: "hemo",
      id: "673a176691cc5f0d46c0a4d7",
    },
  },
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 0,
    user: {
      username: "ibrahim",
      name: "hemo",
      id: "673a176691cc5f0d46c0a4d7",
    },
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 0,
    user: {
      username: "ibrahim",
      name: "hemo",
      id: "673a176691cc5f0d46c0a4d7",
    },
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    user: {
      username: "ibrahim",
      name: "hemo",
      id: "673a176691cc5f0d46c0a4d7",
    },
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 0,
    user: {
      username: "ibrahim",
      name: "hemo",
      id: "673a176691cc5f0d46c0a4d7",
    },
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 0,
    user: {
      username: "ibrahim",
      name: "hemo",
      id: "673a176691cc5f0d46c0a4d7",
    },
  },
]

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setAllBlogs(state, action) {
      return [...action.payload]
    },
    addBlog(state, action) {
      return [...state, { ...action.payload, likes: 0 }]
    },
    updateBlog(state, action) {
      const likedBlog = action.payload
      return state.map((blog) => (blog.id !== likedBlog.id ? blog : likedBlog))
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((b) => b.id !== id)
    },
  },
})

export const { setAllBlogs, addBlog, updateBlog, removeBlog } =
  blogSlice.actions

// action creators which return a function instead of an object.
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setAllBlogs(blogs))
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(newBlog)
    dispatch(addBlog(createdBlog))
  }
}

export const editBlog = (blogObject) => {
  return async (dispatch) => {
    const blogId = blogObject.id
    const blog = await blogService.update(blogId)

    dispatch(updateBlog(blog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export default blogSlice.reducer
