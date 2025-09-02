import type React from "react";
import { useState } from "react";
import { Breadcrumb, Layout, Menu } from "antd";
const { Content } = Layout;
import Logo from "../../assets/AIDrugCare.png";
import Sider from "antd/es/layout/Sider";
import Back from "../../assets/back.png";
import PatientHistory from "../PatientHistory/PatientHistory";
import PatientColInfor from "./PatientColInfor";
import "./PatientScene.css";
import PatientCardCount from "./PatientCardCount";
import PatientHistoryMost from "./PatientHistoryLast";
import PatientCardInfor from "./PatientCardInfor";


import dashLogo from "../../assets/dashboard.png";
import dashLogo2 from "../../assets/dashboard2.png";
import hisLogo from "../../assets/history.png";
import hisLogo2 from "../../assets/history2.png";
import setLogo from "../../assets/setting.png";
import setLogo2 from "../../assets/setting2.png";
import logLogo from "../../assets/logout.png";
import logLogo2 from "../../assets/logout2.png";

export default function PatientScene() {
  const [selectedKey, setSelectedKey] = useState("1");

  const makeItem = (key: string, label: string, icon: string, activeIcon: string) => ({
    key,
    label,
    icon: (
      <img
        src={selectedKey === key ? activeIcon : icon}
        alt={label}
        style={{ width: 20, height: 20, marginLeft : "30px", }}
      />
    ),
  });

  const menuItems = [
    makeItem("1", "Trang chủ", dashLogo2, dashLogo),
    makeItem("2", "Lịch sử", hisLogo2, hisLogo),
    makeItem("3", "Cài đặt", setLogo2, setLogo),
  ];

  const logoutItem = makeItem("4", "Đăng xuất", logLogo2, logLogo);

  return (
    <Layout
      className="layout"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundImage: `url(${Back})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Sider
        style={{
          backgroundColor: "rgba(255,255,255,0.7)",
          borderRadius: "0px 20px 20px 20px",
          width: "170px",
        }}
      >
        <div
          className="logo"
          style={{
            marginRight: "10px",
            padding: "2px",
          }}
        >
          <img src={Logo} alt="Logo" style={{ width: "100%" }} />
        </div>

        <Menu
          className="menu"
          mode="vertical"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => setSelectedKey(key)}
          items={menuItems}
          style={{
            flex: 1,
            minWidth: 0,
            marginTop: "110px",
            backgroundColor: "transparent",
            textAlign: "left",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        />

        <div style={{ marginTop: "auto", width: "100%" }}>
          <Menu
            className="menu"
            mode="vertical"
            selectedKeys={[]}
            items={[logoutItem]}
            onClick={() => console.log("Logout clicked")}
            style={{
              width: "100%",
              position: "absolute",
              bottom: "0px",
              backgroundColor: "transparent",
              textAlign: "left",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          />
        </div>
      </Sider>

      <Layout style={{ backgroundColor: "transparent" }}>
        <Content
          style={{
            padding: "0 3vw",
            backgroundColor: "transparent",
          }}
        >
          <Breadcrumb
            style={{
              margin: "26px 0",
              fontSize: "20px",
              fontWeight: "bold",
              color: "#043bb3",
            }}
            items={
              selectedKey === "1"
                ? [{ title: "TRANG CHỦ" }]
                : [
                { title: "TRANG CHỦ" },
                {
                  title:
                  menuItems.find((item) => item.key === selectedKey)?.label || "...",
                },
              ]
            }
          />
          <div>
            {selectedKey === "2" && <PatientHistory />}
          </div>
            <div >
              {selectedKey === "1" && (
            <>
              <div style={{ position: "fixed", top: "0px", right: "0px" }}>
                <PatientColInfor />
              </div>
              <PatientCardCount />
              <PatientHistoryMost/>
            </>
            )}
          </div>
        </Content>
        <div className="profile-footer">
            Bệnh viện đa khoa A
        </div>
        <div style = {{position : "fixed", top : 0, right: 0}}>
          <PatientCardInfor></PatientCardInfor>
        </div>
      </Layout>
      
    </Layout>
  );
}
