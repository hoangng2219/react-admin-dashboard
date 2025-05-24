import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App.tsx'

// styles
import './styles/tailwind.css'
import './styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import { SidebarProvider } from './contexts/sidebar-context.tsx'
import { ThemeProvider } from './contexts/theme-context.tsx'
import { initRequest } from './services/initRequest.ts'
import { store } from './store'
import ErrorBoundaries from './components/error-boundary.tsx'

initRequest();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <SidebarProvider>
            <ErrorBoundaries>
              <App />
            </ErrorBoundaries>
          </SidebarProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
