import { StrictMode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from "react-redux"
import appStore from './store/index.jsx';
import App from './App.jsx';

createRoot( document.getElementById( 'root' ) ).render(
  <StrictMode>
    <Provider store={ appStore } >

      <Router>
        <App />
      </Router>
    </Provider>

  </StrictMode>,
)
