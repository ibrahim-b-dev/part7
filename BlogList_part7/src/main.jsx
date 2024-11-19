import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import App from "./App"
import { NotificationContextProvider } from "./contexts/NotificationContext"
import { UserContextProvider } from "./contexts/UserContext"

import "./index.css"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <NotificationContextProvider>
    <QueryClientProvider client={queryClient}>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </Router>
    </QueryClientProvider>
  </NotificationContextProvider>
)
