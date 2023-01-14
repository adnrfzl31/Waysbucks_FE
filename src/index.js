import React from "react"
import ReactDOM from "react-dom"
import "./assets/css/index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter as Router } from "react-router-dom"
import { UseContextProvider } from "./context/UserContext"

const client = new QueryClient()
ReactDOM.render(
  <React.StrictMode>
    <UseContextProvider>
      <QueryClientProvider client={client}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </UseContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

reportWebVitals()
