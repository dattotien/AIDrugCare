import { Button, Card, Checkbox, Input, message } from "antd";
import login_back from "../../assets/test.png";
import { RightCircleOutlined, CaretRightOutlined } from "@ant-design/icons";
import styles from "./PatientLoginScene.module.css";
import PatientScene from "../PatientScene/PatientScene";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientLoginScene() {
  const [cccd, setCccd] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!cccd || !password) {
      message.error("Vui lòng nhập CCCD và mật khẩu");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/login-patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ cccd, password }).toString(),
      });
      const data = await res.json();
      console.log("Login response:", data);

      if (data.success && data.data) {
        console.log("data.data:", data.data._id);

        localStorage.setItem("patientId", data.data._id);
        console.log("Saved patientId:", localStorage.getItem("patientId"));

        navigate("/patient/dashboard");
      } else {
        message.error("CCCD hoặc mật khẩu không đúng");
      }
    } catch (err) {
      console.error("Lỗi kết nối server:", err);
      message.error("Lỗi kết nối server");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundImage: `url(${login_back})`,
        backgroundSize: "cover",
        backgroundPosition: "center 20%",
        backgroundRepeat: "no-repeat",
        minWidth: "100vw",
      }}
    >
      <div
        style={{
          width: "50vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "end",
            height: "6vh",
          }}
        >
          <p className={styles.uet}>UET - AISPARK</p>
          <div className={styles.bar}></div>
        </div>
        <div style={{ marginLeft: "10.5vw", marginRight: "10.5vw" }}>
          <p className={styles.t1}>
            WELCOME <span style={{ color: "#043BB3" }}>TO OUR</span>
          </p>
          <p className={styles.t1}>SERVICES</p>
          <p className={styles.intro}>
            Our hospital is a modern healthcare center committed to providing
            high-quality medical services. With advanced facilities and
            experienced doctors, we ensure safe, effective, and comprehensive
            care for all patients.{" "}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              color: "#043BB3",
            }}
          >
            <p style={{ fontWeight: "bold", fontStyle: "italic" }}>
              "Care for life, every step of the way"
            </p>
          </div>
        </div>

        <div>
          <Button className={styles.button1} onClick={() => navigate("/")}>
            <span
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <span>MORE ABOUT US</span>
              <RightCircleOutlined style={{ fontSize: "20px" }} />
            </span>
          </Button>

          <Button className={styles.button2} onClick={() => navigate("/")}>
            <span
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <span>WATCH NOW</span>
              <CaretRightOutlined style={{ fontSize: "20px" }} />
            </span>
          </Button>
        </div>
      </div>

      <div style={{ width: "50vw", height: "100vh" }}>
        <Card className={styles.card}>
          <h2 className={styles.title}>TRY TO SIGN IN</h2>
          <p></p>
          <p className={styles.text}>Tên đăng nhập</p>
          <Input
            className={styles.input}
            value={cccd}
            onChange={(e) => setCccd(e.target.value)}
          />
          <p className={styles.text}>Mật khẩu</p>
          <Input.Password
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div style={{ marginTop: "2vh", marginLeft: "1vw" }}>
            <Checkbox style={{ color: "#043BB3" }}>Nhớ mật khẩu</Checkbox>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              className={styles.button}
              loading={loading}
              onClick={handleLogin}
            >
              LOGIN
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
