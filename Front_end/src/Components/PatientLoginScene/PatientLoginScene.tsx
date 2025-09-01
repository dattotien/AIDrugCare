import { Button, Card, Checkbox, Input } from "antd";
import login_back from "../../assets/test.png";
import { RightCircleOutlined, CaretRightOutlined } from "@ant-design/icons";
import styles from "./PatientLoginScene.module.css";
export default function PatientLoginScence() {
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
          <Button className={styles.button1}>
            <span
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <span>MORE ABOUT US</span>
              <RightCircleOutlined style={{ fontSize: "20px" }} />
            </span>
          </Button>

          <Button className={styles.button2}>
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
          <Input className={styles.input}></Input>
          <p className={styles.text}>Mật khẩu</p>
          <Input.Password className={styles.input}></Input.Password>
          <div style={{ marginTop: "2vh", marginLeft: "1vw" }}>
            <Checkbox style={{ color: "#043BB3" }}>Nhớ mật khẩu</Checkbox>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button className={styles.button}>LOGIN</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
