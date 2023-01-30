import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style/config.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* {localStorage.user ? <App isStart /> : <App />} */}
    <App />
  </React.StrictMode>
)
