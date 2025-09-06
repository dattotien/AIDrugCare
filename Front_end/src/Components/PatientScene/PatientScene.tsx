import { useState, useEffect } from "react";
import { Breadcrumb, Layout, Menu, Spin } from "antd";
const { Content } = Layout;
import Logo from "../../assets/AIDrugCare.png";
import Sider from "antd/es/layout/Sider";
import Back from "../../assets/back.png";
import PatientHistory from "../PatientHistory/PatientHistory";
import PatientColInfor from "./PatientColInfor";
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
import axios from "axios";

export default function PatientScene() {
  const [selectedKey, setSelectedKey] = useState("1");
    const [data, setData] = useState({
    profile: null,
    totalVisits: 0,
    latestVisitDay: null,
    nextVisitDay: null,
    threeLatestRes: []
  });
  const [loading, setLoading] = useState(true);

  const patientId = localStorage.getItem("patientId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          profileRes,
          totalVisitsRes,
          latestVisitRes,
          nextVisitRes,
          threeLatestRes
        ] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/patient-profile/${patientId}`),
          axios.get(`http://127.0.0.1:8000/total-visits/${patientId}`),
          axios.get(`http://127.0.0.1:8000/latest-visit-day/${patientId}`),
          axios.get(`http://127.0.0.1:8000/next-visit-day/${patientId}`),
          axios.get(`http://127.0.0.1:8000/three-latest-visits/${patientId}`)
        ]);

        setData({
          profile: profileRes.data.data,
          totalVisits: totalVisitsRes.data.data,
          latestVisitDay: latestVisitRes.data.data,
          nextVisitDay: nextVisitRes.data.data,
          threeLatestRes:  threeLatestRes.data.data
        });

      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [patientId]);
  const makeItem = (key: string, label: string, icon: string, activeIcon: string) => ({
    key,
    label,
    icon: <img src={selectedKey === key ? activeIcon : icon} alt={label} style={{ width: 20, height: 20, marginLeft: 30 }} />,
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
        <div className="logo" style={{ marginRight: 10, padding: 2 }}>
          <img src={Logo} alt="Logo" style={{ position: "fixed", width: 100, height: 70, marginTop: 20, marginLeft: 40 }} />
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
            marginTop: 240,
            backgroundColor: "transparent",
            textAlign: "left",
            fontSize: 14,
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
              bottom: 0,
              backgroundColor: "transparent",
              textAlign: "left",
              fontSize: 14,
              fontWeight: "bold",
            }}
          />
        </div>
      </Sider>

      <Layout style={{ backgroundColor: "transparent" }}>
        <Content style={{ padding: "0 3vw", backgroundColor: "transparent" }}>
          <Breadcrumb
            style={{ margin: "26px 0", fontSize: 18, fontWeight: "bold", color: "#043bb3" }}
            items={
              selectedKey === "1"
                ? [{ title: "TRANG CHỦ" }]
                : [
                    { title: "TRANG CHỦ" },
                    { title: menuItems.find((item) => item.key === selectedKey)?.label || "..." },
                  ]
            }
          />

          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
              <Spin size="large" tip="Đang tải thông tin bệnh nhân..." />
            </div>
          ) : !data.profile? (
            <p>Không tìm thấy thông tin bệnh nhân.</p>
          ) : (
            <>
              {selectedKey === "1" && (
                <>
                  <div style={{ position: "fixed", top: 0, right: 0 }}>
                    <PatientColInfor patient={data.profile} />
                  </div>
                  <PatientCardCount total= {data.totalVisits} last = {data.latestVisitDay} next = {data.nextVisitDay} />
                  <PatientHistoryMost visits = {data.threeLatestRes} />
                </> 
              )}
              {selectedKey === "2" && <PatientHistory patientId = {patientId}/>}
              <div style={{ position: "fixed", top: 0, right: 0 }}>
                <PatientCardInfor patient={data.profile} />
              </div>
            </>
          )}
        </Content>
        <div className="profile-footer">Bệnh viện đa khoa A</div>
      </Layout>
    </Layout>
  );
}
