import { useMemo, useState } from "react";
import { Row, Col, Table, Input, Button, Card, Space, Typography } from "antd";
import DDIsVisit from "./DDIs_visit";
import "./VisitInfor.css";

const { Title, Text } = Typography;

interface VisitInforProps {
  onBack: () => void;
  patient: any;
}

type DrugRow = { id: string; name: string; dose: string; time: string; note: string };

export default function VisitInfor({ onBack, patient }: VisitInforProps) {
  if (!patient) return null;

  const [showDDIs, setShowDDIs] = useState(false);

  // ---- data mẫu ----
  const historyColumns = [
    { title: "ID", dataIndex: "id", key: "id", width: 100 },
    { title: "Bác sĩ", dataIndex: "doctor", key: "doctor" },
    { title: "Kết luận", dataIndex: "result", key: "result" },
    { title: "Ngày tạo", dataIndex: "date", key: "date", width: 140 },
  ];

  const historyData = [
    { id: "10000", doctor: "Nguyễn Thị Ngọc Huyền", result: "Đau dạ dày cấp 2", date: "23/5/2025" },
    { id: "10001", doctor: "Nguyễn Văn A", result: "Viêm họng", date: "12/6/2025" },
    { id: "10002", doctor: "Nguyễn Văn B", result: "Viêm xoang", date: "20/6/2025" },
  ];

  const [drugs, setDrugs] = useState<DrugRow[]>([
    { id: "DB10004", name: "Aspirin", dose: "2 viên / ngày", time: "Sáng - tối", note: "Không có" },
    { id: "DB10005", name: "Paracetamol", dose: "1 viên / ngày", time: "Trưa", note: "Không uống khi đói" },
    { id: "DB10004", name: "Aspirin", dose: "2 viên / ngày", time: "Sáng - tối", note: "Không có" },
    { id: "DB10005", name: "Paracetamol", dose: "1 viên / ngày", time: "Trưa", note: "Không uống khi đói" },
    { id: "DB10004", name: "Aspirin", dose: "2 viên / ngày", time: "Sáng - tối", note: "Không có" },
    { id: "DB10005", name: "Paracetamol", dose: "1 viên / ngày", time: "Trưa", note: "Không uống khi đói" },
  ]);

  const drugColumns = [
    { title: "ID", dataIndex: "id", key: "id", width: 110 },
    { title: "Tên thuốc", dataIndex: "name", key: "name" },
    { title: "Liều dùng", dataIndex: "dose", key: "dose", width: 150 },
    { title: "Thời gian", dataIndex: "time", key: "time", width: 140 },
    { title: "Yêu cầu", dataIndex: "note", key: "note" },
  ];

  // ---- form thêm thuốc ----
  const [formName, setFormName] = useState("");
  const [formDose, setFormDose] = useState("");
  const [formTime, setFormTime] = useState("");
  const [formNote, setFormNote] = useState("");

  const addDrug = () => {
    if (!formName.trim()) return;
    const next: DrugRow = {
      id: "DB" + (10000 + drugs.length + 1).toString(),
      name: formName.trim(),
      dose: formDose.trim() || "1 viên / ngày",
      time: formTime.trim() || "Sáng",
      note: formNote.trim() || "Không có",
    };
    setDrugs((d) => [...d, next]);
    setFormName("");
    setFormDose("");
    setFormTime("");
    setFormNote("");
  };

  // ---- tiện ích hiển thị ngày ----
  const todayVN = useMemo(() => {
    const d = new Date();
    return `Hà Nội, ngày ${d.getDate()} tháng ${d.getMonth() + 1} năm ${d.getFullYear()}`;
  }, []);

  return (
    <div className="visit-panel">
      {/* ===== HEADER bệnh viện ===== */}
      <div className="visit-header">
        <div className="hospital-title">
          <Title level={4}>BỆNH VIỆN ĐA KHOA A - CƠ SỞ 4</Title>
          <div>
            <Text>Email: nguyena@gmail.com</Text><br />
            <Text>Hotline: 0978349285 / 0978349285</Text>
          </div>
        </div>
        <div className="date-right">
          <Text>{todayVN}</Text>
        </div>
      </div>

      <Title level={4} className="visit-main-title">KÊ ĐƠN KHÁM BỆNH</Title>

      {/* ===== Thông tin bệnh nhân ===== */} 
      <Card bordered className="patient-card">
        <Row gutter={[16, 8]}>
          <Col span={12}><Text><b>Họ và tên:</b> {patient.name}</Text></Col>
          <Col span={6}><Text><b>Giới tính:</b> {patient.gender}</Text></Col>
          <Col span={6}><Text><b>SĐT:</b> 0978349285</Text></Col>
        </Row>
        <Row gutter={[16, 8]} style={{ marginTop: 8 }}>
          <Col span={12}><Text><b>Ngày sinh:</b> {patient.dob}</Text></Col>
          <Col span={12}><Text><b>CCCD:</b> 0203405007654</Text></Col>
        </Row>
        <Row style={{ marginTop: 8 }}>
          <Col span={24}><Text><b>Kết quả xét nghiệm:</b> {patient.symptoms}</Text></Col>
        </Row>
      </Card>

      {/* ===== Lịch sử khám ===== */}
      <div className="history-header">
        <Text style={{ fontWeight: 600 }}>Lịch sử khám bệnh :</Text>
        <div style={{ flex: 1 }} />
        <Button type="primary" className="history-btn">Hiện lịch sử</Button>
      </div>

      <Card bordered className="history-card">
        <Table
          columns={historyColumns}
          dataSource={historyData}
          size="small"
          pagination={false}
          rowKey="id"
          scroll={{
            y: historyData.length > 3 ? 3 * 48 : undefined, 
            x: 200, 
          }}
        />
      </Card>

      {/* ===== Khối 2 cột dưới ===== */}
      <Card bordered className="bottom-card">
        <Row gutter={16}>
          {/* ---- Cột trái ---- */}
          <Col xs={24} lg={16}>
            <div className="diagnosis-box">
              <Text style={{ fontWeight: 600 }}>Chuẩn đoán:</Text>
              <Input.TextArea rows={4} placeholder="Nhập thông tin tại đây" className="input-radius" />
              <div className="btn-row">
                <Button type="primary">Ghi nhận</Button>
                <Button type="primary">Kê đơn</Button>
              </div>
            </div>

            <div className="prescription-title">
              <Title level={4}>ĐƠN THUỐC</Title>
            </div>
            <Row justify="space-between" className="prescription-meta">
              <Col>
                <Space direction="vertical" size={0}>
                  <Text><b>Mã đơn thuốc:</b> ANC8124</Text>
                  <Text><b>Bác sĩ:</b> Nguyễn Thị Ngọc Yến</Text>
                </Space>
              </Col>
              <Col><Text><b>Ngày tạo:</b> 28 - 8 - 2025</Text></Col>
            </Row>

            <Card className="drug-table-wrapper">
              <Card className="drug-table-card">
                <Table
                  columns={drugColumns}
                  dataSource={drugs}
                  size="small"
                  pagination={false}
                  rowKey="id"
                  scroll={{
                    y: drugs.length > 4 ? 4 * 48 : undefined, 
                    x: 200, 
                  }}
                />
              </Card>
            </Card>

            <div className="btn-row">
              <Button type="primary">Ghi nhận</Button>
              <Button type="primary" danger onClick={() => setShowDDIs(true)}>Tương tác thuốc</Button>
            </div>
          </Col>

          {/* ---- Cột phải ---- */}
          <Col xs={24} lg={8}>
            <Card bordered className="right-panel">
              <Space direction="vertical" size={12} style={{ width: "100%" }}>
                <div>
                  <Text style={{ fontWeight: 600 }}>Tiền sử:</Text>
                  <Input.TextArea
                    rows={6}
                    placeholder="VD: Bệnh nhân có tiền sử tiểu đường, dị ứng..."
                    className="input-radius"
                  />
                </div>

                <Input.Search placeholder="Tìm thuốc tại đây" allowClear />

                <div>
                  <Text style={{ fontWeight: 600 }}>Thêm thuốc vào kê đơn</Text>
                  <Space direction="vertical" size={8} style={{ width: "100%" }}>
                    <Input placeholder="Tên thuốc" value={formName} onChange={(e) => setFormName(e.target.value)} />
                    <Input placeholder="Liều dùng" value={formDose} onChange={(e) => setFormDose(e.target.value)} />
                    <Input placeholder="Thời gian dùng thuốc" value={formTime} onChange={(e) => setFormTime(e.target.value)} />
                    <Input.TextArea rows={3} placeholder="Yêu cầu" value={formNote} onChange={(e) => setFormNote(e.target.value)} />
                    <div className="btn-right">
                      <Button type="primary" onClick={addDrug}>Ghi nhận</Button>
                    </div>
                  </Space>
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
      </Card>
      <DDIsVisit open={showDDIs} onClose={() => setShowDDIs(false)} />
    </div>
  );
}
