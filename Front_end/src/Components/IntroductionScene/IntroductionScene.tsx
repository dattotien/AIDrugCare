import { Layout, Menu, Button, Card, Row, Col, Typography } from "antd";
import {
  RightOutlined,
  CaretRightOutlined,
  RightCircleOutlined,
  CheckCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Back from "../../assets/Introduction_frame.png";
import arrow from "../../assets/arrow.png";
import styles from "./IntroductionScene.module.css";
import LocationCard from "./LocationCard";
import hanoi from "../../assets/hanoi.jpg";
import danang from "../../assets/danang.jpg";
import tphcm from "../../assets/tphcm.jpg";
import thainguyen from "../../assets/thainguyen.jpg";
const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

function IntroductionScene() {
  return (
    <Layout
      style={{
        minHeight: "400vh",
        maxWidth: "100vw",
        backgroundImage: `url(${Back})`,
        backgroundSize: "cover",
        backgroundPosition: "center 12.5%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header className={styles.header}>
        <p style={{ margin: 0 }}>
          <span style={{ color: "black", fontWeight: "bold" }}>AI</span>{" "}
          <span style={{ color: "#043bb3", fontWeight: "bold" }}>
            - Drug Care
          </span>
        </p>
      </Header>

      <Content>
        <div className={styles.content1}>
          <p className={styles.care}>Caring for Life,</p>
          <p className={styles.care}>Every Step of the Way.</p>
          <p className={styles.text}>
            At UETSpark-AI Hospital, we are committed to providing comprehensive
            healthcare services with the perfect balance of advanced medical
            technology and compassionate care. Our dedicated team of doctors and
            medical staff work tirelessly to ensure safety, trust, and the best
            possible outcomes for every patient and their family.
          </p>
          <div style={{ marginTop: 20, display: "flex", gap: "16px" }}>
            <Button
              icon={<RightOutlined />}
              iconPosition="end"
              className={styles.login_doctor}
            >
              Login as a Doctor
            </Button>

            <Button
              icon={<RightOutlined />}
              iconPosition="end"
              className={styles.login_patient}
            >
              Login as a Patient
            </Button>
          </div>
          <Row className={styles.row}>
            <Col span={6}>
              <Card
                className={styles.card}
                bordered={false}
                title={
                  <span style={{ color: "#043bb3", fontWeight: "bold" }}>
                    <CheckCircleOutlined
                      style={{ color: "#043bb3", marginRight: 8 }}
                    />
                    Compassionate & Professional Care
                  </span>
                }
              >
                <Paragraph>
                  We provide patient-centered healthcare with empathy, respect,
                  and professionalism.
                </Paragraph>
              </Card>
            </Col>

            <Col span={6}>
              <Card
                className={styles.card}
                bordered={false}
                title={
                  <span style={{ color: "#043bb3", fontWeight: "bold" }}>
                    <CheckCircleOutlined
                      style={{ color: "#043bb3", marginRight: 8 }}
                    />
                    Modern Facilities & Innovative Solutions
                  </span>
                }
              >
                <Paragraph>
                  With advanced technology and modern facilities, we deliver
                  accurate diagnoses and effective treatment.
                </Paragraph>
              </Card>
            </Col>

            <Col span={6}>
              <Card
                className={styles.card}
                bordered={false}
                title={
                  <span style={{ color: "#043bb3", fontWeight: "bold" }}>
                    <CheckCircleOutlined
                      style={{ color: "#043bb3", marginRight: 8 }}
                    />
                    Your Health Journey, Our Commitment
                  </span>
                }
              >
                <Paragraph>
                  Our dedicated team supports you at every stage, from checkups
                  to specialized care.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
        <div className={styles.content2}>
          <div className={styles.content2_in}>
            <div className={styles.title}>
              <UserOutlined className={styles.icon} />
              <span>TOP GENERAL HOSPITAL, JUST FOR YOU</span>
            </div>
            <div style={{ marginLeft: "40px" }}>
              <h1>
                YOUR BEST{" "}
                <span className={styles.highlight}>HEALTHCARE EXPERIENCE</span>{" "}
                AWAITS
              </h1>
              <p>
                At our hospital, we combine modern facilities with a team of
                dedicated professionals to deliver safe, accurate, and
                compassionate care. From preventive checkups to advanced
                treatments, we are here to support your health every step of the
                way.
              </p>
            </div>
            <div style={{ display: "flex", gap: "16px", marginTop: "30px" }}>
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
        </div>
        <div className={styles.content3}>
          <div className={styles.content3_title}>
            Trải nghiệm{" "}
            <span style={{ color: "#043bb3" }}>hệ thống quản lý khám bệnh</span>
          </div>
          <div className={styles.content3_text}>
            {" "}
            Hệ thống với các tính năng ưu việt, hỗ trợ toàn diện quá trình khám
            chữa bệnh an toàn, quản lý hồ sơ bệnh án, lịch sử khám bệnh, đáp ứng
            các nhu cầu của bệnh nhân, bác sĩ tại các bệnh viện, phòng khám trên
            toàn quốc.
          </div>
          <div className={styles.content3_in}>
            <CardCustom
              title="500+"
              title2="Doctors & Medical Professionals"
              content="A highly qualified team of specialists and healthcare staff committed to excellence in patient care."
            />
            <CardCustom
              title="90%"
              title2="Treatment Success Rate"
              content="Consistently achieving positive outcomes through advanced medical techniques and personalized treatment plans."
            />
            <CardCustom
              title="4"
              title2="Healthcare Facilities"
              content="Expanding our reach with modern, well-equipped centers to provide care closer to your community."
            />
          </div>
        </div>
        <div className={styles.content4}>
          <div className={styles.content4_title}>
            <p style={{ marginBottom: "0px" }}>
              OUR{" "}
              <span style={{ color: "#043bb3", fontWeight: "bold" }}>
                HEALTHCARE <br></br>ACROSS
              </span>{" "}
              VIETNAM
            </p>
            <img
              style={{
                marginLeft: "2px",
                width: "700px",
                height: "90px",
                marginTop: "40px",
              }}
              src={arrow}
            ></img>
          </div>
          <div>
            <div className={styles.content4_in}>
              <div
                style={{
                  width: "70vw",
                  paddingLeft: "15vw",
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p className={styles.content4_text}>
                  Hệ thống AIDrugCare bước đầu được thử nghiệm trong quá trình
                  khám chữa bệnh tại các bệnh viện tại 4 tỉnh/thành phố lớn tại
                  Việt Nam
                </p>
              </div>
              <Row gutter={[0, 10]} className={styles.content4_row}>
                <Col span={10}>
                  <LocationCard
                    picture={hanoi}
                    index={1}
                    title="Hà Nội"
                    content={
                      <>
                        Bệnh viện Đại học Quốc gia Hà Nội <br />
                        Bệnh viện Bạch Mai
                      </>
                    }
                  />
                </Col>
                <Col span={10}>
                  <LocationCard
                    picture={danang}
                    index={2}
                    title="TP. Đà Nẵng"
                    content={
                      <>
                        Bệnh viện Đà Nẵng <br />
                        Bệnh viện Y học Cổ truyền thành phố Đà Nẵng
                      </>
                    }
                  />
                </Col>
                <Col span={10}>
                  <LocationCard
                    picture={tphcm}
                    index={3}
                    title="TP. Hồ Chí Minh"
                    content={
                      <>
                        Bệnh viện Chợ Rẫy <br />
                        Bệnh viện Nhi đồng 1
                      </>
                    }
                  />
                </Col>
                <Col span={10}>
                  <LocationCard
                    picture={thainguyen}
                    index={4}
                    title="Tỉnh Quảng Ninh"
                    content={
                      <>
                        Bệnh viện tỉnh Quảng Ninh <br />
                        Bệnh viện Việt Nam Thụy Điển Uông Bí
                      </>
                    }
                  />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
}

function CardCustom({
  title,
  title2,
  content,
}: {
  title: string;
  title2: string;
  content: string;
}) {
  return (
    <Card className={styles.card2}>
      <h1 style={{ margin: "0px", fontSize: "50px" }}>{title}</h1>
      <h2 style={{ margin: "0px", fontSize: "20px" }}>{title2}</h2>
      <p style={{ fontSize: "15px" }}>{content}</p>
    </Card>
  );
}

export default IntroductionScene;
