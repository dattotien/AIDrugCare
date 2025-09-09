import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DoctorLoginScene from "./Components/DoctorLoginScene/DoctorLoginScene.tsx";
import PatientScene from "./Components/PatientScene/PatientScene";
import DoctorScene from "./Components/DoctorScene/DoctorScene.tsx";
import IntroductionScene from "./Components/IntroductionScene/IntroductionScene.tsx";
import PatientLoginScene from "./Components/PatientLoginScene/PatientLoginScene.tsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroductionScene />} />
        <Route path="/patient/login" element={<PatientLoginScene />} />
        <Route path="/patient/dashboard/*" element={<PatientScene />} />
        <Route path="/doctor/login" element={<DoctorLoginScene />} />
        <Route path="/doctor/dashboard/*" element={<DoctorScene />} />

        <Route path="*" element={<IntroductionScene />} />
      </Routes>
    </Router>
  );
}
