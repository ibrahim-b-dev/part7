import PropTypes from "prop-types"
import { useState } from "react"

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className="my-2">
      <div style={hideWhenVisible}>
        <button className="btn-default bg-slate-300" onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}

        <button className="btn-default" onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

Togglable.displayName = "Togglable"

// Togglable.propTypes = {
//   buttonLabel: PropTypes.string.isRequired,
//   children: PropTypes.node.isRequired,
// }

export default Togglable
