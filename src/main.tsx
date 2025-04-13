import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// styles
import './styles/tailwind.css'
import './styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import { SidebarProvider } from './contexts/sidebar-context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </BrowserRouter>
  </StrictMode>,
)
