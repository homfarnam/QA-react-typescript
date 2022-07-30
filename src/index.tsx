import React from "react"
import { Provider } from "react-redux"
import { createRoot } from "react-dom/client"
import App from "./App"
import { store } from "store/store"
import "./styles/tailwind.css"
import "./styles/index.css"
import "./styles/main.scss"

const container = document.getElementById("root")
const root = createRoot(container) // createRoot(container!) if you use TypeScript

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
