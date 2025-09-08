import type React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DoctorLoginScene from "./Components/DoctorLoginScene/DoctorLoginScene.tsx";
import PatientScene from "./Components/PatientScene/PatientScene";
import PatientLoginScence from "./Components/PatientLoginScene/PatientLoginScene";
import VisitInfor from "./Components/Visit/VisitInfor.tsx";
import DoctorScene from "./Components/DoctorScene/DoctorScene.tsx";
import PatientApp from "./PatientApp.tsx";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DoctorLoginScene />} />
        <Route path="/dashboard/" element={<DoctorScene />} />
      </Routes>
    </Router>
  );
};

export default App;
