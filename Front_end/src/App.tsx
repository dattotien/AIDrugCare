import type React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DoctorLoginScene from "./Components/DoctorLoginScene/DoctorLoginScene.tsx";
import PatientScene from "./Components/PatientScene/PatientScene";
import PatientLoginScence from "./Components/PatientLoginScene/PatientLoginScene";
import VisitInfor from "./Components/Visit/VisitInfor.tsx";
import DoctorScene from "./Components/DoctorScene/DoctorScene.tsx";
import IntroductionScene from "./Components/IntroductionScene/IntroductionScene.tsx";
import PatientLoginScene from "./Components/PatientLoginScene/PatientLoginScene.tsx";
import PatientApp from "./PatientApp.tsx";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroductionScene />} />
        <Route path="/patient">
          <Route path="login" element={<PatientLoginScene />} />
          <Route path="dashboard/*" element={<PatientScene />} />
        </Route>
        <Route path="/doctor">
          <Route path="login" element={<DoctorLoginScene />} />
          <Route path="dashboard/*" element={<DoctorScene />} />
        </Route>
        <Route path="*" element={<IntroductionScene />} />
      </Routes>
    </Router>
  );
};

export default App;
