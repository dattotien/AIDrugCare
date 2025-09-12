import { useEffect, useState } from "react";
import { Breadcrumb, Layout, Menu, Spin } from "antd";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
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
import logLogo2 from "../../assets/logout2.png";

import axios from "axios";
import "./PatientScene.css";

export default function PatientScene() {
  const [data, setData] = useState<any>({
    profile: null,
    totalVisits: 0,
    latestVisitDay: null,
    nextVisitDay: null,
    threeLatestRes: [],
  });
  const [loading, setLoading] = useState(true);
  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:8000";
  const patientId = localStorage.getItem("patientId");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!patientId) {
      navigate("/patient/login", { replace: true });
    }
  }, [patientId, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!patientId) return;
      try {
        const [
          profileRes,
          totalVisitsRes,
          latestVisitRes,
          nextVisitRes,
          threeLatestRes,
        ] = await Promise.all([
          axios.get(`${API_URL}/patient-profile/${patientId}`),
          axios.get(`${API_URL}/total-visits/${patientId}`),
          axios.get(`${API_URL}/latest-visit-day/${patientId}`),
          axios.get(`${API_URL}/next-visit-day/${patientId}`),
          axios.get(`${API_URL}/three-latest-visits/${patientId}`),
        ]);

        setData({
          profile: profileRes.data.data,
          totalVisits: totalVisitsRes.data.data,
          latestVisitDay: latestVisitRes.data.data,
          nextVisitDay: nextVisitRes.data.data,
          threeLatestRes: threeLatestRes.data.data,
        });
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [patientId]);

  const getKeyFromPath = (path: string) => {
    if (path.includes("/dashboard/history")) return "2";
    if (path.includes("/dashboard/setting")) return "3";
    return "1";
  };

  const selectedKey = getKeyFromPath(location.pathname);

  const makeItem = (
    key: string,
    label: string,
    icon: string,
    activeIcon: string
  ) => ({
    key,
    label,
    icon: (
      <img
        src={selectedKey === key ? activeIcon : icon}
        alt={label}
        style={{ width: 20, height: 20, marginLeft: 30 }}
      />
    ),
  });

  const menuItems = [
    makeItem("1", "Trang chủ", dashLogo2, dashLogo),
    makeItem("2", "Lịch sử", hisLogo2, hisLogo),
    makeItem("3", "Cài đặt", setLogo2, setLogo),
  ];

  return (
    <Layout
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
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <img src={Logo} alt="Logo" style={{ width: 100, height: 70 }} />
        </div>

        <Menu
          className="menu"
          mode="vertical"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => {
            if (key === "1") navigate("/patient/dashboard");
            if (key === "2") navigate("/patient/dashboard/history");
            if (key === "3") navigate("/patient/dashboard/setting");
          }}
          items={menuItems}
          style={{
            marginTop: 150,
            backgroundColor: "transparent",
            textAlign: "left",
            fontSize: 14,
            fontWeight: "bold",
          }}
        />

        <div
          onClick={() => {
            localStorage.removeItem("patientId");
            navigate("/patient/login", { replace: true });
          }}
          style={{
            position: "absolute",
            bottom: 20,
            left: 30,
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            fontWeight: "bold",
            color: "#043bb3",
          }}
        >
          <img
            src={logLogo2}
            alt="Đăng xuất"
            style={{ width: 20, height: 20, marginRight: 10 }}
          />
          Đăng xuất
        </div>
      </Sider>

      <Layout style={{ backgroundColor: "transparent" }}>
        <Content style={{ padding: "0 3vw" }}>
          <Breadcrumb
            style={{
              margin: "26px 0",
              fontSize: 18,
              fontWeight: "bold",
              color: "#043bb3",
            }}
            items={
              selectedKey === "1"
                ? [{ title: "TRANG CHỦ" }]
                : selectedKey === "2"
                ? [{ title: "LỊCH SỬ" }]
                : selectedKey === "3"
                ? [{ title: "CÀI ĐẶT" }]
                : [{ title: "TRANG CHỦ" }]
            }
          />

          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 100,
              }}
            >
              <Spin size="large" tip="Đang tải thông tin bệnh nhân..." />
            </div>
          ) : !data.profile ? (
            <p>Không tìm thấy thông tin bệnh nhân.</p>
          ) : (
            <>
              <Routes>
                <Route
                  path=""
                  element={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "2vw",
                      }}
                    >
                      <div style={{ flex: 3 }}>
                        <PatientCardCount
                          total={data.totalVisits}
                          last={data.latestVisitDay}
                          next={data.nextVisitDay}
                        />
                        <PatientHistoryMost visits={data.threeLatestRes} />
                      </div>
                      <div
                        style={{
                          flex: 1,
                          position: "absolute",
                          top: 0,
                          right: 0,
                        }}
                      >
                        <PatientColInfor patient={data.profile} />
                      </div>
                    </div>
                  }
                />
                <Route
                  path="history"
                  element={<PatientHistory patientId={patientId} />}
                />
                <Route path="setting" element={<p>Cài đặt</p>} />
              </Routes>

              <div style={{ position: "fixed", top: 0, right: "2vw" }}>
                <PatientCardInfor patient={data.profile} />
              </div>
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
