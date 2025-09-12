import { useEffect, useState } from "react";
import { Layout, Menu, Avatar, Badge, Modal, message } from "antd";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";

import userAvatar from "../../assets/user.png";
import userMailNoti from "../../assets/envelope.png";
import userNoti from "../../assets/active.png";
import Logo from "../../assets/AIDrugCare.png";
import backgroundImage from "../../assets/background.png";

import DashboardIconDefault from "../../assets/dashboard_blue.png";
import DashboardIconActive from "../../assets/dashboard_white.png";
import DrugbankIconDefault from "../../assets/drugs_blue.png";
import DrugbankIconActive from "../../assets/drugs_white.png";
import HistoryIconDefault from "../../assets/file_blue.png";
import HistoryIconActive from "../../assets/file_white.png";
import PatientsIconDefault from "../../assets/patients_blue.png";
import PatientsIconActive from "../../assets/patients_white.png";
import DDIscheckIconDefault from "../../assets/DDIs_blue.png";
import DDIscheckIconActive from "../../assets/DDIs_white.png";
import SettingIconDefault from "../../assets/setting_blue.png";
import SettingIconActive from "../../assets/setting_white.png";
import LogoutIconDefault from "../../assets/logout_blue.png";
import LogoutIconActive from "../../assets/logout_white.png";

import DoctorDashBoard from "../DoctorDashboard/DoctorDashboard.tsx";
import DrugListScene from "../DrugBank/DrugListScene.tsx";
import DoctorHistoryScene from "../DoctorHistory/DoctorHistoryScene.tsx";
import PatientsList from "../PatientsList/PatientsList.tsx";
import VisitInfor from "../Visit/VisitInfor.tsx";
import PatientOneHistory from "../PatientHistory/PatientOneHistory.tsx";
import DrugInteractionChecker from "../DrugInteractionChecker/DrugInteractionChecker.tsx";
import DoctorInformationScene from "../DoctorInformationScene/DoctorInformationScene.tsx";

import "./DoctorScene.css";

const { Content, Sider } = Layout;

const mainItems = [
  {
    key: "",
    label: "Trang chủ",
    iconDefault: DashboardIconDefault,
    iconActive: DashboardIconActive,
  },
  {
    key: "drugbank",
    label: "DrugBank",
    iconDefault: DrugbankIconDefault,
    iconActive: DrugbankIconActive,
  },
  {
    key: "history",
    label: "Lịch sử khám",
    iconDefault: HistoryIconDefault,
    iconActive: HistoryIconActive,
  },
  {
    key: "patients",
    label: "Khám chữa bệnh",
    iconDefault: PatientsIconDefault,
    iconActive: PatientsIconActive,
  },
  {
    key: "ddis",
    label: "Kiểm tra tương tác thuốc",
    iconDefault: DDIscheckIconDefault,
    iconActive: DDIscheckIconActive,
  },
];

const extraItems = [
  {
    key: "setting",
    label: "Cài đặt",
    iconDefault: SettingIconDefault,
    iconActive: SettingIconActive,
  },
  {
    key: "logout",
    label: "Đăng xuất",
    iconDefault: LogoutIconDefault,
    iconActive: LogoutIconActive,
  },
];

