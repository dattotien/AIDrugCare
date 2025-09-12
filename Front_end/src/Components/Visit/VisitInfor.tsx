// VisitInfor.tsx
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

type DrugRow = {
  id: string;
  name: string;
  dose: string;
  time: string;
  duration: number;
  note: string;
};

export default function VisitInfor({ onBack, patient }: VisitInforProps) {
  if (!patient) return null;

  const [showDDIs, setShowDDIs] = useState(false);
  const [showPrescription, setShowPrescription] = useState(false);
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [labResult, setLabResult] = useState<string>("Chưa có");
  const [doctorName, setDoctorName] = useState<string>("");
  const [doctorwork, setDoctorWork] = useState<string>("");
  const [patientHistory, setPatientHistory] = useState<string>("Không có");
  const [prescriptionNote, setPrescriptionNote] = useState("");

  const [diagnosis, setDiagnosis] = useState("");
  const [diagnosisSaved, setDiagnosisSaved] = useState(false);
  const [editingDiagnosis, setEditingDiagnosis] = useState(false);

  const [visitId, setVisitId] = useState<number | null>(null);
  const [drugs, setDrugs] = useState<DrugRow[]>([]);

  const [formName, setFormName] = useState("");
  const [formDose, setFormDose] = useState("");
  const [formTime, setFormTime] = useState("");
  const [formDuration, setFormDuration] = useState<number | undefined>(undefined);
  const [formNote, setFormNote] = useState("");
  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:8000";
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [loadingDrugs, setLoadingDrugs] = useState(false);

  const API_BASE = `${API_URL}`;

  // ---- fetch doctor profile ----
  useEffect(() => {
    const storedDoctorId = localStorage.getItem("doctorId");
    const doctorId = storedDoctorId ? Number(storedDoctorId) : null;
    if (!doctorId) return;

    axios
      .get(`${API_BASE}/doctor-profile/${doctorId}`)
      .then((res) => {
        const json = res.data;
        if (json.success && json.data) {
          setDoctorName(json.data.name || "");
          setDoctorWork(json.data.workplace || "");
        }
      })
      .catch((err) => console.error("Error fetching doctor:", err));
  }, []);

  // ---- fetch full history ----
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${API_BASE}/doctor-visit-history/${patient.id}`);
        const json = res.data;
        console.log("👉 doctor-visit-history raw:", json);

        if (json.success && Array.isArray(json.data)) {
          const mapped = json.data.map((v: any) => {
            const historyParts = [v.chronic, v.surg, v.fam_hist].filter(
              (item: any) =>
                item && item.trim && item.trim() !== "" && item.trim().toLowerCase() !== "không có"
            );
            return {
              id: v.visit_id || v.visit,
              doctor_name: v.doctor || "Không rõ",
              result: v.conclusion || "Chưa có",
              labResult: v.lab_result || "Chưa có",
              date: v.visit_date,
              history: historyParts.length > 0 ? historyParts.join(", ") : "Không có",
            };
          });
          console.log("👉 mapped historyData:", mapped);
          setHistoryData(mapped);
        }
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };

    fetchHistory();
  }, [patient.id]);

  // ---- Try to resolve visitId ----
  const getVisitIdForCurrent = async (): Promise<number | null> => {
    const tryFields = ["visit_id", "visitId", "current_visit_id", "visit", "visitId"];
    for (const f of tryFields) {
      // @ts-ignore
      const val = patient[f];
      if (val !== undefined && val !== null && val !== "") {
        const numeric = Number(val);
        if (!Number.isNaN(numeric)) return numeric;
      }
    }

    // fallback recent-patients
    try {
      const storedDoctorId = localStorage.getItem("doctorId");
      const doctorId = storedDoctorId ? Number(storedDoctorId) : null;
      if (!doctorId) return null;

      const res = await axios.get(`${API_BASE}/recent-patients/${doctorId}`);
      const json = res.data;
      console.log("👉 recent-patients raw:", json);

      if (json.success && Array.isArray(json.data)) {
        const found = json.data.find(
          (it: any) =>
            (it.patient && (it.patient.id === patient.id || it.patient.patient_id === patient.id)) ||
            it.patient_id === patient.id ||
            it.id === patient.id
        );
        if (found) {
          console.log("👉 found patient in recent-patients:", found);
          if (found.visit_id) return Number(found.visit_id);
          if (found.visit) return Number(found.visit);
        }
      }
    } catch (err) {
      console.warn("Không lấy được visit_id từ recent-patients:", err);
    }
    return null;
  };

  useEffect(() => {
    const load = async () => {
      try {
        const id = await getVisitIdForCurrent();
        console.log("👉 Resolved visitId:", id);
        setVisitId(id);
      } catch (err) {
        console.error("Lỗi khi xác định visitId:", err);
        setVisitId(null);
      }
    };
    load();
  }, [patient]);

  // ---- fetch visit ----
  useEffect(() => {
    const fetchVisit = async () => {
      if (!visitId) return;
      try {
        const res = await axios.get(`${API_BASE}/visit/${visitId}`);
        const json = res.data;
        console.log("👉 visit raw:", json);

        if (json.success && json.data) {
          const visit = json.data;
          if (visit.diagnosis && visit.diagnosis !== "Trống") {
            setDiagnosis(visit.diagnosis);
            setDiagnosisSaved(true);
          }

          // ✅ Gọi API medical-history cho visitId
          try {
            const mhRes = await axios.get(`${API_BASE}/medical-history/${visitId}`);
            const mhJson = mhRes.data;
            console.log("👉 medical-history raw:", mhJson);

            if (mhJson.success && mhJson.data) {
              const d = mhJson.data;
              setLabResult(d.labResult || "Chưa có");

              const historyParts = [
                d.chronic_diseases,
                d.surgeries,
                d.family_history,
                d.allergies,
              ].filter(
                (item: any) =>
                  item && item.trim && item.trim() !== "" && item.trim().toLowerCase() !== "Không có"
              );
              setPatientHistory(historyParts.length > 0 ? historyParts.join(", ") : "Không có");
            }
          } catch (err) {
            console.warn("Không thể lấy medical-history:", err);
          }
        } else {
          console.warn("Visit API returned no data for id", visitId, json);
        }
      } catch (err) {
        console.error("Lỗi khi gọi API /visit/:", err);
      }
    };

    fetchVisit();
  }, [visitId]);

  const historyColumns = [
    { title: "ID", dataIndex: "id", key: "id", width: 150 },
    { title: "Bác sĩ", dataIndex: "doctor_name", key: "doctor_name", width: 250 },
    { title: "Kết luận", dataIndex: "result", key: "result" },
    { title: "Ngày tạo", dataIndex: "date", key: "date", width: 200 },
  ];

  const removeDrug = (id: string) => {
    setDrugs((prev) => prev.filter((d) => d.id !== id));
  };

  const drugColumns = [
    { title: "ID", dataIndex: "id", key: "id", width: 110 },
    { title: "Tên thuốc", dataIndex: "name", key: "name" },
    { title: "Liều dùng", dataIndex: "dose", key: "dose", width: 150 },
    { title: "Thời gian", dataIndex: "time", key: "time", width: 120 },
    { title: "Số ngày", dataIndex: "duration", key: "duration", width: 100 },
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

  const fetchDrugSuggestions = async (query: string) => {
    if (!query) {
      setOptions([]);
      return;
    }
    setLoadingDrugs(true);
    try {
      const res = await axios.get(`${API_BASE}/drugs`);
      const json = res.data;
      if (json.success && Array.isArray(json.data)) {
        const list = json.data as any[];
        const lowerQuery = query.toLowerCase();

        // nhóm 1: tên bắt đầu bằng query
        const startsWith = list.filter((d) =>
          d.generic_name?.toLowerCase().startsWith(lowerQuery)
        );

        // nhóm 2: tên có chứa query nhưng không bắt đầu
        const contains = list.filter(
          (d) =>
            d.generic_name?.toLowerCase().includes(lowerQuery) &&
            !d.generic_name?.toLowerCase().startsWith(lowerQuery)
        );

        // ghép 2 nhóm lại
        const finalList = [...startsWith, ...contains]
          .slice(0, 10)
          .map((d) => ({ value: d.generic_name }));

        setOptions(finalList);
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
      const res = await axios.get(`${API_BASE}/search?name=${encodeURIComponent(formName)}`);
      const json = res.data;
      if (json.success && json.data.length > 0) {
        const drug = json.data[0];
        const next: DrugRow = {
          id: drug._id || String(Math.random()).slice(2),
          name: drug.generic_name,
          dose: formDose.trim() || "1 viên / ngày",
          time: formTime.trim() || "Sáng",
          duration: formDuration ?? 7,
          note: formNote.trim() || "Không có",
        };

        setDrugs((d) => [...d, next]);
        setFormName("");
        setFormDose("");
        setFormTime("");
        setFormDuration(undefined);
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
    return `ngày ${d.getDate()} tháng ${d.getMonth() + 1} năm ${d.getFullYear()}`;
  }, []);

  const handleSaveDiagnosis = () => {
    if (!diagnosis.trim()) {
      alert("Vui lòng nhập chẩn đoán trước khi ghi nhận!");
      return;
    }
    setDiagnosisSaved(true);
    setEditingDiagnosis(false);
    setShowPrescription(true);
  };

  const handleEditDiagnosis = () => {
    setEditingDiagnosis(true);
  };

  const buildPrescriptionItems = () => {
    return drugs.map((d) => {
      return {
        drug_name: d.name,
        frequency: d.time || "1 lần/ngày",
        duration_days: d.duration || 2,
        note: d.note || "Không có",
      };
    });
  };

  const handleSavePrescription = async () => {
    if (drugs.length === 0) {
      alert("Đơn thuốc rỗng. Vui lòng thêm thuốc trước khi ghi nhận.");
      return;
    }
    const items = buildPrescriptionItems();

    const currentVisitId = visitId || (await getVisitIdForCurrent());
    if (!currentVisitId) {
      alert("Không tìm thấy visit_id của lần khám hiện tại. Vui lòng thử lại hoặc liên hệ admin.");
      return;
    }

    const payload = {
      visit_id: currentVisitId,
      items,
      diagnosis,
      note: prescriptionNote || "Không có",
    };

    try {
      const res = await axios.post(`${API_BASE}/create-prescription`, payload);
      const json = res.data;
      if (json.success) {
        alert("Lưu đơn thuốc thành công!");
        setDrugs([]);
        setShowPrescription(false);
        setDiagnosisSaved(true);
        try {
          onBack();
        } catch (err) {
          console.warn("onBack callback failed or not provided:", err);
        }
      } else {
        alert("Lưu đơn thất bại: " + (json.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Lỗi khi gọi API create-prescription:", err);
      alert("Lỗi mạng khi lưu đơn thuốc.");
    }
  };

  return (
    <div className="visit-panel">
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

      <Card bordered className="bottom-card">
        <Row gutter={16}>
          <Col xs={24} lg={16}>
            <div className="diagnosis-box">
              <Text style={{ fontWeight: 600 }}>Chẩn đoán:</Text>

              {!diagnosisSaved || editingDiagnosis ? (
                <>
                  <Input.TextArea
                    rows={4}
                    placeholder="Nhập thông tin tại đây"
                    className="input-radius"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                  />
                  <div className="btn-row">
                    <Button type="primary" onClick={handleSaveDiagnosis}>
                      {diagnosisSaved ? "Cập nhật" : "Ghi nhận"}
                    </Button>
                    {diagnosisSaved && (
                      <Button onClick={() => setEditingDiagnosis(false)}>Hủy</Button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <p
                    style={{
                      minHeight: "60px",
                      border: "1px solid #d9d9d9",
                      borderRadius: 8,
                      padding: 8,
                    }}
                  >
                    {diagnosis}
                  </p>
                  <div className="btn-row">
                    <Button onClick={handleEditDiagnosis}>Sửa</Button>
                    {!showPrescription && (
                      <Button type="primary" onClick={() => setShowPrescription(true)}>
                        Kê đơn
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>

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

                <div style={{ marginTop: 12 }}>
                  <Text style={{ fontWeight: 600 }}>Ghi chú:</Text>
                  <Input.TextArea
                    rows={3}
                    placeholder="Nhập ghi chú cho bệnh nhân"
                    value={prescriptionNote}
                    onChange={(e) => setPrescriptionNote(e.target.value)}
                  />
                </div>

                <div className="btn-row">
                  <Button type="primary" onClick={handleSavePrescription}>
                    Ghi nhận
                  </Button>
                  <Button type="primary" danger onClick={() => setShowDDIs(true)}>
                    Tương tác thuốc
                  </Button>
                </div>
              </>
            )}
          </Col>

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

                {showPrescription && (
                  <div>
                    <Text style={{ fontWeight: 600 }}>Thêm thuốc vào kê đơn</Text>
                    <Space direction="vertical" size={8} style={{ width: "100%" }}>
                      <AutoComplete
                        options={options}
                        value={formName}
                        onChange={(value) => setFormName(value)}
                        onSearch={fetchDrugSuggestions}
                        placeholder="Tên thuốc"
                        style={{ width: "100%" }}
                        notFoundContent={loadingDrugs ? "Đang tải..." : "Không có kết quả"}
                      />
                      <Input
                        placeholder="Liều dùng (vd: 1 lần / ngày)"
                        value={formDose}
                        onChange={(e) => setFormDose(e.target.value)}
                      />
                      <Input
                        placeholder="Thời gian (vd: Sáng)"
                        value={formTime}
                        onChange={(e) => setFormTime(e.target.value)}
                      />
                      <Input
                        placeholder="Số ngày (vd: 7)"
                        value={formDuration !== undefined ? String(formDuration) : ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormDuration(val ? Number(val) : undefined);
                        }}
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
      <DDIsVisit open={showDDIs} onClose={() => setShowDDIs(false)} drugs={drugs} patientId={patient.id} />
    </div>
  );
}
