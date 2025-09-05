import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import PatientApp from "./PatientApp.tsx"
import IntroductionScene from './Components/IntroductionScene.tsx'
import DoctorLoginScence from './Components/DoctorLoginScene/DoctorLoginScene.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