export default function DoctorScene() {
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:8000";
  const [accountInfo, setAccountInfo] = useState({
    name: "",
    email: "",
    avatar: userAvatar,
  });
  const [doctor, setDoctor] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  // Lấy thông tin doctor từ API
  useEffect(() => {
    const fetchDoctor = async () => {
      const storedDoctorId = localStorage.getItem("doctorId");
      const doctorId = storedDoctorId ? Number(storedDoctorId) : null;
      if (!doctorId) {
        navigate("/doctor/login", { replace: true });
        return;
      }

      try {
        const res = await axios.get(
          `${API_URL}/doctor-profile/${doctorId}`
        );
        if (res.data.success) {
          const doc = res.data.data;
          setDoctor({ ...doc, dob: doc.dob ? dayjs(doc.dob) : null });
          setAccountInfo({
            name: doc.title + ": " + doc.name,
            email: doc.email,
            avatar: userAvatar,
          });
        } else {
          console.error("Lỗi lấy profile:", res.data.message);
          navigate("/doctor/login", { replace: true });
        }
      } catch (err) {
        console.error("Fetch doctor profile error:", err);
        navigate("/doctor/login", { replace: true });
      }
    };
    fetchDoctor();
  }, [navigate]);


  useEffect(() => {
    const handleBack = () => {
      const path = window.location.pathname;
      if (!path.startsWith("/doctor/dashboard")) {
        localStorage.removeItem("doctorId");
      }
    };

    window.addEventListener("popstate", handleBack);
    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, []);

  const handleUpdateDoctor = (updateDoctor: any) => {
    setDoctor(updateDoctor);
    setAccountInfo({
      name: updateDoctor.title + ": " + updateDoctor.name,
      email: updateDoctor.email,
      avatar: userAvatar,
    });
  };

  const handleMenuSelect = ({ key }: { key: string }) => {
    if (key === "logout") {
      message.success("Đăng xuất thành công");
      localStorage.removeItem("doctorId");
      window.history.replaceState(null, "", "/doctor/login");
      navigate("/doctor/login", { replace: true });
      return;
    }
    if (key === "setting") {
      setOpen(true);
      return;
    }

    const targetPath =
      key === "" ? "/doctor/dashboard" : `/doctor/dashboard/${key}`;
    navigate(targetPath, { replace: false });
    setSelectedPatient(null);
  };

  const renderMenuItems = (items: typeof mainItems) =>
    items.map((item) => {
      const fullPath = "/doctor/dashboard/" + item.key;
      const isSelected =
        location.pathname === fullPath ||
        (item.key === "" && location.pathname === "/doctor/dashboard");

      return (
        <Menu.Item
          key={item.key}
          className={`doctor-menu-item ${
            isSelected ? "doctor-menu-item-selected" : ""
          }`}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={isSelected ? item.iconActive : item.iconDefault}
              alt={item.label}
              style={{
                width: 20,
                height: 20,
                objectFit: "contain",
                marginRight: 10,
              }}
            />
            <span
              className={`doctor-menu-label ${
                isSelected ? "doctor-menu-label-active" : ""
              }`}
            >
              {item.label}
            </span>
          </div>
        </Menu.Item>
      );
    });

  return (
    <Layout
      className="doctor-layout"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Sider width={"15vw"} className="doctor-sider">
        <div className="doctor-logo-container">
          <img src={Logo} alt="logo" className="doctor-logo" />
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname.replace("/doctor/dashboard/", "")]}
          onSelect={handleMenuSelect}
          className="doctor-menu"
        >
          {renderMenuItems(mainItems)}
        </Menu>
        <div className="doctor-divider">
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            onSelect={handleMenuSelect}
            style={{ borderInlineEnd: "none", background: "transparent" }}
          >
            {renderMenuItems(extraItems)}
          </Menu>
        </div>
      </Sider>

      <Content className="doctor-content">
        <div className="doctor-header-container">
          <h2 className="doctor-header-title">
            {location.pathname === "/doctor/dashboard" && "Dashboard"}
            {location.pathname.includes("/doctor/dashboard/drugbank") &&
              "DrugBank"}
            {location.pathname.includes("/doctor/dashboard/history") &&
              "History"}
            {location.pathname.includes("/doctor/dashboard/patients") && (
              <>
                <span
                  className={`doctor-header-patients ${
                    selectedPatient ? "clickable" : ""
                  }`}
                  onClick={() => selectedPatient && setSelectedPatient(null)}
                >
                  PATIENTS
                </span>
                {selectedPatient && (
                  <>
                    <span className="doctor-header-divider">/ </span>
                    <span className="doctor-header-patient-name">
                      {selectedPatient.name}
                    </span>
                  </>
                )}
              </>
            )}
            {location.pathname.includes("/doctor/dashboard/ddis") &&
              "DRUG-DRUG INTERACTIONS"}
          </h2>

          <div className="doctor-header-right">
            <Badge size="small">
              <img
                src={userMailNoti}
                alt="mail"
                style={{ width: 20, cursor: "pointer" }}
              />
            </Badge>
            <Badge size="small">
              <img
                src={userNoti}
                alt="noti"
                style={{ width: 20, cursor: "pointer" }}
              />
            </Badge>
            <div
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => setOpen(true)}
            >
              <Avatar
                src={accountInfo.avatar}
                size={30}
                style={{ marginRight: "10px" }}
              />
              <div>
                <div className="doctor-account-name">{accountInfo.name}</div>
                <div className="doctor-account-email">{accountInfo.email}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="doctor-body">
          <Routes>
            <Route
              path="/"
              element={
                <DoctorDashBoard
                  onSelectPatient={(patient: any) => {
                    navigate("/doctor/dashboard/patients", { replace: false });
                    setSelectedPatient(patient);
                  }}
                  onSeeAllPatients={() =>
                    navigate("/doctor/dashboard/patients", { replace: false })
                  }
                />
              }
            />
            <Route path="drugbank" element={<DrugListScene />} />
            <Route path="history" element={<DoctorHistoryScene />} />
            <Route
              path="patients"
              element={
                !selectedPatient ? (
                  <PatientsList
                    onSelectPatient={(p: any) => setSelectedPatient(p)}
                  />
                ) : selectedPatient.status === "Chưa khám" ? (
                  <VisitInfor
                    patient={selectedPatient}
                    onBack={() => setSelectedPatient(null)}
                  />
                ) : (
                  <PatientOneHistory visitId={selectedPatient.visitId} />
                )
              }
            />
            <Route path="ddis" element={<DrugInteractionChecker />} />
          </Routes>
        </div>
      </Content>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={890}
        zIndex={2000}
      >
        <DoctorInformationScene
          doctor={doctor}
          onSave={handleUpdateDoctor}
          onClose={() => setOpen(false)}
        />
      </Modal>
    </Layout>
  );
}
