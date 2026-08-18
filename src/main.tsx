import { ModusWcThemeProvider, setAssetPath } from '@trimble-oss/moduswebcomponents-react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'

setAssetPath(`${globalThis.location.origin}${import.meta.env.BASE_URL}`)

createRoot(document.getElementById('root')!).render(
  <ModusWcThemeProvider>
    <App />
  </ModusWcThemeProvider>,
)
