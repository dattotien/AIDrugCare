import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import IntroductionScene from "./Components/IntroductionScene/IntroductionScene";
import PatientLoginScene from "./Components/PatientLoginScene/PatientLoginScene";
import PatientScene from "./Components/PatientScene/PatientScene";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Trang giới thiệu */}
        <Route path="/" element={<IntroductionScene />} />

        {/* Đăng nhập bệnh nhân */}
        <Route path="/patientLogin" element={<PatientLoginScene />} />

        {/* Layout bệnh nhân: sider + cột phải cố định */}
        <Route path="/*" element={<PatientScene />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
