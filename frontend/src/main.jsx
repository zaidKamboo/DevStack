import { StrictMode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import AllRoutes from './pages/AllRoutes.jsx';

createRoot( document.getElementById( 'root' ) ).render(
  <StrictMode>

    <Router>
      <AllRoutes />
    </Router>

  </StrictMode>,
)
