import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import IntroductionScene from "./Components/IntroductionScene/IntroductionScene";
import PatientLoginScene from "./Components/PatientLoginScene/PatientLoginScene";
import PatientScene from "./Components/PatientScene/PatientScene";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroductionScene />} />
        <Route path="/patient/login" element={<PatientLoginScene />} />
        <Route path="/*" element={<PatientScene />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}