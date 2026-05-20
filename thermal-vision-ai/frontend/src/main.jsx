import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(26, 34, 53, 0.9)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            color: '#fff',
            borderRadius: '12px',
          },
          success: {
            iconTheme: {
              primary: '#00ff88',
              secondary: '#0a0e1a',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff3860',
              secondary: '#0a0e1a',
            },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>,
)
