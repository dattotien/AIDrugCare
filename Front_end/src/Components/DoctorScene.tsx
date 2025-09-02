import type React from "react";
import { useState } from "react";
import { Layout, Menu, Avatar, Badge, Dropdown } from "antd";
import userAvatar from "../assets/user.png";
import userMailNoti from "../assets/envelope.png";
import userNoti from "../assets/active.png";
import DrugInteractionChecker from "./DrugInteractionChecker/DrugInteractionChecker.tsx";
import DrugListScene from "./DrugListScene.tsx";

import Logo from "../assets/AIDrugCare.png";
import backgroundImage from "../assets/background.png";

import DashboardIconDefault from "../assets/dashboard_blue.png";
import DashboardIconActive from "../assets/dashboard_white.png";

import DrugbankIconDefault from "../assets/drugs_blue.png";
import DrugbankIconActive from "../assets/drugs_white.png";

import HistoryIconDefault from "../assets/file_blue.png";
import HistoryIconActive from "../assets/file_white.png";

import PatientsIconDefault from "../assets/patients_blue.png";
import PatientsIconActive from "../assets/patients_white.png";

import DDIscheckIconDefault from "../assets/DDIs_blue.png";
import DDIscheckIconActive from "../assets/DDIs_white.png";

import SettingIconDefault from "../assets/setting_blue.png";
import SettingIconActive from "../assets/setting_white.png";

import LogoutIconDefault from "../assets/logout_blue.png";
import LogoutIconActive from "../assets/logout_white.png";

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
  const accountInfo = {
    name: "Dr. N.T.N Yen",
    email: "yennguyen@gmail.com",
    avatar: userAvatar,
  };
  const [selectedKey, setSelectedKey] = useState("1");

  const handleMenuSelect = ({ key }: { key: string }) => {
    setSelectedKey(key);
  };

  const renderMenuItems = (items: typeof mainItems) =>
    items.map((item) => (
      <Menu.Item
        key={item.key}
        style={{
          width: "90%",
          margin: "0 auto",
          borderRadius: "50px",
          marginBottom: "10px",
          backgroundColor:
            selectedKey === item.key ? "#1c5cb6ff" : "transparent",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: "20px",
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
            style={{
              color: selectedKey === item.key ? "#fff" : "#000",
              fontSize: 14,
            }}
          >
            {item.label}
          </span>
        </div>
      </Menu.Item>
    ));

  return (
    <Layout
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "transparent",
      }}
    >
      <Sider
        width={220}
        style={{
          backgroundColor: "#f5f8fbff",
          display: "flex",
          flexDirection: "column",
          padding: "16px 0",
          boxShadow: "2px 0 8px rgba(0, 0, 0, 0.08)",
          position: "fixed", // giữ nguyên khi scroll
          left: 0,
          top: 0,
          bottom: 0,
          height: "100vh",
          overflow: "auto", // riêng sider có scroll nếu menu dài
        }}
      >
        {/* Logo */}
        <div style={{ paddingLeft: "30px", marginBottom: "150px" }}>
          <img src={Logo} alt="Logo" style={{ width: "120px" }} />
        </div>

        {/* Menu chính */}
        <div style={{ flex: 1 }}>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onSelect={handleMenuSelect}
            style={{ borderInlineEnd: "none", background: "transparent" }}
          >
            {renderMenuItems(mainItems)}
          </Menu>
        </div>

        {/* Divider để cách biệt */}
        <div style={{ margin: "50px 0", borderTop: "1px solid #ffffffff" }} />

        {/* Menu phụ (Setting, Logout)*/}
        <div>
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

      <Layout style={{ backgroundColor: "transparent", marginLeft: "14vw" }}>
        <Content
          style={{
            padding: "0 48px",
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "transparent",
          }}
        >
          <div style={{ padding: 20, position: "relative" }}>
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <h2 style={{ color: "#1c5cb6ff", fontWeight: "bold", margin: 0 }}>
                {selectedKey === "1" && "Dashboard"}
                {selectedKey === "2" && "Drugbank"}
                {selectedKey === "3" && "History"}
                {selectedKey === "4" && "Patients"}
                {selectedKey === "5" && "DDIs check"}
              </h2>

              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <Badge size="small">
                  <img
                    src={userMailNoti}
                    alt="mail"
                    style={{ width: 24, cursor: "pointer" }}
                  />
                </Badge>
                <Badge size="small">
                  <img
                    src={userNoti}
                    alt="noti"
                    style={{ width: 24, cursor: "pointer" }}
                  />
                </Badge>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={accountInfo.avatar}
                    size={40}
                    style={{ marginRight: "10px" }}
                  />
                  <div>
                    <div style={{ fontWeight: "bold", color: "#333" }}>
                      {accountInfo.name}
                    </div>
                    <div style={{ fontSize: "12px", color: "#666" }}>
                      {accountInfo.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              height: "100%",
              width: "100%",
              padding: "0",
              borderRadius: 20,
            }}
          >
            {selectedKey === "2" && <DrugListScene />}
            {selectedKey === "5" && <DrugInteractionChecker />}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
