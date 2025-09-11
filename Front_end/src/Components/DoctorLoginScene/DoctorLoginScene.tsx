import { Button, Card, Checkbox, Input, message } from "antd";
import { useEffect, useState } from "react";
import login_back from "../../assets/test.png";
import { RightCircleOutlined, CaretRightOutlined } from "@ant-design/icons";
import styles from "./DoctorLoginScene.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DoctorLoginScene() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleOnLogin = async () => {
    try {
      const result = await axios.post(
        "http://localhost:8000/login-doctor",
        null,
        {
          params: {
            email: username,
            password: password,
          },
        }
      );
      if (result.data.success) {
        const doctorId = result.data.data._id;
        console.log("Saving doctorId to localStorage:", doctorId);
        localStorage.setItem("doctorId", String(doctorId));
        message.success("Đăng nhập thành công");
        navigate("/doctor/dashboard", { replace: true });
      } else {
        message.error(result.data.message || "Đăng nhập thất bại");
      }
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
      message.error("Đã có lỗi xảy ra, vui lòng thử lại");
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
            CHÀO MỪNG ĐẾN VỚI{" "}
            <span style={{ color: "#043BB3" }}>AIDRUGCARE</span>
          </p>

          <p className={styles.intro}>
            Hệ thống quản lý khám chữa bệnh, phục vụ bác sĩ, bệnh nhân trong quá
            trình khám chữa bệnh an toàn, kê đơn thuốc, kiểm tra tương tác
            thuốc, góp phần xây dựng một nền y tế thông minh, an toàn, tiện ích
            cho cộng đồng.
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
              "Chăm sóc sức khỏe, trên mỗi bước đường"
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
          <h2 className={styles.title}>ĐĂNG NHẬP</h2>
          <p></p>
          <p className={styles.text}>Tên đăng nhập</p>
          <Input
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            <Button className={styles.button} onClick={handleOnLogin}>
              LOGIN
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
