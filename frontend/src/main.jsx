import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import "react-toastify/ReactToastify.css";
import TodoContextProvider from './Context/TodoContextProvider.jsx';
import ThemeContextProvider from './Context/ThemeContextProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <TodoContextProvider>
      <ThemeContextProvider>
    <App />
      </ThemeContextProvider>
    </TodoContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
