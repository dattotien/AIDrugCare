import type React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DoctorLoginScene from "./Components/DoctorLoginScene/DoctorLoginScene.tsx";
import DoctorScene from "./Components/DoctorScene/DoctorScene.tsx";
import PatientLoginScence from "./Components/PatientLoginScene/PatientLoginScene";
import VisitInfor from "./Components/Visit/VisitInfor.tsx";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DoctorLoginScene />} />
        <Route path="/dashboard/" element={<DoctorScene />} />
        <Route path="/visit-info" element={<VisitInfor />} />
      </Routes>
    </Router>
  );
};

export default App;
