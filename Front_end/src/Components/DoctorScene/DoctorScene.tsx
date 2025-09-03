import type React from "react";
import { useState } from "react";
import { Layout, Menu, Avatar, Badge } from "antd";
import userAvatar from "../../assets/user.png";
import userMailNoti from "../../assets/envelope.png";
import userNoti from "../../assets/active.png";
import DrugInteractionChecker from "../DrugInteractionChecker/DrugInteractionChecker.tsx";
import DrugListScene from "../DrugBank/DrugListScene.tsx";
import PatientsList from "../PatientsList/PatientsList.tsx";
import VisitInfor from "../Visit/VisitInfor.tsx";

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

import "./DoctorScene.css";

const { Content, Sider } = Layout;

const mainItems = [
  { key: "1", label: "Dashboard", iconDefault: DashboardIconDefault, iconActive: DashboardIconActive },
  { key: "2", label: "Drugbank", iconDefault: DrugbankIconDefault, iconActive: DrugbankIconActive },
  { key: "3", label: "History", iconDefault: HistoryIconDefault, iconActive: HistoryIconActive },
  { key: "4", label: "Patients", iconDefault: PatientsIconDefault, iconActive: PatientsIconActive },
  { key: "5", label: "DDIs check", iconDefault: DDIscheckIconDefault, iconActive: DDIscheckIconActive },
];

const extraItems = [
  { key: "setting", label: "Setting", iconDefault: SettingIconDefault, iconActive: SettingIconActive },
  { key: "logout", label: "Log out", iconDefault: LogoutIconDefault, iconActive: LogoutIconActive },
];

export default function DoctorScene() {
  const accountInfo = { name: "Dr. N.T.N Yen", email: "yennguyen@gmail.com", avatar: userAvatar };
  const [selectedKey, setSelectedKey] = useState("1");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const handleMenuSelect = ({ key }: { key: string }) => {
    setSelectedKey(key);
    setSelectedPatient(null);
  };

  const renderMenuItems = (items: typeof mainItems) =>
    items.map((item) => (
      <Menu.Item
        key={item.key}
        className={`doctor-menu-item ${selectedKey === item.key ? "selected" : ""}`}
      >
        <div className="doctor-menu-item-content">
          <img
            src={selectedKey === item.key ? item.iconActive : item.iconDefault}
            alt={item.label}
            className="doctor-menu-icon"
          />
          <span className={`doctor-menu-label ${selectedKey === item.key ? "active" : ""}`}>
            {item.label}
          </span>
        </div>
      </Menu.Item>
    ));

  return (
    <Layout className="doctor-layout" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* SIDER */}
      <Sider width={220} className="doctor-sider">
        <div className="doctor-logo">
          <img src={Logo} alt="Logo" />
        </div>

        <div className="doctor-main-menu">
          <Menu mode="inline" selectedKeys={[selectedKey]} onSelect={handleMenuSelect}>
            {renderMenuItems(mainItems)}
          </Menu>
        </div>

        <div className="doctor-divider" />

        <div className="doctor-extra-menu">
          <Menu mode="inline" selectedKeys={[selectedKey]} onSelect={handleMenuSelect}>
            {renderMenuItems(extraItems)}
          </Menu>
        </div>
      </Sider>

      {/* CONTENT */}
      <Layout className="doctor-content-layout">
        <Content className="doctor-content">
          {/* Header */}
          <div className="doctor-header">
            <h2 className="doctor-header-title">
              {selectedKey === "1" && "DASHBOARD"}
              {selectedKey === "2" && "DRUGBANK"}
              {selectedKey === "3" && "HISTORY"}
              {selectedKey === "4" && (
                <>
                  <span
                    className={`doctor-header-patients ${selectedPatient ? "clickable" : ""}`}
                    onClick={() => selectedPatient && setSelectedPatient(null)}
                  >
                    PATIENTS
                  </span>
                  {selectedPatient && (
                    <>
                      <span className="doctor-header-divider">/ </span>
                      <span className="doctor-header-patient-name">{selectedPatient.name}</span>
                    </>
                  )}
                </>
              )}
              {selectedKey === "5" && "DRUG-DRUG INTERACTIONS"}
            </h2>

            <div className="doctor-header-user">
              <Badge size="small">
                <img src={userMailNoti} alt="mail" className="doctor-icon-btn" />
              </Badge>
              <Badge size="small">
                <img src={userNoti} alt="noti" className="doctor-icon-btn" />
              </Badge>
              <div className="doctor-user-info">
                <Avatar src={accountInfo.avatar} size={40} className="doctor-avatar" />
                <div>
                  <div className="doctor-user-name">{accountInfo.name}</div>
                  <div className="doctor-user-email">{accountInfo.email}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="doctor-body">
            {selectedKey === "2" && <DrugListScene />}
            {selectedKey === "4" && !selectedPatient && (
              <PatientsList onSelectPatient={(p: any) => setSelectedPatient(p)} />
            )}
            {selectedKey === "4" && selectedPatient && (
              <VisitInfor patient={selectedPatient} onBack={() => setSelectedPatient(null)} />
            )}
            {selectedKey === "5" && <DrugInteractionChecker />}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
