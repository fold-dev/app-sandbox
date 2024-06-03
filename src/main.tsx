import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Buffer } from 'buffer'
import Process from 'process'
import '@fold-dev/core/dist/styles.css'
import '@fold-pro/react/dist/styles.css'
import './styles.css'

globalThis.process = Process
globalThis.Buffer = Buffer

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
