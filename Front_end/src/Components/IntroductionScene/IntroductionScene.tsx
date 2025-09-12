import { Layout, Button, Card, Row, Col, Typography } from "antd";
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
const { Paragraph } = Typography;
import { useNavigate } from "react-router-dom";
import doctor from "../../assets/doctor.png";
function IntroductionScene() {
  const navigate = useNavigate();

  return (
    <Layout
      style={{
        minHeight: "400vh",
        maxWidth: "100vw",
        backgroundImage: `url(${Back})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", // không lặp lại
      }}
    >
      <Header className={styles.header}>
        <p style={{ margin: 0 }}>
          <span style={{ color: "black", fontWeight: "bold" }}>AI</span>
          <span style={{ color: "#043bb3", fontWeight: "bold" }}>DrugCare</span>
        </p>
      </Header>

      <Content>
        <div className={styles.content1}>
          <p className={styles.care}>Đồng hành trên mọi chặng đường, </p>
          <p className={styles.care}>
            khởi nguồn tương lai y tế số tại Việt Nam.
          </p>
          <p className={styles.text}>
            Với AIDrugCare, chúng tôi cam kết mang đến một giải pháp y tế số
            toàn diện, kết hợp hài hòa giữa công nghệ trí tuệ nhân tạo tiên tiến
            và sự tận tâm trong chăm sóc sức khỏe. Với nền tảng hỗ trợ ra quyết
            định lâm sàng thông minh, chúng tôi đồng hành cùng đội ngũ bác sĩ và
            nhân viên y tế trong việc đảm bảo an toàn, tin cậy và hiệu quả tối
            ưu cho mỗi bệnh nhân. AIDrugCare không chỉ giúp phát hiện và phòng
            ngừa tương tác thuốc mà còn góp phần xây dựng một nền y tế thông
            minh, nhân văn và bền vững cho cộng đồng.
          </p>
          <div style={{ marginTop: 20, display: "flex", gap: "10vw" }}>
            <Button
              icon={<RightOutlined />}
              iconPosition="end"
              className={styles.login_doctor}
              onClick={() => navigate("/doctor/login")}
            >
              Bạn là bác sĩ
            </Button>

            <Button
              icon={<RightOutlined />}
              iconPosition="end"
              className={styles.login_patient}
              onClick={() => navigate("/patient/login")}
            >
              Bạn là người dùng
            </Button>
          </div>
          <Row className={styles.row}>
            <Col span={6}>
              <Card className={styles.card}>
                <span style={{ color: "#043bb3", fontWeight: "bold" }}>
                  <CheckCircleOutlined
                    style={{ color: "#043bb3", marginRight: "0.5vw" }}
                  />
                  Quy trình thăm khám chuyên nghiệp
                </span>
                <Paragraph>
                  Chúng tôi cung cấp cho các bác sĩ một hệ thống toàn diện, đồng
                  bộ về thông tin y tế của bệnh nhân.
                </Paragraph>
              </Card>
            </Col>

            <Col span={6}>
              <Card className={styles.card} bordered={false}>
                <span style={{ color: "#043bb3", fontWeight: "bold" }}>
                  <CheckCircleOutlined
                    style={{ color: "#043bb3", marginRight: 8 }}
                  />
                  Giải pháp đột phá đồng bộ
                </span>
                <Paragraph>
                  Trong thời đại công nghệ số, chúng tôi cung cấp thượng tầng
                  cho các bệnh viện đồng bộ quy trình quản lý.
                </Paragraph>
              </Card>
            </Col>

            <Col span={6}>
              <Card className={styles.card}>
                <span style={{ color: "#043bb3", fontWeight: "bold" }}>
                  <CheckCircleOutlined
                    style={{ color: "#043bb3", marginRight: 8 }}
                  />
                  Cam kết đồng hành cùng hành trình sức khỏe
                </span>
                <Paragraph>Dõi theo từng lịch sử sức khỏe của bạn</Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
        <div className={styles.content2}>
          <img src={doctor} className={styles.doctor_img}></img>
          <div className={styles.content2_in}>
            <div className={styles.title}>
              <UserOutlined className={styles.icon} />
              <span>TOP GENERAL HOSPITAL, JUST FOR YOU</span>
            </div>
            <div style={{ marginLeft: "2vw" }}>
              <h1>
                NHỮNG BỆNH VIỆN HÀNG ĐẦU DÀNH CHO BẠN{" "}
                <span className={styles.highlight}>
                  TRẢI NGHIỆM CHĂM SÓC SỨC KHỎE TỐT NHẤT
                </span>{" "}
              </h1>
              <p>
                AIDrugCare, chúng tôi kết hợp với các bệnh viện hàng đầu tại
                Việt Nam cùng với đội ngũ bác sĩ chuyên nghiệp và nhiệt huyết.
                Từ việc phòng ngừa bệnh đến các phác đồ điều trị nâng cao, chúng
                tôi ở đây để đồng hành với bạn trên mọi chặng đường của cuộc
                sống.
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
              title2="Bác sĩ & các chuyên gia y tế"
              content="Được sự tin dùng, phục vụ quá trình khám chữa bệnh của bác sĩ tại các bệnh viện lớn"
            />
            <CardCustom
              title="90%"
              title2="Độ hài lòng của người dùng"
              content="Hệ thống thuận tiện, dễ sử dụng cho đa dạng các đối tượng, đạt được sự hài lòng cao"
            />
            <CardCustom
              title="8"
              title2="Bệnh viện thí điểm sử dụng"
              content="Ứng dụng trong quá trình khám chữa bệnh ở các bệnh viện lớn, chứng minh được tính tiện ích."
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
                  paddingLeft: "12vw",
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
