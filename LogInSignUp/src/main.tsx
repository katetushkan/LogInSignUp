import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BaseRouter } from "./routing/Router.tsx";

import './index.css'
import { AuthProvider } from "./contexts/AuthProvider/AuthProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BaseRouter/>
    </AuthProvider>
  </StrictMode>,
)
