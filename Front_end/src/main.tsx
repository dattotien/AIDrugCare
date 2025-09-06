import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import PatientApp from "./PatientApp.tsx"
import IntroductionScene from './Components/IntroductionScene/IntroductionScene.tsx'
import DoctorLoginScence from './Components/DoctorLoginScene/DoctorLoginScene.tsx'
import DoctorDashboard from './Components/DoctorDashboard/DoctorDashboard.tsx'
import PatientScene from './Components/PatientScene/PatientScene.tsx'
import PatientLoginScene from './Components/PatientLoginScene/PatientLoginScene.tsx'
import PatientHistory from './Components/PatientHistory/PatientHistory.tsx'
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<DoctorDashboard/>}/>
          <Route path="/patientDashboard" element={<PatientScene />} />
          <Route path="/patientHistory"   element={<PatientHistory patientId={localStorage.getItem("patientId")!} />} />
        </Routes>

    </BrowserRouter>
  </StrictMode>,
)
