import { useMemo, useState, useEffect } from "react";
import {
  Row,
  Col,
  Table,
  Input,
  Button,
  Card,
  Space,
  Typography,
  Dropdown,
  AutoComplete,
} from "antd";
import { MoreOutlined } from "@ant-design/icons";
import axios from "axios";
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
  const [showPrescription, setShowPrescription] = useState(false);
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [labResult, setLabResult] = useState<string>("");
  const [doctorName, setDoctorName] = useState<string>("");
  const [doctorwork, setDoctorWork] = useState<string>("");
  const [patientHistory, setPatientHistory] = useState<string>("");

  useEffect(() => {
    const storedDoctorId = localStorage.getItem("doctorId");
    const doctorId = storedDoctorId ? Number(storedDoctorId) : null;
    if (!doctorId) return;

    const fetchDoctor = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/doctor-profile/${doctorId}`);
        const json = await res.json();
        if (json.success && json.data?.name) {
          setDoctorName(json.data.name);
          setDoctorWork(json.data.workplace);
        }
      } catch (err) {
        console.error("Error fetching doctor:", err);
      }
    };
    fetchDoctor();
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/doctor-visit-history/${patient.id}`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const mapped = json.data.map((v: any) => {
            const historyParts = [v.chronic, v.surg, v.fam_hist].filter(
              (item) =>
                item && item.trim() !== "" && item.trim().toLowerCase() !== "không có"
            );
            return {
              id: v.visit,
              doctor_name: v.doctor || "Không rõ",
              result: v.conclusion || "Chưa có",
              labResult: v.lab_result || "Chưa có",
              date: v.visit_date,
              history: historyParts.length > 0 ? historyParts.join(", ") : "Không có",
            };
          });
          setHistoryData(mapped);
          if (mapped.length > 0) {
            setLabResult(mapped[0].labResult);
            setPatientHistory(mapped[0].history);
          }
        }
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };
    fetchHistory();
  }, [patient.id]);

  const historyColumns = [
    { title: "ID", dataIndex: "id", key: "id", width: 100 },
    { title: "Bác sĩ", dataIndex: "doctor_name", key: "doctor_name" },
    { title: "Kết luận", dataIndex: "result", key: "result" },
    { title: "Ngày tạo", dataIndex: "date", key: "date", width: 140 },
  ];

  // ---- đơn thuốc ----
  const [drugs, setDrugs] = useState<DrugRow[]>([]);

  const removeDrug = (id: string) => {
    setDrugs((prev) => prev.filter((d) => d.id !== id));
  };

  const drugColumns = [
    { title: "ID", dataIndex: "id", key: "id", width: 110 },
    { title: "Tên thuốc", dataIndex: "name", key: "name" },
    { title: "Liều dùng", dataIndex: "dose", key: "dose", width: 150 },
    { title: "Thời gian", dataIndex: "time", key: "time", width: 140 },
    { title: "Yêu cầu", dataIndex: "note", key: "note" },
    {
      title: "",
      key: "actions",
      render: (_: any, record: DrugRow) => {
        const items = [
          {
            key: "delete",
            label: "Xóa",
            danger: true,
            onClick: () => removeDrug(record.id),
          },
        ];
        return (
          <Dropdown menu={{ items }}>
            <MoreOutlined style={{ cursor: "pointer" }} />
          </Dropdown>
        );
      },
    },
  ];

  // ---- form thêm thuốc ----
  const [formName, setFormName] = useState("");
  const [formDose, setFormDose] = useState("");
  const [formTime, setFormTime] = useState("");
  const [formNote, setFormNote] = useState("");

  // gợi ý từ drugbank
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [loadingDrugs, setLoadingDrugs] = useState(false);

  const fetchDrugSuggestions = async (query: string) => {
    if (!query) {
      setOptions([]);
      return;
    }
    setLoadingDrugs(true);
    try {
      const res = await axios.get("http://localhost:8000/drugs");
      if (res.data.success && Array.isArray(res.data.data)) {
        const list = res.data.data as any[];
        const filtered = list
          .filter((d) => d.generic_name?.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 10)
          .map((d) => ({ value: d.generic_name }));
        setOptions(filtered);
      } else {
        setOptions([]);
      }
    } catch (err) {
      console.error("Lỗi fetch drug suggestions", err);
      setOptions([]);
    } finally {
      setLoadingDrugs(false);
    }
  };

  const addDrug = async () => {
    if (!formName.trim()) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/search?name=${encodeURIComponent(formName)}`);
      const json = await res.json();

      if (json.success && json.data.length > 0) {
        const drug = json.data[0]; 
        const next: DrugRow = {
          id: drug._id,   
          name: drug.generic_name,    
          dose: formDose.trim() || "1 viên / ngày",
          time: formTime.trim() || "Sáng",
          note: formNote.trim() || "Không có",
        };

        setDrugs((d) => [...d, next]);
        setFormName("");
        setFormDose("");
        setFormTime("");
        setFormNote("");
      } else {
        alert("Không tìm thấy thuốc trong cơ sở dữ liệu!");
      }
    } catch (err) {
      console.error("Lỗi khi tìm thuốc:", err);
      alert("Lỗi khi gọi API search thuốc!");
    }
  };

  const todayVN = useMemo(() => {
    const d = new Date();
    return `Ngày ${d.getDate()} tháng ${d.getMonth() + 1} năm ${d.getFullYear()}`;
  }, []);

  return (
    <div className="visit-panel">
      {/* Header */}
      <div className="visit-header">
        <div className="hospital-title">
          <Title level={4}>{doctorwork}</Title>
          <div>
            <Text>Email: nguyena@gmail.com</Text>
            <br />
            <Text>Hotline: 0978349285 / 0978349285</Text>
          </div>
        </div>
        <div className="date-right">
          <Text>Hà Nội, {todayVN}</Text>
        </div>
      </div>

      <Title level={4} className="visit-main-title">
        KÊ ĐƠN KHÁM BỆNH
      </Title>

      {/* Thông tin bệnh nhân */}
      <Card bordered className="patient-card">
        <Row gutter={[16, 8]}>
          <Col span={12}>
            <Text>
              <b>Họ và tên:</b> {patient.name}
            </Text>
          </Col>
          <Col span={6}>
            <Text>
              <b>Giới tính:</b> {patient.gender}
            </Text>
          </Col>
          <Col span={6}>
            <Text>
              <b>SĐT:</b> {patient.phone}
            </Text>
          </Col>
        </Row>
        <Row gutter={[16, 8]} style={{ marginTop: 8 }}>
          <Col span={12}>
            <Text>
              <b>Ngày sinh:</b> {patient.dob}
            </Text>
          </Col>
          <Col span={12}>
            <Text>
              <b>CCCD:</b> {patient.cccd}
            </Text>
          </Col>
        </Row>
        <Row style={{ marginTop: 8 }}>
          <Col span={24}>
            <Text>
              <b>Kết quả xét nghiệm:</b> {labResult}
            </Text>
          </Col>
        </Row>
      </Card>

      {/* Lịch sử khám */}
      <div className="history-header">
        <Text style={{ fontWeight: 600 }}>Lịch sử khám bệnh :</Text>
      </div>
      <Card bordered className="history-card">
        <Table
          columns={historyColumns}
          dataSource={historyData}
          size="small"
          pagination={false}
          rowKey="id"
        />
      </Card>

      {/* Chuẩn đoán + tiền sử */}
      <Card bordered className="bottom-card">
        <Row gutter={16}>
          {/* Trái */}
          <Col xs={24} lg={16}>
            <div className="diagnosis-box">
              <Text style={{ fontWeight: 600 }}>Chuẩn đoán:</Text>
              <Input.TextArea
                rows={4}
                placeholder="Nhập thông tin tại đây"
                className="input-radius"
              />
              <div className="btn-row">
                <Button type="primary">Ghi nhận</Button>
                <Button type="primary" onClick={() => setShowPrescription(true)}>
                  Kê đơn
                </Button>
              </div>
            </div>

            {/* Đơn thuốc */}
            {showPrescription && (
              <>
                <div className="prescription-title">
                  <Title level={4}>ĐƠN THUỐC</Title>
                </div>
                <Row justify="space-between" className="prescription-meta">
                  <Col>
                    <Space direction="vertical" size={0}>
                      <Text>
                        <b>Mã đơn thuốc:</b> ANC8124
                      </Text>
                      <Text>
                        <b>Bác sĩ:</b> {doctorName}
                      </Text>
                    </Space>
                  </Col>
                  <Col>
                    <Text>
                      <b>Ngày tạo: </b>
                      {todayVN}
                    </Text>
                  </Col>
                </Row>

                <Card className="drug-table-wrapper">
                  <Card className="drug-table-card">
                    <Table
                      columns={drugColumns}
                      dataSource={drugs}
                      size="small"
                      pagination={false}
                      rowKey="id"
                    />
                  </Card>
                </Card>

                <div className="btn-row">
                  <Button type="primary">Ghi nhận</Button>
                  <Button type="primary" danger onClick={() => setShowDDIs(true)}>
                    Tương tác thuốc
                  </Button>
                </div>
              </>
            )}
          </Col>

          {/* Phải */}
          <Col xs={24} lg={8}>
            <Card bordered className="right-panel">
              <Space direction="vertical" size={12} style={{ width: "100%" }}>
                <div>
                  <Text style={{ fontWeight: 600 }}>Tiền sử:</Text>
                  <div
                    style={{
                      width: "16vw",
                      height: "20vh",
                      overflowY: "auto",
                      overflowWrap: "break-word",
                      border: "1px solid #d9d9d9",
                      borderRadius: "10px",
                    }}
                  >
                    <p style={{ margin: 0, fontSize: "12px", color: "#737373" }}>
                      {patientHistory}
                    </p>
                  </div>
                </div>

                {/* Form thêm thuốc */}
                {showPrescription && (
                  <div>
                    <Text style={{ fontWeight: 600 }}>Thêm thuốc vào kê đơn</Text>
                    <Space direction="vertical" size={8} style={{ width: "100%" }}>
                      <AutoComplete
                        options={options}
                        value={formName}
                        onChange={(value) => setFormName(value)}
                        onSearch={fetchDrugSuggestions}
                        placeholder="Tên thuốc (DrugBank)"
                        style={{ width: "100%" }}
                        notFoundContent={loadingDrugs ? "Đang tải..." : "Không có kết quả"}
                      />
                      <Input
                        placeholder="Liều dùng"
                        value={formDose}
                        onChange={(e) => setFormDose(e.target.value)}
                      />
                      <Input
                        placeholder="Thời gian dùng thuốc"
                        value={formTime}
                        onChange={(e) => setFormTime(e.target.value)}
                      />
                      <Input.TextArea
                        rows={3}
                        placeholder="Yêu cầu"
                        value={formNote}
                        onChange={(e) => setFormNote(e.target.value)}
                      />
                      <div className="btn-right">
                        <Button type="primary" onClick={addDrug}>
                          Ghi nhận
                        </Button>
                      </div>
                    </Space>
                  </div>
                )}
              </Space>
            </Card>
          </Col>
        </Row>
      </Card>
      <DDIsVisit open={showDDIs} onClose={()  => setShowDDIs(false)} drugs={drugs} />
    </div>
  );
}
