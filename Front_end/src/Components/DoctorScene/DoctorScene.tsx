import type React from "react";
import { useEffect, useState } from "react";
import { Layout, Menu, Avatar, Badge, Modal } from "antd";
import userAvatar from "../../assets/user.png";
import userMailNoti from "../../assets/envelope.png";
import userNoti from "../../assets/active.png";
import DrugInteractionChecker from "../DrugInteractionChecker/DrugInteractionChecker.tsx";
import DrugListScene from "../DrugBank/DrugListScene.tsx";
import PatientsList from "../PatientsList/PatientsList.tsx";
import VisitInfor from "../Visit/VisitInfor.tsx";
import dayjs from "dayjs";
import DoctorHistoryScene from "../DoctorHistory/DoctorHistoryScene.tsx";
import Logo from "../../assets/AIDrugCare.png";
import backgroundImage from "../../assets/background.png";
import DoctorInformationScene from "../DoctorInformationScene/DoctorInformationScene.tsx";
import DoctorDashBoard from "../DoctorDashboard/DoctorDashboard.tsx";
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
import PatientOneHistory from "../PatientHistory/PatientOneHistory.tsx";
import "./DoctorScene.css";
import DoctorDashboard from "../DoctorDashboard/DoctorDashboard.tsx";
import axios from "axios";

const { Content, Sider } = Layout;

const mainItems = [
  {
    key: "1",
    label: "Dashboard",
    iconDefault: DashboardIconDefault,
    iconActive: DashboardIconActive,
  },
  {
    key: "2",
    label: "Drugbank",
    iconDefault: DrugbankIconDefault,
    iconActive: DrugbankIconActive,
  },
  {
    key: "3",
    label: "History",
    iconDefault: HistoryIconDefault,
    iconActive: HistoryIconActive,
  },
  {
    key: "4",
    label: "Patients",
    iconDefault: PatientsIconDefault,
    iconActive: PatientsIconActive,
  },
  {
    key: "5",
    label: "DDIs check",
    iconDefault: DDIscheckIconDefault,
    iconActive: DDIscheckIconActive,
  },
];

const extraItems = [
  {
    key: "setting",
    label: "Setting",
    iconDefault: SettingIconDefault,
    iconActive: SettingIconActive,
  },
  {
    key: "logout",
    label: "Log out",
    iconDefault: LogoutIconDefault,
    iconActive: LogoutIconActive,
  },
];

export default function DoctorScene() {
  const [accountInfo, setAccountInfo] = useState({
    name: "",
    email: "",
    avatar: userAvatar,
  });
  useEffect(() => {
    const fetchDoctor = async () => {
      const storedDoctorId = localStorage.getItem("doctorId");
      const doctorId = storedDoctorId ? Number(storedDoctorId) : null;
      if (!doctorId) return;

      try {
        const res = await axios.get(
          `http://localhost:8000/doctor-profile/${doctorId}`
        );
        console.log("Doctor API response:", res); // toàn bộ object
        console.log("Doctor API data:", res.data); // dữ liệu trả về
        if (res.data.success) {
          const doc = res.data.data;

          setDoctor({
            ...doc,
            dob: doc.dob ? dayjs(doc.dob) : null,
          });

          // cập nhật accountInfo từ dữ liệu doctor
          setAccountInfo({
            name: doc.title + ": " + doc.name,
            email: doc.email,
            avatar: userAvatar, // nếu API trả link avatar thì thay ở đây
          });
        } else {
          console.error("Lỗi lấy profile:", res.data.message);
        }
      } catch (err) {
        console.error("Fetch doctor profile error:", err);
      }
    };

    fetchDoctor();
  }, []);

  const [open, setOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const [doctor, setDoctor] = useState<any>(null);
  const handleUpdateDoctor = (updateDoctor: any) => {
    setDoctor(updateDoctor);
    setAccountInfo({
      name: updateDoctor.title + ": " + updateDoctor.name,
      email: updateDoctor.email,
      avatar: userAvatar,
    });
  };

  const handleMenuSelect = ({ key }: { key: string }) => {
    setSelectedKey(key);
    setSelectedPatient(null);
  };

  const renderMenuItems = (items: typeof mainItems) =>
    items.map((item) => (
      <Menu.Item
        key={item.key}
        className={`doctor-menu-item ${
          selectedKey === item.key ? "doctor-menu-item-selected" : ""
        }`}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "0.8vw",
          }}
        >
          <img
            src={selectedKey === item.key ? item.iconActive : item.iconDefault}
            alt={item.label}
            style={{
              width: 20,
              height: 20,
              objectFit: "contain",
              marginRight: 12,
            }}
          />
          <span
            className={`doctor-menu-label ${
              selectedKey === item.key ? "doctor-menu-label-active" : ""
            }`}
          >
            {item.label}
          </span>
        </div>
      </Menu.Item>
    ));

  return (
    <Layout
      className="doctor-layout"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Sider min-width={"13.5vw"} className="doctor-sider">
        <div className="doctor-logo-container">
          <img src={Logo} alt="logo" className="doctor-logo" />
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onSelect={handleMenuSelect}
          className="doctor-menu"
        >
          {renderMenuItems(mainItems)}
        </Menu>
        <div className="doctor-divider">
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
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
            {selectedKey === "1" && "Dashboard"}
            {selectedKey === "2" && "Drugbank"}
            {selectedKey === "3" && "History"}
            {selectedKey === "4" && (
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
            {selectedKey === "5" && "DRUG-DRUG INTERACTIONS"}
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
          {selectedKey === "1" && <DoctorDashBoard />}
          {selectedKey === "2" && <DrugListScene />}
          {selectedKey === "3" && <DoctorHistoryScene />}
          {selectedKey === "4" && !selectedPatient && (
            <PatientsList onSelectPatient={(p: any) => setSelectedPatient(p)} />
          )}
          {selectedKey === "4" && selectedPatient && (
            <>
              {selectedPatient.status === "Chưa khám" ? (
                <VisitInfor
                  patient={selectedPatient}
                  onBack={() => setSelectedPatient(null)}
                />
              ) : (
                <PatientOneHistory visitId={selectedPatient.visitId} />
              )}
            </>
          )}
          {selectedKey === "5" && <DrugInteractionChecker />}
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
