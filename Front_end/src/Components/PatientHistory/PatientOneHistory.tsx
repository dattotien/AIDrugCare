import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Table, Button } from "antd";
import "./PatientHistory.css";
import more from "../../assets/more (2).png";
import axios from "axios";

interface Props {
  visitId: string | null;
}

export default function PatientOneHistory({ visitId }: Props) {
  const [patient, setPatient] = useState<any>(null);
  const [visit, setVisit] = useState<any>(null);
  const [pres, setPres] = useState<any>(null);
  const [history, setHistory] = useState<any>(null);
  const [showActions, setShowActions] = useState(false);
  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:8000";
  useEffect(() => {
    const fetchPre = async () => {
      if (!visitId) return;
      try {
        const res = await axios.get(
          `${API_URL}/prescription/${visitId}`
        );
        console.log("📌 API response:", res.data);
        if (res.data.success) {
          setPatient(res.data.data.patient);
          setVisit(res.data.data.visit);
          setPres(res.data.data.prescription);
          setHistory(res.data.data.medical_history);
        }
      } catch (error) {
        console.error("Lỗi fetch:", error);
      }
    };

    fetchPre();
  }, [visitId]);

  const columns = [
    { title: "ID", dataIndex: "drug_id", key: "drug_id" },
    { title: "Tên thuốc", dataIndex: "drug_name", key: "drug_name" },
    { title: "Liều dùng", dataIndex: "frequency", key: "frequency" },
    { title: "Thời gian", dataIndex: "time", key: "time" },
    { title: "Yêu cầu", dataIndex: "requirement", key: "requirement" },
  ];

  const handlePrint = () => {
    console.log("print");
  };

  const handleSend = () => {
    console.log("select");
  };

  return (
    <div className="patient-history-container">
      <div className="patient-history-header">
        <p>{visit?.hospital}</p>
        <p className="small">Email: ngyen23102005@gmail.com</p>
        <p className="small">Hotline: 0978349285/0986269837</p>
      </div>

      <div className="patient-history-date">
        <p>Hà Nội, ngày 28 tháng 8 năm 2025</p>
      </div>

      <div className="patient-history-title">
        <p>KÊ ĐƠN KHÁM BỆNH</p>
      </div>

      <div className="patient-info-row">
        <p>
          <strong>Họ và tên:</strong>
          <span className="patient-info-field">{patient?.name}</span>
        </p>
        <p>
          <strong>Giới tính:</strong>
          <span className="patient-info-field">{patient?.gender}</span>
        </p>
        <p>
          <strong>Số điện thoại:</strong>
          <span className="patient-info-field">{patient?.phone}</span>
        </p>
      </div>

      <div className="patient-info-row small">
        <p>
          <strong>Ngày sinh:</strong>
          <span className="patient-info-field">
            {dayjs(patient?.dob).format("YYYY/MM/DD")}
          </span>
        </p>
        <p>
          <strong>CCCD:</strong>
          <span className="patient-info-field">{patient?.cccd}</span>
        </p>
      </div>

      <div className="patient-history-section">
        <p>
          <strong>Kết quả thăm khám:</strong>
          <span className="patient-info-field">{history?.labResult}</span>
        </p>
      </div>

      <div className="patient-history-section">
        <p>
          <strong>Chẩn đoán:</strong>
          <span className="patient-info-field">{visit?.diagnosis}</span>
        </p>
      </div>

      <div className="patient-history-section">
        <p>
          <strong>Ghi chú:</strong>
          <span className="patient-info-field">{visit?.note}</span>
        </p>
      </div>

      <div className="prescription-header">
        <p>
          <strong>Chi tiết đơn thuốc:</strong>
        </p>
        <p>
          <strong>Mã đơn thuốc:</strong>
          <span className="pres-id">{pres?.id}</span>
        </p>
      </div>

      <div className="table-container">
        <Table
          className="custom-row"
          columns={columns}
          dataSource={pres?.items}
          pagination={false}
          bordered
          rowKey="drug_id"
          rowClassName={(_, index) => (index % 2 === 0 ? "row-even" : "row-odd")}
        />
      </div>

      {!showActions ? (
        <div className="footer-button">
          <Button
            className="more-button"
            type="primary"
            shape="round"
            size="large"
            onClick={() => setShowActions(true)}
          >
            <img src={more} alt="more" />
          </Button>
        </div>
      ) : (
        <div className="footer-button">
          <div className="footer-actions">
            <Button className="print" onClick={handlePrint}>
              Print
            </Button>
            <Button className="send" onClick={handleSend}>
              Send
            </Button>
            <Button className="close" type="text" onClick={() => setShowActions(false)}>
              X
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
