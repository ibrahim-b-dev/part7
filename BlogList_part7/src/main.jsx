import ReactDOM from "react-dom/client"
import App from "./App"
import { NotificationContextProvider } from "./contexts/NotificationContext"
import { UserContextProvider } from "./contexts/UserContext"

import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <NotificationContextProvider>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </NotificationContextProvider>
)
