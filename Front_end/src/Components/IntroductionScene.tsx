import { Layout, Menu, Button, Card, Row, Col, Typography } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

function IntroductionScene() {
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "space",
          alignItems: "center",
          background: "#fff",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            color: "#043BB3",
            marginRight: "8px",
          }}
        >
          AI
        </div>
        <div style={{ fontWeight: "bold", fontSize: "20px" }}>Drug Care</div>
      </Header>

      <Content
        style={{
          padding: "60px",
          textAlign: "center",
          background: "linear-gradient(90deg,#e6f0ff,#fff)",
        }}
      >
        <Title level={1}>Caring for Life, Every Step of the Way.</Title>
        <Paragraph
          style={{ fontSize: "16px", maxWidth: "700px", margin: "0 auto" }}
        >
          At UETSpark-AI Hospital, we are committed to providing comprehensive
          healthcare services with the perfect balance of advanced medical
          technology and compassionate care.
        </Paragraph>
        <div style={{ marginTop: "20px" }}>
          <Button type="primary" style={{ marginRight: "10px" }}>
            Login as a Doctor
          </Button>
          <Button>Login as a Patient</Button>
        </div>
      </Content>

      <Content style={{ padding: "40px" }}>
        <Row gutter={24} justify="center">
          <Col span={6}>
            <Card title="Compassionate & Professional Care" bordered={false}>
              <Paragraph>
                We provide patient-centered healthcare with empathy, respect,
                and professionalism.
              </Paragraph>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              title="Modern Facilities & Innovative Solutions"
              bordered={false}
            >
              <Paragraph>
                With advanced technology and modern facilities, we deliver
                accurate diagnoses and effective treatment.
              </Paragraph>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Your Health Journey, Our Commitment" bordered={false}>
              <Paragraph>
                Our dedicated team supports you at every stage, from checkups to
                specialized care.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Content>

      {/* Doctor Banner Section */}
      <Content
        style={{
          padding: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          background: "#f0f5ff",
        }}
      >
        <img
          src="https://via.placeholder.com/250x300"
          alt="Doctor"
          style={{ borderRadius: "10px" }}
        />
        <div style={{ maxWidth: "500px" }}>
          <Title level={2}>Your Best Healthcare Experience Awaits</Title>
          <Paragraph>
            At our hospital, we combine modern facilities with a team of
            dedicated professionals to deliver safe, accurate, and compassionate
            care.
          </Paragraph>
        </div>
      </Content>
    </Layout>
  );
}

export default IntroductionScene;
