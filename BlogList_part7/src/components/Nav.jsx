import { Link } from "react-router-dom"
import State from "./State"

const Nav = ({ user }) => {
  return (
    <div className="flex items-center justify-between px-2 py-5 bg-gray-200 border border-gray-300 font-sans text-sm">
      <div>
        <Link
          className="no-underline text-blue-500 mr-4 hover:underline"
          to="/"
        >
          Blogs
        </Link>
        <Link
          className="no-underline text-blue-500 mr-4 hover:underline"
          to="/users"
        >
          Users
        </Link>
      </div>
      {user && <State />}
    </div>
  )
}

export default Nav
